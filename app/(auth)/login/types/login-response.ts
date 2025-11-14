export interface LoginResponse {
  token: string;
  expiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  sessionExpiresAt: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}
