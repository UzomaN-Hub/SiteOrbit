"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        sharedObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  return sharedObserver;
}

/**
 * Section reveal (DESIGN.md §7.2). Content is visible by default; it's only
 * hidden once the inline script has added html.js-reveal, and anything already
 * on screen at mount is shown straight away instead of animating.
 */
export default function Reveal({
  as: Tag = "div",
  className,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      node.classList.add("is-visible");
      return;
    }

    const observer = getObserver();
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return (
    <Tag ref={ref} id={id} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}

/** Runs before first paint so below-the-fold sections start hidden. */
export const revealScript = `document.documentElement.classList.add("js-reveal")`;
