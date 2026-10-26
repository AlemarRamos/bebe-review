import { ConceptDefinition } from '../questionTypes';

export const MATERNAL_CHILD_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'mch-naegele-rule',
    subjectId: 'maternal_child',
    topic: 'Prenatal Care & Obstetric Calculations',
    learningObjective: 'Calculate the Estimated Date of Delivery (EDD) using Naegele\'s rule.',
    difficulty: 'Easy',
    questionType: 'calculation',
    reference: 'Pillitteri\'s Maternal and Child Health Nursing, 8th Ed., Ch. 11',
    variants: [
      {
        questionText: 'A pregnant client states that the first day of her last normal menstrual period (LMP) was April 12, 2026. Using Naegele\'s rule, what is her Estimated Date of Delivery (EDD)?',
        options: {
          A: 'January 19, 2027',
          B: 'January 5, 2027',
          C: 'December 19, 2026',
          D: 'February 19, 2027'
        },
        correctOption: 'A',
        rationale: {
          core: 'Naegele\'s Rule: LMP + 7 days - 3 months + 1 year (for months April through December).',
          whyCorrect: 'Calculation: April (Month 4) - 3 months = January (Month 1); 12 days + 7 days = 19; Year: 2026 + 1 = 2027. EDD is January 19, 2027.',
          distractors: {
            B: 'January 5 subtracts 7 days instead of adding 7 days.',
            C: 'December 19 subtracts 4 months.',
            D: 'February 19 subtracts only 2 months.'
          }
        }
      },
      {
        questionText: 'A client reports that her LMP began on February 8, 2026. What is her calculated Estimated Date of Delivery (EDD)?',
        options: {
          A: 'November 15, 2026',
          B: 'November 1, 2026',
          C: 'October 15, 2026',
          D: 'December 15, 2026'
        },
        correctOption: 'A',
        rationale: {
          core: 'Naegele\'s Rule for January through March: LMP + 7 days + 9 months (same year).',
          whyCorrect: 'February (Month 2) + 9 months = November (Month 11); 8 days + 7 days = 15; Year remains 2026. EDD is November 15, 2026.',
          distractors: {
            B: 'November 1 subtracts 7 days.',
            C: 'October 15 adds only 8 months.',
            D: 'December 15 adds 10 months.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'mch-gtpal-system',
    subjectId: 'maternal_child',
    topic: 'Obstetrical History & GTPAL Recording',
    learningObjective: 'Accurately record obstetric parity using the 5-digit GTPAL system.',
    difficulty: 'Moderate',
    questionType: 'calculation',
    reference: 'Lowdermilk, Perry, Cashion, Maternity & Women\'s Health Care, 12th Ed.',
    variants: [
      {
        questionText: 'A woman is currently 16 weeks pregnant. Her obstetrical history includes: one pregnancy delivered at 39 weeks (living child), twins delivered at 34 weeks (both living), one spontaneous abortion at 10 weeks, and one elective abortion at 8 weeks. How should the nurse document her GTPAL?',
        options: {
          A: 'G5, T1, P1, A2, L3',
          B: 'G4, T1, P2, A2, L3',
          C: 'G5, T1, P2, A1, L2',
          D: 'G4, T2, P1, A2, L2'
        },
        correctOption: 'A',
        rationale: {
          core: 'G = Gravidity (total pregnancies including current); T = Term (>=37 wks); P = Preterm (20-36.6 wks); A = Abortions (<20 wks); L = Living children.',
          whyCorrect: 'G = 5 (current + 39wk + twins + 2 abortions). T = 1 (the 39-wk birth). P = 1 (twins count as 1 preterm delivery event). A = 2 (spontaneous + elective). L = 3 (1 term child + 2 twins). Result: G5, T1, P1, A2, L3.',
          distractors: {
            B: 'Gravidity must include the current pregnancy (total 5, not 4).',
            C: 'Preterm refers to pregnancy delivery events (1 event), not number of infants born.',
            D: 'Living children equals 3, not 2.'
          }
        }
      },
      {
        questionText: 'A client is admitted in active labor. She has a 4-year-old child born at 40 weeks, a 2-year-old born at 32 weeks, and had an ectopic pregnancy terminated at 7 weeks. What is her GTPAL?',
        options: {
          A: 'G4, T1, P1, A1, L2',
          B: 'G3, T1, P1, A1, L2',
          C: 'G4, T2, P0, A1, L2',
          D: 'G4, T1, P1, A0, L3'
        },
        correctOption: 'A',
        rationale: {
          core: 'Gravidity includes current labor. Term = 40 wk delivery (1). Preterm = 32 wk delivery (1). Abortion = ectopic (1). Living = 2.',
          whyCorrect: 'G4 (1 term + 1 preterm + 1 ectopic + current labor), T1 (40 wks), P1 (32 wks), A1 (ectopic), L2 (two living children).',
          distractors: {
            B: 'Gravidity 3 neglects the current ongoing pregnancy.',
            C: 'Term count is 1, not 2.',
            D: 'Ectopic pregnancy is classified under Abortions (<20 wks).'
          }
        }
      }
    ]
  },
  {
    conceptId: 'mch-preeclampsia-mag-sulfate',
    subjectId: 'maternal_child',
    topic: 'High-Risk Pregnancy - Preeclampsia & Magnesium Toxicity',
    learningObjective: 'Monitor client on IV Magnesium Sulfate and recognize life-threatening toxicity signs and antidote.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'American College of Obstetricians and Gynecologists (ACOG) Hypertension in Pregnancy Practice Guidelines',
    variants: [
      {
        questionText: 'A client with severe preeclampsia is receiving an intravenous infusion of Magnesium Sulfate. Which clinical finding should prompt the nurse to IMMEDIATELY stop the infusion and notify the physician?',
        options: {
          A: 'Blood pressure decreases from 168/104 mmHg to 142/90 mmHg.',
          B: 'Deep tendon reflexes (DTRs) are absent (0/4+) and respiratory rate is 10 breaths per minute.',
          C: 'Patient reports feeling warm and flushed during the loading dose.',
          D: 'Urinary output is 45 mL per hour with light amber urine.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Loss of deep tendon reflexes and bradypnea (RR < 12/min) are hallmark clinical indicators of toxic hypermagnesemia risking respiratory arrest.',
          whyCorrect: 'Magnesium toxicity progression: loss of DTRs (8-10 mg/dL), respiratory depression (12-15 mg/dL), cardiac arrest (>15 mg/dL). Immediate cessation and Calcium Gluconate 10% IV administration is mandatory.',
          distractors: {
            A: 'Blood pressure reduction is a desired therapeutic secondary effect.',
            C: 'Flushing and warmth are expected benign side effects during IV loading.',
            D: 'Urine output >= 30 mL/hr is adequate renal clearance.'
          }
        }
      },
      {
        questionText: 'What is the specific, readily available emergency antidote that must be kept at the bedside of any patient receiving intravenous Magnesium Sulfate?',
        options: {
          A: 'Naloxone hydrochloride (Narcan)',
          B: 'Calcium Gluconate 10%',
          C: 'Protamine Sulfate',
          D: 'Sodium Bicarbonate 8.4%'
        },
        correctOption: 'B',
        rationale: {
          core: 'Calcium Gluconate (1 gram of 10% solution administered IV over 3 minutes) directly antagonizes neuromuscular blockade caused by hypermagnesemia.',
          whyCorrect: 'Calcium ions competitively reverse magnesium toxicity at neuromuscular junctions, rapidly restoring diaphragmatic excursion and cardiac conduction.',
          distractors: {
            A: 'Naloxone is the antidote for opioid overdose.',
            C: 'Protamine sulfate reverses heparin.',
            D: 'Sodium bicarbonate treats metabolic acidosis, not hypermagnesemia.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'mch-placenta-previa-abruption',
    subjectId: 'maternal_child',
    topic: 'Third Trimester Bleeding Disorders',
    learningObjective: 'Differentiate clinical presentations of Placenta Previa versus Abruptio Placentae and identify contraindicated nursing procedures.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Cunningham, Williams Obstetrics, 26th Ed., Ch. 41',
    variants: [
      {
        questionText: 'A 32-week pregnant multipara presents to the triage unit with sudden onset of painless, bright red vaginal bleeding. The uterus is soft, non-tender, and relaxed. Fetal heart rate is 144 bpm. Which nursing action is strictly CONTRAINDICATED?',
        options: {
          A: 'Initiating external continuous fetal cardiotocography monitoring.',
          B: 'Performing a digital vaginal examination to determine cervical dilation.',
          C: 'Establishing large-bore intravenous access with 18-gauge cannula.',
          D: 'Obtaining maternal blood for complete blood count, type, and cross-match.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Digital vaginal examinations are strictly prohibited in third-trimester vaginal bleeding until placenta previa is ruled out by ultrasound.',
          whyCorrect: 'Digital examination can tear placental cotyledons overlying the internal cervical os, precipitating catastrophic maternal and fetal exsanguination within minutes.',
          distractors: {
            A: 'Continuous electronic fetal monitoring is essential to detect fetal hypoxia.',
            C: 'Large-bore IV access is critical preparation for potential resuscitation.',
            D: 'Type and cross-match is required in anticipation of transfusion.'
          }
        }
      },
      {
        questionText: 'A woman at 36 weeks gestation arrives complaining of sudden, intense, unremitting abdominal pain accompanied by a small amount of dark red vaginal bleeding. On palpation, the uterus is hypertonic, board-like, and tender. What condition should the nurse suspect?',
        options: {
          A: 'Placenta Previa',
          B: 'Abruptio Placentae (Placental Abruption)',
          C: 'Uterine Inversion',
          D: 'Incompetent Cervix'
        },
        correctOption: 'B',
        rationale: {
          core: 'Abruptio Placentae is characterized by painful dark red bleeding, uterine hypertonus (board-like rigidity), severe continuous pain, and fetal distress.',
          whyCorrect: 'Premature detachment of the placenta produces retroplacental hematoma, causing intense uterine spasm, tenderness, and concealed or dark hemorrhage.',
          distractors: {
            A: 'Placenta previa features PAINLESS, bright red bleeding and a soft relaxed uterus.',
            C: 'Uterine inversion occurs in the 3rd stage of labor after placental delivery.',
            D: 'Cervical incompetence causes painless mid-trimester dilation.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'mch-einc-unang-yakap',
    subjectId: 'maternal_child',
    topic: 'Essential Intrapartum and Newborn Care (EINC)',
    learningObjective: 'Implement the sequential four core steps of EINC (Unang Yakap) according to DOH and WHO guidelines.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'Department of Health (DOH) Administrative Order No. 2009-0025: Essential Newborn Care (Unang Yakap)',
    variants: [
      {
        questionText: 'According to the Philippine DOH Essential Intrapartum and Newborn Care (EINC / Unang Yakap) protocol, what is the FIRST mandatory step performed immediately upon the birth of a crying, vigorous newborn?',
        options: {
          A: 'Immediately clamp and cut the umbilical cord within 10 seconds.',
          B: 'Immediate and thorough drying of the baby with a clean, warm cloth for at least 30 seconds.',
          C: 'Suctioning the newborn\'s mouth and nose with a bulb syringe on the perineum.',
          D: 'Administering intramuscular Vitamin K and Hepatitis B vaccine in the delivery room.'
        },
        correctOption: 'B',
        rationale: {
          core: 'The first core step of EINC is immediate and thorough drying for 30 seconds to stimulate breathing and prevent evaporative hypothermia.',
          whyCorrect: 'Drying removes amniotic fluid, prevents heat loss (the leading cause of neonatal hypoglycemia and acidosis), and provides tactile stimulation for spontaneous breathing.',
          distractors: {
            A: 'Early cord clamping is prohibited; clamping must be delayed 1-3 minutes until pulsations cease.',
            C: 'Routine suctioning in a vigorous crying baby is harmful and causes vagal bradycardia.',
            D: 'Vaccines and eye prophylaxis are delayed until after the first breastfeeding.'
          }
        }
      },
      {
        questionText: 'In the EINC Unang Yakap protocol, when is the recommended timing for clamping and cutting the umbilical cord in an uncompromised newborn?',
        options: {
          A: 'Immediately within the first 10 seconds of delivery.',
          B: 'After 1 to 3 minutes, or when cord pulsations have completely ceased.',
          C: 'Only after the placenta has completely delivered.',
          D: 'At 10 minutes following the completion of the first breastfeeding.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Properly timed delayed cord clamping (1 to 3 minutes or until pulsations cease) allows placental transfusion of 80-100 mL of oxygenated blood.',
          whyCorrect: 'Delayed cord clamping prevents neonatal anemia, increases iron stores for the first 6 months of life, and prevents intraventricular hemorrhage in preterms.',
          distractors: {
            A: 'Immediate clamping deprives the infant of up to 30% of blood volume.',
            C: 'Waiting for placental delivery is unnecessary and risks excessive cooling.',
            D: '10 minutes is excessively prolonged.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'mch-apgar-score-calculation',
    subjectId: 'maternal_child',
    topic: 'Immediate Newborn Assessment - APGAR Scoring',
    learningObjective: 'Calculate the 1-minute and 5-minute APGAR score and initiate appropriate resuscitation.',
    difficulty: 'Difficult',
    questionType: 'calculation',
    reference: 'American Academy of Pediatrics (AAP) Neonatal Resuscitation Program (NRP), 8th Ed.',
    variants: [
      {
        questionText: 'At 1 minute after birth, a newborn has a heart rate of 118 bpm, slow and irregular breathing, active movement of all extremities, vigorous crying when the soles are flicked, and pink body with blue hands and feet (acrocyanosis). What is this newborn\'s 1-minute APGAR score?',
        options: {
          A: '8',
          B: '7',
          C: '9',
          D: '6'
        },
        correctOption: 'A',
        rationale: {
          core: 'APGAR scoring: Appearance (Acrocyanosis = 1), Pulse (>100 bpm = 2), Grimace (Crying to stimulus = 2), Activity (Active motion = 2), Respiration (Slow/irregular = 1).',
          whyCorrect: 'Calculation: Appearance = 1, Pulse = 2, Grimace = 2, Activity = 2, Respiration = 1. Total score = 1 + 2 + 2 + 2 + 1 = 8.',
          distractors: {
            B: '7 underestimates by subtracting 2 points for respiratory effort instead of 1.',
            C: '9 assumes perfect respiratory score (crying vigorously throughout).',
            D: '6 indicates moderate depression not supported by active motion and HR 118.'
          }
        }
      },
      {
        questionText: 'A newborn at 5 minutes of age presents with: Heart rate 88 bpm; weak, whimpering cry; some flexion of arms and legs; grimace only when suctioned; and pale/blue body throughout. What is the APGAR score, and what action is required?',
        options: {
          A: 'APGAR 4; requires immediate active resuscitation including bag-mask positive pressure ventilation.',
          B: 'APGAR 7; requires routine drying and observation with mother.',
          C: 'APGAR 2; requires immediate chest compressions and IV epinephrine.',
          D: 'APGAR 6; requires only blow-by oxygen via face mask.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Score: Appearance = 0 (blue/pale), Pulse = 1 (<100 bpm), Grimace = 1 (grimace only), Activity = 1 (some flexion), Respiration = 1 (weak). Total = 4. Score 4-6 signifies moderate depression requiring immediate PPV.',
          whyCorrect: 'With HR < 100 bpm and inadequate respirations, NRP guidelines mandate immediate Positive Pressure Ventilation (PPV) with room air or 21-30% O2.',
          distractors: {
            B: 'Score is 4, not 7; infant is severely compromised.',
            C: 'Chest compressions are indicated only if HR remains < 60 bpm after 30 seconds of effective PPV.',
            D: 'Passive blow-by oxygen is inadequate for apnea/bradycardia.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'mch-pediatric-milestones',
    subjectId: 'maternal_child',
    topic: 'Pediatric Growth & Developmental Milestones',
    learningObjective: 'Assess fine and gross motor developmental milestones across infancy and early childhood.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'Behrman, Kliegman, Jenson, Nelson Textbook of Pediatrics, 21st Ed.',
    variants: [
      {
        questionText: 'A mother brings her 9-month-old infant to the well-child clinic. Which motor milestone should the nurse expect the infant to demonstrate at this age?',
        options: {
          A: 'Using a neat, precise pincer grasp to pick up small finger foods.',
          B: 'Sitting steadily without support and transferring toys from one hand to the other.',
          C: 'Walking independently without holding onto furniture.',
          D: 'Building a tower of 4 to 6 blocks.'
        },
        correctOption: 'B',
        rationale: {
          core: 'By 7 to 9 months, an infant sits steadily without support, crawls, and transfers objects hand-to-hand.',
          whyCorrect: 'Stable independent sitting and bilateral hand-to-hand transfer are well established by 8-9 months. Crude pincer grasp begins at 9 months and matures by 10-12 months.',
          distractors: {
            A: 'Neat, refined pincer grasp (pad-to-pad) matures at 11-12 months.',
            C: 'Independent walking is achieved between 12 and 15 months.',
            D: 'Building a 4-6 block tower is typical of an 18 to 24-month-old toddler.'
          }
        }
      },
      {
        questionText: 'At what age does the posterior fontanelle typically close, and when does the anterior fontanelle close in a healthy child?',
        options: {
          A: 'Posterior closes at 6-8 weeks; Anterior closes at 12-18 months.',
          B: 'Posterior closes at 6 months; Anterior closes at 24 months.',
          C: 'Posterior closes at 12 months; Anterior closes at 6 months.',
          D: 'Both fontanelles close simultaneously at 12 months of age.'
        },
        correctOption: 'A',
        rationale: {
          core: 'The small triangular posterior fontanelle closes at 6 to 8 weeks (2 months). The larger diamond-shaped anterior fontanelle closes between 12 and 18 months.',
          whyCorrect: 'Knowledge of fontanelle closure timing is vital for detecting craniosynostosis or microcephaly (premature closure) versus hydrocephalus or rickets (delayed closure).',
          distractors: {
            B: 'Posterior fontanelle closes much earlier than 6 months.',
            C: 'Anterior fontanelle never closes before posterior fontanelle.',
            D: 'Fontanelles follow distinct developmental timelines.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'mch-pediatric-congenital-tof',
    subjectId: 'maternal_child',
    topic: 'Congenital Heart Defects - Tetralogy of Fallot',
    learningObjective: 'Identify the four anatomical defects of Tetralogy of Fallot and prioritize nursing actions during hypercyanotic ("tet") spells.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'Hockenberry & Wilson, Wong\'s Essentials of Pediatric Nursing, 11th Ed.',
    variants: [
      {
        questionText: 'A 6-month-old infant diagnosed with Tetralogy of Fallot begins crying vigorously and suddenly develops profound cyanosis, tachypnea, and diaphoresis (a hypercyanotic "tet" spell). What is the nurse\'s FIRST immediate action?',
        options: {
          A: 'Place the infant in the knee-chest position.',
          B: 'Administer intravenous morphine sulfate 0.1 mg/kg.',
          C: 'Apply 100% oxygen via blow-by mask.',
          D: 'Start an intravenous infusion of normal saline.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Placing the infant in the knee-to-chest position immediately increases systemic vascular resistance (SVR), reversing the right-to-left shunt.',
          whyCorrect: 'Bending the knees tightly to the chest compresses femoral vessels, elevating systemic resistance. This forces desaturated blood out of the right ventricle through the stenotic pulmonary valve into the pulmonary vasculature rather than across the VSD into the systemic aorta.',
          distractors: {
            B: 'Morphine relaxes infundibular spasm and reduces respiratory drive, but physical repositioning is immediate and non-pharmacological.',
            C: 'Oxygen should be delivered, but knee-chest position takes precedence.',
            D: 'IV access is established after physical position has been secured.'
          }
        }
      },
      {
        questionText: 'Which four anatomical cardiovascular anomalies comprise the congenital defect known as Tetralogy of Fallot?',
        options: {
          A: 'Ventricular Septal Defect (VSD), Pulmonic Stenosis, Overriding Aorta, and Right Ventricular Hypertrophy.',
          B: 'Atrial Septal Defect (ASD), Aortic Stenosis, Coarctation of Aorta, and Left Ventricular Hypertrophy.',
          C: 'Patent Ductus Arteriosus (PDA), Tricuspid Atresia, Transposition of Great Vessels, and Hypoplastic Left Heart.',
          D: 'Ventricular Septal Defect (VSD), Mitral Stenosis, Transposition of Aorta, and Pulmonary Hypertension.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Mnemonic "PROVe": Pulmonic stenosis, Right ventricular hypertrophy, Overriding aorta, Ventricular septal defect.',
          whyCorrect: 'Pulmonic valve/infundibular stenosis restricts pulmonary blood flow, causing RV pressure to equal or exceed systemic pressure, shunting deoxygenated blood through the VSD into the overriding aorta.',
          distractors: {
            B: 'ASD and aortic stenosis are not part of Tetralogy of Fallot.',
            C: 'These represent other cyanotic congenital heart defects.',
            D: 'Mitral stenosis is not involved in TOF.'
          }
        }
      }
    ]
  }
];
