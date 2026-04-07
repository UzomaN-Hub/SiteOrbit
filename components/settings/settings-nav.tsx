"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type SettingsTab =
  | "workspace"
  | "branding"
  | "domains"
  | "api"
  | "billing";

type SettingsNavProps = {
  value: SettingsTab;
  onValueChange: (value: SettingsTab) => void;
};

export default function SettingsNav({
  value,
  onValueChange,
}: SettingsNavProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as SettingsTab)}
      className="w-full"
    >
      <TabsList className="h-auto w-fit rounded-xl bg-[#161b29] p-1">
        <TabsTrigger value="workspace" className="rounded-lg px-6 py-2.5">
          Workspace
        </TabsTrigger>
        <TabsTrigger value="branding" className="rounded-lg px-6 py-2.5">
          Branding
        </TabsTrigger>
        <TabsTrigger value="domains" className="rounded-lg px-6 py-2.5">
          Domains
        </TabsTrigger>
        <TabsTrigger value="api" className="rounded-lg px-6 py-2.5">
          API
        </TabsTrigger>
        <TabsTrigger value="billing" className="rounded-lg px-6 py-2.5">
          Billing
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}