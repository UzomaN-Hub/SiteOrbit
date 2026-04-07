export type DomainType = "primary" | "campaign" | "client" | "custom";

export type Domain = {
  id: string;
  workspace_id: string;
  host: string;
  status: string;
  type: DomainType | string;
  ssl_status: string;
  created_at: string;
};

export type CreateDomainInput = {
  host: string;
  type: DomainType;
};