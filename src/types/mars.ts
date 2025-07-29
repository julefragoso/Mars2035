export interface UserData {
  // Step 1: Identification
  fullName: string;
  country: string;
  nativeLanguage: string;
  profession: string;

  // Step 2: Physical data
  age: number | null;
  sex: string;
  height: number | null;
  weight: number | null;
  bloodType: string;
  generalHealth: string;

  // Step 3: Lifestyle
  exerciseHabits: string;
  dietType: string;
  sleepHours: number | null;
  addictions: string;

  // Step 4: Skills and experience
  skills: string[];

  // Step 5: Psychological decisions
  psychologicalResponses: Record<string, string>;
}

export interface EvaluationResult {
  overallScore: number;
  status: 'Selected' | 'Not Selected';
  suggestedRole: string;
  breakdown: {
    physical: number;
    mental: number;
    skills: number;
    compatibility: number;
  };
}

export const SKILLS = [
  'Medical/Healthcare',
  'Programming/Software Development',
  'Mechanical Engineering',
  'Agriculture/Farming',
  'Electronics/Hardware',
  'Geology/Mining',
  'Construction/Architecture',
  'Research/Science',
  'Communications',
  'Leadership/Management',
  'Cooking/Food Preparation',
  'Renewable Energy',
  'Water Management',
  'Emergency Response',
  'Teaching/Training'
];

export const PSYCHOLOGICAL_QUESTIONS = [
  {
    id: 'isolation',
    question: 'How would you handle being isolated from Earth for 2+ years?',
    options: [
      'I thrive in isolated environments and find solace in solitude',
      'I can adapt but would need regular communication with Earth',
      'I would struggle but could manage with strong team support',
      'Isolation severely affects my mental health'
    ]
  },
  {
    id: 'leadership',
    question: 'In a crisis situation on Mars, your preferred approach would be:',
    options: [
      'Take immediate charge and make decisive decisions',
      'Collaborate with the team to find the best solution',
      'Support the designated leader while offering expertise',
      'Follow orders precisely to avoid making mistakes'
    ]
  },
  {
    id: 'sacrifice',
    question: 'If the mission success required personal sacrifice, you would:',
    options: [
      'Volunteer immediately for the good of the mission',
      'Carefully weigh options before deciding',
      'Accept if chosen but not volunteer',
      'Prioritize personal safety over mission goals'
    ]
  },
  {
    id: 'failure',
    question: 'Your reaction to a critical system failure would be:',
    options: [
      'Stay calm and methodically troubleshoot',
      'Rally the team while working on solutions',
      'Follow emergency protocols precisely',
      'Experience significant stress but continue working'
    ]
  },
  {
    id: 'resources',
    question: 'With limited resources, you would prioritize:',
    options: [
      'Mission objectives above all else',
      'Balanced approach between mission and crew welfare',
      'Crew safety and well-being first',
      'Personal needs to maintain effectiveness'
    ]
  }
];