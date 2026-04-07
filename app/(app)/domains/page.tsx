"use client";

import { useMemo, useState } from "react";
import { Globe, Plus, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import { useDomains } from "@/hooks/use-domains";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogText,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DomainType } from "@/types/domain";

const domainTypes: DomainType[] = ["primary", "campaign", "client", "custom"];

export default function DomainsPage() {
  const {
    activeWorkspace,
    currentRole,
    canManageDomains,
    domainsQuery,
    createDomainMutation,
  } = useDomains();

  const [open, setOpen] = useState(false);
  const [host, setHost] = useState("");
  const [type, setType] = useState<DomainType>("custom");
  const [error, setError] = useState<string | null>(null);

  const domains = domainsQuery.data ?? [];
  const sortedDomains = useMemo(
    () => [...domains].sort((a, b) => a.host.localeCompare(b.host)),
    [domains]
  );

  const handleCreateDomain = async () => {
    const normalizedHost = host.trim().toLowerCase();

    if (!normalizedHost || normalizedHost.length < 3) {
      setError("Enter a valid domain host.");
      return;
    }

    try {
      setError(null);
      await createDomainMutation.mutateAsync({
        host: normalizedHost,
        type,
      });
      setHost("");
      setType("custom");
      setOpen(false);
      toast.success("Domain added successfully.");
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Domain could not be created."
      );
    }
  };

  const workspaceName = activeWorkspace?.workspace.name ?? "this workspace";

  return (
    <>
      <div className="space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Domain management
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Control where your pages go live.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Review domain status, SSL readiness, and add new domain records for {workspaceName}.
            </p>
          </div>

          <Button
            type="button"
            className="h-12 rounded-md px-5"
            disabled={!canManageDomains}
            onClick={() => setOpen(true)}
          >
            <Plus data-icon="inline-start" />
            Add Domain
          </Button>
        </section>

        {!canManageDomains ? (
          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1f2d] px-4 py-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#ffcf7d]" />
            <div>
              <p className="font-medium text-[#dee2f5]">Read-only domains</p>
              <p className="mt-1 text-sm leading-6 text-[#bbcac6]">
                Your current role is <span className="capitalize">{currentRole ?? "viewer"}</span>.
                Only owners and admins can add or manage domains.
              </p>
            </div>
          </div>
        ) : null}

        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-[#4fdbc8]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Workspace domains
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              Domains stay visible as part of workspace settings, while true DNS verification remains outside MVP. 
            </CardDescription>
          </CardHeader>
          <CardContent>
            {domainsQuery.isPending ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-16 animate-pulse rounded-xl bg-[#111522]" />
                ))}
              </div>
            ) : domainsQuery.isError ? (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                {domainsQuery.error instanceof Error
                  ? domainsQuery.error.message
                  : "Domains could not be loaded."}
              </div>
            ) : sortedDomains.length ? (
              <div className="overflow-hidden rounded-xl border border-white/8">
                <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] gap-4 bg-[#111522] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#859490]">
                  <span>Host</span>
                  <span>Type</span>
                  <span>Status</span>
                  <span>SSL</span>
                </div>

                {sortedDomains.map((domain) => (
                  <div
                    key={domain.id}
                    className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] gap-4 border-t border-white/8 bg-[#151a27] px-4 py-4 text-sm text-[#dee2f5]"
                  >
                    <span className="font-medium">{domain.host}</span>
                    <span className="capitalize">{domain.type}</span>
                    <span className="capitalize text-[#4fdbc8]">{domain.status}</span>
                    <span className="capitalize text-[#89ceff]">{domain.ssl_status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                No domains added yet. Add one to prepare publishing confidence flows.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/8 bg-[#121826] text-[#dee2f5] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a domain</DialogTitle>
            <DialogText className="text-[#9aa6c0]">
              Create a new domain record for this workspace.
            </DialogText>
          </DialogHeader>

          <div className="space-y-5">
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Host
              </FieldLabel>
              <FieldContent>
                <Input
                  value={host}
                  onChange={(event) => setHost(event.target.value)}
                  placeholder="launch.example.com"
                  className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20"
                />
                <FieldError errors={error ? [{ message: error }] : []} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Domain type
              </FieldLabel>
              <FieldContent>
                <Select
                  value={type}
                  onValueChange={(value) => setType(value as DomainType)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {domainTypes.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <div className="flex justify-end">
              <Button
                type="button"
                disabled={createDomainMutation.isPending}
                onClick={() => void handleCreateDomain()}
              >
                Add domain
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}