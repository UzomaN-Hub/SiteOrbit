"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { authEase, authItemVariants, authPageVariants } from "@/components/auth/auth-form-motion";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function AcceptInvitePage() {
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,219,200,0.12),transparent_25%)]"
        animate={{
          opacity: [0.55, 0.9, 0.6],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-16 top-1/4 h-40 w-40 rounded-full bg-[#4fdbc8]/10 blur-3xl"
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -14, 10, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-10 bottom-20 h-36 w-36 rounded-full bg-[#89ceff]/10 blur-3xl"
        animate={{
          x: [0, -18, 10, 0],
          y: [0, 10, -12, 0],
          scale: [1, 1.07, 0.97, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={authPageVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl text-center"
      >
        <motion.div variants={authItemVariants} className="mb-10 flex justify-center">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Logo href="/" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={authItemVariants}
          className="mx-auto max-w-3xl rounded-[1.25rem] border border-white/8 bg-[#1a1f2d]/92 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10"
        >
          <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[#4fdbc8]"
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 0.75, delay: 0.2, ease: authEase }}
            />
          </div>

          <div className="mx-auto max-w-2xl space-y-4 text-left">
            <motion.p
              variants={authItemVariants}
              className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#4fdbc8]"
            >
              Step 1 of 4
            </motion.p>

            <motion.h1
              variants={authItemVariants}
              className="font-heading text-5xl font-extrabold tracking-tight text-[#dee2f5]"
            >
              Name your workspace
            </motion.h1>

            <motion.p
              variants={authItemVariants}
              className="max-w-xl text-lg leading-8 text-[#b8c3d9]"
            >
              Every great project starts with a name. This is where your team
              will collaborate and build high-end digital experiences.
            </motion.p>

            <motion.div variants={authItemVariants} className="pt-8">
              <Field>
                <FieldLabel
                  htmlFor="workspace-name"
                  className="text-xs uppercase tracking-[0.22em] text-[#bbcac6]"
                >
                  Workspace name
                </FieldLabel>
                <FieldContent>
                  <div className="mt-3 transition-transform duration-200 focus-within:-translate-y-0.5">
                    <Input
                      id="workspace-name"
                      value={workspaceName}
                      onChange={(event) => setWorkspaceName(event.target.value)}
                      placeholder="e.g. Acme Studio"
                      className="h-16 rounded-md border-white/8 bg-[#050b16] px-5 text-2xl font-semibold text-[#dee2f5] placeholder:text-white/18 transition-[border-color,transform,box-shadow] duration-200 focus-visible:scale-[1.01] focus-visible:border-[#4fdbc8]/40"
                    />
                  </div>
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div
              variants={authItemVariants}
              className="flex items-center justify-between pt-10"
            >
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="text-2xl font-medium text-[#d4dae9] transition-colors hover:text-white"
                onClick={() =>
                  toast.message("Skipped for now.", {
                    description: "Workspace onboarding can continue later.",
                  })
                }
              >
                Skip for now
              </motion.button>

              <motion.div
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <Button
                  type="button"
                  className="relative h-16 overflow-hidden rounded-[1rem] px-10 text-2xl font-semibold"
                  onClick={() =>
                    toast.success("Workspace name captured.", {
                      description: workspaceName || "Acme Studio",
                    })
                  }
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
                    whileHover={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 0.9, ease: "linear" }}
                  />
                  Continue
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <ArrowRight data-icon="inline-end" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={authItemVariants}
          className="mt-10 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.24em] text-white/30"
        >
          <span className="h-px w-10 bg-white/10" />
          <span>Need help?</span>
          <Link href="/" className="text-[#89ceff] underline underline-offset-4">
            Talk to a curator
          </Link>
          <span className="h-px w-10 bg-white/10" />
        </motion.div>
      </motion.div>
    </main>
  );
}