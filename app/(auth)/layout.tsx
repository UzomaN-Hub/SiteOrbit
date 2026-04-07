"use client";

import { motion } from "framer-motion";
import { authEase } from "@/components/auth/auth-form-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0e1320] text-[#dee2f5]">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 22% 38%, rgba(79,219,200,0.12), transparent 24%)",
            "radial-gradient(circle at 28% 34%, rgba(79,219,200,0.17), transparent 26%)",
            "radial-gradient(circle at 22% 38%, rgba(79,219,200,0.12), transparent 24%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-10 top-20 h-56 w-56 rounded-full bg-[#4fdbc8]/8 blur-3xl"
        animate={{
          x: [0, 24, -8, 0],
          y: [0, -12, 16, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 right-[-4rem] h-72 w-72 rounded-full bg-[#89ceff]/8 blur-3xl"
        animate={{
          x: [0, -26, 10, 0],
          y: [0, 12, -14, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-y-0 left-1/2 hidden w-px bg-white/6 lg:block"
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.8, ease: authEase }}
      />

      <div className="relative z-10">{children}</div>
    </main>
  );
}