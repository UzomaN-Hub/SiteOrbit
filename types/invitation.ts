export type InvitationRole = "owner" | "admin" | "editor" | "viewer";

export type Invitation = {
  id: string;
  workspace_id: string;
  email: string;
  role: InvitationRole | string;
  status: string;
  token: string;
  created_at: string;
};

export type CreateInvitationInput = {
  email: string;
  role: InvitationRole;
};