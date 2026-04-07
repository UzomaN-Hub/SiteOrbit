export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: AuthUser;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RefreshTokenInput = {
  refresh_token: string;
};

export type OAuthAuthorizeResponse = {
  authorization_url: string;
};

export type OAuthExchangeInput = {
  code: string;
};

export type OAuthProvider = "google" | "github";