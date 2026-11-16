export const SkipLink = ({ targetId = "main-content" }: { targetId?: string }) => (
  <a
    href={`#${targetId}`}
    className="fixed top-4 left-4 z-50 -translate-y-[calc(100%+2rem)] rounded-lg border border-flow-ink bg-flow-paper px-4 py-3 text-sm font-medium text-flow-ink shadow-sm focus:translate-y-0 focus:outline-2 focus:outline-offset-4 focus:outline-flow-ink"
  >
    Skip to content
  </a>
);
