import type { ReactNode } from "react";

import AppShell from "@/components/app-shell/app-shell";
import AuthBootstrapProvider from "@/components/providers/auth-bootstrap-provider";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthBootstrapProvider>
      <AppShell>{children}</AppShell>
    </AuthBootstrapProvider>
  );
}
