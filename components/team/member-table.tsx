"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cardReveal, panelSlideUp, staggerContainer } from "@/lib/motion";

export type TeamMemberRow = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "active" | "pending";
  avatar?: string | null;
};

type MemberTableProps = {
  members: TeamMemberRow[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getRolePill(role: TeamMemberRow["role"]) {
  switch (role) {
    case "owner":
      return "bg-[#4fdbc8] text-[#03241f]";
    case "admin":
      return "bg-[#89ceff] text-[#072335]";
    case "editor":
      return "bg-[#303443] text-[#dee2f5]";
    default:
      return "bg-[#252a38] text-[#dee2f5]";
  }
}

export default function MemberTable({ members }: MemberTableProps) {
  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-xl bg-[#1a1f2d] shadow-[0_22px_70px_rgba(0,0,0,0.24)]"
    >
      <motion.div
        variants={panelSlideUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between border-b border-white/5 px-6 py-5"
      >
        <div>
          <h2 className="font-heading text-xl font-bold text-[#dee2f5]">
            Team Members
          </h2>
          <p className="mt-1 text-sm text-[#bbcac6]">
            Keep permissions and invite state visible.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="divide-y divide-white/5"
      >
        {members.map((member) => (
          <motion.div
            key={member.id}
            variants={panelSlideUp}
            whileHover={{ backgroundColor: "rgba(22,27,41,1)" }}
            className="flex flex-col gap-4 px-6 py-4 transition-colors md:flex-row md:items-center md:justify-between"
          >
            <div className="flex min-w-0 items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }}>
                <Avatar className="size-11 ring-2 ring-[#4fdbc8]/15">
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="min-w-0">
                <p className="truncate font-medium text-[#dee2f5]">{member.name}</p>
                <p className="truncate text-sm text-[#bbcac6]">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ y: -1 }}>
                <Badge className={`rounded-full border-0 capitalize ${getRolePill(member.role)}`}>
                  {member.role}
                </Badge>
              </motion.div>

              <motion.div whileHover={{ y: -1 }}>
                <Badge
                  className={`rounded-full border-0 capitalize ${
                    member.status === "active"
                      ? "bg-[#182b28] text-[#4fdbc8]"
                      : "bg-[#303443] text-[#dee2f5]"
                  }`}
                >
                  {member.status}
                </Badge>
              </motion.div>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-md text-slate-400 hover:bg-[#252a38] hover:text-white"
                >
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">More</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}