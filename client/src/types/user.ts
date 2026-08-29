/**
 * User Session and Persistence Types
 * Aligned with Supabase Auth (JWT) & Database Persistence Flow
 */

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: 'user' | 'admin' | 'archivist';
  createdAt: string;
}

export interface UserSession {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserProfile;
}

export interface UserFavorite {
  id: string;
  userId: string;
  monumentId: string;
  createdAt: string;
}

export interface UserQuizScore {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface UserFeedback {
  id: string;
  userId: string;
  monumentId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
