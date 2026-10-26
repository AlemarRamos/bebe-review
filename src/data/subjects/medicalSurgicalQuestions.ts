import { ConceptDefinition } from '../questionTypes';

export const MEDICAL_SURGICAL_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'msn-myocardial-infarction-mona',
    subjectId: 'medical_surgical',
    topic: 'Cardiovascular Nursing - Acute Coronary Syndrome',
    learningObjective: 'Implement immediate pharmacological and diagnostic interventions for acute myocardial infarction.',
    difficulty: 'Moderate',
    questionType: 'prioritization',
    reference: 'AHA/ACC Guidelines for the Management of Patients With Acute Coronary Syndromes',
    variants: [
      {
        questionText: 'A 58-year-old male arrives in the emergency department with crushing substernal chest pain radiating to his left jaw and diaphoresis. An ECG reveals ST-segment elevation in leads II, III, and aVF. Which diagnostic laboratory marker is the MOST sensitive and specific indicator of acute myocardial necrosis?',
        options: {
          A: 'Creatine Kinase-MB (CK-MB)',
          B: 'Cardiac Troponin I (cTnI)',
          C: 'Myoglobin',
          D: 'Lactate Dehydrogenase (LDH)'
        },
        correctOption: 'B',
        rationale: {
          core: 'Cardiac Troponin I and T are the gold standard biomarkers for myocardial necrosis due to their absolute cardiac specificity and prolonged diagnostic elevation (up to 10-14 days).',
          whyCorrect: 'Cardiac troponin is not present in non-cardiac muscle. Any detectable elevation in the clinical context of ischemia confirms acute myocardial infarction.',
          distractors: {
            A: 'CK-MB is also found in small amounts in skeletal muscle and returns to baseline in 48-72 hours.',
            C: 'Myoglobin rises very early (2 hours) but lacks cardiac specificity.',
            D: 'LDH is obsolete and non-specific.'
          }
        }
      },
      {
        questionText: 'A patient experiencing acute chest pain is prescribed sublingual nitroglycerin (SL NTG) 0.4 mg every 5 minutes up to 3 doses. Which assessment finding is an absolute contraindication to administering the next dose?',
        options: {
          A: 'Systolic blood pressure of 84 mmHg and patient taking sildenafil (Viagra) 12 hours ago.',
          B: 'Patient reporting a mild, throbbing headache.',
          C: 'Heart rate of 88 beats per minute.',
          D: 'Respiratory rate of 20 breaths per minute.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Nitroglycerin is contraindicated with systolic BP < 90 mmHg or recent use of PDE-5 inhibitors (e.g., sildenafil within 24h, tadalafil within 48h) due to risk of fatal refractory hypotension.',
          whyCorrect: 'Concurrent PDE-5 inhibitors and nitrates cause profound, synergistic smooth muscle vasodilation, resulting in life-threatening shock and coronary hypoperfusion.',
          distractors: {
            B: 'Headache is a common, expected side effect of cerebral vasodilation, treated with acetaminophen.',
            C: 'Heart rate 88 bpm is within normal limits.',
            D: 'RR 20 is normal.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'msn-digoxin-toxicity-hypokalemia',
    subjectId: 'medical_surgical',
    topic: 'Cardiovascular Nursing - Heart Failure & Digoxin Safety',
    learningObjective: 'Recognize early signs of digoxin toxicity and identify predisposing electrolyte abnormalities.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'Brunner & Suddarth\'s Textbook of Medical-Surgical Nursing, 15th Ed., Ch. 27',
    variants: [
      {
        questionText: 'A heart failure patient taking Digoxin 0.25 mg daily and Furosemide (Lasix) 40 mg daily reports nausea, anorexia, and seeing yellowish-green halos around room lights. The ECG shows frequent premature ventricular contractions (PVCs). Which serum laboratory value is most likely predisposing this patient to Digoxin toxicity?',
        options: {
          A: 'Serum Potassium level of 2.9 mEq/L (Hypokalemia)',
          B: 'Serum Sodium level of 138 mEq/L',
          C: 'Serum Calcium level of 9.0 mg/dL',
          D: 'Serum Magnesium level of 2.1 mg/dL'
        },
        correctOption: 'A',
        rationale: {
          core: 'Hypokalemia significantly potentiates digoxin toxicity because potassium and digoxin compete for the same binding sites on the myocardial Na+/K+ ATPase pump.',
          whyCorrect: 'When serum potassium is low (normal 3.5-5.0 mEq/L), more digoxin binds to the ATPase enzyme, dramatically magnifying its effects and triggering toxicity even at normal blood digoxin levels.',
          distractors: {
            B: 'Sodium 138 is within normal limits (135-145 mEq/L).',
            C: 'Calcium 9.0 is within normal limits (8.5-10.5 mg/dL).',
            D: 'Magnesium 2.1 is within normal limits (1.5-2.5 mg/dL).'
          }
        }
      },
      {
        questionText: 'Before administering the morning dose of Digoxin 0.125 mg orally to an adult client, what baseline assessment must the nurse perform?',
        options: {
          A: 'Auscultate the apical pulse for 1 full minute; withhold the drug if the rate is below 60 beats per minute.',
          B: 'Check the radial pulse for 15 seconds and multiply by 4.',
          C: 'Check the patient\'s blood glucose level.',
          D: 'Measure intake and output over the past 24 hours.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Digoxin exerts a negative chronotropic effect (slows heart rate). The apical pulse must be auscultated for a full 60 seconds prior to each dose.',
          whyCorrect: 'If the apical heart rate is < 60 bpm in an adult (or < 70 in a child, < 90 in an infant), the nurse must withhold the dose, document, and immediately notify the prescriber.',
          distractors: {
            B: 'Palpating radial pulse for 15 seconds is inaccurate due to potential pulse deficits in cardiac patients.',
            C: 'Digoxin does not directly affect glucose.',
            D: 'Fluid balance is monitored in heart failure, but heart rate is the immediate safety gate for administration.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'msn-abg-interpretation',
    subjectId: 'medical_surgical',
    topic: 'Respiratory Nursing - Arterial Blood Gas (ABG) Analysis',
    learningObjective: 'Interpret arterial blood gas values and identify acid-base disorders and compensation status.',
    difficulty: 'Difficult',
    questionType: 'lab_interpretation',
    reference: 'Urden, Stacy, Lough, Critical Care Nursing: Diagnosis and Management, 9th Ed.',
    variants: [
      {
        questionText: 'An arterial blood gas (ABG) sample drawn on an unconscious diabetic patient reveals: pH 7.26, PaCO2 30 mmHg, and HCO3 14 mEq/L. How should the nurse interpret these laboratory values?',
        options: {
          A: 'Partially compensated metabolic acidosis',
          B: 'Uncompensated respiratory acidosis',
          C: 'Fully compensated metabolic alkalosis',
          D: 'Uncompensated metabolic acidosis'
        },
        correctOption: 'A',
        rationale: {
          core: 'ROME rule: pH 7.26 (acidic, <7.35), HCO3 14 (acidic, <22 = metabolic cause), PaCO2 30 (alkalotic, <35 = respiratory compensation blowing off CO2). Since pH is still outside normal limits, it is partially compensated.',
          whyCorrect: 'The primary disorder is metabolic acidosis (DKA with low bicarbonate). The respiratory system attempts to compensate via hyperventilation (Kussmaul breathing) lowering PaCO2 to 30. Because pH has not returned to 7.35-7.45, it is partially compensated.',
          distractors: {
            B: 'Respiratory acidosis would feature PaCO2 > 45 mmHg.',
            C: 'Alkalosis requires pH > 7.45.',
            D: 'Uncompensated means PaCO2 would remain in the normal range (35-45 mmHg).'
          }
        }
      },
      {
        questionText: 'A patient with severe chronic obstructive pulmonary disease (COPD) has the following ABG results on room air: pH 7.36, PaCO2 56 mmHg, HCO3 32 mEq/L, and PaO2 62 mmHg. What is the acid-base diagnosis?',
        options: {
          A: 'Fully compensated respiratory acidosis with mild hypoxemia',
          B: 'Partially compensated metabolic alkalosis',
          C: 'Uncompensated respiratory acidosis',
          D: 'Normal arterial blood gas'
        },
        correctOption: 'A',
        rationale: {
          core: 'pH 7.36 is within normal range (7.35-7.45) but on the acidotic side. PaCO2 is 56 (elevated = chronic CO2 retention). Kidneys have retained HCO3 to 32 (elevated), fully normalizing the pH.',
          whyCorrect: 'In long-standing COPD, renal retention of bicarbonate fully compensates for chronic alveolar hypoventilation, maintaining pH in the normal range.',
          distractors: {
            B: 'Primary driver is respiratory retention in COPD.',
            C: 'Uncompensated would show an acidic pH < 7.35.',
            D: 'Elevated PaCO2 and HCO3 indicate chronic disease, not normal physiology.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'msn-chest-tube-drainage-system',
    subjectId: 'medical_surgical',
    topic: 'Respiratory Nursing - Chest Tube Drainage Systems',
    learningObjective: 'Monitor three-chamber water-seal drainage systems and troubleshoot complications including air leaks and accidental disconnection.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Ignatavicius, Workman, Rebar, Medical-Surgical Nursing, 10th Ed., Ch. 30',
    variants: [
      {
        questionText: 'A nurse assesses an adult patient with a chest tube connected to a disposable three-chamber drainage system for a resolved hemothorax. The nurse observes CONTINUOUS, vigorous bubbling in the water-seal chamber. What does this observation indicate?',
        options: {
          A: 'The system is functioning normally and air is evacuating as expected.',
          B: 'There is an air leak in the drainage system or chest tube insertion site.',
          C: 'The suction control chamber requires more sterile water.',
          D: 'The patient\'s lung has completely re-expanded.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Continuous bubbling in the water-seal chamber indicates a persistent air leak in the system or around the insertion site.',
          whyCorrect: 'Normal water seal operation shows intermittent tidaling (fluctuation with breathing) or intermittent bubbling only during coughing/exhalation. Continuous bubbling signifies an air breach that must be localized and sealed.',
          distractors: {
            A: 'Intermittent bubbling is expected; continuous bubbling indicates a leak.',
            C: 'Suction control chamber bubbling is separate from the water seal chamber.',
            D: 'Re-expansion leads to cessation of tidaling and bubbling, not continuous bubbling.'
          }
        }
      },
      {
        questionText: 'A patient with a chest tube accidentally trips while getting out of bed, completely disconnecting the chest tube from the drainage collection unit. What is the nurse\'s IMMEDIATE priority action?',
        options: {
          A: 'Clamp the chest tube immediately with two padded hemostats close to the chest wall.',
          B: 'Submerge the distal end of the chest tube 1 to 2 inches into a bottle of sterile saline or water.',
          C: 'Cover the insertion site with an occlusive petroleum gauze taped securely on all 4 sides.',
          D: 'Reconnect the contaminated tubing immediately and flush with sterile water.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Submerging the disconnected chest tube in sterile saline creates a temporary underwater seal, preventing atmospheric air from rushing into the pleural space and causing a tension pneumothorax.',
          whyCorrect: 'Immersing the open tube end into sterile water restores the water seal mechanism and maintains negative intrathoracic dynamics until a new sterile drainage unit is attached.',
          distractors: {
            A: 'Clamping an open chest tube risks rapid tension pneumothorax if an air leak is present.',
            C: 'Occlusive dressing on 4 sides is for accidental tube pull-out from the chest wall, not disconnection from the unit.',
            D: 'Reconnecting dirty tubing introduces pathogens directly into the pleural space.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'msn-increased-icp-cushings-triad',
    subjectId: 'medical_surgical',
    topic: 'Neurological Nursing - Increased Intracranial Pressure (ICP)',
    learningObjective: 'Recognize early signs versus late signs (Cushing\'s Triad) of increased intracranial pressure and implement interventions.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'Hickey, The Clinical Practice of Neurological and Neurosurgical Nursing, 8th Ed.',
    variants: [
      {
        questionText: 'A patient admitted following a traumatic brain injury has an intracranial pressure (ICP) monitor in place. What is the EARLIEST and most sensitive clinical indicator of increasing intracranial pressure?',
        options: {
          A: 'Ipsilateral pupillary dilation and unresponsiveness to light',
          B: 'Alteration in the level of consciousness (restlessness, confusion, lethargy)',
          C: 'Cushing\'s Triad (systolic hypertension, bradycardia, irregular respirations)',
          D: 'Decerebrate posturing with extensor rigidity'
        },
        correctOption: 'B',
        rationale: {
          core: 'The cerebral cortex is extremely sensitive to cellular hypoxia and decreased cerebral perfusion pressure; subtle changes in level of consciousness are the earliest warning signs.',
          whyCorrect: 'Restlessness, irritability, disorientation, and drowsiness precede motor deficits, pupillary changes, or vital sign abnormalities by hours.',
          distractors: {
            A: 'Pupillary dilation is a sign of impending uncal herniation.',
            C: 'Cushing\'s triad is a very LATE, ominous sign of brainstem compression.',
            D: 'Decerebrate posturing indicates severe midbrain and brainstem damage.'
          }
        }
      },
      {
        questionText: 'Which triad of vital sign changes characterizes Cushing\'s Triad, signaling life-threatening brainstem herniation from decompensated intracranial hypertension?',
        options: {
          A: 'Hypotension, tachycardia, and tachypnea',
          B: 'Systolic hypertension with widening pulse pressure, bradycardia, and irregular/bradypneic respirations',
          C: 'Narrowing pulse pressure, tachycardia, and hyperthermia',
          D: 'Diastolic hypertension, tachycardia, and Cheyne-Stokes breathing'
        },
        correctOption: 'B',
        rationale: {
          core: 'Cushing\'s Triad consists of: 1) Progressive systolic hypertension with widening pulse pressure; 2) Bradycardia; 3) Irregular respirations (e.g. Cheyne-Stokes).',
          whyCorrect: 'Brainstem ischemia activates massive sympathetic output raising systolic BP; baroreceptors trigger reflex parasympathetic vagal bradycardia, and medullary respiratory centers fail.',
          distractors: {
            A: 'Hypotension and tachycardia characterize hypovolemic or septic shock.',
            C: 'Narrowing pulse pressure occurs in cardiac tamponade.',
            D: 'Diastolic hypertension does not produce the hallmark widening pulse pressure.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'msn-spinal-cord-autonomic-dysreflexia',
    subjectId: 'medical_surgical',
    topic: 'Neurological Nursing - Autonomic Dysreflexia',
    learningObjective: 'Manage autonomic dysreflexia in patients with high spinal cord injury (T6 and above).',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'Paralyzed Veterans of America (PVA) Clinical Practice Guidelines for Autonomic Dysreflexia',
    variants: [
      {
        questionText: 'A client with a T4 spinal cord injury suddenly reports a severe, throbbing headache and blurred vision. The nurse notes facial flushing, profuse diaphoresis on the forehead, nasal congestion, and blood pressure elevated to 210/115 mmHg with a pulse of 50 bpm. What is the nurse\'s FIRST action?',
        options: {
          A: 'Elevate the head of the bed to a high Fowler\'s (sitting) position immediately.',
          B: 'Administer an immediate dose of sublingual nifedipine.',
          C: 'Perform digital rectal stimulation to relieve fecal impaction.',
          D: 'Place the patient in Trendelenburg position to improve venous return.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Sitting the patient upright (high Fowler\'s) causes orthostatic blood pooling in the lower extremities, immediately lowering dangerously high cerebral arterial blood pressure.',
          whyCorrect: 'Autonomic dysreflexia is an emergency. The first non-pharmacological step is to sit the patient upright and loosen restrictive clothing to prevent intracranial hemorrhage or seizure.',
          distractors: {
            B: 'Medications (hydralazine/nitroglycerin) may be used if BP remains elevated after removing the trigger, but repositioning is immediate.',
            C: 'Rectal exam must be done only after numbing with lidocaine, as unanesthetized digital exam triggers worse reflex vasoconstriction.',
            D: 'Trendelenburg position would drastically increase intracranial pressure and risk stroke.'
          }
        }
      },
      {
        questionText: 'What is the most common underlying noxious stimulus that triggers acute episodes of Autonomic Dysreflexia in spinal cord injured clients?',
        options: {
          A: 'Bladder distension or an occluded/kinked urinary drainage catheter',
          B: 'Acute deep vein thrombosis in the lower extremity',
          C: 'Mild upper respiratory viral infection',
          D: 'Sudden change in environmental ambient room temperature'
        },
        correctOption: 'A',
        rationale: {
          core: 'Bladder distension due to blocked catheter or full bladder accounts for over 75% to 85% of all autonomic dysreflexia episodes.',
          whyCorrect: 'Sensory receptors below the level of the cord lesion (T6 and above) transmit afferent signals that trigger massive, uninhibited sympathetic reflex discharge below the injury.',
          distractors: {
            B: 'DVT can cause dysreflexia, but bladder distension is overwhelmingly the primary trigger.',
            C: 'Upper respiratory infections rarely provoke dysreflexia.',
            D: 'Ambient temperature is a minor contributor compared to visceral distension.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'msn-cirrhosis-hepatic-encephalopathy',
    subjectId: 'medical_surgical',
    topic: 'Gastrointestinal & Hepatic Nursing - Cirrhosis Complications',
    learningObjective: 'Explain pathophysiology of hepatic encephalopathy and monitor therapy with lactulose.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'American Association for the Study of Liver Diseases (AASLD) Hepatic Encephalopathy Practice Guidelines',
    variants: [
      {
        questionText: 'A patient with end-stage alcoholic cirrhosis develops confusion, sleep inversion, and displays asterixis (flapping hand tremors when wrists are dorsiflexed). Which laboratory parameter correlates most directly with the pathophysiology of this clinical state?',
        options: {
          A: 'Elevated serum ammonia level',
          B: 'Elevated serum amylase level',
          C: 'Decreased serum alkaline phosphatase',
          D: 'Elevated serum creatinine kinase'
        },
        correctOption: 'A',
        rationale: {
          core: 'The failing liver cannot convert ammonia (a byproduct of bacterial protein metabolism in the gut) into urea, causing hyperammonemia that crosses the blood-brain barrier and impairs neurotransmission.',
          whyCorrect: 'Elevated neurotoxic ammonia causes astrocyte swelling, cerebral edema, asterixis, and progressive encephalopathy.',
          distractors: {
            B: 'Amylase is a pancreatic enzyme.',
            C: 'Alkaline phosphatase is typically elevated, not decreased, in liver disease.',
            D: 'Creatine kinase assesses muscle breakdown.'
          }
        }
      },
      {
        questionText: 'A patient with hepatic encephalopathy is prescribed Lactulose 30 mL orally three times daily. Which clinical outcome indicates that the medication is producing its intended therapeutic effect?',
        options: {
          A: 'The patient produces 2 to 3 soft, acidic bowel movements per day and mental alertness improves.',
          B: 'The patient develops complete cessation of all bowel movements.',
          C: 'The patient produces copious watery diarrhea exceeding 10 watery stools per day.',
          D: 'Serum potassium level rises above 5.5 mEq/L.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Lactulose acidifies colonic contents (converting ammonia NH3 to non-absorbable ammonium NH4+ ions), promoting excretion. The goal is 2 to 3 soft stools per day.',
          whyCorrect: 'Therapeutic success is judged by improved neurological sensorium accompanied by 2 to 3 soft bowel movements daily without causing severe dehydration or hypokalemia.',
          distractors: {
            B: 'Cessation of bowel movements causes ammonia retention and worsening coma.',
            C: 'Excessive diarrhea (>10 stools) causes severe dehydration, hypernatremia, and hypokalemia.',
            D: 'Lactulose tends to cause potassium loss, not hyperkalemia.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'msn-burn-resuscitation-parkland',
    subjectId: 'medical_surgical',
    topic: 'Integumentary & Emergency Nursing - Parkland Burn Resuscitation',
    learningObjective: 'Calculate fluid resuscitation requirements for major thermal burns using the Parkland Formula.',
    difficulty: 'Difficult',
    questionType: 'calculation',
    reference: 'American Burn Association (ABA) Practice Guidelines for Burn Shock Resuscitation',
    variants: [
      {
        questionText: 'A 70 kg adult male sustains second- and third-degree thermal burns to his entire anterior trunk (18%) and both anterior arms (4.5% + 4.5% = 9%), totaling 27% Total Body Surface Area (TBSA). Using the Parkland Formula (4 mL × kg × % TBSA), what is the total volume of Lactated Ringer\'s solution required during the first 24 hours post-injury?',
        options: {
          A: '7,560 mL',
          B: '3,780 mL',
          C: '5,400 mL',
          D: '10,800 mL'
        },
        correctOption: 'A',
        rationale: {
          core: 'Parkland Formula: 4 mL × Weight in kg × % TBSA burned.',
          whyCorrect: 'Calculation: 4 mL × 70 kg × 27% = 7,560 mL total in the first 24 hours.',
          distractors: {
            B: '3,780 mL is the volume given in the first 8 hours (half of the total).',
            C: '5,400 mL results from calculating with 20% TBSA.',
            D: '10,800 mL results from using an incorrect multiplier of 6 mL.'
          }
        }
      },
      {
        questionText: 'When evaluating the adequacy of fluid resuscitation in an adult patient receiving intravenous Lactated Ringer\'s for major burns, which clinical parameter is the MOST reliable and objective indicator of adequate organ perfusion?',
        options: {
          A: 'Urine output maintaining at least 0.5 to 1.0 mL/kg/hour (30 to 50 mL/hour)',
          B: 'Systolic blood pressure maintained strictly above 140 mmHg',
          C: 'Serum sodium level of 135 mEq/L',
          D: 'Hematocrit level decreasing below 30%'
        },
        correctOption: 'A',
        rationale: {
          core: 'Hourly urine output reflects renal glomerular filtration and renal blood flow, serving as the gold standard bedside parameter for burn resuscitation adequacy.',
          whyCorrect: 'An hourly urine output of 0.5 to 1 mL/kg/hr (approx. 30-50 mL/hr in an adult) ensures adequate vital organ perfusion while preventing fluid overload and burn edema.',
          distractors: {
            B: 'Blood pressure is unreliable in early burn shock due to massive catecholamine release causing peripheral vasoconstriction.',
            C: 'Serum sodium reflects electrolyte concentration, not volume adequacy.',
            D: 'Hematocrit initially rises (hemoconcentration) and drops gradually.'
          }
        }
      }
    ]
  }
];
