export type NursingPracticeId =
  | 'np1' // Nursing Practice 1: Community Health & Fundamentals (100 items)
  | 'np2' // Nursing Practice 2: Maternal & Child Health (100 items)
  | 'np3' // Nursing Practice 3: Cardio, Resp, Hema, Endocrine (100 items)
  | 'np4' // Nursing Practice 4: Neuro, Periop, Immune, GIT, FABS & GUT (100 items)
  | 'np5'; // Nursing Practice 5: Special Senses, PH Mental Health, Psych (100 items)

export type SubtopicId =
  // NP 1
  | 'np1_fon' // Fundamentals of Nursing Practice (15 items: 01-15)
  | 'np1_chn1' // CHN 1: Individual & Family as Clients (30 items: 16-45)
  | 'np1_chn2' // CHN 2: Population Group & Community as Clients (30 items: 46-75)
  | 'np1_cd_imci' // Communicable Diseases & IMCI (25 items: 76-100)
  // NP 2
  | 'np2_well' // Care of Mother, Child, Adolescent (Well Clients) (50 items: 01-50)
  | 'np2_at_risk' // Care of Mother & Child at-Risk or with Problems (Acute/Chronic) (50 items: 51-100)
  // NP 3
  | 'np3_cardio' // Care of Clients with Cardiologic Problems (25 items: 01-25)
  | 'np3_resp' // Care of Clients with Respiratory Problems (25 items: 26-50)
  | 'np3_hema' // Care of Clients with Hematologic Problems (25 items: 51-75)
  | 'np3_endo' // Care of Clients with Endocrine Problems (25 items: 76-100)
  // NP 4
  | 'np4_neuro' // Care of Clients with Neurologic Problems (25 items: 01-25)
  | 'np4_periop' // Perioperative Nursing (15 items: 26-40)
  | 'np4_immune' // Inflammatory & Immunologic System Problems (10 items: 41-50)
  | 'np4_git' // GIT & Hepatobiliary Problems (25 items: 51-75)
  | 'np4_fabs_gut' // FABS & GUT Problems (Fluids, Acid-Base, Shock & Genitourinary) (25 items: 76-100)
  // NP 5
  | 'np5_senses' // Special Senses (25 items: 01-25)
  | 'np5_mh_ph' // Concepts of Mental Health in the Philippines (20 items: 26-45)
  | 'np5_psych'; // Psychiatric and Mental Health Nursing (55 items: 46-100)

export interface SubtopicInfo {
  id: SubtopicId;
  practiceId: NursingPracticeId;
  name: string;
  itemCount: number;
  percentage: number;
  placementRange: string; // e.g. "01 – 15"
  globalPlacementRange: string; // e.g. "001 – 015" or "446 – 500"
  description: string;
}

export interface NursingPracticeInfo {
  id: NursingPracticeId;
  number: number;
  title: string;
  shortTitle: string;
  totalItems: number; // Always 100
  color: string;
  bgLight: string;
  subtopics: SubtopicId[];
  description: string;
}

// Subject definitions for backward compatibility / subject mapping
export type SubjectId =
  | 'fundamentals'
  | 'community_health'
  | 'maternal_child'
  | 'medical_surgical'
  | 'psychiatric'
  | 'leadership_ethics'
  | 'research'
  | 'integrated_clinical';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  shortName: string;
  defaultQuestions: number;
  description: string;
  color: string;
}

export type ExamBlueprint = Record<SubjectId, number>;

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Difficult';

export type QuestionType =
  | 'direct_knowledge'
  | 'clinical_scenario'
  | 'prioritization'
  | 'calculation'
  | 'lab_interpretation'
  | 'safety_ethics';

export interface QuestionRationale {
  core: string;
  whyCorrect: string;
  distractors?: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
  };
}

export interface Question {
  id: string;
  itemNumber: number; // 1 to 500 (global position)
  npItemNumber: number; // 1 to 100 within its Nursing Practice
  practiceId: NursingPracticeId;
  subtopicId: SubtopicId;
  subjectId?: SubjectId;
  topic: string;
  learningObjective: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  rationale: QuestionRationale;
  reference: string;
  variantGroupId?: string;
  variantNumber?: number;
}

export interface ExamAttempt {
  id: string;
  attemptNumber: number;
  studentName: string;
  totalQuestions: number; // 500 for full pre-board, or 100 for individual NP
  examMode: 'full_500' | 'np1' | 'np2' | 'np3' | 'np4' | 'np5';
  examTitle: string;
  questions: Question[];
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | null>; // indexed 0 to N-1
  flaggedQuestions: Record<number, boolean>;
  timeAllocatedSeconds: number; // 36000 (600 mins) for 500 items, or 7200 (120 mins) for 100 items
  timeRemainingSeconds: number;
  startedAt: string;
  submittedAt: string | null;
  status: 'in_progress' | 'submitted';
  score?: ExamScore;
}

export interface SubtopicScoreBreakdown {
  subtopicId: SubtopicId;
  subtopicName: string;
  practiceId: NursingPracticeId;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredCount: number;
  percentage: number;
  benchmarkPassed: boolean;
}

export interface NursingPracticeScoreBreakdown {
  practiceId: NursingPracticeId;
  practiceTitle: string;
  totalQuestions: number; // 100
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredCount: number;
  percentage: number;
  benchmarkPassed: boolean;
  subtopicScores: Record<SubtopicId, SubtopicScoreBreakdown>;
}

export interface ExamScore {
  totalQuestions: number; // 500
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  rawScore: number;
  percentage: number;
  benchmarkPercentage: number; // default 75%
  passedBenchmark: boolean;
  timeSpentSeconds: number;
  practiceScores: Record<NursingPracticeId, NursingPracticeScoreBreakdown>;
}

export interface Bookmark {
  id: string;
  questionId: string;
  question: Question;
  createdAt: string;
  notes?: string;
}

export type UserRole = 'admin' | 'student';

export interface StudentRosterItem {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
  totalAttempts?: number;
  highestScore?: number;
  latestScore?: number;
  hasPassed?: boolean;
}
