import { Question, SubjectId, DifficultyLevel, QuestionType } from '../types';

export interface ConceptDefinition {
  conceptId: string;
  subjectId: SubjectId;
  topic: string;
  learningObjective: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  reference: string;
  variants: {
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    correctOption: 'A' | 'B' | 'C' | 'D';
    rationale: {
      core: string;
      whyCorrect: string;
      distractors?: { A?: string; B?: string; C?: string; D?: string };
    };
  }[];
}

// Helper to shuffle options and recalculate correct option
export function shuffleQuestionOptions(q: Question, seed: number): Question {
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const originalCorrectText = q.options[q.correctOption];
  
  // Seeded permutation
  const perm = [...letters];
  for (let i = perm.length - 1; i > 0; i--) {
    const j = Math.floor(((seed * 9301 + 49297) % 233280) / 233280 * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }

  const newOptions = {
    A: q.options[perm[0]],
    B: q.options[perm[1]],
    C: q.options[perm[2]],
    D: q.options[perm[3]],
  };

  let newCorrectOption: 'A' | 'B' | 'C' | 'D' = 'A';
  for (const key of letters) {
    if (newOptions[key] === originalCorrectText) {
      newCorrectOption = key;
      break;
    }
  }

  return {
    ...q,
    options: newOptions,
    correctOption: newCorrectOption,
  };
}
