import type { ReactNode } from "react";

import AuthBootstrapProvider from "@/components/providers/auth-bootstrap-provider";

/** The builder is full screen: no top bar tabs, its own toolbar. */
export default function EditorLayout({ children }: { children: ReactNode }) {
  return <AuthBootstrapProvider>{children}</AuthBootstrapProvider>;
}
