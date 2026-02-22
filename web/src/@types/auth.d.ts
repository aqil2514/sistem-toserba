export interface AuthUser {
  provider: "google";
  providerId: string;

  email: string;
  name: string;
  avatar?: string;

  role: "admin" | "user";

  iat: string;
  exp: string;
}
