import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Deed, CompletedDeed } from '../types';
import { generateMockDeeds } from '../utils/mockData';
import { calculateRank } from '../utils/ranks';

interface AppContextType {
  user: User | null;
  deeds: Deed[];
  completedDeeds: CompletedDeed[];
  leaderboard: User[];
  zipCode: string | null;
  setZipCode: (zipCode: string) => void;
  completeDeed: (deedId: string, photoUrl: string) => void;
  createDeed: (deed: Omit<Deed, 'id'>) => void;
  logout: () => void;
  login: (username: string) => void;
}

const defaultContext: AppContextType = {
  user: null,
  deeds: [],
  completedDeeds: [],
  leaderboard: [],
  zipCode: null,
  setZipCode: () => {},
  completeDeed: () => {},
  createDeed: () => {},
  logout: () => {},
  login: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [deeds, setDeeds] = useState<Deed[]>([]);
  const [completedDeeds, setCompletedDeeds] = useState<CompletedDeed[]>([]);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [zipCode, setZipCode] = useState<string | null>(null);

  // Initialize with mock data or load from localStorage
  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('comquest-user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const rank = calculateRank(parsedUser.points);
      setUser({ ...parsedUser, rank: rank.name });
    }

    // Load completed deeds
    const savedCompletedDeeds = localStorage.getItem('comquest-completed-deeds');
    if (savedCompletedDeeds) {
      setCompletedDeeds(JSON.parse(savedCompletedDeeds));
    }

    // Load created deeds
    const savedCreatedDeeds = localStorage.getItem('comquest-created-deeds');
    if (savedCreatedDeeds) {
      setDeeds(JSON.parse(savedCreatedDeeds));
    }

    // Load zip code if available
    const savedZipCode = localStorage.getItem('comquest-zip-code');
    if (savedZipCode) {
      setZipCode(savedZipCode);
    }

    // Generate mock leaderboard with ranks
    const mockLeaderboard = Array.from({ length: 10 }, (_, i) => {
      const points = Math.floor(Math.random() * 3000) + 100;
      const rank = calculateRank(points);
      return {
        id: `user-${i + 1}`,
        username: `adventurer${i + 1}`,
        points,
        completedDeeds: Math.floor(Math.random() * 20) + 1,
        rank: rank.name,
        createdDeeds: Math.floor(Math.random() * 5)
      };
    }).sort((a, b) => b.points - a.points);
    
    setLeaderboard(mockLeaderboard);
  }, []);

  // Update deeds whenever zip code changes
  useEffect(() => {
    if (zipCode) {
      // Check if deeds for the current zip code already exist
      const savedDeeds = localStorage.getItem(`comquest-deeds-${zipCode}`);
      if (savedDeeds) {
        // Load deeds from localStorage if they exist
        setDeeds(JSON.parse(savedDeeds));
      } else {
        // Generate new deeds and save them to localStorage
        const mockDeeds = generateMockDeeds(zipCode);
        setDeeds(mockDeeds);
        localStorage.setItem(`comquest-deeds-${zipCode}`, JSON.stringify(mockDeeds));
      }
    }
  }, [zipCode]);

  // Save completed deeds to localStorage
  useEffect(() => {
    if (completedDeeds.length > 0) {
      localStorage.setItem('comquest-completed-deeds', JSON.stringify(completedDeeds));
    }
  }, [completedDeeds]);

  // Save created deeds to localStorage
  useEffect(() => {
    if (deeds.length > 0) {
      localStorage.setItem('comquest-created-deeds', JSON.stringify(deeds));
    }
  }, [deeds]);

  // Update user in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('comquest-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('comquest-user');
    }
  }, [user]);

  const createDeed = (deedData: Omit<Deed, 'id'>) => {
    if (!user) return;

    const newDeed: Deed = {
      ...deedData,
      id: `deed-${Date.now()}`
    };

    setDeeds(prev => [newDeed, ...prev]);
    
    // Update user's created deeds count
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        createdDeeds: (prev.createdDeeds || 0) + 1
      };
    });
  };

  const completeDeed = (deedId: string, photoUrl: string) => {
    if (!user) return;

    const deed = deeds.find(d => d.id === deedId);
    if (!deed) return;

    // Create completed deed record
    const newCompletedDeed: CompletedDeed = {
      id: `cd-${Date.now()}`,
      deedId,
      userId: user.id,
      photoUrl,
      completedAt: new Date().toISOString(),
      points: deed.points,
    };

    // Update completed deeds
    setCompletedDeeds(prev => [...prev, newCompletedDeed]);

    // Update user points and rank
    setUser(prev => {
      if (!prev) return null;
      const newPoints = prev.points + deed.points;
      const rank = calculateRank(newPoints);
      return {
        ...prev,
        points: newPoints,
        completedDeeds: prev.completedDeeds + 1,
        rank: rank.name
      };
    });

    // Update leaderboard
    setLeaderboard(prev => {
      const updatedLeaderboard = prev.map(u => {
        if (u.id === user.id) {
          const newPoints = u.points + deed.points;
          const rank = calculateRank(newPoints);
          return {
            ...u,
            points: newPoints,
            completedDeeds: u.completedDeeds + 1,
            rank: rank.name
          };
        }
        return u;
      });

      // If user not in leaderboard yet, add them
      if (!updatedLeaderboard.some(u => u.id === user.id)) {
        const rank = calculateRank(user.points + deed.points);
        updatedLeaderboard.push({
          id: user.id,
          username: user.username,
          points: user.points + deed.points,
          completedDeeds: user.completedDeeds + 1,
          rank: rank.name,
          createdDeeds: user.createdDeeds || 0
        });
      }

      // Sort by points
      return updatedLeaderboard.sort((a, b) => b.points - a.points);
    });
  };

  const login = (username: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      points: 0,
      completedDeeds: 0,
      rank: calculateRank(0).name,
      createdDeeds: 0
    };

    setUser(newUser);

    // Add to leaderboard
    setLeaderboard(prev => [...prev, newUser].sort((a, b) => b.points - a.points));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('comquest-user');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        deeds,
        completedDeeds,
        leaderboard,
        zipCode,
        setZipCode,
        completeDeed,
        createDeed,
        logout,
        login,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};