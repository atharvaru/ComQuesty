import { Deed } from '../types';

const categories = [
  'environment', 
  'community', 
  'social', 
  'animal welfare', 
  'education'
];

const deedTitles = {
  environment: [
    'Clean up local park',
    'Plant a tree',
    'Collect recyclables',
    'Create a community garden',
    'Clean up a waterway'
  ],
  community: [
    'Help at food bank',
    'Visit a senior center',
    'Paint a community mural',
    'Organize a block party',
    'Repair playground equipment'
  ],
  social: [
    'Write letters to soldiers',
    'Donate to a shelter',
    'Host a fundraiser',
    'Make care packages',
    'Help at a soup kitchen'
  ],
  'animal welfare': [
    'Walk shelter dogs',
    'Create bird feeders',
    'Build an animal shelter',
    'Volunteer at animal rescue',
    'Create a wildlife habitat'
  ],
  education: [
    'Tutor a student',
    'Donate books',
    'Organize a workshop',
    'Mentor a child',
    'Create educational materials'
  ]
};

// Generate unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Generate description for a deed
const generateDescription = (title: string, category: string) => {
  const baseDescriptions = {
    environment: 'Help protect our planet by ',
    community: 'Make our community stronger by ',
    social: 'Create meaningful connections by ',
    'animal welfare': 'Support our animal friends by ',
    education: 'Empower through knowledge by '
  };

  const actions = {
    environment: [
      'removing litter and debris',
      'planting native species',
      'organizing a recycling drive',
      'creating sustainable spaces',
      'protecting natural resources'
    ],
    community: [
      'supporting local initiatives',
      'bringing people together',
      'improving shared spaces',
      'helping neighbors in need',
      'strengthening community bonds'
    ],
    social: [
      'supporting vulnerable populations',
      'spreading kindness and compassion',
      'creating valuable resources',
      'fostering human connections',
      'addressing social inequality'
    ],
    'animal welfare': [
      'improving animal lives',
      'creating safe animal habitats',
      'supporting animal care facilities',
      'advocating for animal rights',
      'protecting endangered species'
    ],
    education: [
      'sharing knowledge and skills',
      'supporting educational access',
      'encouraging lifelong learning',
      'developing educational resources',
      'inspiring future generations'
    ]
  };

  const baseDescription = baseDescriptions[category as keyof typeof baseDescriptions] || 'Help make a difference by ';
  const action = actions[category as keyof typeof actions]?.[Math.floor(Math.random() * 5)] || 'doing good in your community';
  const impact = [
    'This will make a real difference in our community!',
    'Your help will be greatly appreciated by everyone.',
    'Even small actions can create big positive changes.',
    'Be the change you want to see in the world!',
    'This is a perfect opportunity to use your skills for good.'
  ][Math.floor(Math.random() * 5)];

  return `${baseDescription}${action.toLowerCase()}. ${impact}`;
};

// Generate mock deeds based on zip code
export const generateMockDeeds = (zipCode: string): Deed[] => {
  // Use the zip code to seed the pseudo-random generator for consistent results
  const zipSeed = parseInt(zipCode.substring(0, 3));
  const numDeeds = (zipSeed % 5) + 5; // 5-9 deeds

  return Array.from({ length: numDeeds }, (_, i) => {
    const category = categories[Math.floor((zipSeed + i) % categories.length)];
    const titleList = deedTitles[category as keyof typeof deedTitles] || deedTitles.community;
    const title = titleList[Math.floor((zipSeed + i) % titleList.length)];
    
    // Difficulty and points based on position in the list
    let difficulty: 'easy' | 'medium' | 'hard';
    let points: number;
    
    if (i < 3) {
      difficulty = 'easy';
      points = 10 + (i * 5);
    } else if (i < 6) {
      difficulty = 'medium';
      points = 25 + ((i - 3) * 5);
    } else {
      difficulty = 'hard';
      points = 50 + ((i - 6) * 10);
    }

    // Generate estimated time based on difficulty
    const timeMap = {
      easy: ['15 min', '30 min', '45 min'],
      medium: ['1 hour', '1.5 hours', '2 hours'],
      hard: ['2.5 hours', '3 hours', '4 hours']
    };
    const estimatedTime = timeMap[difficulty][Math.floor(Math.random() * 3)];

    return {
      id: generateId(),
      title,
      description: generateDescription(title, category),
      location: `Near ${zipCode}`,
      difficulty,
      points,
      category,
      estimatedTime,
      createdBy: 'System', // Default value for createdBy
      createdAt: new Date().toISOString(), // Current timestamp
      approved: false // Default approval status
    };
  });
};