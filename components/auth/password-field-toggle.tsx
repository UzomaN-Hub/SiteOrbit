"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldToggleProps = {
  shown: boolean;
  onToggle: () => void;
};

export default function PasswordFieldToggle({
  shown,
  onToggle,
}: PasswordFieldToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#9aa6c0] hover:text-white"
      aria-label={shown ? "Hide password" : "Show password"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={shown ? "shown" : "hidden"}
          initial={{ opacity: 0, rotate: -12, scale: 0.84 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 12, scale: 0.84 }}
          transition={{ duration: 0.18 }}
          className="block"
        >
          {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}