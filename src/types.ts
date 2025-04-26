export interface User {
  id: string;
  username: string;
  points: number;
  completedDeeds: number;
  rank: string; // Added rank field
  createdDeeds: number; // Track deeds created
  badges: string[]; // Array of badge IDs the user has earned
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
  createdBy: string; // Added creator field
  createdAt: string; // Added creation timestamp
  approved: boolean; // Added approval status
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
  icon: string; // Name of the icon (e.g., "Award", "Leaf")
  pointsRequired?: number; // Optional points requirement
  deedsRequired?: number; // Optional deeds requirement
  category?: string; // For category-specific badges
  difficulty?: 'easy' | 'medium' | 'hard'; // For difficulty-specific badges
  specialCondition?: string; // For special condition badges
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum'; // For tiered badges
  color: string; // Badge color theme
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

// Optional: Badge categories for organization
export enum BadgeCategory {
  MILESTONE = 'milestone',
  CREATION = 'creation',
  CATEGORY = 'category',
  DIFFICULTY = 'difficulty',
  SPECIAL = 'special',
  RANK = 'rank'
}