export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecQuestion {
  id: string;
  letter: RiasecType;
  title: string;
}

export interface QuestionBlock {
  blockNumber: number;
  title: string;
  subtitle?: string;
  questions: RiasecQuestion[];
}

export interface BlockAnswer {
  first?: string;  // Question ID for 1st place (3 points)
  second?: string; // Question ID for 2nd place (2 points)
  third?: string;  // Question ID for 3rd place (1 point)
}

export type TestAnswers = Record<number, BlockAnswer>;

export interface RiasecScore {
  type: RiasecType;
  label: string;
  shortDesc: string;
  points: number;
  percentage: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface RiasecResult {
  scores: Record<RiasecType, RiasecScore>;
  sortedScores: RiasecScore[];
  primaryType: RiasecType;
  secondaryType: RiasecType;
  tertiaryType: RiasecType;
  hollandCode: string;
  completedAt: string;
}

export interface ProfileDetail {
  type: RiasecType;
  name: string;
  tagline: string;
  color: string;
  iconName: string;
  description: string;
  personalityTraits: string[];
  workPreferences: string[];
  keySkills: string[];
  idealEnvironments: string[];
  recommendedCareers: {
    category: string;
    jobs: string[];
  }[];
  higherEducationCourses: string[];
  technicalCourses: string[];
}

export interface ParticipantStat {
  id: string;
  school: string;
  field: string;
  yearOfStudy: number;
  gender: 'Feminino' | 'Masculino' | 'Outro';
  dominantType: RiasecType;
  scores: Record<RiasecType, number>;
}
