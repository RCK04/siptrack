import { useAuth, UserButton } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Droplet,
  RotateCcw,
  Waves,
} from "lucide-react";
import { useState } from "react";

import { Footer } from "@/shared/components/layouts/Footer";
import Header from "@/shared/components/layouts/Header";
import { SkipLink } from "@/shared/components/layouts/SkipLink";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import scene from "./assets/hydration-scene.webp";
import { useHomeMotion } from "./hooks/useHomeMotion";
import "./home.css";

const StartTrackingButton = ({ className = "" }: { className?: string }) => {
  const { isSignedIn } = useAuth();
  const content = (
    <>
      {isSignedIn ? "Open dashboard" : "Start tracking"}
      <span className="home-button-icon">
        <ArrowUpRight aria-hidden="true" />
      </span>
    </>
  );

  return (
    <Button asChild className={`home-start-button ${className}`}>
      {isSignedIn ? (
        <Link to="/app">{content}</Link>
      ) : (
        <Link to="/sign-up/$" params={{ _splat: "" }}>
          {content}
        </Link>
      )}
    </Button>
  );
};

const DailyPreview = () => {
  const [amount, setAmount] = useState(0);
  const goal = 2000;
  const percentage = Math.round((amount / goal) * 100);

  return (
    <div className="home-preview">
      <div className="home-preview-header">
        <span className="home-label">Example day</span>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Reset the example day"
          title="Reset preview"
          onClick={() => setAmount(0)}
        >
          <RotateCcw aria-hidden="true" />
        </Button>
      </div>
      <div className="home-preview-value" aria-live="polite" aria-atomic="true">
        <span>
          {(amount / 1000).toFixed(2)}
          <small> L</small>
        </span>
        <span className="home-preview-goal">of 2.00 L</span>
      </div>
      <Progress
        value={amount}
        max={goal}
        aria-label="Example daily hydration progress"
        className="home-preview-progress"
      />
      <div className="home-preview-status">
        <span>
          {amount === goal ? (
            <>
              <Check size={14} aria-hidden="true" /> Goal reached
            </>
          ) : (
            "Every sip adds up"
          )}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="home-preview-buttons">
        {[250, 500].map((volume) => (
          <Button
            key={volume}
            variant="outline"
            disabled={amount === goal}
            onClick={() =>
              setAmount((current) => Math.min(current + volume, goal))
            }
          >
            <Droplet aria-hidden="true" /> + {volume} ml
          </Button>
        ))}
      </div>
      <p className="home-preview-note">
        Just a preview. Track your own day in the app.
      </p>
    </div>
  );
};

const HomePage = () => {
  const { isSignedIn } = useAuth();
  const { stageRef, navigationRef } = useHomeMotion();

  return (
    <div className="siptrack-home">
      <SkipLink targetId="home-content" />
      <Header
        ref={navigationRef}
        variant="plain"
        className="home-navigation"
        brandClassName="home-logo"
        actionsClassName="home-nav-account"
        navigation={
          <nav aria-label="Main navigation" className="home-nav-links">
            <a href="#the-flow">The flow</a>
            <a href="#your-routine">Try a day</a>
          </nav>
        }
      >
          {isSignedIn ? (
            <>
              <Link to="/app">
                My dashboard <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <UserButton />
            </>
          ) : (
            <Link to="/sign-in/$" params={{ _splat: "" }}>
              Sign in <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          )}
      </Header>

      <main id="home-content" tabIndex={-1}>
        <section
          ref={stageRef}
          className="home-stage"
          aria-labelledby="home-title"
        >
          <div className="home-hero">
            <div className="home-scene-frame">
              <div
                className="home-scene-float"
                style={{ backgroundImage: `url(${scene})` }}
              >
                <img
                  src={scene}
                  alt="A clear water bottle floating above a sunlit turquoise ripple."
                  className="home-scene"
                  width={1536}
                  height={1024}
                  fetchPriority="high"
                />
              </div>
            </div>
            <div className="home-scene-wash" aria-hidden="true" />
            <div className="home-meta home-enter">
              <span className="home-label">
                <span className="home-status-dot" />
                Your daily hydration
              </span>
              <span className="home-meta-note">
                A small habit.
                <br />A little more you.
              </span>
            </div>
            <div className="home-hero-content">
              <div className="home-brand-block">
                <span className="home-brand-note home-enter">
                  Find your everyday flow.
                </span>
                <h1
                  id="home-title"
                  className="home-wordmark"
                  aria-label="Siptrack"
                >
                  {"siptrack".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="home-letter-mask"
                      aria-hidden="true"
                    >
                      <span
                        style={{ animationDelay: `${0.18 + index * 0.055}s` }}
                      >
                        {letter}
                      </span>
                    </span>
                  ))}
                  <Droplet className="home-wordmark-drop" aria-hidden="true" />
                </h1>
              </div>
              <div className="home-hero-copy home-enter">
                <h2>
                  Small sips. <br />
                  Better days.
                </h2>
                <p>
                  Your water, your pace. Set a goal,
                  <br className="home-desktop-break" /> log a sip, and build a
                  daily rhythm
                  <br className="home-desktop-break" /> that feels like you.
                </p>
                <StartTrackingButton />
              </div>
            </div>
            <a href="#the-flow" className="home-scroll-cue">
              <ArrowDown size={14} aria-hidden="true" /> A little more below
            </a>
            <span className="home-hero-caption" aria-hidden="true">
              One sip at a time.
            </span>
            <div className="home-exit-mist" aria-hidden="true" />
          </div>
        </section>

        <section
          id="the-flow"
          className="home-flow"
          aria-labelledby="flow-title"
        >
          <div className="home-flow-intro">
            <div>
              <p className="home-label">
                <Waves size={18} aria-hidden="true" /> Less thinking. More
                drinking.
              </p>
              <h2 id="flow-title">
                A little water.
                <br />A rhythm of your own.
              </h2>
            </div>
            <p className="home-flow-description">
              Some days are busy. Your water habit can stay simple. Siptrack
              keeps your goal, your glasses, and your progress in one place.
            </p>
          </div>
          <div className="home-steps">
            {[
              {
                number: "01",
                title: "Make it personal",
                text: "Set a daily water goal that fits your routine.",
              },
              {
                number: "02",
                title: "Log the little sips",
                text: "A glass, a bottle, a refill. Add what you drink as you go.",
              },
              {
                number: "03",
                title: "See your day add up",
                text: "Follow your daily progress, one drink at a time.",
              },
            ].map((step) => (
              <article className="home-step" key={step.number}>
                <span className="home-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="your-routine"
          className="home-try"
          aria-labelledby="try-title"
        >
          <div className="home-try-copy">
            <p className="home-label">A small start goes a long way</p>
            <h2 id="try-title">
              Your next sip
              <br />
              is a fresh start.
            </h2>
            <p>
              No perfect streak required. Start where you are, and let the
              little things add up.
            </p>
            <StartTrackingButton className="home-start-button-filled" />
          </div>
          <DailyPreview />
        </section>
      </main>

      <Footer variant="plain" showBrand brandClassName="home-logo" className="home-footer text-flow-ink">
        <a href="#home-content">
          Back to the surface <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </Footer>
    </div>
  );
};

export default HomePage;
