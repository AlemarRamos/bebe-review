import { ConceptDefinition } from '../questionTypes';

export const INTEGRATED_CLINICAL_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'icj-prioritization-abc-unstable',
    subjectId: 'integrated_clinical',
    topic: 'Prioritization & Clinical Judgment',
    learningObjective: 'Prioritize nursing care for multiple clients based on Airway, Breathing, Circulation, and acute instability.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'Silvestri & Silvestri, Saunders Comprehensive Review for the NCLEX-RN Examination, 9th Ed.',
    variants: [
      {
        questionText: 'After receiving morning shift handoff report on a busy medical-surgical unit, which of the following four clients should the registered nurse assess FIRST?',
        options: {
          A: 'A client with asthma who has audible inspiratory and expiratory wheezes throughout both lung fields.',
          B: 'A client with a history of heart failure who has 2+ pitting bilateral ankle edema and a weight gain of 1 pound in 2 days.',
          C: 'A client with a severe asthma exacerbation who suddenly becomes silent with no audible breath sounds on auscultation.',
          D: 'A client with chronic kidney disease whose morning serum creatinine is 3.8 mg/dL.'
        },
        correctOption: 'C',
        rationale: {
          core: 'A "silent chest" in a client experiencing acute severe asthma signifies complete airway obstruction, impending respiratory arrest, and total exhaustion.',
          whyCorrect: 'Wheezing requires airflow; when wheezing abruptly ceases and breath sounds disappear ("silent chest"), air movement is negligible. This is an immediate life-threatening airway/breathing emergency requiring immediate intubation.',
          distractors: {
            A: 'Wheezing confirms air movement; while urgent, it is less immediately critical than complete absence of breath sounds.',
            B: 'Mild dependent edema and 1-lb weight gain are chronic, expected signs of heart failure.',
            D: 'Creatinine 3.8 is an expected chronic finding in CKD, not an acute life-threat.'
          }
        }
      },
      {
        questionText: 'Which client situation represents the HIGHEST priority for immediate nursing intervention based on clinical instability?',
        options: {
          A: 'A post-thyroidectomy client who develops progressive stridor, laryngeal tightness, and restless anxiety.',
          B: 'A client with Type 2 diabetes whose pre-meal capillary blood glucose is 210 mg/dL.',
          C: 'A client with acute pancreatitis who reports epigastric pain rated 8 out of 10.',
          D: 'A client with pneumonia whose pulse oximetry is 94% on 2 L/min nasal cannula.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Post-thyroidectomy stridor indicates tracheal compression by a neck hematoma or acute laryngeal nerve spasm, threatening complete airway occlusion within minutes.',
          whyCorrect: 'Airway takes immediate precedence over all other physiological needs. Tracheostomy tray must be at bedside; emergency surgical decompression may be necessary.',
          distractors: {
            B: 'Hyperglycemia of 210 mg/dL requires insulin coverage, but is not immediately fatal.',
            C: 'Severe pain is expected in pancreatitis; analgesia is needed, but airway compromise takes precedence.',
            D: 'SpO2 94% on 2 L O2 is adequate oxygenation.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'icj-disaster-triage-start',
    subjectId: 'integrated_clinical',
    topic: 'Disaster Nursing & Mass Casualty Triage (START Protocol)',
    learningObjective: 'Assign correct color-coded triage tags in mass casualty incidents using the Simple Triage and Rapid Treatment (START) algorithm.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'START (Simple Triage and Rapid Treatment) Disaster Triage Algorithm; NDLS Foundation',
    variants: [
      {
        questionText: 'During a mass casualty earthquake incident, the triage nurse assesses a victim who has an open pneumothorax (sucking chest wound), tachypnea of 38 breaths per minute, weak radial pulse, and capillary refill of 4 seconds. Under the START triage protocol, which color tag should be assigned?',
        options: {
          A: 'RED (Immediate / Priority 1)',
          B: 'YELLOW (Delayed / Priority 2)',
          C: 'GREEN (Minor / Walking Wounded / Priority 3)',
          D: 'BLACK (Deceased / Expectant / Priority 4)'
        },
        correctOption: 'A',
        rationale: {
          core: 'RED (Immediate) tags are designated for victims with life-threatening airway, breathing, or circulatory compromise who have a high probability of survival if treated immediately.',
          whyCorrect: 'Respirations > 30/min and cap refill > 2 seconds with an open chest wound define immediate physiological instability that can be salvaged with prompt needle decompression / three-sided occlusive dressing.',
          distractors: {
            B: 'Yellow tags are for serious injuries who can wait 1-2 hours without immediate threat to life (e.g., closed femur fracture).',
            C: 'Green is for ambulatory, minor injuries.',
            D: 'Black is for dead victims or those with injuries incompatible with life under disaster resource constraints.'
          }
        }
      },
      {
        questionText: 'In a multi-vehicle highway collision, a victim is found unconscious, apneic, with catastrophic open skull trauma and exposed brain tissue. After repositioning the airway once, the patient remains apneic. Which color triage tag must the nurse apply?',
        options: {
          A: 'RED (Immediate)',
          B: 'YELLOW (Delayed)',
          C: 'GREEN (Minimal)',
          D: 'BLACK (Expectant / Deceased)'
        },
        correctOption: 'D',
        rationale: {
          core: 'Under START mass casualty rules: if an adult patient is apneic, open the airway once. If the patient does not begin spontaneous breathing, tag BLACK (Expectant/Deceased).',
          whyCorrect: 'In disaster mass casualty situations where resources are severely overwhelmed, individuals who do not breathe after a single airway repositioning are classified as Expectant/Deceased to direct limited resources to salvageable victims.',
          distractors: {
            A: 'Red tags are reserved for salvageable patients with breathing.',
            B: 'Delayed requires spontaneous ventilation and pulse.',
            C: 'Green is for walking wounded.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'icj-sepsis-one-hour-bundle',
    subjectId: 'integrated_clinical',
    topic: 'Critical Care - Surviving Sepsis Campaign Guidelines',
    learningObjective: 'Implement the sequential clinical components of the Surviving Sepsis Campaign Hour-1 Bundle.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock',
    variants: [
      {
        questionText: 'An elderly client with suspected urosepsis presents with temperature 39.4°C, HR 122 bpm, RR 26 bpm, and BP 82/48 mmHg (MAP 59 mmHg). Blood cultures and broad-spectrum IV antibiotics are prescribed. What is the mandatory rule regarding the sequence of blood cultures and antibiotic administration in sepsis?',
        options: {
          A: 'Blood cultures must be obtained BEFORE administering antibiotics, without causing substantial delay (>45 minutes).',
          B: 'Antibiotics must always be infused completely before drawing blood cultures to prevent lab contamination.',
          C: 'Blood cultures should only be drawn if the patient remains febrile 24 hours after antibiotics.',
          D: 'Antibiotics and blood cultures can be drawn simultaneously through the same IV cannula.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Blood cultures must be collected prior to antimicrobial therapy to prevent sterilization of the bloodstream, which would impair pathogen identification and targeted susceptibility testing.',
          whyCorrect: 'Administering antibiotics even minutes before culture draw drastically reduces culture yield. Two sets of blood cultures (aerobic and anaerobic) must be drawn swiftly, followed immediately by broad-spectrum empiric antibiotics within the 1st hour.',
          distractors: {
            B: 'Administering antibiotics first sterilizes cultures and renders micro-organism identification impossible.',
            C: 'Waiting 24 hours leads to septic shock and multi-organ failure.',
            D: 'Cultures drawn through infusing antibiotic lines are completely invalid.'
          }
        }
      },
      {
        questionText: 'In septic shock with persistent hypotension refractory to initial 30 mL/kg IV crystalloid fluid resuscitation, which vasopressor is the FIRST-LINE agent of choice to restore Mean Arterial Pressure (MAP) to >= 65 mmHg?',
        options: {
          A: 'Norepinephrine (Levophed)',
          B: 'Epinephrine',
          C: 'Dopamine',
          D: 'Phenylephrine'
        },
        correctOption: 'A',
        rationale: {
          core: 'Norepinephrine is the first-line vasopressor of choice in septic shock due to its potent alpha-1 vasoconstriction with modest beta-1 chronotropic/inotropic effects.',
          whyCorrect: 'Surviving Sepsis Campaign guidelines recommend Norepinephrine as the initial vasopressor because it significantly improves vascular tone and organ perfusion with lower arrhythmogenic risk than Dopamine.',
          distractors: {
            B: 'Epinephrine is second-line when additional agent is needed.',
            C: 'Dopamine causes excessive tachyarrhythmias and has higher mortality in septic shock.',
            D: 'Phenylephrine pure alpha-1 can reflexively reduce stroke volume and cardiac output.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'icj-electrolyte-hyperkalemia-cardiac',
    subjectId: 'integrated_clinical',
    topic: 'Fluid, Electrolyte & Emergency Management - Severe Hyperkalemia',
    learningObjective: 'Identify ECG changes associated with hyperkalemia and prioritize emergency pharmacological interventions.',
    difficulty: 'Difficult',
    questionType: 'lab_interpretation',
    reference: 'American Heart Association (AHA) Advanced Cardiovascular Life Support (ACLS) Guidelines',
    variants: [
      {
        questionText: 'A hemodialysis client missed two consecutive dialysis sessions and presents with extreme muscle weakness. The serum potassium level is 7.2 mEq/L. The cardiac monitor reveals tall, peaked T waves, prolonged PR intervals, and widening of the QRS complex. What is the FIRST medication the nurse must prepare to administer to protect the heart?',
        options: {
          A: 'Intravenous Calcium Gluconate 10%',
          B: 'Regular Insulin 10 units with 50% Dextrose (D50W)',
          C: 'Oral Sodium Polystyrene Sulfonate (Kayexalate) 30 grams',
          D: 'Intravenous Furosemide (Lasix) 80 mg'
        },
        correctOption: 'A',
        rationale: {
          core: 'Calcium Gluconate directly stabilizes the myocardial cell membrane against potassium-induced arrhythmias (ventricular fibrillation/asystole), acting within 1 to 3 minutes.',
          whyCorrect: 'While Calcium Gluconate does not lower serum potassium, it immediately raises the cardiac action potential threshold, preventing fatal arrest while other agents (insulin+glucose) shift potassium intracellularly.',
          distractors: {
            B: 'Insulin + D50 drives potassium into cells, but takes 15-30 minutes; Calcium Gluconate acts immediately on the myocardium.',
            C: 'Kayexalate takes hours to bind potassium in the colon and is not for acute emergency cardioprotection.',
            D: 'Furosemide is ineffective in end-stage renal disease and takes time.'
          }
        }
      },
      {
        questionText: 'When administering 10 units of Regular Insulin IV push to rapidly shift potassium into cells in severe hyperkalemia, why is 50 mL of 50% Dextrose (D50W) co-administered simultaneously?',
        options: {
          A: 'To prevent acute hypoglycemia induced by the large dose of intravenous insulin.',
          B: 'Because dextrose directly binds potassium ions in the vascular space.',
          C: 'To stimulate endogenous glucagon release from alpha cells.',
          D: 'To increase renal glomerular filtration of potassium.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Regular insulin facilitates glucose and potassium entry into skeletal muscle and liver cells via Na+/K+ ATPase stimulation. Co-administering hypertonic dextrose prevents severe, life-threatening hypoglycemia.',
          whyCorrect: 'Without concurrent dextrose administration, 10 units of IV regular insulin would induce profound neuroglycopenia and coma within minutes.',
          distractors: {
            B: 'Dextrose does not bind potassium ions.',
            C: 'Glucagon stimulation is not the therapeutic mechanism.',
            D: 'Dextrose does not enhance renal potassium clearance.'
          }
        }
      }
    ]
  }
];
