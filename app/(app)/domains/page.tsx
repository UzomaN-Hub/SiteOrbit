"use client";

import { useMemo, useState } from "react";
import { Lock, Plus } from "lucide-react";
import { toast } from "sonner";

import EmptyState from "@/components/shared/empty-state";
import ErrorState, { errorMessage } from "@/components/shared/error-state";
import PageHeader from "@/components/shared/page-header";
import { StatusDot, type StatusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useDomains } from "@/hooks/use-domains";
import { formatRelative } from "@/lib/utils/format";
import type { DomainType } from "@/types/domain";

const domainTypes: { value: DomainType; label: string }[] = [
  { value: "custom", label: "Custom" },
  { value: "primary", label: "Primary" },
  { value: "client", label: "Client" },
  { value: "campaign", label: "Campaign" },
];

const HOST_PATTERN = /^(?=.{3,253}$)([a-z0-9](-?[a-z0-9])*\.)+[a-z]{2,}$/;

function statusTone(value: string): StatusTone {
  const normalized = value.toLowerCase();
  if (["active", "verified", "issued", "live"].includes(normalized)) return "live";
  return "pending";
}

function statusLabel(value: string) {
  const text = value.replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function DomainsPage() {
  const { activeWorkspace, canManageDomains, currentRole, domainsQuery, createDomainMutation } =
    useDomains();
  const [open, setOpen] = useState(false);
  const [host, setHost] = useState("");
  const [type, setType] = useState<DomainType>("custom");
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(activeWorkspace ? `Domains · ${activeWorkspace.workspace.name}` : "Domains");

  const domains = useMemo(
    () => [...(domainsQuery.data ?? [])].sort((a, b) => a.host.localeCompare(b.host)),
    [domainsQuery.data]
  );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = host
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");
    if (!HOST_PATTERN.test(value)) {
      setError("Enter a domain like www.example.com, without https:// or a path.");
      return;
    }

    try {
      setError(null);
      await createDomainMutation.mutateAsync({ host: value, type });
      toast.success(`${value} was added.`);
      setHost("");
      setType("custom");
      setOpen(false);
    } catch (submitError) {
      setError(errorMessage(submitError, "The domain couldn't be added. Try again."));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Domains"
        description="Addresses your sites can publish to. DNS verification runs outside SiteOrbit for now, so new domains stay pending until it's done."
        action={
          canManageDomains ? (
            <Button onClick={() => setOpen(true)}>
              <Plus />
              Add domain
            </Button>
          ) : null
        }
      >
        {!canManageDomains && currentRole ? (
          <p className="flex items-center gap-2 type-small text-text-muted">
            <Lock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            Only owners and admins can add domains.
          </p>
        ) : null}
      </PageHeader>

      {domainsQuery.isPending ? (
        <div aria-busy="true" className="border-t border-border">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex h-14 items-center gap-6 border-b border-border">
              <Skeleton className="h-3.5 w-48" />
              <Skeleton className="ml-auto h-3.5 w-16" />
              <Skeleton className="h-3.5 w-16" />
            </div>
          ))}
        </div>
      ) : domainsQuery.isError ? (
        <ErrorState
          title="Domains didn't load"
          error={domainsQuery.error}
          onRetry={() => void domainsQuery.refetch()}
        />
      ) : domains.length ? (
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Domain</TableHead>
              <TableHead className="hidden w-28 sm:table-cell">Type</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="hidden w-32 md:table-cell">Certificate</TableHead>
              <TableHead className="hidden w-36 lg:table-cell">Added</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {domains.map((domain) => (
              <TableRow key={domain.id}>
                <TableCell className="max-w-0 truncate">{domain.host}</TableCell>
                <TableCell className="hidden capitalize text-text-muted sm:table-cell">
                  {domain.type}
                </TableCell>
                <TableCell>
                  <StatusDot tone={statusTone(domain.status)} label={statusLabel(domain.status)} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <StatusDot
                    tone={statusTone(domain.ssl_status)}
                    label={statusLabel(domain.ssl_status)}
                  />
                </TableCell>
                <TableCell className="hidden text-text-muted lg:table-cell">
                  {formatRelative(domain.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          title="No domains yet"
          description="Add a client's domain so their sites can publish to it."
          action={
            canManageDomains ? (
              <Button onClick={() => setOpen(true)}>
                <Plus />
                Add domain
              </Button>
            ) : null
          }
        />
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add domain</DialogTitle>
            <DialogDescription>
              Adds the domain to {activeWorkspace?.workspace.name ?? "this workspace"} as pending.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} noValidate className="flex flex-col gap-6">
            <Field>
              <FieldLabel htmlFor="domain-host">Domain</FieldLabel>
              <Input
                id="domain-host"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                value={host}
                onChange={(event) => setHost(event.target.value)}
                placeholder="www.harbourdental.co.uk"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "domain-host-error" : "domain-host-help"}
              />
              {error ? (
                <FieldError id="domain-host-error" message={error} />
              ) : (
                <FieldDescription id="domain-host-help">
                  Just the address, no https:// or path.
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel id="domain-type-label">Type</FieldLabel>
              <Select value={type} onValueChange={(value) => setType(value as DomainType)}>
                <SelectTrigger aria-labelledby="domain-type-label">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {domainTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="link">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" loading={createDomainMutation.isPending}>
                Add domain
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
