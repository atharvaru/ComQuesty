export interface User {
  id: string;
  username: string;
  points: number;
  completedDeeds: number;
  rank: string; 
  createdDeeds: number; 
  badges: string[]; 
}

export interface Deed {
  id: string;
  title: string;
  description: string;
  location: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  category: string;
  estimatedTime: string;
  createdBy: string; 
  createdAt: string; 
  approved: boolean; 
}

export interface CompletedDeed {
  id: string;
  deedId: string;
  userId: string;
  photoUrl: string;
  completedAt: string;
  points: number;
}

export interface Rank {
  name: string;
  minPoints: number;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; 
  pointsRequired?: number; 
  deedsRequired?: number; 
  category?: string; 
  difficulty?: 'easy' | 'medium' | 'hard'; 
  specialCondition?: string; 
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum'; 
  color: string; 
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: string;
  progress?: {
    current: number;
    target: number;
  };
}


export enum BadgeCategory {
  MILESTONE = 'milestone',
  CREATION = 'creation',
  CATEGORY = 'category',
  DIFFICULTY = 'difficulty',
  SPECIAL = 'special',
  RANK = 'rank'
}