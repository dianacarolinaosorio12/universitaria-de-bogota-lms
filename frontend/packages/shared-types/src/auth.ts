export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  faculty?: string;
}

export type UserRole = 'Student' | 'Teacher' | 'Coordinator' | 'Admin' | 'SuperAdmin';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  faculty?: string;
}

export interface RefreshTokenRequest {
  token: string;
}
