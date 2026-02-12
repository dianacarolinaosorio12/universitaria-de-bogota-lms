export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department?: string;
  faculty?: string;
  avatarUrl?: string;
  isActive: boolean;
}
