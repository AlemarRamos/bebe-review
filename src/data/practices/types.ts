import { DifficultyLevel, QuestionType, SubtopicId, NursingPracticeId } from '../../types';

export interface RawExamItem {
  subtopicId: SubtopicId;
  practiceId: NursingPracticeId;
  topic: string;
  learningObjective: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  reference: string;
  stem: string;
  correct: string;
  distractors: [string, string, string];
  coreRationale: string;
  whyCorrect: string;
  distractorExplanations?: {
    [key: string]: string;
  };
}
