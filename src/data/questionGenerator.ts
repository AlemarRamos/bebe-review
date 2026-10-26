import {
  Question,
  NursingPracticeId,
  SubtopicId,
  ExamScore,
  NursingPracticeScoreBreakdown,
  SubtopicScoreBreakdown,
  DifficultyLevel,
  QuestionType,
} from '../types';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS, TOTAL_EXAM_ITEMS } from './tableOfSpecifications';

interface SubtopicContentBank {
  subtopicId: SubtopicId;
  practiceId: NursingPracticeId;
  topic: string;
  learningObjective: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  reference: string;
  items: {
    stem: string;
    correct: string;
    distractors: [string, string, string];
    coreRationale: string;
    whyCorrect: string;
  }[];
}

// Comprehensive clinical bank structured strictly by the 18 Table of Specifications subtopics
const SUBTOPIC_BANKS: Record<SubtopicId, SubtopicContentBank> = {
  // NP 1: 15 items (01 - 15)
  np1_fon: {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Apply principles of asepsis, vital signs, medication administration rights, and positioning.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Kozier & Erb\'s Fundamentals of Nursing, 10th Ed.',
    items: [
      {
        stem: 'While preparing a sterile drape for an indwelling catheterization, a 1-inch area of the outer perimeter drops onto an unsterile bedside table. What is the appropriate nursing assessment?',
        correct: 'The 1-inch outer border is considered contaminated; the inner field remains sterile if untouched.',
        distractors: [
          'The entire sterile drape is contaminated and must be immediately replaced.',
          'The drape remains fully sterile because it was manufactured with hydrophobic coating.',
          'The nurse may wipe the edge with alcohol swabs and continue the procedure.'
        ],
        coreRationale: 'Surgical asepsis dictates that the 1-inch (2.5 cm) border of any sterile field is considered unsterile and contaminated.',
        whyCorrect: 'Only objects placed inside the 1-inch margin are maintained sterile.'
      },
      {
        stem: 'A nurse uses a blood pressure cuff with an inflatable bladder that is too narrow for an adult client\'s upper arm. What is the effect on the reading?',
        correct: 'Falsely elevated systolic and diastolic blood pressure reading.',
        distractors: [
          'Falsely decreased blood pressure reading.',
          'Falsely elevated systolic with falsely decreased diastolic pressure.',
          'Accurate reading as long as the cuff is placed at heart level.'
        ],
        coreRationale: 'An undersized or narrow blood pressure cuff requires excessive inflation pressure to compress the brachial artery, causing falsely high readings.',
        whyCorrect: 'Bladder width should be at least 40% of upper arm circumference; an undersized cuff overestimates arterial pressure.'
      },
      {
        stem: 'Following a percutaneous liver biopsy, which anatomical position is essential to prevent post-procedural internal hemorrhage?',
        correct: 'Right lateral recumbent position with a rolled towel under the puncture site for at least 2 hours.',
        distractors: [
          'Left Sim\'s position with knees flexed.',
          'High Fowler\'s position with legs dependent.',
          'Trendelenburg position for 6 hours.'
        ],
        coreRationale: 'Positioning the patient on the right side applies direct compression against the puncture site via the ribs and diaphragm, promoting hemostasis in the vascular liver.',
        whyCorrect: 'Compression of the liver capsule against the chest wall prevents bile leakage and catastrophic bleeding.'
      },
      {
        stem: 'Before administering an enteral formula feeding via a nasogastric tube (NGT), what bedside test best verifies gastric positioning in a client not taking acid-suppressing drugs?',
        correct: 'Aspirating gastric contents and testing pH (expected pH between 1.0 and 5.5).',
        distractors: [
          'Auscultating a rushing air sound over the epigastrium with a 10 mL air bolus.',
          'Placing the distal end of the NGT in water to watch for bubbles.',
          'Checking for the presence of alkaline mucus with standard blue litmus paper.'
        ],
        coreRationale: 'Gastric aspirate pH <= 5.5 confirms acidic stomach environment. Air insufflation auscultation is discredited and unreliable.',
        whyCorrect: 'pH testing is the primary evidence-based bedside method when an initial radiograph has already confirmed placement.'
      },
      {
        stem: 'When suctioning an adult client with an open tracheostomy, what is the maximum duration permitted for a single suctioning pass to avoid critical hypoxia?',
        correct: '10 to 15 seconds maximum with intermittent suction applied only upon catheter withdrawal.',
        distractors: [
          '20 to 30 seconds with continuous high negative pressure.',
          '5 seconds applied continuously during insertion and withdrawal.',
          '45 seconds with continuous saline lavage.'
        ],
        coreRationale: 'Applying suction for longer than 10-15 seconds extracts alveolar oxygen and provokes severe vagal bradycardia and desaturation.',
        whyCorrect: 'Suctioning must be limited to 10-15 seconds preceded by hyperoxygenation with 100% O2.'
      }
    ]
  },

  // NP 1: 30 items (16 - 45)
  np1_chn1: {
    subtopicId: 'np1_chn1',
    practiceId: 'np1',
    topic: 'Community Health Nursing 1 (Individual & Family as Clients)',
    learningObjective: 'Apply family health nursing assessment, home visit guidelines, and public health bag technique.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Maglaya, Nursing Practice in the Community, 5th Ed.',
    items: [
      {
        stem: 'In the Public Health Nurse\'s Bag Technique during a home visit, which side of the paper lining must be in direct contact with the client\'s household table?',
        correct: 'The contaminated (outer) side touches the table, keeping the clean (inner) side upward as the working surface.',
        distractors: [
          'The clean inner side touches the table to keep it sterile.',
          'Both sides are treated as surgically sterile.',
          'The paper lining is moistened with 70% alcohol before placement.'
        ],
        coreRationale: 'The outer surface of the lining acts as an environmental barrier; the inner side remains the designated clean area for nurse supplies.',
        whyCorrect: 'Preserving the inner clean surface prevents cross-contamination from the unverified home table surface.'
      },
      {
        stem: 'In the Family Coping Index used in Philippine community health nursing, which domain assesses the family\'s ability to maintain personal cleanliness, safe food storage, and clean water?',
        correct: 'Physical Independence and Environmental Hygiene.',
        distractors: [
          'Emotional Competence.',
          'Family Dynamics.',
          'Therapeutic Competence.'
        ],
        coreRationale: 'The Family Coping Index evaluates 9 specific categories, with Physical Independence focusing on activities of daily living and environmental hygiene.',
        whyCorrect: 'Sanitary food, waste, and water management are measured under environmental competence.'
      },
      {
        stem: 'A public health nurse plans a home visit schedule in a rural barangay. Which household should the nurse prioritize to visit FIRST on her clinical itinerary?',
        correct: 'A post-cesarean mother and 3-day-old newborn needing routine postpartum and cord assessment.',
        distractors: [
          'A patient with open active pulmonary tuberculosis on daily DOTS medication.',
          'A child with a draining, purulent cutaneous wound.',
          'A patient diagnosed with active chickenpox (varicella).'
        ],
        coreRationale: 'In home visit scheduling, non-infectious, vulnerable cases (neonates, healthy postpartum mothers) are visited first before infectious communicable disease cases to prevent pathogen transfer.',
        whyCorrect: 'Visiting clean, uninfected cases first prevents carrying airborne or contact pathogens on clothes or bag.'
      }
    ]
  },

  // NP 1: 30 items (46 - 75)
  np1_chn2: {
    subtopicId: 'np1_chn2',
    practiceId: 'np1',
    topic: 'Community Health Nursing 2 (Population Group & Community as Clients)',
    learningObjective: 'Utilize COPAR phases, health vital statistics formulas, and Philippine health legislation.',
    difficulty: 'Difficult',
    questionType: 'calculation',
    reference: 'Philippine DOH Community Health Nursing Manual & Local Government Code (RA 7160)',
    items: [
      {
        stem: 'In a municipality with a midyear population of 40,000, there were 800 live births and 24 infant deaths under 1 year of age in 2026. What is the Infant Mortality Rate (IMR)?',
        correct: '30 per 1,000 live births.',
        distractors: [
          '0.6 per 1,000 population.',
          '24 per 1,000 live births.',
          '15 per 1,000 live births.'
        ],
        coreRationale: 'IMR = (Infant deaths under 1 year / Registered live births in same year) × 1,000.',
        whyCorrect: '(24 / 800) × 1,000 = 0.03 × 1,000 = 30 per 1,000 live births.'
      },
      {
        stem: 'During which phase of Community Organizing Participatory Action Research (COPAR) does the public health nurse identify potential indigenous community leaders and conduct core group formation?',
        correct: 'Entry Phase.',
        distractors: [
          'Pre-Entry Phase.',
          'Organization-Building Phase.',
          'Sustenance and Strengthening Phase.'
        ],
        coreRationale: 'The Entry Phase focuses on community integration, sensitizing residents, finding informal leaders, and establishing a core organizing group.',
        whyCorrect: 'Pre-entry is site selection; Organization-building is formal election; Sustenance is phase-out.'
      },
      {
        stem: 'Under the Local Government Code of 1991 (Republic Act No. 7160), the management and delivery of primary health services in the Philippines was devolved to:',
        correct: 'Local Government Units (LGUs) including Municipalities, Cities, and Provinces.',
        distractors: [
          'The Department of Health central national office exclusively.',
          'The Professional Regulation Commission Board of Nursing.',
          'Philippine Health Insurance Corporation (PhilHealth).'
        ],
        coreRationale: 'RA 7160 devolved field health services, rural health units (RHUs), and barangay health stations (BHS) to municipal and provincial local governments.',
        whyCorrect: 'Devolution empowered local mayors and governors to oversee public health staffing and funding.'
      }
    ]
  },

  // NP 1: 25 items (76 - 100)
  np1_cd_imci: {
    subtopicId: 'np1_cd_imci',
    practiceId: 'np1',
    topic: 'Communicable Diseases & IMCI',
    learningObjective: 'Assess child illness using IMCI guidelines and manage communicable diseases (TB, Dengue, Malaria).',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'WHO / DOH Integrated Management of Childhood Illness (IMCI) Guidelines',
    items: [
      {
        stem: 'In assessing a sick 14-month-old child under the IMCI protocol, which of the following is classified as a GENERAL DANGER SIGN requiring urgent hospital referral?',
        correct: 'The child is unable to drink or breastfeed, vomits everything, has had convulsions, or is lethargic/unconscious.',
        distractors: [
          'Mild axillary temperature of 37.8°C with clear nasal discharge.',
          'Passing 2 loose watery stools in 24 hours with moist oral mucosa.',
          'Mild cough of 3 days duration with normal chest indrawing.'
        ],
        coreRationale: 'The four IMCI general danger signs are: 1) Unable to drink/breastfeed; 2) Vomiting everything; 3) Convulsions during illness; 4) Lethargic or unconscious.',
        whyCorrect: 'Presence of any single general danger sign mandates immediate stabilization and urgent hospital referral.'
      },
      {
        stem: 'A public health nurse performs a Tourniquet Test (Rumpel-Leede) on a febrile patient suspected of dengue. Which finding confirms a positive test result under DOH guidelines?',
        correct: '10 or more petechiae per 1 square inch (2.5 cm × 2.5 cm) on the forearm.',
        distractors: [
          '5 petechiae over the entire arm.',
          'Blanching of the skin under the cuff.',
          'Development of swelling in the fingers without petechiae.'
        ],
        coreRationale: 'A positive tourniquet test requires >= 10 petechiae per square inch, demonstrating significant capillary fragility and thrombocytopenia.',
        whyCorrect: 'DOH National Dengue guidelines designate >= 10 petechiae as a positive indicator.'
      },
      {
        stem: 'Which anti-tuberculosis medication in the Philippine National TB Control Program (NTP) carries the primary risk of causing retrobulbar optic neuritis (loss of visual acuity and red-green color blindness)?',
        correct: 'Ethambutol (EMB).',
        distractors: [
          'Isoniazid (INH).',
          'Rifampicin (RIF).',
          'Pyrazinamide (PZA).'
        ],
        coreRationale: 'Ethambutol causes dose-dependent optic neuritis affecting central vision and red-green discrimination.',
        whyCorrect: 'Visual acuity testing is mandatory prior to and during ethambutol therapy.'
      }
    ]
  },

  // NP 2: 50 items (101 - 150)
  np2_well: {
    subtopicId: 'np2_well',
    practiceId: 'np2',
    topic: 'Care of Mother, Child, Adolescent (Well Clients)',
    learningObjective: 'Assess normal antepartum progression, Naegele’s rule, stages of labor, and essential newborn care.',
    difficulty: 'Moderate',
    questionType: 'calculation',
    reference: 'Pillitteri, Maternal and Child Health Nursing, 8th Ed.; DOH Unang Yakap Protocol',
    items: [
      {
        stem: 'A pregnant client reports her last normal menstrual period began on May 14, 2026. Using Naegele\'s rule, what is her Estimated Date of Delivery (EDD)?',
        correct: 'February 21, 2027.',
        distractors: [
          'February 7, 2027.',
          'January 21, 2027.',
          'March 21, 2027.'
        ],
        coreRationale: 'Naegele\'s Rule: LMP + 7 days - 3 months + 1 year. May (Month 5) - 3 = February (Month 2); 14 + 7 = 21; Year 2026 + 1 = 2027.',
        whyCorrect: 'EDD is calculated as February 21, 2027.'
      },
      {
        stem: 'Under the Philippine Essential Intrapartum and Newborn Care (EINC / Unang Yakap) guidelines, what is the FIRST action performed upon immediate delivery of a vigorous crying newborn?',
        correct: 'Immediate and thorough drying of the newborn for at least 30 seconds using a clean warm cloth.',
        distractors: [
          'Immediate clamping and cutting of the umbilical cord within 10 seconds.',
          'Suctioning mouth and nose with a bulb syringe on the perineum.',
          'Instilling ophthalmic erythromycin ointment.'
        ],
        coreRationale: 'Immediate drying for 30 seconds prevents evaporative hypothermia and stimulates spontaneous breathing.',
        whyCorrect: 'Drying takes precedence over cord clamping or medication administration.'
      },
      {
        stem: 'At 1 minute of life, a newborn has a heart rate of 124 bpm, good vigorous cry, active flexion and movement of extremities, sneezes when suctioned, and has pink body with blue hands and feet. What is the APGAR score?',
        correct: '9 (Appearance: 1, Pulse: 2, Grimace: 2, Activity: 2, Respiration: 2).',
        distractors: [
          '10',
          '8',
          '7'
        ],
        coreRationale: 'Acrocyanosis (blue extremities, pink trunk) deducts 1 point for Appearance; all other categories score full 2 points. Total = 9.',
        whyCorrect: 'The newborn is in excellent condition.'
      }
    ]
  },

  // NP 2: 50 items (151 - 200)
  np2_at_risk: {
    subtopicId: 'np2_at_risk',
    practiceId: 'np2',
    topic: 'Care of Mother and Child at-Risk or with Problems (Acute and Chronic)',
    learningObjective: 'Manage high-risk pregnancies, preeclampsia, obstetric hemorrhage, and pediatric congenital anomalies.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'Williams Obstetrics, 26th Ed.; Nelson Textbook of Pediatrics',
    items: [
      {
        stem: 'A client with severe preeclampsia is receiving an intravenous infusion of Magnesium Sulfate. The nurse notes absent patellar reflexes (0/4+) and a respiratory rate of 10 bpm. What is the priority nursing action?',
        correct: 'Stop the Magnesium Sulfate infusion immediately and prepare to administer Calcium Gluconate 10% IV.',
        distractors: [
          'Slow the infusion rate to half and recheck in 30 minutes.',
          'Administer IV naloxone hydrochloride (Narcan).',
          'Place the patient in supine Trendelenburg position.'
        ],
        coreRationale: 'Loss of deep tendon reflexes and bradypnea (<12/min) signal toxic hypermagnesemia risking respiratory arrest; Calcium Gluconate is the direct competitive antagonist.',
        whyCorrect: 'Immediate cessation and Calcium Gluconate reversal prevents fatal respiratory failure.'
      },
      {
        stem: 'A 34-week pregnant client presents with sudden onset of painless, bright red vaginal bleeding. Her uterus is soft and relaxed. Which intervention is strictly CONTRAINDICATED?',
        correct: 'Performing a digital vaginal examination (internal pelvic exam).',
        distractors: [
          'Applying an external fetal heart monitor.',
          'Establishing a large-bore IV with normal saline.',
          'Obtaining ultrasound to evaluate placental location.'
        ],
        coreRationale: 'Digital vaginal exam can puncture the placenta overlying the cervical os in placenta previa, provoking exsanguinating hemorrhage.',
        whyCorrect: 'Pelvic examination is prohibited until ultrasound excludes placenta previa.'
      },
      {
        stem: 'An infant with Tetralogy of Fallot develops sudden intense cyanosis and dyspnea while crying (a "tet" spell). What is the nurse\'s FIRST physical intervention?',
        correct: 'Place the infant in the knee-chest position.',
        distractors: [
          'Start chest compressions at 100 per minute.',
          'Place the child in high Fowler\'s position.',
          'Elevate the infant\'s legs straight in the air.'
        ],
        coreRationale: 'Knee-chest position increases systemic vascular resistance (SVR), decreasing right-to-left shunting through the VSD and forcing blood into the pulmonary circulation.',
        whyCorrect: 'Repositioning immediately increases pulmonary blood flow and improves oxygenation.'
      }
    ]
  },

  // NP 3: 25 items (201 - 225)
  np3_cardio: {
    subtopicId: 'np3_cardio',
    practiceId: 'np3',
    topic: 'Care of Clients with Cardiologic Problems',
    learningObjective: 'Implement MONA protocol, interpret cardiac biomarkers, and manage heart failure and digoxin safety.',
    difficulty: 'Moderate',
    questionType: 'prioritization',
    reference: 'Brunner & Suddarth\'s Medical-Surgical Nursing, 15th Ed.',
    items: [
      {
        stem: 'Which cardiac diagnostic biomarker is the MOST sensitive and specific indicator of acute myocardial infarction and remains elevated in blood for up to 10-14 days?',
        correct: 'Cardiac Troponin I (cTnI).',
        distractors: [
          'Creatine Kinase-MB (CK-MB).',
          'Myoglobin.',
          'Lactate Dehydrogenase (LDH).'
        ],
        coreRationale: 'Troponin I is found exclusively in myocardium and provides the highest specificity for detecting cardiac necrosis.',
        whyCorrect: 'Troponin is the universally recognized gold standard biomarker.'
      },
      {
        stem: 'A patient with congestive heart failure receives Digoxin 0.25 mg and Furosemide 40 mg daily. Which laboratory finding most strongly predisposes the client to Digoxin toxicity?',
        correct: 'Serum Potassium level of 2.8 mEq/L (Hypokalemia).',
        distractors: [
          'Serum Potassium level of 4.8 mEq/L.',
          'Serum Sodium level of 142 mEq/L.',
          'Serum Calcium level of 9.2 mg/dL.'
        ],
        coreRationale: 'Hypokalemia enhances digoxin binding to the myocardial Na+/K+ ATPase pump, precipitating life-threatening toxicity even at therapeutic digoxin blood levels.',
        whyCorrect: 'Low potassium amplifies digitalis effects, causing visual halos, nausea, and dysrhythmias.'
      }
    ]
  },

  // NP 3: 25 items (226 - 250)
  np3_resp: {
    subtopicId: 'np3_resp',
    practiceId: 'np3',
    topic: 'Care of Clients with Respiratory Problems',
    learningObjective: 'Manage COPD, acute asthma, ABG interpretation, and chest tube drainage systems.',
    difficulty: 'Difficult',
    questionType: 'lab_interpretation',
    reference: 'Urden, Critical Care Nursing, 9th Ed.',
    items: [
      {
        stem: 'An ABG sample on an acute diabetic ketoacidosis patient yields: pH 7.28, PaCO2 31 mmHg, and HCO3 15 mEq/L. How is this blood gas classified?',
        correct: 'Partially compensated metabolic acidosis.',
        distractors: [
          'Uncompensated respiratory acidosis.',
          'Fully compensated metabolic alkalosis.',
          'Uncompensated metabolic acidosis.'
        ],
        coreRationale: 'pH is acidotic (<7.35); low HCO3 indicates metabolic origin; low PaCO2 shows respiratory compensation (hyperventilation blowing off acid). Since pH is not yet normalized, it is partially compensated.',
        whyCorrect: 'ROME rules confirm partially compensated metabolic acidosis.'
      },
      {
        stem: 'A patient has a chest tube connected to a three-chamber water-seal drainage system. The nurse observes CONTINUOUS, vigorous bubbling in the water-seal chamber. What does this signify?',
        correct: 'An air leak in the drainage system or around the pleural insertion site.',
        distractors: [
          'Normal expected evacuating airflow.',
          'Complete re-expansion of the lung.',
          'Excessive negative suction in the suction chamber.'
        ],
        coreRationale: 'Intermittent bubbling with exhalation is normal during air evacuation, but continuous bubbling indicates a leak allowing atmospheric air into the system.',
        whyCorrect: 'The nurse must check connections and tube insertion site for air leak.'
      }
    ]
  },

  // NP 3: 25 items (251 - 275)
  np3_hema: {
    subtopicId: 'np3_hema',
    practiceId: 'np3',
    topic: 'Care of Clients with Hematologic Problems',
    learningObjective: 'Manage leukemia, bleeding precautions, blood transfusion reactions, and sickle cell anemia.',
    difficulty: 'Moderate',
    questionType: 'safety_ethics',
    reference: 'AABB Transfusion Standards; Harrison\'s Principles of Internal Medicine',
    items: [
      {
        stem: 'Ten minutes after initiating a transfusion of packed red blood cells (PRBCs), the patient reports severe lower back pain and chills. What is the nurse\'s FIRST action?',
        correct: 'Stop the blood transfusion immediately and disconnect the tubing from the IV catheter.',
        distractors: [
          'Slow down the infusion rate and give diphenhydramine.',
          'Flush the blood line with 10 mL normal saline.',
          'Reassure the patient and check vitals in 15 minutes.'
        ],
        coreRationale: 'Lower back pain during transfusion is a hallmark of acute hemolytic reaction. The immediate priority is halting the infusion to limit exposure to incompatible erythrocytes.',
        whyCorrect: 'Stopping the blood minimizes immune-mediated intravascular hemolysis and renal shutdown.'
      },
      {
        stem: 'A client with acute myelogenous leukemia has an Absolute Neutrophil Count (ANC) of 450 cells/mcL. Which infection control precaution is essential?',
        correct: 'Place the client on neutropenic precautions in a private room and prohibit fresh flowers and raw vegetables.',
        distractors: [
          'Place the client on airborne droplet isolation with an N95 respirator.',
          'Withhold all oral hygiene to prevent gum bleeding.',
          'Administer live-attenuated viral vaccines.'
        ],
        coreRationale: 'ANC < 500 represents severe neutropenia; raw produce and stagnant water in flower vases harbor Pseudomonas and fungal spores capable of causing fatal sepsis.',
        whyCorrect: 'Protective environment shields the severely immunocompromised host.'
      }
    ]
  },

  // NP 3: 25 items (276 - 300)
  np3_endo: {
    subtopicId: 'np3_endo',
    practiceId: 'np3',
    topic: 'Care of Clients with Endocrine Problems',
    learningObjective: 'Differentiate DKA from HHS, manage thyroid storm, and care for adrenal insufficiency.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'American Diabetes Association (ADA) Clinical Guidelines',
    items: [
      {
        stem: 'A patient being treated for Diabetic Ketoacidosis (DKA) with continuous IV regular insulin sees their blood glucose decline from 540 mg/dL to 240 mg/dL. What IV fluid change is required?',
        correct: 'Add 5% Dextrose (D5W) to the IV fluids while continuing insulin.',
        distractors: [
          'Stop the insulin infusion immediately.',
          'Increase the insulin infusion rate.',
          'Switch to 3% hypertonic saline.'
        ],
        coreRationale: 'Adding dextrose when glucose reaches 200-250 mg/dL prevents rapid hypoglycemia and cerebral edema while allowing insulin to clear ketoacidosis.',
        whyCorrect: 'Dextrose maintains safe plasma osmolality while insulin continues to shut off ketone production.'
      },
      {
        stem: 'Following a total thyroidectomy, the nurse gently taps the client\'s facial nerve in front of the ear and observes twitching of the lip and facial muscles (positive Chvostek\'s sign). What complication does this indicate?',
        correct: 'Hypocalcemia resulting from accidental trauma or removal of the parathyroid glands.',
        distractors: [
          'Thyroid storm crisis.',
          'Hyperkalemia from tissue trauma.',
          'Recurrent laryngeal nerve paralysis.'
        ],
        coreRationale: 'The parathyroid glands regulate calcium; surgical manipulation can cause hypocalcemia, triggering neuromuscular hyper-excitability (tetany, Chvostek\'s and Trousseau\'s signs).',
        whyCorrect: 'Positive Chvostek\'s sign confirms hypocalcemia requiring IV calcium gluconate.'
      }
    ]
  },

  // NP 4: 25 items (301 - 325)
  np4_neuro: {
    subtopicId: 'np4_neuro',
    practiceId: 'np4',
    topic: 'Care of Clients with Neurologic Problems',
    learningObjective: 'Assess GCS, manage increased ICP, Cushing’s triad, and autonomic dysreflexia in spinal cord injury.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'Hickey, Clinical Practice of Neurological Nursing, 8th Ed.',
    items: [
      {
        stem: 'A client with a T4 spinal cord injury develops a sudden pounding headache, profuse sweating above the lesion, and blood pressure rises to 210/115 mmHg with a pulse of 52 bpm. What is the nurse\'s FIRST action?',
        correct: 'Elevate the head of the bed to a high-Fowler\'s position immediately.',
        distractors: [
          'Place the patient flat in Trendelenburg position.',
          'Administer immediate IV morphine.',
          'Perform rapid digital rectal evacuation without anesthesia.'
        ],
        coreRationale: 'Autonomic dysreflexia is an acute life-threatening emergency. Sitting the client upright causes orthostatic pooling in the lower extremities, instantly lowering dangerous intracranial blood pressure.',
        whyCorrect: 'Positioning precedes investigating triggers (e.g. distended bladder).'
      },
      {
        stem: 'Which clinical triad of vital signs represents Cushing\'s Triad, indicating late brainstem herniation from increased intracranial pressure (ICP)?',
        correct: 'Systolic hypertension with widening pulse pressure, bradycardia, and irregular respirations.',
        distractors: [
          'Hypotension, tachycardia, and tachypnea.',
          'Narrowing pulse pressure, tachycardia, and hypothermia.',
          'Diastolic hypertension, tachycardia, and rapid breathing.'
        ],
        coreRationale: 'Cushing\'s Triad (systolic hypertension with widening pulse pressure, bradycardia, irregular breathing) is a late sign of medullary compression.',
        whyCorrect: 'Widening pulse pressure and bradycardia differentiate Cushing\'s from hypovolemic shock.'
      }
    ]
  },

  // NP 4: 15 items (326 - 340)
  np4_periop: {
    subtopicId: 'np4_periop',
    practiceId: 'np4',
    topic: 'Perioperative Nursing',
    learningObjective: 'Ensure surgical consent compliance, surgical counts, and malignant hyperthermia intervention.',
    difficulty: 'Moderate',
    questionType: 'safety_ethics',
    reference: 'AORN Guidelines for Perioperative Practice',
    items: [
      {
        stem: 'During an exploratory laparotomy under general anesthesia, the patient develops sudden masseter muscle rigidity, end-tidal CO2 rapidly increases, and core body temperature spikes to 41.2°C (106°F). What is the drug of choice to administer immediately?',
        correct: 'Intravenous Dantrolene Sodium (Dantrium).',
        distractors: [
          'Intravenous Succinylcholine.',
          'Intravenous Atropine Sulfate.',
          'Intravenous Calcium Chloride.'
        ],
        coreRationale: 'Malignant hyperthermia is an inherited hypermetabolic skeletal muscle emergency triggered by volatile inhalational anesthetics and succinylcholine; Dantrolene relaxes muscles by halting calcium release from sarcoplasmic reticulum.',
        whyCorrect: 'Dantrolene is the specific, life-saving antidote.'
      },
      {
        stem: 'When witnessing a client\'s signature on a surgical informed consent form, what is the registered nurse legally certifying?',
        correct: 'That the client signed voluntarily, is mentally competent, and the signature is authentic.',
        distractors: [
          'That the nurse explained the surgical risks and benefits to the patient.',
          'That the surgeon is legally liable for all outcomes.',
          'That the patient cannot revoke consent during surgery.'
        ],
        coreRationale: 'Explaining surgical details and risks is the exclusive legal responsibility of the operating surgeon. The nurse acts strictly as an authenticating witness to the patient\'s signature and voluntariness.',
        whyCorrect: 'The nurse verifies authenticity and competency, not medical explanation.'
      }
    ]
  },

  // NP 4: 10 items (341 - 350)
  np4_immune: {
    subtopicId: 'np4_immune',
    practiceId: 'np4',
    topic: 'Inflammatory and Immunologic System Problems',
    learningObjective: 'Manage systemic anaphylaxis and autoimmune inflammatory disorders (SLE, Rheumatoid Arthritis).',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'World Allergy Organization Anaphylaxis Guidelines',
    items: [
      {
        stem: 'A client develops acute wheezing, facial angioedema, and hypotension (BP 78/40 mmHg) within 2 minutes of an IV antibiotic infusion. What is the FIRST drug that must be administered?',
        correct: 'Intramuscular Epinephrine (1:1,000) into the anterolateral mid-thigh (vastus lateralis).',
        distractors: [
          'Intravenous Diphenhydramine (Benadryl).',
          'Oral Prednisone 20 mg.',
          'Subcutaneous Heparin.'
        ],
        coreRationale: 'IM Epinephrine in the vastus lateralis is the first-line medication of choice for anaphylaxis because it provides rapid peak vascular absorption, reverses bronchospasm, and elevates vascular tone.',
        whyCorrect: 'Epinephrine is the only first-line life-saving drug; antihistamines are secondary adjuncts.'
      },
      {
        stem: 'A young female diagnosed with Systemic Lupus Erythematosus (SLE) is preparing for discharge. Which health teaching instruction is vital to prevent acute disease flare-ups?',
        correct: 'Avoid direct exposure to sunlight and ultraviolet rays by using sunscreen and protective clothing.',
        distractors: [
          'Consume a high-sodium, high-protein diet.',
          'Engage in vigorous high-impact running outdoors at midday.',
          'Receive live-attenuated viral vaccines annually.'
        ],
        coreRationale: 'Ultraviolet light triggers keratinocyte apoptosis and autoantigen release, precipitating severe systemic SLE flares and photosensitive butterfly rashes.',
        whyCorrect: 'Sun protection prevents immunologic exacerbations.'
      }
    ]
  },

  // NP 4: 25 items (351 - 375)
  np4_git: {
    subtopicId: 'np4_git',
    practiceId: 'np4',
    topic: 'Care of Clients with GIT & Hepatobiliary Problems',
    learningObjective: 'Manage peptic ulcer disease, acute pancreatitis, cirrhosis, and hepatic encephalopathy.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'AASLD Cirrhosis Guidelines; Sleisenger and Fordtran\'s Gastrointestinal Disease',
    items: [
      {
        stem: 'A patient with liver cirrhosis has elevated serum ammonia, disorientation, and flapping tremor of the wrists (asterixis). What medication is prescribed to reduce systemic ammonia absorption?',
        correct: 'Lactulose (Cephulac) orally or via enema.',
        distractors: [
          'Spironolactone (Aldactone).',
          'Furosemide (Lasix).',
          'Omeprazole (Prilosec).'
        ],
        coreRationale: 'Lactulose acidifies colonic contents, converting absorbable ammonia (NH3) into unabsorbable ammonium ions (NH4+) that are expelled through 2 to 3 soft stools daily.',
        whyCorrect: 'Lactulose promotes fecal excretion of ammonia, resolving encephalopathy.'
      },
      {
        stem: 'A client with acute pancreatitis presents with severe epigastric pain radiating to the back. Which serum enzyme elevation is the MOST specific laboratory test for acute pancreatitis?',
        correct: 'Serum Lipase level.',
        distractors: [
          'Serum Amylase level.',
          'Alkaline Phosphatase (ALP).',
          'Serum Creatinine.'
        ],
        coreRationale: 'While amylase rises early, serum lipase remains elevated longer and is synthesized almost exclusively by pancreatic acinar cells, providing superior diagnostic specificity.',
        whyCorrect: 'Serum lipase is more specific to pancreatic tissue injury.'
      }
    ]
  },

  // NP 4: 25 items (376 - 400)
  np4_fabs_gut: {
    subtopicId: 'np4_fabs_gut',
    practiceId: 'np4',
    topic: 'Care of Clients with FABS & GUT Problems',
    learningObjective: 'Calculate Parkland burn resuscitation, manage acute/chronic kidney disease, and monitor hemodialysis access.',
    difficulty: 'Difficult',
    questionType: 'calculation',
    reference: 'American Burn Association Guidelines; KDIGO Clinical Practice Guidelines for Kidney Disease',
    items: [
      {
        stem: 'A 60 kg adult sustained thermal burns to the anterior chest (9%), abdomen (9%), and the entire right arm (9%), totaling 27% TBSA. Using the Parkland Formula (4 mL × kg × % TBSA), what volume of Lactated Ringer\'s is required in the first 8 hours post-burn?',
        correct: '3,240 mL (half of the 24-hour total 6,480 mL).',
        distractors: [
          '6,480 mL.',
          '1,620 mL.',
          '4,800 mL.'
        ],
        coreRationale: 'Total 24-hr volume = 4 mL × 60 kg × 27% = 6,480 mL. Fifty percent (50%) of this total must be infused within the first 8 hours from time of injury (6,480 / 2 = 3,240 mL).',
        whyCorrect: '3,240 mL is the exact fluid volume for the first 8-hour resuscitation period.'
      },
      {
        stem: 'A client with chronic kidney disease on hemodialysis has a left forearm arteriovenous (AV) fistula. What is the essential nursing assessment to confirm vascular patency?',
        correct: 'Palpate for a vascular thrill and auscultate for a continuous bruit over the fistula site.',
        distractors: [
          'Take blood pressure on the left arm every 4 hours.',
          'Draw morning routine blood samples from the fistula vein.',
          'Apply an elastic compression tourniquet above the fistula.'
        ],
        coreRationale: 'Arteriovenous turbulence generates a palpable vibration (thrill) and an audible whooshing sound (bruit); their absence warns of access thrombosis.',
        whyCorrect: 'Checking thrill and bruit confirms uninhibited hemodialysis vascular flow.'
      }
    ]
  },

  // NP 5: 25 items (401 - 425)
  np5_senses: {
    subtopicId: 'np5_senses',
    practiceId: 'np5',
    topic: 'Special Senses (Eye & Ear Disorders)',
    learningObjective: 'Differentiate open-angle from closed-angle glaucoma, manage retinal detachment, and care for Meniere’s disease.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Vaughan & Asbury\'s General Ophthalmology; Ballenger\'s Otorhinolaryngology',
    items: [
      {
        stem: 'A client reports sudden onset of flashes of light (photopsia), floaters, and describes a dark "curtain or shadow falling over the field of vision" in the right eye. What ocular condition requires immediate surgical intervention?',
        correct: 'Retinal Detachment.',
        distractors: [
          'Open-angle Glaucoma.',
          'Senile Cataracts.',
          'Macular Degeneration.'
        ],
        coreRationale: 'The classic description of light flashes, shower of floaters, and a painless curtain or veil falling over the visual field characterizes acute retinal detachment.',
        whyCorrect: 'Immediate retinal reattachment surgery is required to prevent permanent blindness.'
      },
      {
        stem: 'A patient with Meniere’s disease experiences episodic vertigo, tinnitus, and sensorineural hearing loss. Which dietary modification helps prevent endolymphatic fluid accumulation in the inner ear?',
        correct: 'Adhering to a strict low-sodium (salt-restricted) diet.',
        distractors: [
          'Consuming high-caffeine beverages.',
          'Increasing dietary dairy products.',
          'High-protein, low-carbohydrate diet.'
        ],
        coreRationale: 'Sodium restriction reduces inner ear endolymphatic volume and pressure, decreasing frequency and severity of vertigo attacks.',
        whyCorrect: 'Limiting sodium reduces fluid retention in the labyrinth.'
      }
    ]
  },

  // NP 5: 20 items (426 - 445)
  np5_mh_ph: {
    subtopicId: 'np5_mh_ph',
    practiceId: 'np5',
    topic: 'Concepts of Mental Health in the Philippines',
    learningObjective: 'Apply the provisions of the Philippine Mental Health Act (Republic Act No. 11036) and understand cultural mental health concepts.',
    difficulty: 'Moderate',
    questionType: 'safety_ethics',
    reference: 'Republic Act No. 11036 (The Philippine Mental Health Act); DOH Mental Health Strategic Framework',
    items: [
      {
        stem: 'Under Republic Act No. 11036 (The Philippine Mental Health Act), what is a service user\'s fundamental right regarding psychiatric treatment and involuntary confinement?',
        correct: 'Right to receive treatment in the least restrictive environment and right to give informed consent, except in acute emergency situations with imminent risk of physical harm.',
        distractors: [
          'Immediate involuntary lifelong commitment at the sole discretion of immediate family members.',
          'Revocation of all legal rights and civil liberties upon psychiatric admission.',
          'Inability to access personal medical or psychiatric treatment records.'
        ],
        coreRationale: 'RA 11036 enshrines the human rights of mental health service users, guaranteeing least restrictive care and autonomy over treatment plans.',
        whyCorrect: 'Involuntary care is restricted by law only to clear emergencies involving imminent self-harm or harm to others.'
      },
      {
        stem: 'In Philippine cultural psychology (Sikolohiyang Pilipino), which core indigenous interpersonal value (kapwa) emphasizes shared identity, mutual empathy, and community interconnectedness in supporting psychiatric rehabilitation?',
        correct: 'Pakikipagkapwa (shared identity and recognition of the other as equal self).',
        distractors: [
          'Hiya (sense of propriety/shame).',
          'Ningas-kugon (procrastination).',
          'Bahala na (fatalism).'
        ],
        coreRationale: 'Kapwa and Pakikipagkapwa represent the core construct of Filipino psychology, fostering social belonging and community-based mental health support.',
        whyCorrect: 'Pakikipagkapwa provides the psychosocial scaffolding for community reintegration.'
      }
    ]
  },

  // NP 5: 55 items (446 - 500)
  np5_psych: {
    subtopicId: 'np5_psych',
    practiceId: 'np5',
    topic: 'Psychiatric and Mental Health Nursing',
    learningObjective: 'Utilize therapeutic communication, manage schizophrenia, bipolar mania, depression, and recognize neuroleptic malignant syndrome.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'Townsend, Psychiatric Mental Health Nursing, 9th Ed.; DSM-5-TR',
    items: [
      {
        stem: 'A client with paranoid schizophrenia tells the nurse, "The nurses in the hallway are whispering about poisoning my lunch." Which response demonstrates therapeutic communication?',
        correct: '"I understand you feel frightened, but the nurses are discussing patient shift assignments, not your food."',
        distractors: [
          '"That is ridiculous; no one is trying to poison you."',
          '"Why do you think the nurses would poison your food?"',
          '"Let us go confront the nurses right now so they stop talking about you."'
        ],
        coreRationale: 'The nurse validates the client\'s emotion (fright/anxiety) while calmly presenting objective reality without arguing or validating the delusion.',
        whyCorrect: 'Presenting reality gently maintains trust without reinforcing paranoid ideation.'
      },
      {
        stem: 'A patient receiving intramuscular haloperidol develops lead-pipe muscle rigidity, hyperthermia (temp 40.4°C / 104.7°F), diaphoresis, and fluctuating blood pressure. What medical emergency is occurring?',
        correct: 'Neuroleptic Malignant Syndrome (NMS).',
        distractors: [
          'Acute Dystonic Reaction.',
          'Tardive Dyskinesia.',
          'Akathisia.'
        ],
        coreRationale: 'NMS is a life-threatening idiosyncratic reaction to dopamine antagonists characterized by extreme fever, severe rigidity, and autonomic instability.',
        whyCorrect: 'Severe hyperthermia and generalized lead-pipe rigidity confirm NMS.'
      },
      {
        stem: 'A client taking Lithium Carbonate for Bipolar Disorder has a morning serum lithium level of 2.1 mEq/L and displays coarse tremors, ataxia, and persistent vomiting. What is the nurse\'s priority action?',
        correct: 'Withhold the next dose of lithium immediately and notify the healthcare provider.',
        distractors: [
          'Administer the scheduled dose with orange juice.',
          'Instruct the patient to restrict dietary sodium.',
          'Encourage vigorous physical exercise.'
        ],
        coreRationale: 'Therapeutic lithium range is 0.6-1.2 mEq/L. Levels > 1.5 mEq/L cause severe neurotoxicity; at 2.1 mEq/L the medication must be held immediately.',
        whyCorrect: 'Withholding lithium prevents permanent cerebellar damage and renal shutdown.'
      }
    ]
  }
};

/**
 * Shuffles options for realistic retake variants while precisely tracking the correct key
 */
function shuffleOptions(
  options: { A: string; B: string; C: string; D: string },
  correctText: string,
  seed: number
) {
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const perm = [...letters];
  for (let i = perm.length - 1; i > 0; i--) {
    const j = Math.floor(((seed * 9301 + 49297) % 233280) / 233280 * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }

  const newOptions = {
    A: options[perm[0]],
    B: options[perm[1]],
    C: options[perm[2]],
    D: options[perm[3]],
  };

  let newCorrect: 'A' | 'B' | 'C' | 'D' = 'A';
  for (const k of letters) {
    if (newOptions[k] === correctText) {
      newCorrect = k;
      break;
    }
  }

  return { options: newOptions, correctOption: newCorrect };
}

/**
 * Generates an examination based on the PHINMA Education Nursing Seminar 1 Table of Specifications.
 * Mode:
 *  - 'full_500': Exactly 500 questions (NP 1 to NP 5 in exact sequence)
 *  - 'np1' | 'np2' | 'np3' | 'np4' | 'np5': Exactly 100 questions for that specific booklet
 */
export function generateTosExam(
  mode: 'full_500' | 'np1' | 'np2' | 'np3' | 'np4' | 'np5' = 'full_500',
  attemptNumber: number = 1,
  seedModifier: number = 0
): Question[] {
  const targetPractices: NursingPracticeId[] =
    mode === 'full_500'
      ? ['np1', 'np2', 'np3', 'np4', 'np5']
      : [mode];

  const questions: Question[] = [];
  let globalItemNumber = 1;

  for (const practiceId of targetPractices) {
    const practiceInfo = NURSING_PRACTICES[practiceId];
    let npItemNumber = 1;

    for (const subtopicId of practiceInfo.subtopics) {
      const subInfo = SUBTOPIC_SPECIFICATIONS[subtopicId];
      const bank = SUBTOPIC_BANKS[subtopicId];
      const targetCount = subInfo.itemCount;

      let generatedForSubtopic = 0;
      let itemIdx = 0;

      while (generatedForSubtopic < targetCount) {
        const template = bank.items[itemIdx % bank.items.length];
        const rawOptions = [
          template.correct,
          template.distractors[0],
          template.distractors[1],
          template.distractors[2],
        ];

        // Unique seed for each question
        const seed = attemptNumber * 1000 + globalItemNumber + seedModifier;

        // Shuffle options
        const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
        const correctPos = (itemIdx + attemptNumber + seedModifier) % 4;
        [rawOptions[0], rawOptions[correctPos]] = [rawOptions[correctPos], rawOptions[0]];

        const baseOptions = {
          A: rawOptions[0],
          B: rawOptions[1],
          C: rawOptions[2],
          D: rawOptions[3],
        };

        const { options: shuffledOpts, correctOption } = shuffleOptions(
          baseOptions,
          template.correct,
          seed
        );

        const question: Question = {
          id: `${practiceId.toUpperCase()}-${subtopicId}-${generatedForSubtopic + 1}-A${attemptNumber}`,
          itemNumber: globalItemNumber,
          npItemNumber: npItemNumber,
          practiceId: practiceId,
          subtopicId: subtopicId,
          topic: subInfo.name,
          learningObjective: bank.learningObjective,
          difficulty: bank.difficulty,
          questionType: bank.questionType,
          questionText: template.stem,
          options: shuffledOpts,
          correctOption,
          rationale: {
            core: template.coreRationale,
            whyCorrect: template.whyCorrect,
            distractors: {
              [optionKeys[(correctPos + 1) % 4]]: 'This distractor represents a secondary, non-prioritized, or contraindicated clinical intervention.',
              [optionKeys[(correctPos + 2) % 4]]: 'This option is physiologically less appropriate for this specific clinical presentation.',
              [optionKeys[(correctPos + 3) % 4]]: 'This distractor does not satisfy the primary therapeutic standard of care.'
            }
          },
          reference: bank.reference,
          variantGroupId: `${subtopicId}-group`,
          variantNumber: (itemIdx % bank.items.length) + 1,
        };

        questions.push(question);
        globalItemNumber++;
        npItemNumber++;
        generatedForSubtopic++;
        itemIdx++;
      }
    }
  }

  return questions;
}

/**
 * Calculates score breakdowns overall, by Nursing Practice (NP 1 to 5), and by all 18 Subtopics!
 */
export function calculateTosExamScore(
  questions: Question[],
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | null>,
  timeSpentSeconds: number,
  benchmarkPercentage: number = 75
): ExamScore {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  // Initialize practice scores
  const practiceMap: Record<NursingPracticeId, {
    total: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    subtopics: Record<SubtopicId, {
      total: number;
      correct: number;
      incorrect: number;
      unanswered: number;
    }>;
  }> = {
    np1: { total: 0, correct: 0, incorrect: 0, unanswered: 0, subtopics: {} as any },
    np2: { total: 0, correct: 0, incorrect: 0, unanswered: 0, subtopics: {} as any },
    np3: { total: 0, correct: 0, incorrect: 0, unanswered: 0, subtopics: {} as any },
    np4: { total: 0, correct: 0, incorrect: 0, unanswered: 0, subtopics: {} as any },
    np5: { total: 0, correct: 0, incorrect: 0, unanswered: 0, subtopics: {} as any },
  };

  questions.forEach((q, idx) => {
    const chosen = userAnswers[idx];
    const p = practiceMap[q.practiceId];
    if (p) {
      p.total++;
      if (!p.subtopics[q.subtopicId]) {
        p.subtopics[q.subtopicId] = { total: 0, correct: 0, incorrect: 0, unanswered: 0 };
      }
      p.subtopics[q.subtopicId].total++;

      if (!chosen) {
        unansweredCount++;
        p.unanswered++;
        p.subtopics[q.subtopicId].unanswered++;
      } else if (chosen === q.correctOption) {
        correctCount++;
        p.correct++;
        p.subtopics[q.subtopicId].correct++;
      } else {
        incorrectCount++;
        p.incorrect++;
        p.subtopics[q.subtopicId].incorrect++;
      }
    }
  });

  const totalQuestions = questions.length;
  const rawScore = correctCount;
  const percentage = Number(((correctCount / totalQuestions) * 100).toFixed(2));
  const passedBenchmark = percentage >= benchmarkPercentage;

  const practiceScores: Record<NursingPracticeId, NursingPracticeScoreBreakdown> = {} as any;

  for (const pId of Object.keys(practiceMap) as NursingPracticeId[]) {
    const item = practiceMap[pId];
    const pInfo = NURSING_PRACTICES[pId];
    const pPct = item.total > 0 ? Number(((item.correct / item.total) * 100).toFixed(1)) : 0;

    const subtopicScores: Record<SubtopicId, SubtopicScoreBreakdown> = {} as any;

    for (const subId of Object.keys(item.subtopics) as SubtopicId[]) {
      const subItem = item.subtopics[subId];
      const subInfo = SUBTOPIC_SPECIFICATIONS[subId];
      const sPct = subItem.total > 0 ? Number(((subItem.correct / subItem.total) * 100).toFixed(1)) : 0;

      subtopicScores[subId] = {
        subtopicId: subId,
        subtopicName: subInfo ? subInfo.name : subId,
        practiceId: pId,
        totalQuestions: subItem.total,
        correctAnswers: subItem.correct,
        incorrectAnswers: subItem.incorrect,
        unansweredCount: subItem.unanswered,
        percentage: sPct,
        benchmarkPassed: sPct >= benchmarkPercentage,
      };
    }

    practiceScores[pId] = {
      practiceId: pId,
      practiceTitle: pInfo.title,
      totalQuestions: item.total,
      correctAnswers: item.correct,
      incorrectAnswers: item.incorrect,
      unansweredCount: item.unanswered,
      percentage: pPct,
      benchmarkPassed: pPct >= benchmarkPercentage,
      subtopicScores,
    };
  }

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    rawScore,
    percentage,
    benchmarkPercentage,
    passedBenchmark,
    timeSpentSeconds,
    practiceScores,
  };
}
