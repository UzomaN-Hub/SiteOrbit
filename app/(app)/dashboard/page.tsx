"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";

import { useDashboard } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function getToneClass(tone: string) {
  switch (tone) {
    case "blue":
      return "text-[#89ceff]";
    case "teal":
    default:
      return "text-[#4fdbc8]";
  }
}

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "published" || normalized === "live") {
    return "bg-[#12251f] text-[#4fdbc8]";
  }

  if (normalized === "archived") {
    return "bg-[#2a2430] text-[#d7b4ff]";
  }

  return "bg-[#2a2418] text-[#ffcf7d]";
}

export default function DashboardPage() {
  const { dashboardQuery, activeWorkspace } = useDashboard();

  const workspaceName = activeWorkspace?.workspace.name ?? "your workspace";

  if (dashboardQuery.isPending) {
    return (
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Workspace overview
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Control your digital orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Syncing your workspace dashboard and recent activity.
            </p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[154px] animate-pulse rounded-xl bg-[#1a1f2d]"
            />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="h-[320px] animate-pulse rounded-xl bg-[#1a1f2d]" />
          <div className="h-[320px] animate-pulse rounded-xl bg-[#1a1f2d]" />
        </section>
      </div>
    );
  }

  if (dashboardQuery.isError) {
    const message =
      dashboardQuery.error instanceof Error
        ? dashboardQuery.error.message
        : "Dashboard data could not be loaded.";

    return (
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Workspace overview
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Control your digital orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              We could not load the latest dashboard data for {workspaceName}.
            </p>
          </div>
        </section>

        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              Dashboard unavailable
            </CardTitle>
            <CardDescription className="text-[#bbcac6]">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              onClick={() => void dashboardQuery.refetch()}
              className="h-11 rounded-md px-5"
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = dashboardQuery.data;
  const isEmpty =
    data.projects.length === 0 &&
    data.members.length === 0 &&
    data.activity.length === 1 &&
    data.activity[0] === "Create your first project to start building momentum.";

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Workspace overview
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Control your digital orbit.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Monitor high-value projects, track live performance, and keep your
            team aligned inside {workspaceName}.
          </p>
        </div>

        <Button asChild className="h-12 rounded-md px-5">
          <Link href="/projects">
            <Plus data-icon="inline-start" />
            New Project
          </Link>
        </Button>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {data.stats.map((card) => (
          <Card
            key={card.label}
            className="rounded-xl border-none bg-[#1a1f2d] p-2"
          >
            <CardHeader className="pb-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[#859490]">
                {card.label}
              </p>
              <CardTitle className="text-4xl font-extrabold tracking-tight text-[#dee2f5]">
                {card.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`inline-flex items-center gap-2 text-sm ${getToneClass(card.tone)}`}
              >
                <TrendingUp className="size-4" />
                <span>{card.helper}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {isEmpty ? (
        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              No projects yet
            </CardTitle>
            <CardDescription className="text-[#bbcac6]">
              Create your first site project to start tracking activity,
              collaborators, and publishing progress in this workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="h-11 rounded-md px-5">
              <Link href="/projects">
                <Plus data-icon="inline-start" />
                Create your first project
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-[#4fdbc8]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Recent activity
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              The latest workspace signals and follow-up prompts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.activity.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-start gap-3 rounded-xl bg-[#111522] p-4"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#4fdbc8]" />
                <p className="text-sm leading-6 text-[#dee2f5]">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderKanban className="size-5 text-[#89ceff]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Recent projects
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              The newest project surfaces in this workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.projects.length ? (
              data.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl bg-[#111522] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#dee2f5]">
                        {project.name}
                      </p>
                      <p className="mt-1 text-sm text-[#9aa6c0]">
                        {project.metric}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                No recent projects yet.
              </div>
            )}

            <Button asChild variant="outline" className="h-11 w-full rounded-md border-white/8 bg-transparent text-[#dee2f5]">
              <Link href="/projects">
                View all projects
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-[#4fdbc8]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Team snapshot
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              Active members inside this workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.members.length ? (
              <div className="overflow-hidden rounded-xl border border-white/8">
                <div className="grid grid-cols-[1.25fr_1.2fr_0.7fr_0.7fr] gap-4 bg-[#111522] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#859490]">
                  <span>Member</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Status</span>
                </div>

                {data.members.map((member) => (
                  <div
                    key={member.id}
                    className="grid grid-cols-[1.25fr_1.2fr_0.7fr_0.7fr] gap-4 border-t border-white/8 bg-[#151a27] px-4 py-4 text-sm text-[#dee2f5]"
                  >
                    <span className="font-medium">{member.name}</span>
                    <span className="text-[#bbcac6]">{member.email}</span>
                    <span className="capitalize">{member.role}</span>
                    <span className="capitalize text-[#4fdbc8]">
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                No team members are visible yet in this workspace.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}