import { NursingPracticeId, SubtopicId, NursingPracticeInfo, SubtopicInfo } from '../types';

export const NURSING_PRACTICES: Record<NursingPracticeId, NursingPracticeInfo> = {
  np1: {
    id: 'np1',
    number: 1,
    title: 'Nursing Practice 1',
    shortTitle: 'NP 1: Community Health & Fundamentals',
    totalItems: 100,
    color: '#0d9488', // Teal
    bgLight: '#f0fdfa',
    subtopics: ['np1_fon', 'np1_chn1', 'np1_chn2', 'np1_cd_imci'],
    description: 'Community Health Nursing, Family Nursing, Population Health, Communicable Diseases, IMCI, and Fundamentals of Nursing Practice.',
  },
  np2: {
    id: 'np2',
    number: 2,
    title: 'Nursing Practice 2',
    shortTitle: 'NP 2: Maternal & Child Health',
    totalItems: 100,
    color: '#e11d48', // Rose
    bgLight: '#fff1f2',
    subtopics: ['np2_well', 'np2_at_risk'],
    description: 'Care of Mother, Child, Adolescent (Well Clients) and Care of Mother and Child at-Risk or with Acute & Chronic Problems.',
  },
  np3: {
    id: 'np3',
    number: 3,
    title: 'Nursing Practice 3',
    shortTitle: 'NP 3: Cardio, Resp, Hema, Endocrine',
    totalItems: 100,
    color: '#2563eb', // Blue
    bgLight: '#eff6ff',
    subtopics: ['np3_cardio', 'np3_resp', 'np3_hema', 'np3_endo'],
    description: 'Care of Clients with Cardiologic, Respiratory, Hematologic, and Endocrine Pathophysiologic Alterations.',
  },
  np4: {
    id: 'np4',
    number: 4,
    title: 'Nursing Practice 4',
    shortTitle: 'NP 4: Neuro, Periop, Immune, GIT, FABS & GUT',
    totalItems: 100,
    color: '#4f46e5', // Indigo
    bgLight: '#eef2ff',
    subtopics: ['np4_neuro', 'np4_periop', 'np4_immune', 'np4_git', 'np4_fabs_gut'],
    description: 'Care of Clients with Neurologic, Perioperative, Inflammatory/Immunologic, GIT/Hepatobiliary, and FABS & Genitourinary Problems.',
  },
  np5: {
    id: 'np5',
    number: 5,
    title: 'Nursing Practice 5',
    shortTitle: 'NP 5: Special Senses & Mental Health',
    totalItems: 100,
    color: '#9333ea', // Purple
    bgLight: '#faf5ff',
    subtopics: ['np5_senses', 'np5_mh_ph', 'np5_psych'],
    description: 'Care of Clients with Special Senses Disorders, Concepts of Mental Health in the Philippines, and Psychiatric Nursing.',
  },
};

export const SUBTOPIC_SPECIFICATIONS: Record<SubtopicId, SubtopicInfo> = {
  // Nursing Practice 1 (Items 01 - 100)
  np1_fon: {
    id: 'np1_fon',
    practiceId: 'np1',
    name: 'Fundamentals of Nursing Practice',
    itemCount: 15,
    percentage: 15,
    placementRange: '01 – 15',
    globalPlacementRange: '001 – 015',
    description: 'Vital signs, aseptic technique, drug administration, nursing process, ethics, comfort, positioning, and patient safety.',
  },
  np1_chn1: {
    id: 'np1_chn1',
    practiceId: 'np1',
    name: 'Community Health Nursing 1 (Individual & Family as Clients)',
    itemCount: 30,
    percentage: 30,
    placementRange: '16 – 45',
    globalPlacementRange: '016 – 045',
    description: 'Family health nursing process, bag technique, home visits, levels of prevention, health education, and primary health care.',
  },
  np1_chn2: {
    id: 'np1_chn2',
    practiceId: 'np1',
    name: 'Community Health Nursing 2 (Population Group & Community as Clients)',
    itemCount: 30,
    percentage: 30,
    placementRange: '46 – 75',
    globalPlacementRange: '046 – 075',
    description: 'COPAR, community diagnosis, vital statistics, Philippine health systems (RA 7160 devolution, UHC Act RA 11223), and environmental sanitation.',
  },
  np1_cd_imci: {
    id: 'np1_cd_imci',
    practiceId: 'np1',
    name: 'Communicable Diseases & IMCI',
    itemCount: 25,
    percentage: 25,
    placementRange: '76 – 100',
    globalPlacementRange: '076 – 100',
    description: 'Integrated Management of Childhood Illness (IMCI), TB-DOTS, Dengue, Malaria, Schistosomiasis, Rabies, Leprosy, and cold chain vaccination.',
  },

  // Nursing Practice 2 (Items 101 - 200)
  np2_well: {
    id: 'np2_well',
    practiceId: 'np2',
    name: 'Care of Mother, Child, Adolescent (Well Clients)',
    itemCount: 50,
    percentage: 50,
    placementRange: '01 – 50',
    globalPlacementRange: '101 – 150',
    description: 'Normal pregnancy, Naegele’s rule, GTPAL, stages of normal labor, Essential Intrapartum & Newborn Care (EINC), APGAR, breastfeeding, and pediatric milestones.',
  },
  np2_at_risk: {
    id: 'np2_at_risk',
    practiceId: 'np2',
    name: 'Care of Mother and Child at-Risk or with Problems (Acute and Chronic)',
    itemCount: 50,
    percentage: 50,
    placementRange: '51 – 100',
    globalPlacementRange: '151 – 200',
    description: 'Gestational hypertension, preeclampsia, magnesium sulfate therapy, placenta previa, abruptio placentae, postpartum hemorrhage, congenital defects, and dehydration.',
  },

  // Nursing Practice 3 (Items 201 - 300)
  np3_cardio: {
    id: 'np3_cardio',
    practiceId: 'np3',
    name: 'Care of Clients with Cardiologic Problems',
    itemCount: 25,
    percentage: 25,
    placementRange: '01 – 25',
    globalPlacementRange: '201 – 225',
    description: 'Myocardial infarction, MONA protocol, heart failure, digoxin toxicity, ECG dysrhythmias, hypertension, and anticoagulant safety.',
  },
  np3_resp: {
    id: 'np3_resp',
    practiceId: 'np3',
    name: 'Care of Clients with Respiratory Problems',
    itemCount: 25,
    percentage: 25,
    placementRange: '26 – 50',
    globalPlacementRange: '226 – 250',
    description: 'COPD, asthma, pneumonia, tuberculosis, arterial blood gas interpretation, oxygen therapy, and chest tube drainage management.',
  },
  np3_hema: {
    id: 'np3_hema',
    practiceId: 'np3',
    name: 'Care of Clients with Hematologic Problems',
    itemCount: 25,
    percentage: 25,
    placementRange: '51 – 75',
    globalPlacementRange: '251 – 275',
    description: 'Anemias, sickle cell disease, leukemia, thrombocytopenia, bleeding precautions, blood transfusion safety, and hemolytic reactions.',
  },
  np3_endo: {
    id: 'np3_endo',
    practiceId: 'np3',
    name: 'Care of Clients with Endocrine Problems',
    itemCount: 25,
    percentage: 25,
    placementRange: '76 – 100',
    globalPlacementRange: '276 – 300',
    description: 'Diabetes mellitus, DKA vs HHS, hypoglycemia, thyroid storm vs myxedema coma, Addison’s disease vs Cushing’s syndrome.',
  },

  // Nursing Practice 4 (Items 301 - 400)
  np4_neuro: {
    id: 'np4_neuro',
    practiceId: 'np4',
    name: 'Care of Clients with Neurologic Problems',
    itemCount: 25,
    percentage: 25,
    placementRange: '01 – 25',
    globalPlacementRange: '301 – 325',
    description: 'Glasgow Coma Scale, increased ICP, Cushing’s triad, stroke (ischemic vs hemorrhagic), seizures, autonomic dysreflexia, and myasthenia gravis.',
  },
  np4_periop: {
    id: 'np4_periop',
    practiceId: 'np4',
    name: 'Perioperative Nursing',
    itemCount: 15,
    percentage: 15,
    placementRange: '26 – 40',
    globalPlacementRange: '326 – 340',
    description: 'Informed consent, preoperative checklist, surgical asepsis, sterile draping, intraoperative safety, PACU recovery, and postoperative complications.',
  },
  np4_immune: {
    id: 'np4_immune',
    practiceId: 'np4',
    name: 'Care of Clients with Inflammatory and Immunologic System Problems',
    itemCount: 10,
    percentage: 10,
    placementRange: '41 – 50',
    globalPlacementRange: '341 – 350',
    description: 'Systemic lupus erythematosus (SLE), rheumatoid arthritis, anaphylaxis, HIV/AIDS opportunistic infections, and immunosuppressive therapy.',
  },
  np4_git: {
    id: 'np4_git',
    practiceId: 'np4',
    name: 'Care of Clients with GIT & Hepatobiliary Problems',
    itemCount: 25,
    percentage: 25,
    placementRange: '51 – 75',
    globalPlacementRange: '351 – 375',
    description: 'Peptic ulcer disease, appendicitis, liver cirrhosis, esophageal varices, hepatic encephalopathy, pancreatitis, and colostomy care.',
  },
  np4_fabs_gut: {
    id: 'np4_fabs_gut',
    practiceId: 'np4',
    name: 'Care of Clients with FABS & GUT Problems',
    itemCount: 25,
    percentage: 25,
    placementRange: '76 – 100',
    globalPlacementRange: '376 – 400',
    description: 'Fluids, Acid-Base, Shock (FABS), Parkland burn formula, Acute Kidney Injury, Chronic Kidney Disease, hemodialysis AV fistula, and BPH/TURP.',
  },

  // Nursing Practice 5 (Items 401 - 500)
  np5_senses: {
    id: 'np5_senses',
    practiceId: 'np5',
    name: 'Special Senses',
    itemCount: 25,
    percentage: 25,
    placementRange: '01 – 25',
    globalPlacementRange: '401 – 425',
    description: 'Cataracts, glaucoma (open-angle vs closed-angle), retinal detachment, visual testing (Snellen), otitis media, Meniere’s disease, and ear irrigation.',
  },
  np5_mh_ph: {
    id: 'np5_mh_ph',
    practiceId: 'np5',
    name: 'Concepts of Mental Health in the Philippines',
    itemCount: 20,
    percentage: 20,
    placementRange: '26 – 45',
    globalPlacementRange: '426 – 445',
    description: 'Philippine Mental Health Act (RA 11036), community mental health services, patient rights, cultural concepts (hiya, pakikisama, utang na loob), and suicide prevention hotlines.',
  },
  np5_psych: {
    id: 'np5_psych',
    practiceId: 'np5',
    name: 'Psychiatric and Mental Health Nursing',
    itemCount: 55,
    percentage: 55,
    placementRange: '46 – 100',
    globalPlacementRange: '446 – 500',
    description: 'Therapeutic communication, schizophrenia, bipolar mania, major depressive disorder, defense mechanisms, lithium toxicity, NMS, and EPS management.',
  },
};

export const TOTAL_EXAM_ITEMS = 500;
export const DEFAULT_PASSING_BENCHMARK = 75; // 75%
export const TOTAL_PRACTICES = 5;
export const ITEMS_PER_PRACTICE = 100;
export const TOS_SUBTOPICS = SUBTOPIC_SPECIFICATIONS;

