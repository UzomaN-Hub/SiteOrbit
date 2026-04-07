import { z } from "zod";

export const workspaceNameSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace name must be at least 2 characters.")
    .max(60, "Workspace name must be 60 characters or fewer."),
});

export const inviteMemberSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  role: z.enum(["owner", "admin", "editor", "viewer"], {
    message: "Select a valid role.",
  }),
});

export type WorkspaceNameSchema = z.infer<typeof workspaceNameSchema>;
export type InviteMemberSchema = z.infer<typeof inviteMemberSchema>;