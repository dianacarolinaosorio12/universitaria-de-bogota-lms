import type { AuthResult, LoginRequest, RegisterRequest, RefreshTokenRequest } from '@ub-lms/shared-types';
import { apiClient } from './client';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResult>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResult>('/auth/register', data),

  refresh: (data: RefreshTokenRequest) =>
    apiClient.post<AuthResult>('/auth/refresh', data),

  me: () =>
    apiClient.get<AuthResult['user']>('/auth/me'),
};
