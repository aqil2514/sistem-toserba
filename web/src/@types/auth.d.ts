export interface AuthUser {
  provider: 'google'; // bisa di-extend nanti
  providerId: string;

  email: string;
  name: string;
  avatar?: string;

  role: 'admin' | 'user';

  iat: string; // ISO string
  exp: string; // ISO string
}
