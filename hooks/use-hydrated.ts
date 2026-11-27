"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during SSR and the hydration pass, true afterwards. Use it before
 * rendering anything read from the persisted (sessionStorage) auth store,
 * so server and client markup always match.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
