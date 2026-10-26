import { ConceptDefinition } from '../questionTypes';

export const FUNDAMENTALS_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'fon-asepsis-sterile-field',
    subjectId: 'fundamentals',
    topic: 'Infection Prevention & Sterile Technique',
    learningObjective: 'Apply aseptic and surgical sterile technique principles during invasive clinical procedures.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Berman & Snyder, Kozier & Erb\'s Fundamentals of Nursing, 10th Ed., Ch. 31',
    variants: [
      {
        questionText: 'While preparing a sterile field for a central line dressing change, a staff nurse notices that a sterile 4x4 gauze sponge has dropped 0.5 inches inside the outermost edge of the sterile drape. Which action should the nurse take next?',
        options: {
          A: 'Proceed with the procedure since the sponge landed within the drape borders.',
          B: 'Consider the sponge and the border contaminated, discard it with sterile forceps, and replace it.',
          C: 'Carefully slide the sponge 2 inches toward the center of the sterile field.',
          D: 'Cover the entire sterile drape with a secondary sterile towel and continue.'
        },
        correctOption: 'B',
        rationale: {
          core: 'The outer 1-inch (2.5 cm) perimeter of a sterile field is considered unsterile and contaminated.',
          whyCorrect: 'Because the 1-inch border of a sterile drape is considered contaminated, any object touching within that margin is contaminated and must be removed without touching the sterile field.',
          distractors: {
            A: 'Incorrect because the outer 1-inch border is non-sterile; items within it are contaminated.',
            C: 'Incorrect because touching or dragging a contaminated item across the sterile field contaminates the entire field.',
            D: 'Incorrect because covering contaminated supplies does not rectify surgical asepsis breach.'
          }
        }
      },
      {
        questionText: 'A surgical scrub nurse turns her back to the open sterile field to retrieve additional suture packs from a sterile supply cart. What is the appropriate nursing assessment of this sterile field?',
        options: {
          A: 'The sterile field remains sterile as long as no unscrubbed personnel walked between the nurse and field.',
          B: 'The sterile field is considered contaminated because it was out of the direct line of continuous visual sight.',
          C: 'The field remains sterile for up to 30 minutes if the room ventilation is laminar flow.',
          D: 'Only the items positioned on the far edge of the drape must be replaced.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Any sterile field or article out of the continuous range of vision or below waist level is considered contaminated.',
          whyCorrect: 'Surgical asepsis mandates that sterile objects must remain in continuous visual field. Turning one\'s back breaks visual oversight and renders the field suspect and contaminated.',
          distractors: {
            A: 'Air currents and unnoticed breaches can occur; turning back violates sterility rules.',
            C: 'Time limit does not validate unattended or unseen fields.',
            D: 'Sterility violation compromises the integrity of the whole open field.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-vital-signs-bp-cuff',
    subjectId: 'fundamentals',
    topic: 'Vital Signs & Physical Assessment',
    learningObjective: 'Accurately measure blood pressure and recognize sources of measurement error.',
    difficulty: 'Easy',
    questionType: 'direct_knowledge',
    reference: 'Potter & Perry, Fundamentals of Nursing, 9th Ed., Unit 4',
    variants: [
      {
        questionText: 'A nurse uses a blood pressure cuff that is too narrow for an adult patient\'s obese upper arm. What effect will this have on the recorded blood pressure reading?',
        options: {
          A: 'Falsely elevated systolic and diastolic blood pressure reading.',
          B: 'Falsely low systolic and diastolic blood pressure reading.',
          C: 'Falsely low systolic reading with falsely high diastolic reading.',
          D: 'Accurate reading provided the cuff is pumped 30 mmHg above radial pulse disappearance.'
        },
        correctOption: 'A',
        rationale: {
          core: 'An undersized or too-narrow blood pressure bladder requires excessive pressure to occlude the artery, producing falsely high readings.',
          whyCorrect: 'If the cuff bladder width is less than 40% of arm circumference or bladder length is less than 80%, excessive cuff pressure is needed, yielding a falsely elevated blood pressure.',
          distractors: {
            B: 'A cuff that is too wide or too loose produces falsely low readings.',
            C: 'Both systolic and diastolic readings are falsely elevated.',
            D: 'Proper inflation technique cannot compensate for improper cuff sizing.'
          }
        }
      },
      {
        questionText: 'When measuring a patient\'s blood pressure, the nurse deflates the sphygmomanometer cuff at a rapid rate of 10 mmHg per second. What error in measurement is most likely to occur?',
        options: {
          A: 'Falsely high systolic and falsely low diastolic reading.',
          B: 'Falsely low systolic and falsely high diastolic reading.',
          C: 'Falsely elevated reading for both systolic and diastolic pressures.',
          D: 'Absence of Korotkoff sounds leading to an unmeasurable pressure.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Deflating the cuff too rapidly leads to missing the true first Korotkoff sound (falsely low systolic) and late detection of cessation (falsely high diastolic).',
          whyCorrect: 'The recommended deflation rate is 2 to 3 mmHg per second. Rapid deflation causes underestimation of systolic and overestimation of diastolic pressure.',
          distractors: {
            A: 'Falsely high systolic occurs with slow deflation, not rapid deflation.',
            C: 'Slow deflation causes venous congestion and falsely high readings.',
            D: 'Sounds are heard, but timing precision is lost.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-med-calc-iv-drip',
    subjectId: 'fundamentals',
    topic: 'Dosage Calculations & IV Therapy',
    learningObjective: 'Calculate intravenous infusion drip rates using standard drop factors.',
    difficulty: 'Moderate',
    questionType: 'calculation',
    reference: 'Buchholz, Henke\'s Med-Math: Dosage Calculation, Preparation & Administration, 9th Ed.',
    variants: [
      {
        questionText: 'A physician prescribes 1,000 mL of 0.9% Normal Saline to infuse over 8 hours. The infusion tubing has a drop factor of 15 drops/mL. At what rate in drops per minute (gtt/min) should the nurse regulate the IV infusion?',
        options: {
          A: '21 gtt/min',
          B: '31 gtt/min',
          C: '42 gtt/min',
          D: '52 gtt/min'
        },
        correctOption: 'B',
        rationale: {
          core: 'Drip rate (gtt/min) = (Total volume in mL × Drop factor in gtt/mL) / (Time in minutes).',
          whyCorrect: 'Formula: (1,000 mL × 15 gtt/mL) / (8 × 60 min) = 15,000 / 480 = 31.25, rounded to 31 gtt/min.',
          distractors: {
            A: '21 gtt/min results from dividing 1,000 by 48 without multiplying by 15 appropriately.',
            C: '42 gtt/min results from using a 20 drop factor or 6 hours.',
            D: '52 gtt/min results from calculating for 5 hours.'
          }
        }
      },
      {
        questionText: 'A patient is to receive 500 mL of Dextrose 5% in Water (D5W) over 4 hours. The IV set delivers 20 drops per mL. What is the correct flow rate in drops per minute?',
        options: {
          A: '25 gtt/min',
          B: '42 gtt/min',
          C: '35 gtt/min',
          D: '50 gtt/min'
        },
        correctOption: 'B',
        rationale: {
          core: 'Flow rate = (Volume in mL × Drop factor) / Time in minutes.',
          whyCorrect: '(500 mL × 20 gtt/mL) / (4 × 60 min) = 10,000 / 240 = 41.67, which rounds to 42 gtt/min.',
          distractors: {
            A: '25 gtt/min corresponds to a 60 gtt microdrip without time conversion.',
            C: '35 gtt/min is an incorrect mathematical division.',
            D: '50 gtt/min is too rapid.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-iv-infiltration-phlebitis',
    subjectId: 'fundamentals',
    topic: 'Intravenous Therapy Complications',
    learningObjective: 'Differentiate clinical manifestations of IV infiltration from phlebitis and implement correct nursing action.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Infusion Nurses Society (INS) Standards of Practice, 8th Ed.',
    variants: [
      {
        questionText: 'A nurse assesses a peripheral IV insertion site on a patient receiving continuous IV fluids. The site is pale, cool to touch, edematous, and the infusion rate has slowed significantly. The patient reports a feeling of tightness. Which complication should the nurse identify?',
        options: {
          A: 'Phlebitis',
          B: 'Infiltration',
          C: 'Thrombophlebitis',
          D: 'Air embolism'
        },
        correctOption: 'B',
        rationale: {
          core: 'Infiltration presents with pallor, coolness, edema, and decreased flow rate due to IV solution leaking into subcutaneous tissue.',
          whyCorrect: 'Infiltration occurs when IV cannula dislodges or perforates the vein wall, causing non-vesicant fluid accumulation in surrounding tissue, causing coolness, pallor, and swelling.',
          distractors: {
            A: 'Phlebitis is characterized by erythema, warmth, tenderness along the vein pathway, and a palpable cord.',
            C: 'Thrombophlebitis includes thrombosis with inflammatory warmth and tenderness.',
            D: 'Air embolism presents with sudden dyspnea, cyanosis, chest pain, and hypotension.'
          }
        }
      },
      {
        questionText: 'Upon assessing an IV site, the nurse notes redness, warmth, pain along the vein path, and a palpable cord. What is the immediate priority nursing action?',
        options: {
          A: 'Slow down the infusion rate and apply a cold compress.',
          B: 'Discontinue the IV cannula immediately and apply a warm, moist compress.',
          C: 'Flush the cannula with 5 mL of heparinized saline to clear potential clot.',
          D: 'Elevate the extremity and elevate the IV container higher on the pole.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Phlebitis requires immediate discontinuation of the IV cannula to prevent further vessel injury and application of warm compresses to promote circulation.',
          whyCorrect: 'The priority intervention for phlebitis (erythema, warmth, cord) is to discontinue the infusion immediately, remove the cannula, and apply warm moist compresses.',
          distractors: {
            A: 'The infusion must not continue through an inflamed vein.',
            C: 'Never flush a sluggish or inflamed IV line due to the danger of embolizing a thrombus.',
            D: 'Elevating the pole does not treat the underlying inflammatory process.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-ngt-verification',
    subjectId: 'fundamentals',
    topic: 'Enteral Nutrition & Tube Feeding',
    learningObjective: 'Validate correct placement of a nasogastric tube prior to enteral feeding administration.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'American Association of Critical-Care Nurses (AACN) Practice Alert on Feeding Tube Placement',
    variants: [
      {
        questionText: 'A newly inserted nasogastric tube (NGT) must be verified prior to initiating the patient\'s first enteral formula feeding. What is the gold standard method to verify correct tube placement?',
        options: {
          A: 'Auscultating a whooshing sound over the epigastrium while injecting 20 mL of air.',
          B: 'Obtaining an abdominal X-ray to confirm anatomical tip position in the stomach.',
          C: 'Aspirating contents and checking pH with standard litmus paper.',
          D: 'Placing the distal tip of the tube under water and observing for bubbles.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Radiographic examination (X-ray) is the definitive, evidence-based gold standard for verifying initial NGT tip placement.',
          whyCorrect: 'Only radiographic visualization definitively rules out inadvertent placement in the tracheobronchial tree before the first feeding.',
          distractors: {
            A: 'Auscultatory air insufflation has been condemned by clinical evidence because air injected into the lung or esophagus can transmit sound to the epigastrium.',
            C: 'pH testing is useful for ongoing bedside verification, but X-ray is the initial gold standard.',
            D: 'Submerging the tube in water is dangerous and unreliable for assessing placement.'
          }
        }
      },
      {
        questionText: 'Before administering an intermittent enteral feeding through an established NGT, the nurse aspirates gastric contents. Which aspirate finding best confirms gastric placement at the bedside?',
        options: {
          A: 'Aspirate pH of 3.5 with greenish, curdled appearance.',
          B: 'Aspirate pH of 7.2 with golden yellow fluid.',
          C: 'Aspirate pH of 8.0 with clear mucus.',
          D: 'Auscultation of bubbling in the epigastrium with 10 mL air.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Gastric contents typically have an acidic pH ranging from 1 to 5.5 in patients not taking acid-inhibiting medications.',
          whyCorrect: 'A pH <= 5.5 and greenish or off-white color is characteristic of gastric fluid. Intestinal secretions typically have pH > 6.0 and respiratory secretions > 7.0.',
          distractors: {
            B: 'pH 7.2 indicates intestinal or respiratory fluid.',
            C: 'pH 8.0 suggests tracheobronchial secretions.',
            D: 'Air auscultation is unscientific and no longer an accepted standard.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-trach-suctioning',
    subjectId: 'fundamentals',
    topic: 'Airway Management & Suctioning',
    learningObjective: 'Implement safe tracheostomy suctioning technique to prevent hypoxia and tissue trauma.',
    difficulty: 'Moderate',
    questionType: 'safety_ethics',
    reference: 'American Thoracic Society (ATS) Guidelines for Tracheostomy Care',
    variants: [
      {
        questionText: 'When performing open tracheostomy suctioning on an adult patient, which guideline must the nurse strictly adhere to in order to prevent hypoxemia and mucosal damage?',
        options: {
          A: 'Apply continuous suction while advancing the catheter down the trachea.',
          B: 'Hyperoxygenate with 100% oxygen before and after suctioning, limiting suction duration to 10-15 seconds.',
          C: 'Instill 5 mL of normal saline into the tracheostomy before each suctioning pass.',
          D: 'Rotate the catheter continuously during insertion while maintaining high negative pressure.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Pre-oxygenation with 100% O2 and restricting suctioning duration to maximum 10 to 15 seconds prevents critical desaturation and arrhythmia.',
          whyCorrect: 'Hyperoxygenation mitigates suction-induced hypoxia. Suction must only be applied intermittently upon catheter withdrawal, never exceeding 10-15 seconds.',
          distractors: {
            A: 'Suction is NEVER applied during insertion as it causes tracheal mucosal trauma and rapid hypoxia.',
            C: 'Routine instillation of normal saline is contraindicated because it flushes bacteria into the lower airway and decreases oxygenation.',
            D: 'High pressure is contraindicated; standard adult suction pressure is 100-120 mmHg.'
          }
        }
      },
      {
        questionText: 'During tracheostomy suctioning, the patient\'s heart rate drops from 84 beats/min to 52 beats/min on the monitor. What is the nurse\'s immediate action?',
        options: {
          A: 'Quickly finish the suctioning pass to clear the obstructing secretions.',
          B: 'Stop suctioning immediately, remove the catheter, and administer 100% oxygen.',
          C: 'Notify the physician immediately while continuing low-pressure suction.',
          D: 'Instill sterile saline and turn the patient onto the left lateral position.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Bradycardia during suctioning is caused by vagal nerve stimulation or severe hypoxia, requiring immediate cessation and oxygenation.',
          whyCorrect: 'The nurse must immediately withdraw the catheter and deliver supplemental 100% oxygen to reverse hypoxia and vagal tone.',
          distractors: {
            A: 'Continuing suctioning when bradycardic risks cardiac arrest.',
            C: 'The nurse must stop suctioning before taking other steps.',
            D: 'Saline instillation is hazardous and delays oxygenation.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-pressure-injury-staging',
    subjectId: 'fundamentals',
    topic: 'Skin Integrity & Pressure Injury Prevention',
    learningObjective: 'Accurately stage pressure injuries according to National Pressure Injury Advisory Panel (NPIAP) criteria.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'NPIAP Pressure Injury Staging System (2019 / 2024 Guidelines)',
    variants: [
      {
        questionText: 'A nurse assesses a bedridden elderly patient\'s sacrum and observes non-blanchable erythema of intact skin over a bony prominence. The area feels warmer and firmer than the adjacent tissue. How should this pressure injury be staged?',
        options: {
          A: 'Stage 1 Pressure Injury',
          B: 'Stage 2 Pressure Injury',
          C: 'Stage 3 Pressure Injury',
          D: 'Deep Tissue Pressure Injury'
        },
        correctOption: 'A',
        rationale: {
          core: 'Stage 1 pressure injury is defined as intact skin with a localized area of non-blanchable erythema.',
          whyCorrect: 'Presence of non-blanchable redness over a bony prominence without epidermal loss or blistering classifies precisely as Stage 1.',
          distractors: {
            B: 'Stage 2 involves partial-thickness loss of skin with exposed dermis (e.g., blister or shallow ulcer).',
            C: 'Stage 3 involves full-thickness skin loss with adipose tissue visible.',
            D: 'Deep tissue pressure injury presents with persistent non-blanchable deep red, maroon, or purple discoloration.'
          }
        }
      },
      {
        questionText: 'A patient presents with a sacral ulcer having full-thickness tissue loss. Adipose (fat) is visible, and granulation tissue and epibole (rolled wound edges) are present, but bone, tendon, and muscle are NOT exposed. What stage is this ulcer?',
        options: {
          A: 'Stage 2',
          B: 'Stage 3',
          C: 'Stage 4',
          D: 'Unstageable'
        },
        correctOption: 'B',
        rationale: {
          core: 'Stage 3 pressure injury involves full-thickness skin loss in which adipose tissue is visible, but bone, tendon, and muscle are not exposed.',
          whyCorrect: 'The anatomical extent of Stage 3 reaches subcutaneous fat without exposing underlying fascia, muscle, tendon, ligament, or bone.',
          distractors: {
            A: 'Stage 2 only extends into the dermis; fat is not visible.',
            C: 'Stage 4 features directly palpable or exposed fascia, muscle, tendon, ligament, cartilage, or bone.',
            D: 'Unstageable occurs when slough or eschar obscures the true depth of tissue loss.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-blood-transfusion-reaction',
    subjectId: 'fundamentals',
    topic: 'Blood Transfusion Safety',
    learningObjective: 'Recognize acute hemolytic transfusion reaction and execute immediate emergency nursing interventions.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'AABB Standards for Blood Banks and Transfusion Services',
    variants: [
      {
        questionText: 'Fifteen minutes after starting a transfusion of packed red blood cells (PRBCs), the patient reports lower back pain, chills, and shortness of breath. The nurse observes flushed skin and a temperature rise of 2.2°F. What is the nurse\'s FIRST action?',
        options: {
          A: 'Slow the transfusion rate and notify the attending physician.',
          B: 'Stop the blood transfusion immediately and disconnect the blood tubing from the IV catheter.',
          C: 'Administer diphenhydramine 50 mg IV push as per PRN protocol.',
          D: 'Send the blood bag and tubing to the blood bank for repeat cross-matching.'
        },
        correctOption: 'B',
        rationale: {
          core: 'The primary intervention for any acute transfusion reaction is to immediately STOP the transfusion and disconnect the tubing to prevent further exposure to the offending blood product.',
          whyCorrect: 'Lower back pain, chills, fever, and dyspnea suggest an acute hemolytic transfusion reaction (ABO incompatibility). The nurse must immediately stop the infusion, disconnect the line at the hub, and maintain IV patency with a new administration set and 0.9% Normal Saline.',
          distractors: {
            A: 'Slowing the rate is unacceptable; the transfusion must be terminated completely.',
            C: 'Medication administration comes after the transfusion has been stopped.',
            D: 'Returning the unit to the lab is done later after stabilizing the patient.'
          }
        }
      },
      {
        questionText: 'When infusing packed red blood cells, which intravenous solution is the ONLY compatible fluid permitted to be co-infused through the Y-tubing?',
        options: {
          A: '0.9% Normal Saline (Sodium Chloride)',
          B: 'Lactated Ringer\'s Solution',
          C: '5% Dextrose in Water (D5W)',
          D: '0.45% Half-Normal Saline'
        },
        correctOption: 'A',
        rationale: {
          core: '0.9% Sodium Chloride (Normal Saline) is the only solution compatible with blood components.',
          whyCorrect: 'Normal Saline is isotonic. Dextrose solutions cause red blood cell clumping and hemolysis; Lactated Ringer\'s contains calcium, which binds to citrate anticoagulant and causes clot formation in the IV line.',
          distractors: {
            B: 'Lactated Ringer\'s contains calcium, causing clotting.',
            C: 'Dextrose causes hemolysis of RBCs.',
            D: 'Hypotonic solutions (0.45% NS) cause RBC swelling and lysis.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-body-mechanics-transfer',
    subjectId: 'fundamentals',
    topic: 'Patient Mobility & Body Mechanics',
    learningObjective: 'Apply principles of ergonomics and body mechanics during patient transfer.',
    difficulty: 'Easy',
    questionType: 'direct_knowledge',
    reference: 'OSHA Guidelines for Nursing Homes: Ergonomics for the Prevention of Musculoskeletal Disorders',
    variants: [
      {
        questionText: 'When lifting or transferring a semi-dependent patient from bed to wheelchair, which principle of body mechanics best protects the nurse against lumbar back injury?',
        options: {
          A: 'Keep feet close together and bend at the waist while lifting with back muscles.',
          B: 'Maintain a wide base of support, bend at the knees and hips, and hold the load close to the body.',
          C: 'Twist the torso while lifting to pivot the patient smoothly into the chair.',
          D: 'Lock the knees and use arms to pull the patient forward.'
        },
        correctOption: 'B',
        rationale: {
          core: 'A wide base of support and lowering the center of gravity by bending knees and hips utilizes large leg muscles rather than the vulnerable lumbar spine.',
          whyCorrect: 'Holding the patient close minimizes the lever arm, reducing gravitational torque on the spine. Leg muscles (quadriceps and gluteals) perform the work.',
          distractors: {
            A: 'Bending at the waist and lifting with back muscles is the leading cause of occupational disc herniation.',
            C: 'Twisting the spine while under load causes rotational shear forces on intervertebral discs.',
            D: 'Locking knees eliminates shock absorption and overtaxes back muscles.'
          }
        }
      },
      {
        questionText: 'Which patient positioning is most appropriate immediately following a percutaneous liver biopsy to prevent post-procedure hemorrhage?',
        options: {
          A: 'Left lateral Sim\'s position for 4 hours.',
          B: 'Right lateral recumbent position with a small pillow under the puncture site.',
          C: 'High Fowler\'s position with legs dependent.',
          D: 'Flat supine position with head turned to the side.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Positioning on the right side applies direct anatomical pressure against the liver puncture site via the chest wall and diaphragm.',
          whyCorrect: 'The liver is highly vascular in the right upper quadrant. Lying on the right side for at least 2 hours compresses the capsule against the rib cage, tamponading bleeding.',
          distractors: {
            A: 'Left lateral provides no pressure on the right-sided liver puncture.',
            C: 'Fowler\'s increases intra-abdominal pressure and provides no tamponade.',
            D: 'Supine does not apply direct compression to the right lateral flank puncture site.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'fon-urinary-catheter-care',
    subjectId: 'fundamentals',
    topic: 'Elimination & CAUTI Prevention',
    learningObjective: 'Demonstrate evidence-based nursing interventions for catheter-associated urinary tract infection (CAUTI) prevention.',
    difficulty: 'Moderate',
    questionType: 'safety_ethics',
    reference: 'CDC Healthcare Infection Control Practices Advisory Committee (HICPAC) CAUTI Guidelines',
    variants: [
      {
        questionText: 'To prevent Catheter-Associated Urinary Tract Infections (CAUTI) in a patient with an indwelling Foley catheter, which nursing intervention is essential?',
        options: {
          A: 'Keep the urine collection drainage bag below the level of the patient\'s bladder at all times.',
          B: 'Disconnect the drainage bag every shift to rinse the tubing with antibacterial soap.',
          C: 'Clamp the catheter for 4 hours each day to train bladder tone.',
          D: 'Routinely irrigate the catheter lumen daily with 30 mL sterile water.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Maintaining the drainage bag below bladder level prevents retrograde flow of contaminated urine back into the sterile bladder.',
          whyCorrect: 'Gravity drainage prevents stasis and reflux of microorganisms into the bladder. The closed drainage system must never be breached.',
          distractors: {
            B: 'Opening the closed system introduces environmental bacteria and directly increases CAUTI risk.',
            C: 'Clamping causes urinary stasis and bladder distension, promoting bacterial proliferation.',
            D: 'Routine catheter irrigation is contraindicated unless mechanical obstruction or gross hematuria exists.'
          }
        }
      },
      {
        questionText: 'When collecting a sterile urine specimen for culture and sensitivity from an indwelling Foley catheter, what is the correct technique?',
        options: {
          A: 'Drain 50 mL of urine directly from the bottom spigot of the collection bag.',
          B: 'Aspirate sterile urine using a syringe from the needleless sampling port after disinfecting with alcohol.',
          C: 'Disconnect the catheter from the drainage tubing and collect urine directly into a sterile cup.',
          D: 'Empty the collection bag, wait 2 hours, and pour the fresh urine into a specimen container.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Sterile urine for culture must be aspirated from the needleless sampling port after thorough antiseptic scrub.',
          whyCorrect: 'Urine sitting in the collection bag is non-sterile and colonizes with bacteria rapidly. The sampling port preserves closed-system integrity.',
          distractors: {
            A: 'Bag urine is contaminated and provides invalid culture results.',
            C: 'Disconnecting breaches the closed system and introduces pathogens.',
            D: 'Waiting for bag accumulation produces colonizing bacterial growth.'
          }
        }
      }
    ]
  }
];
