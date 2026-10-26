const fs = require('fs');
const path = require('path');

const np1Items = [
  // ==========================================
  // NP 1: FUNDAMENTALS OF NURSING (Items 1 - 15)
  // ==========================================
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Apply aseptic technique principles during invasive procedures.',
    difficulty: 'Difficult',
    questionType: 'safety_ethics',
    reference: "Kozier & Erb's Fundamentals of Nursing, 10th Ed., Ch. 31",
    stem: 'While setting up a sterile field for an indwelling catheterization in the emergency room, the nurse turns momentarily to face the lighting fixture, placing the sterile tray out of continuous visual field for 10 seconds. What is the mandatory nursing action?',
    correct: 'Discard the entire catheterization kit and establish a completely new sterile field.',
    distractors: [
      'Wipe the perimeter of the drape with 70% isopropyl alcohol and proceed.',
      'Continue the catheterization if no unsterile personnel approached the bedside.',
      'Replace only the sterile gloves and catheter lubrication tray.'
    ],
    coreRationale: 'Surgical asepsis strictly dictates that any sterile object or field out of the range of continuous visual oversight or below waist level is considered contaminated.',
    whyCorrect: 'Loss of visual contact compromises the verification of sterility; patient safety requires immediate total replacement.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Evaluate blood pressure measurement technique and cuff sizing.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Potter & Perry, Fundamentals of Nursing, 9th Ed., Ch. 29',
    stem: "A student nurse uses an adult blood pressure cuff with a bladder width covering only 25% of an obese patient's upper arm circumference. What hemodynamic error will this produce?",
    correct: 'Falsely elevated systolic and diastolic blood pressure readings.',
    distractors: [
      'Falsely decreased systolic and diastolic blood pressure readings.',
      'Falsely lowered systolic with elevated diastolic reading.',
      'No effect on blood pressure reading as long as the bell of the stethoscope is placed over the brachial pulse.'
    ],
    coreRationale: 'An undersized or narrow blood pressure cuff bladder fails to transmit pressure evenly and requires excessive inflation pressure to compress the brachial artery, causing falsely high readings.',
    whyCorrect: 'The bladder width must encircle at least 40% of the upper arm circumference and bladder length must encircle 80% to avoid artificial hypertension.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Position clients appropriately following invasive diagnostic procedures.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: "Brunner & Suddarth's Textbook of Medical-Surgical Nursing, 14th Ed.",
    stem: 'A client returns to the nursing unit following a percutaneous liver biopsy. Which anatomical position must the nurse implement immediately to prevent fatal intraperitoneal hemorrhage?',
    correct: 'Right lateral recumbent position with a firm folded towel placed under the puncture site for at least 2 to 3 hours.',
    distractors: [
      'Left Sims position with the head of the bed elevated 45 degrees.',
      'Supine position with sandbag placed over the left hypochondriac region.',
      'Trendelenburg position with knees elevated to enhance venous return.'
    ],
    coreRationale: 'Positioning the client on the right side utilizes the chest wall and abdominal organs to apply direct tamponade pressure against the puncture site in the vascular liver capsule.',
    whyCorrect: 'Right lateral decubitus positioning uses gravity and external pressure against the liver surface to promote hemostasis and avoid bleeding or biliary peritonitis.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Verify bedside nasogastric tube (NGT) placement accurately.',
    difficulty: 'Difficult',
    questionType: 'safety_ethics',
    reference: 'American Association of Critical-Care Nurses (AACN) Practice Alert on Feeding Tube Verification',
    stem: 'Before initiating bolus enteral feeding through a newly inserted small-bore nasogastric tube (NGT), which bedside method is the MOST reliable for verifying gastric placement when radiographic confirmation was already completed after insertion?',
    correct: 'Aspirating fluid and checking for a pH value of 5.5 or lower with litmus paper.',
    distractors: [
      'Auscultating a swooshing sound over the epigastrium while injecting 20 mL of air.',
      'Placing the distal end of the feeding tube in a cup of water to observe for bubbling.',
      'Asking the client to hum or speak clearly to rule out vocal cord impingement.'
    ],
    coreRationale: 'Gastric aspirate pH testing (pH <= 5.5 in fasting clients not taking acid inhibitors) is the accepted bedside verification method. Air insufflation auscultation is discredited because respiratory and esophageal placement can mimic gastric sounds.',
    whyCorrect: 'Testing aspirate pH directly confirms the acidic gastric environment.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Perform safe open endotracheal and tracheostomy suctioning.',
    difficulty: 'Difficult',
    questionType: 'safety_ethics',
    reference: "Kozier & Erb's Fundamentals of Nursing, 10th Ed., Ch. 39",
    stem: 'While suctioning a patient with a tracheostomy tube, which nursing practice is strictly contraindicated due to the risk of severe alveolar atelectasis, mucosal denudation, and cardiac arrest?',
    correct: 'Applying continuous negative suction pressure while inserting the suction catheter down into the bronchial tree.',
    distractors: [
      'Pre-oxygenating the client with 100% oxygen for 1 to 2 minutes prior to suctioning.',
      'Limiting the entire suction catheter pass to a maximum of 10 to 15 seconds.',
      'Applying intermittent suction only while gently rotating the catheter during withdrawal.'
    ],
    coreRationale: 'Applying suction during insertion deprives the lungs of residual oxygen, strips respiratory ciliated mucosa, and provokes intense vagal nerve stimulation resulting in lethal bradycardia.',
    whyCorrect: 'Suction must strictly be applied only during catheter withdrawal while rotating.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Manage acute hemolytic blood transfusion reactions.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'American Red Cross Blood Transfusion Protocol',
    stem: 'Ten minutes after the start of a packed red blood cell (PRBC) transfusion, the patient complains of sudden severe lumbar back pain, dyspnea, and chills. The temperature spikes from 37.0°C to 38.9°C. What is the nurse\'s FIRST intervention?',
    correct: 'Stop the blood transfusion immediately and disconnect the blood tubing from the venous access.',
    distractors: [
      'Slow the transfusion rate to 10 drops per minute and administer oral acetaminophen.',
      'Flush the existing blood administration set with 50 mL of 0.9% normal saline.',
      'Administer intravenous diphenhydramine (Benadryl) through the blood infusion port.'
    ],
    coreRationale: 'Severe flank/lumbar pain and sudden pyrexia during blood transfusion indicate an acute hemolytic transfusion reaction (ABO incompatibility). The immediate priority is halting the antigen-antibody destruction.',
    whyCorrect: 'The transfusion must be stopped instantly, the line disconnected at the hub, and fresh saline tubing infused to maintain venous access.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Differentiate intravenous infiltration from phlebitis.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Infusion Nurses Society (INS) Standards of Practice',
    stem: 'The nurse inspects a peripheral intravenous site on the client\'s dorsal hand and observes blanching, localized cool skin temperature, taut edema extending 4 inches around the puncture site, and cessation of IV flow. What complication is present?',
    correct: 'Intravenous catheter infiltration.',
    distractors: [
      'Intravenous catheter phlebitis.',
      'Systemic catheter-related bloodstream infection.',
      'Air embolism in the radial vein.'
    ],
    coreRationale: 'Infiltration presents with coolness, edema, pallor/blanching, and flow stoppage due to fluid leakage into extravascular tissues. Phlebitis presents with warmth, erythema, and a palpable venous cord.',
    whyCorrect: 'Coolness to touch and localized swelling are definitive diagnostic markers of IV infiltration.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Apply legal and clinical standards for physical restraints.',
    difficulty: 'Difficult',
    questionType: 'safety_ethics',
    reference: 'The Joint Commission (TJC) Restraint & Seclusion Standards; Philippine Nursing Act RA 9173',
    stem: 'A disoriented postoperative elder attempts to pull out a subclavian central venous line. The nurse applies bilateral soft wrist restraints. What is the mandatory nursing protocol regarding restraint maintenance?',
    correct: 'Release the restraints at least every 2 hours to inspect skin integrity, evaluate neurovascular status, and provide range of motion.',
    distractors: [
      'Keep restraints continuously tied for 24 hours until the physician arrives for morning rounds.',
      'Secure the restraint ties to the side rails of the bed to ensure tight immobility.',
      'Obtain a verbal restraint order that can remain valid indefinitely for the entire hospital stay.'
    ],
    coreRationale: 'Restraints require release every 2 hours for assessment of circulation, skin breakdown, and mobility exercises. Restraints must NEVER be tied to movable side rails.',
    whyCorrect: 'Periodic 2-hour release prevents nerve injury, vascular compromise, and severe ischemic necrosis.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Accurately stage pressure injuries according to NPUAP standards.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'National Pressure Injury Advisory Panel (NPIAP) Staging Guidelines',
    stem: 'A bedridden client has a sacral ulcer displaying full-thickness skin loss with visible subcutaneous adipose tissue, granulation tissue, and rolled wound edges. Neither muscle, tendon, nor bone is exposed. What is the correct pressure injury stage?',
    correct: 'Stage 3 Pressure Injury.',
    distractors: [
      'Stage 2 Pressure Injury.',
      'Stage 4 Pressure Injury.',
      'Unstageable Pressure Injury.'
    ],
    coreRationale: 'Stage 3 pressure injury involves full-thickness tissue loss where subcutaneous fat may be visible, but bone, tendon, or muscle is not exposed. Stage 4 exposes bone, tendon, or muscle.',
    whyCorrect: 'Visible subcutaneous adipose without exposed musculoskeletal fascia defines Stage 3.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Calculate intravenous infusion drop rates.',
    difficulty: 'Difficult',
    questionType: 'calculation',
    reference: "Kozier & Erb's Fundamentals of Nursing, 10th Ed., Ch. 35",
    stem: 'The physician orders 1,000 mL of 0.9% Normal Saline to infuse intravenously over 8 hours. The IV infusion set has a drop factor of 15 drops/mL. What is the correct flow rate in drops per minute (gtts/min)?',
    correct: '31 drops per minute (31.25 rounded to nearest whole drop).',
    distractors: [
      '21 drops per minute.',
      '42 drops per minute.',
      '63 drops per minute.'
    ],
    coreRationale: 'Drop rate formula = (Total Volume in mL × Drop Factor) / (Time in minutes). Here: (1,000 mL × 15 gtts/mL) / (8 × 60 min) = 15,000 / 480 = 31.25 gtts/min = 31 drops/min.',
    whyCorrect: '31 drops per minute ensures accurate 1,000 mL delivery over exactly 8 hours.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Execute safe subcutaneous low molecular weight heparin administration.',
    difficulty: 'Difficult',
    questionType: 'safety_ethics',
    reference: 'Berman & Snyder, Kozier & Erb Fundamentals of Nursing',
    stem: 'When administering Enoxaparin (Lovenox) subcutaneously into the client\'s abdomen, which action represents correct nursing technique?',
    correct: 'Leaving the prefilled manufacturer nitrogen bubble in the syringe and not aspirating prior to injection.',
    distractors: [
      'Expelling the nitrogen bubble completely from the syringe prior to piercing the skin.',
      'Aspirating vigorously for blood return before depressing the syringe plunger.',
      'Massaging the injection site vigorously with an alcohol sponge for 60 seconds post-injection.'
    ],
    coreRationale: 'The air bubble in prefilled Lovenox syringes must NOT be expelled; it seals the medication in the subcutaneous pocket and prevents tracking. Aspirating or massaging causes hematoma and tissue bruising.',
    whyCorrect: 'Retaining the nitrogen bubble and avoiding aspiration/massage ensures proper tissue deposition without capillary shearing.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Interpret post-lumbar puncture positioning and care.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: "Brunner & Suddarth's Textbook of Medical-Surgical Nursing",
    stem: 'Following an uneventful diagnostic lumbar puncture, what position must the nurse maintain for the adult client to prevent debilitating post-dural puncture headache?',
    correct: 'Flat supine position without a head pillow for at least 4 to 6 hours.',
    distractors: [
      'High Fowler position with legs dangling over the bed edge.',
      'Trendelenburg position at a 30-degree tilt.',
      'Prone position with a pillow beneath the cervical spine.'
    ],
    coreRationale: 'Remaining flat supine maintains equal hydrostatic CSF pressure along the spinal canal and minimizes CSF leakage through the dural puncture site, preventing low-pressure spinal headaches.',
    whyCorrect: 'The recumbent supine position seals the dural hole and prevents CSF hypovolemia in the cerebral ventricles.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Recognize stages of the grieving process according to Kübler-Ross.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: "Kübler-Ross Grieving Framework; Kozier & Erb's Fundamentals of Nursing",
    stem: 'A client newly diagnosed with stage IV non-small cell lung cancer states, "The hospital laboratory switched my biopsy slides with someone else\'s. My lungs are completely healthy." Which grief response is demonstrated?',
    correct: 'Denial.',
    distractors: [
      'Projection.',
      'Bargaining.',
      'Depression.'
    ],
    coreRationale: 'Denial is the initial defense mechanism in the Kübler-Ross model where the individual refuses to believe the reality of the loss or diagnosis to buffer sudden psychological shock.',
    whyCorrect: 'Refusing to acknowledge the biopsy report as one\'s own represents classic denial.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Select appropriate oxygen delivery devices based on required FiO2 precision.',
    difficulty: 'Difficult',
    questionType: 'prioritization',
    reference: 'American Association for Respiratory Care (AARC) Clinical Practice Guidelines',
    stem: 'A client with acute exacerbation of severe Chronic Obstructive Pulmonary Disease (COPD) requires an exact, non-fluctuating FiO2 of 28% to prevent suppression of hypoxic respiratory drive. Which oxygen delivery device is indicated?',
    correct: 'Venturi Mask (air-entrainment mask).',
    distractors: [
      'Standard Nasal Cannula at 4 liters per minute.',
      'Non-Rebreather Mask with reservoir bag fully inflated.',
      'Simple Face Mask at 6 liters per minute.'
    ],
    coreRationale: 'The Venturi mask is a high-flow delivery system that mixes atmospheric room air with oxygen through color-coded entrainment ports to deliver a precise, fixed concentration of FiO2 regardless of client ventilatory pattern.',
    whyCorrect: 'Venturi masks provide the highest precision for COPD clients vulnerable to hypercapnic respiratory arrest.'
  },
  {
    subtopicId: 'np1_fon',
    practiceId: 'np1',
    topic: 'Fundamentals of Nursing Practice',
    learningObjective: 'Apply surgical hand scrub asepsis standards.',
    difficulty: 'Moderate',
    questionType: 'safety_ethics',
    reference: 'Association of periOperative Registered Nurses (AORN) Surgical Hand Antisepsis Guidelines',
    stem: 'During surgical hand antisepsis before scrub-in, how must the scrub nurse hold her hands and forearms during scrubbing and rinsing under running water?',
    correct: 'Hands held constantly above the level of the elbows so water drains from fingertips down to elbows.',
    distractors: [
      'Hands held downward below the waist so water drains freely from elbows down to fingers.',
      'Hands and elbows held horizontally at shoulder level with forearms flexed.',
      'Hands positioned palms together at the level of the mid-abdomen.'
    ],
    coreRationale: 'Water and soap lather must flow by gravity from the cleanest area (the fingertips) toward the less clean area (the elbows) to prevent contamination of the surgical hands.',
    whyCorrect: 'Keeping hands elevated above elbows ensures directional flow from cleanest to dirtiest anatomy.'
  }
];

// Write modular NP1 file
const content = `import { RawExamItem } from './types';

export const NP1_QUESTIONS: RawExamItem[] = ${JSON.stringify(np1Items, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/practices/np1Questions.ts'), content, 'utf8');
console.log('NP 1 Questions initialized (Items 1 - 15).');
