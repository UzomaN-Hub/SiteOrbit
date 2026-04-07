"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailPlus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  inviteMemberSchema,
  type InviteMemberSchema,
} from "@/lib/validators/workspace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  authContainerVariants,
  authItemVariants,
} from "@/components/auth/auth-form-motion";

type InviteMemberModalProps = {
  trigger?: React.ReactNode;
};

export default function InviteMemberModal({
  trigger,
}: InviteMemberModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<InviteMemberSchema>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: "editor",
    },
  });

  const onSubmit = async (values: InviteMemberSchema) => {
    toast.success("Invitation prepared.", {
      description: `${values.email} will be invited as ${values.role}.`,
    });

    form.reset({
      email: "",
      role: "editor",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
            <Button className="rounded-md">
              <MailPlus data-icon="inline-start" />
              Invite member
            </Button>
          </motion.div>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl border-white/8 bg-[#1a1f2d] text-[#dee2f5]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
          >
            <ShieldCheck className="size-5" />
          </motion.div>

          <DialogTitle className="font-heading text-2xl font-bold">
            Invite workspace member
          </DialogTitle>
          <DialogDescription className="text-[#bbcac6]">
            Add a teammate with a clear role so permissions stay visible from the start.
          </DialogDescription>
        </DialogHeader>

        <motion.form
          variants={authContainerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <motion.div variants={authItemVariants}>
            <Field>
              <FieldLabel
                htmlFor="invite-email"
                className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]"
              >
                Email address
              </FieldLabel>
              <FieldContent>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="name@company.com"
                  className="h-12 rounded-md bg-[#090e1b] text-[#dee2f5]"
                  {...form.register("email")}
                />
                <FieldError errors={[form.formState.errors.email]} />
              </FieldContent>
            </Field>
          </motion.div>

          <motion.div variants={authItemVariants}>
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Role
              </FieldLabel>
              <FieldContent>
                <Select
                  value={form.watch("role")}
                  onValueChange={(value) =>
                    form.setValue("role", value as InviteMemberSchema["role"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="h-12 rounded-md bg-[#090e1b] text-[#dee2f5]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="border-white/8 bg-[#1a1f2d] text-[#dee2f5]">
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError errors={[form.formState.errors.role]} />
              </FieldContent>
            </Field>
          </motion.div>

          <motion.div variants={authItemVariants}>
            <DialogFooter className="pt-2">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Button
                  type="submit"
                  className="rounded-md"
                  disabled={form.formState.isSubmitting}
                >
                  Send invite
                </Button>
              </motion.div>
            </DialogFooter>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}