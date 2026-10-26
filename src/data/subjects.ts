import { SubjectId, SubjectInfo, ExamBlueprint } from '../types';

export const PNLE_SUBJECTS: Record<SubjectId, SubjectInfo> = {
  fundamentals: {
    id: 'fundamentals',
    name: 'Fundamentals of Nursing',
    shortName: 'FON',
    defaultQuestions: 50,
    description: 'Nursing process, vital signs, aseptic technique, dosage calculations, safety, IV therapy, hygiene, and ethical principles.',
    color: '#0d9488', // Teal
  },
  community_health: {
    id: 'community_health',
    name: 'Community Health Nursing',
    shortName: 'CHN',
    defaultQuestions: 65,
    description: 'Primary health care, COPAR, Expanded Program on Immunization (EPI), DOH public health programs, epidemiology, and environmental sanitation.',
    color: '#0284c7', // Sky Blue
  },
  maternal_child: {
    id: 'maternal_child',
    name: 'Maternal and Child Health Nursing',
    shortName: 'MCHN',
    defaultQuestions: 75,
    description: 'Antepartum, intrapartum, postpartum care, high-risk pregnancies, APGAR scoring, essential newborn care, and pediatric milestones.',
    color: '#e11d48', // Rose
  },
  medical_surgical: {
    id: 'medical_surgical',
    name: 'Medical-Surgical Nursing',
    shortName: 'MSN',
    defaultQuestions: 145,
    description: 'Adult pathophysiology across cardiovascular, respiratory, neuro, GI, renal, endocrine, oncology, musculoskeletal, and emergency conditions.',
    color: '#4f46e5', // Indigo
  },
  psychiatric: {
    id: 'psychiatric',
    name: 'Psychiatric and Mental Health Nursing',
    shortName: 'PMHN',
    defaultQuestions: 45,
    description: 'Therapeutic communication, schizophrenia, mood disorders, anxiety, defense mechanisms, psychopharmacology, crisis intervention, and suicide precautions.',
    color: '#9333ea', // Purple
  },
  leadership_ethics: {
    id: 'leadership_ethics',
    name: 'Leadership, Management, Ethics & Jurisprudence',
    shortName: 'LMEJ',
    defaultQuestions: 45,
    description: 'RA 9173 (Philippine Nursing Act of 2002), Code of Ethics, delegation, supervision, legal accountability, negligence vs malpractice, and consent.',
    color: '#d97706', // Amber
  },
  research: {
    id: 'research',
    name: 'Nursing Research & Evidence-Based Practice',
    shortName: 'NREBP',
    defaultQuestions: 25,
    description: 'Research designs, sampling methods, independent/dependent variables, validity & reliability, statistical analysis, and research ethics.',
    color: '#059669', // Emerald
  },
  integrated_clinical: {
    id: 'integrated_clinical',
    name: 'Integrated Clinical Judgment & Competencies',
    shortName: 'ICJC',
    defaultQuestions: 50,
    description: 'Prioritization (ABCs), triage, multi-system critical deterioration, laboratory interpretation, and integrated cross-specialty decision-making.',
    color: '#dc2626', // Red
  },
};

export const DEFAULT_BLUEPRINT: ExamBlueprint = {
  fundamentals: 50,
  community_health: 65,
  maternal_child: 75,
  medical_surgical: 145,
  psychiatric: 45,
  leadership_ethics: 45,
  research: 25,
  integrated_clinical: 50,
};

export const TOTAL_EXAM_ITEMS = 500;
export const DEFAULT_PASSING_BENCHMARK = 75; // 75%
export const DEFAULT_EXAM_DURATION_MINUTES = 600; // 600 minutes (10 hours for 500 items full practice simulation)
