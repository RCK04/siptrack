import { useEffect, useRef } from "react";

export function useHomeMotion() {
  const stageRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const navigation = navigationRef.current;
    if (!stage || !navigation) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let previousScroll = window.scrollY;
    let active = true;

    const render = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      const progress = reducedMotion.matches ? 0 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      stage.style.setProperty("--scene-x", `${currentX.toFixed(2)}px`);
      stage.style.setProperty("--scene-y", `${(currentY - progress * 100).toFixed(2)}px`);
      stage.style.setProperty("--copy-y", `${(-progress * 70).toFixed(2)}px`);
      stage.style.setProperty("--copy-opacity", `${Math.max(0, 1 - progress * 1.8)}`);
      stage.style.setProperty("--mist-opacity", `${progress * 0.95}`);
      navigation.dataset.onPaper = String(window.scrollY > stage.offsetHeight - 180);

      if (!reducedMotion.matches && active && (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1)) {
        frame = window.requestAnimationFrame(render);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(render); };
    const onScroll = () => {
      const nextScroll = window.scrollY;
      if (Math.abs(nextScroll - previousScroll) > 5) {
        navigation.dataset.hidden = String(!reducedMotion.matches && nextScroll > previousScroll && nextScroll > 160);
        previousScroll = nextScroll;
      }
      schedule();
    };
    const onPointer = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches || !active) return;
      targetX = (0.5 - event.clientX / window.innerWidth) * 18;
      targetY = (0.5 - event.clientY / window.innerHeight) * 10;
      schedule();
    };
    const resetPointer = () => { targetX = 0; targetY = 0; schedule(); };
    const observer = new IntersectionObserver(([entry]) => {
      active = Boolean(entry?.isIntersecting);
      stage.dataset.active = String(active);
      if (active) schedule();
    });

    observer.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    stage.addEventListener("pointermove", onPointer, { passive: true });
    stage.addEventListener("pointerleave", resetPointer);
    reducedMotion.addEventListener("change", resetPointer);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      stage.removeEventListener("pointermove", onPointer);
      stage.removeEventListener("pointerleave", resetPointer);
      reducedMotion.removeEventListener("change", resetPointer);
    };
  }, []);

  return { stageRef, navigationRef };
}
