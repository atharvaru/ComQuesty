import { Rank } from '../types';

export const ranks: Rank[] = [
  { name: 'Novice Helper', minPoints: 0, color: 'text-gray-600' },
  { name: 'Kind Soul', minPoints: 100, color: 'text-green-600' },
  { name: 'Community Friend', minPoints: 250, color: 'text-blue-600' },
  { name: 'Local Hero', minPoints: 500, color: 'text-purple-600' },
  { name: 'Impact Maker', minPoints: 1000, color: 'text-yellow-600' },
  { name: 'Legendary Altruist', minPoints: 2500, color: 'text-red-600' }
];

export const calculateRank = (points: number): Rank => {
  return ranks.reduce((highest, current) => {
    if (points >= current.minPoints && current.minPoints >= highest.minPoints) {
      return current;
    }
    return highest;
  }, ranks[0]);
};