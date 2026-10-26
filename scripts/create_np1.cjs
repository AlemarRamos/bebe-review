const fs = require('fs');
const path = require('path');

// Generates 100 UNIQUE, TRICKY, NON-REDUNDANT Board Questions for NP 1
// 15 np1_fon, 30 np1_chn1, 30 np1_chn2, 25 np1_cd_imci
const items = [];

function addItem(subtopicId, topic, learningObjective, difficulty, questionType, reference, stem, correct, distractors, coreRationale, whyCorrect) {
  items.push({
    subtopicId,
    practiceId: 'np1',
    topic,
    learningObjective,
    difficulty,
    questionType,
    reference,
    stem,
    correct,
    distractors,
    coreRationale,
    whyCorrect
  });
}

// ==========================================
// NP 1: FUNDAMENTALS (15 Items: 1 - 15)
// ==========================================
addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Apply aseptic technique principles during invasive procedures.',
  'Difficult',
  'safety_ethics',
  "Kozier & Erb's Fundamentals of Nursing, 10th Ed., Ch. 31",
  'While setting up a sterile field for an indwelling catheterization in the emergency room, the nurse turns momentarily to face the lighting fixture, placing the sterile tray out of continuous visual field for 10 seconds. What is the mandatory nursing action?',
  'Discard the entire catheterization kit and establish a completely new sterile field.',
  [
    'Wipe the perimeter of the drape with 70% isopropyl alcohol and proceed.',
    'Continue the catheterization if no unsterile personnel approached the bedside.',
    'Replace only the sterile gloves and catheter lubrication tray.'
  ],
  'Surgical asepsis strictly dictates that any sterile object or field out of the range of continuous visual oversight or below waist level is considered contaminated.',
  'Loss of visual contact compromises the verification of sterility; patient safety requires immediate total replacement.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Evaluate blood pressure measurement technique and cuff sizing.',
  'Moderate',
  'clinical_scenario',
  'Potter & Perry, Fundamentals of Nursing, 9th Ed., Ch. 29',
  "A student nurse uses an adult blood pressure cuff with a bladder width covering only 25% of an obese patient's upper arm circumference. What hemodynamic error will this produce?",
  'Falsely elevated systolic and diastolic blood pressure readings.',
  [
    'Falsely decreased systolic and diastolic blood pressure readings.',
    'Falsely lowered systolic with elevated diastolic reading.',
    'No effect on blood pressure reading as long as the bell of the stethoscope is placed over the brachial pulse.'
  ],
  'An undersized or narrow blood pressure cuff bladder fails to transmit pressure evenly and requires excessive inflation pressure to compress the brachial artery, causing falsely high readings.',
  'The bladder width must encircle at least 40% of the upper arm circumference and bladder length must encircle 80% to avoid artificial hypertension.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Position clients appropriately following invasive diagnostic procedures.',
  'Difficult',
  'prioritization',
  "Brunner & Suddarth's Textbook of Medical-Surgical Nursing, 14th Ed.",
  'A client returns to the nursing unit following a percutaneous liver biopsy. Which anatomical position must the nurse implement immediately to prevent fatal intraperitoneal hemorrhage?',
  'Right lateral recumbent position with a firm folded towel placed under the puncture site for at least 2 to 3 hours.',
  [
    'Left Sims position with the head of the bed elevated 45 degrees.',
    'Supine position with sandbag placed over the left hypochondriac region.',
    'Trendelenburg position with knees elevated to enhance venous return.'
  ],
  'Positioning the client on the right side utilizes the chest wall and abdominal organs to apply direct tamponade pressure against the puncture site in the vascular liver capsule.',
  'Right lateral decubitus positioning uses gravity and external pressure against the liver surface to promote hemostasis and avoid bleeding or biliary peritonitis.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Verify bedside nasogastric tube (NGT) placement accurately.',
  'Difficult',
  'safety_ethics',
  'American Association of Critical-Care Nurses (AACN) Practice Alert on Feeding Tube Verification',
  'Before initiating bolus enteral feeding through a newly inserted small-bore nasogastric tube (NGT), which bedside method is the MOST reliable for verifying gastric placement when radiographic confirmation was already completed after insertion?',
  'Aspirating fluid and checking for a pH value of 5.5 or lower with litmus paper.',
  [
    'Auscultating a swooshing sound over the epigastrium while injecting 20 mL of air.',
    'Placing the distal end of the feeding tube in a cup of water to observe for bubbling.',
    'Asking the client to hum or speak clearly to rule out vocal cord impingement.'
  ],
  'Gastric aspirate pH testing (pH <= 5.5 in fasting clients not taking acid inhibitors) is the accepted bedside verification method. Air insufflation auscultation is discredited because respiratory and esophageal placement can mimic gastric sounds.',
  'Testing aspirate pH directly confirms the acidic gastric environment.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Perform safe open endotracheal and tracheostomy suctioning.',
  'Difficult',
  'safety_ethics',
  "Kozier & Erb's Fundamentals of Nursing, 10th Ed., Ch. 39",
  'While suctioning a patient with a tracheostomy tube, which nursing practice is strictly contraindicated due to the risk of severe alveolar atelectasis, mucosal denudation, and cardiac arrest?',
  'Applying continuous negative suction pressure while inserting the suction catheter down into the bronchial tree.',
  [
    'Pre-oxygenating the client with 100% oxygen for 1 to 2 minutes prior to suctioning.',
    'Limiting the entire suction catheter pass to a maximum of 10 to 15 seconds.',
    'Applying intermittent suction only while gently rotating the catheter during withdrawal.'
  ],
  'Applying suction during insertion deprives the lungs of residual oxygen, strips respiratory ciliated mucosa, and provokes intense vagal nerve stimulation resulting in lethal bradycardia.',
  'Suction must strictly be applied only during catheter withdrawal while rotating.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Manage acute hemolytic blood transfusion reactions.',
  'Difficult',
  'prioritization',
  'American Red Cross Blood Transfusion Protocol',
  'Ten minutes after the start of a packed red blood cell (PRBC) transfusion, the patient complains of sudden severe lumbar back pain, dyspnea, and chills. The temperature spikes from 37.0°C to 38.9°C. What is the nurse\'s FIRST intervention?',
  'Stop the blood transfusion immediately and disconnect the blood tubing from the venous access.',
  [
    'Slow the transfusion rate to 10 drops per minute and administer oral acetaminophen.',
    'Flush the existing blood administration set with 50 mL of 0.9% normal saline.',
    'Administer intravenous diphenhydramine (Benadryl) through the blood infusion port.'
  ],
  'Severe flank/lumbar pain and sudden pyrexia during blood transfusion indicate an acute hemolytic transfusion reaction (ABO incompatibility). The immediate priority is halting the antigen-antibody destruction.',
  'The transfusion must be stopped instantly, the line disconnected at the hub, and fresh saline tubing infused to maintain venous access.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Differentiate intravenous infiltration from phlebitis.',
  'Moderate',
  'clinical_scenario',
  'Infusion Nurses Society (INS) Standards of Practice',
  'The nurse inspects a peripheral intravenous site on the client\'s dorsal hand and observes blanching, localized cool skin temperature, taut edema extending 4 inches around the puncture site, and cessation of IV flow. What complication is present?',
  'Intravenous catheter infiltration.',
  [
    'Intravenous catheter phlebitis.',
    'Systemic catheter-related bloodstream infection.',
    'Air embolism in the radial vein.'
  ],
  'Infiltration presents with coolness, edema, pallor/blanching, and flow stoppage due to fluid leakage into extravascular tissues. Phlebitis presents with warmth, erythema, and a palpable venous cord.',
  'Coolness to touch and localized swelling are definitive diagnostic markers of IV infiltration.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Apply legal and clinical standards for physical restraints.',
  'Difficult',
  'safety_ethics',
  'The Joint Commission (TJC) Restraint & Seclusion Standards; Philippine Nursing Act RA 9173',
  'A disoriented postoperative elder attempts to pull out a subclavian central venous line. The nurse applies bilateral soft wrist restraints. What is the mandatory nursing protocol regarding restraint maintenance?',
  'Release the restraints at least every 2 hours to inspect skin integrity, evaluate neurovascular status, and provide range of motion.',
  [
    'Keep restraints continuously tied for 24 hours until the physician arrives for morning rounds.',
    'Secure the restraint ties to the side rails of the bed to ensure tight immobility.',
    'Obtain a verbal restraint order that can remain valid indefinitely for the entire hospital stay.'
  ],
  'Restraints require release every 2 hours for assessment of circulation, skin breakdown, and mobility exercises. Restraints must NEVER be tied to movable side rails.',
  'Periodic 2-hour release prevents nerve injury, vascular compromise, and severe ischemic necrosis.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Accurately stage pressure injuries according to NPUAP standards.',
  'Moderate',
  'clinical_scenario',
  'National Pressure Injury Advisory Panel (NPIAP) Staging Guidelines',
  'A bedridden client has a sacral ulcer displaying full-thickness skin loss with visible subcutaneous adipose tissue, granulation tissue, and rolled wound edges. Neither muscle, tendon, nor bone is exposed. What is the correct pressure injury stage?',
  'Stage 3 Pressure Injury.',
  [
    'Stage 2 Pressure Injury.',
    'Stage 4 Pressure Injury.',
    'Unstageable Pressure Injury.'
  ],
  'Stage 3 pressure injury involves full-thickness tissue loss where subcutaneous fat may be visible, but bone, tendon, or muscle is not exposed. Stage 4 exposes bone, tendon, or muscle.',
  'Visible subcutaneous adipose without exposed musculoskeletal fascia defines Stage 3.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Calculate intravenous infusion drop rates.',
  'Difficult',
  'calculation',
  "Kozier & Erb's Fundamentals of Nursing, 10th Ed., Ch. 35",
  'The physician orders 1,000 mL of 0.9% Normal Saline to infuse intravenously over 8 hours. The IV infusion set has a drop factor of 15 drops/mL. What is the correct flow rate in drops per minute (gtts/min)?',
  '31 drops per minute (31.25 rounded to nearest whole drop).',
  [
    '21 drops per minute.',
    '42 drops per minute.',
    '63 drops per minute.'
  ],
  'Drop rate formula = (Total Volume in mL × Drop Factor) / (Time in minutes). Here: (1,000 mL × 15 gtts/mL) / (8 × 60 min) = 15,000 / 480 = 31.25 gtts/min = 31 drops/min.',
  '31 drops per minute ensures accurate 1,000 mL delivery over exactly 8 hours.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Execute safe subcutaneous low molecular weight heparin administration.',
  'Difficult',
  'safety_ethics',
  'Berman & Snyder, Kozier & Erb Fundamentals of Nursing',
  'When administering Enoxaparin (Lovenox) subcutaneously into the client\'s abdomen, which action represents correct nursing technique?',
  'Leaving the prefilled manufacturer nitrogen bubble in the syringe and not aspirating prior to injection.',
  [
    'Expelling the nitrogen bubble completely from the syringe prior to piercing the skin.',
    'Aspirating vigorously for blood return before depressing the syringe plunger.',
    'Massaging the injection site vigorously with an alcohol sponge for 60 seconds post-injection.'
  ],
  'The air bubble in prefilled Lovenox syringes must NOT be expelled; it seals the medication in the subcutaneous pocket and prevents tracking. Aspirating or massaging causes hematoma and tissue bruising.',
  'Retaining the nitrogen bubble and avoiding aspiration/massage ensures proper tissue deposition without capillary shearing.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Interpret post-lumbar puncture positioning and care.',
  'Moderate',
  'clinical_scenario',
  "Brunner & Suddarth's Textbook of Medical-Surgical Nursing",
  'Following an uneventful diagnostic lumbar puncture, what position must the nurse maintain for the adult client to prevent debilitating post-dural puncture headache?',
  'Flat supine position without a head pillow for at least 4 to 6 hours.',
  [
    'High Fowler position with legs dangling over the bed edge.',
    'Trendelenburg position at a 30-degree tilt.',
    'Prone position with a pillow beneath the cervical spine.'
  ],
  'Remaining flat supine maintains equal hydrostatic CSF pressure along the spinal canal and minimizes CSF leakage through the dural puncture site, preventing low-pressure spinal headaches.',
  'The recumbent supine position seals the dural hole and prevents CSF hypovolemia in the cerebral ventricles.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Recognize stages of the grieving process according to Kübler-Ross.',
  'Moderate',
  'clinical_scenario',
  "Kübler-Ross Grieving Framework; Kozier & Erb's Fundamentals of Nursing",
  'A client newly diagnosed with stage IV non-small cell lung cancer states, "The hospital laboratory switched my biopsy slides with someone else\'s. My lungs are completely healthy." Which grief response is demonstrated?',
  'Denial.',
  [
    'Projection.',
    'Bargaining.',
    'Depression.'
  ],
  'Denial is the initial defense mechanism in the Kübler-Ross model where the individual refuses to believe the reality of the loss or diagnosis to buffer sudden psychological shock.',
  'Refusing to acknowledge the biopsy report as one\'s own represents classic denial.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Select appropriate oxygen delivery devices based on required FiO2 precision.',
  'Difficult',
  'prioritization',
  'American Association for Respiratory Care (AARC) Clinical Practice Guidelines',
  'A client with acute exacerbation of severe Chronic Obstructive Pulmonary Disease (COPD) requires an exact, non-fluctuating FiO2 of 28% to prevent suppression of hypoxic respiratory drive. Which oxygen delivery device is indicated?',
  'Venturi Mask (air-entrainment mask).',
  [
    'Standard Nasal Cannula at 4 liters per minute.',
    'Non-Rebreather Mask with reservoir bag fully inflated.',
    'Simple Face Mask at 6 liters per minute.'
  ],
  'The Venturi mask is a high-flow delivery system that mixes atmospheric room air with oxygen through color-coded entrainment ports to deliver a precise, fixed concentration of FiO2 regardless of client ventilatory pattern.',
  'Venturi masks provide the highest precision for COPD clients vulnerable to hypercapnic respiratory arrest.'
);

addItem(
  'np1_fon',
  'Fundamentals of Nursing Practice',
  'Apply surgical hand scrub asepsis standards.',
  'Moderate',
  'safety_ethics',
  'Association of periOperative Registered Nurses (AORN) Surgical Hand Antisepsis Guidelines',
  'During surgical hand antisepsis before scrub-in, how must the scrub nurse hold her hands and forearms during scrubbing and rinsing under running water?',
  'Hands held constantly above the level of the elbows so water drains from fingertips down to elbows.',
  [
    'Hands held downward below the waist so water drains freely from elbows down to fingers.',
    'Hands and elbows held horizontally at shoulder level with forearms flexed.',
    'Hands positioned palms together at the level of the mid-abdomen.'
  ],
  'Water and soap lather must flow by gravity from the cleanest area (the fingertips) toward the less clean area (the elbows) to prevent contamination of the surgical hands.',
  'Keeping hands elevated above elbows ensures directional flow from cleanest to dirtiest anatomy.'
);

// ==========================================
// NP 1: CHN 1 (30 Items: 16 - 45)
// ==========================================
const chn1Data = [
  [
    'In executing the Public Health Bag Technique during a home visit in a rural barangay, what is the rationale for placing a paper lining on the family table before opening the public health nursing bag?',
    'To create a designated clean working barrier and prevent contamination of the bag and equipment from unverified household table surfaces.',
    [
      'To ensure that the table surface becomes surgically sterile for dressing changes.',
      'To prevent the public health bag from staining the client\'s personal furniture.',
      'To satisfy hospital accreditation standards for inpatient home wards.'
    ],
    'The paper lining serves as an environmental barrier; its outer surface contacts the household table while the inner surface remains clean for instruments.',
    'Establishing a designated clean barrier prevents cross-contamination between patient residences.'
  ],
  [
    'During the execution of the PHN Bag Technique, at what specific sequence must the community nurse perform handwashing with liquid soap and water from the bag?',
    'Immediately after opening the bag to remove the handwashing equipment (soap, hand towel, apron), before touching any other clinical articles.',
    [
      'Prior to walking into the family residence gate.',
      'Only after completing the physical examination and wound dressing.',
      'Right before returning the bag to the rural health unit vehicle.'
    ],
    'Handwashing must be performed after opening the bag and removing the soap dish, paper towel, and apron, prior to accessing sterile or clinical articles inside.',
    'Proper handwashing sequence protects inner diagnostic instruments from flora acquired during travel.'
  ],
  [
    'When cleansing an oral glass clinical thermometer after taking the temperature of a bedridden postpartum mother at home, what is the correct technique?',
    'Wipe with a firm rotational motion using a 70% alcohol-moistened cotton ball from the clean stem toward the contaminated bulb, then discard the cotton.',
    [
      'Wipe from the contaminated bulb toward the clean stem in a back-and-forth sawing motion.',
      'Soak the entire thermometer in hot boiling water for 15 minutes inside the client\'s kitchen.',
      'Rinse the thermometer with tap water and place it immediately back into the velvet lining of the bag.'
    ],
    'After use, the bulb is the most contaminated part. The thermometer is wiped from the least contaminated area (stem) toward the most contaminated area (bulb). Before use, it is wiped from bulb to stem.',
    'Cleaning from least contaminated to most contaminated prevents spreading pathogens over clean surfaces.'
  ],
  [
    'A rural health nurse has 4 scheduled home visits in Barangay San Jose today. Which client must the nurse visit FIRST according to community prioritization principles?',
    'A 3-day-old newborn discharged yesterday who is lethargic, has a rectal temperature of 38.8°C, and has umbilical cord stump foul-smelling purulent drainage.',
    [
      'A 68-year-old hypertensive client on maintenance Losartan requesting routine blood pressure recheck.',
      'A primigravida mother at 28 weeks gestation scheduled for a monthly routine prenatal abdominal measurement.',
      'A 45-year-old construction worker with a healing clean superficial leg laceration scheduled for stitch removal.'
    ],
    'Acute, unstable life-threatening neonatal infections (omphalitis with neonatal sepsis risk) take absolute clinical priority over routine chronic and maintenance visits.',
    'Immediate assessment of neonatal septicemia is vital to prevent rapid deterioration and mortality.'
  ],
  [
    'In the Family Coping Index used in Philippine Public Health Nursing, a family that consistently seeks prenatal care, immunizes their children on schedule, and maintains a clean home environment would receive what qualitative rating?',
    'High Coping Capacity (Rating of 5) - The family has adequate knowledge and resources to manage their health tasks competently.',
    [
      'Moderate Coping Capacity (Rating of 3) - The family needs continuous nursing oversight to function.',
      'Low Coping Capacity (Rating of 1) - The family is completely unable to handle basic health activities.',
      'Critical Coping Deficit (Rating of 0) - The family is in total breakdown requiring legal intervention.'
    ],
    'The Family Coping Index rates family capacity on 9 dimensions from 1 (low/incompetent) to 5 (high/competent). Proactive preventive utilization indicates high coping.',
    'Demonstrated competence in preventive health tasks aligns with a high rating of 5 on the Family Coping Index.'
  ],
  [
    'In the Family Nursing Care Plan (FNCP), which of the following categorized health conditions exemplifies a "Health Threat" in a low-income urban household?',
    'A family storing open unlabelled plastic containers of chlorinated organophosphate pesticides right beneath their kitchen food preparation table.',
    [
      'A 12-year-old child diagnosed with pulmonary tuberculosis who has defaulted from DOTS therapy for 3 weeks.',
      'The sudden death of the sole family breadwinner due to acute myocardial infarction.',
      'An unwed 17-year-old daughter who just discovered she is 8 weeks pregnant.'
    ],
    'A Health Threat is a condition that fosters disease, accident, or failure to realize health potential (e.g., toxic chemical storage, fire hazard, incomplete immunizations). Active illness is a Deficit; death/pregnancy is a Foreseeable Crisis.',
    'Pesticide exposure is an environmental health threat with high accident and poisoning potential.'
  ],
  [
    'Which scenario represents a "Health Deficit" in the Family Nursing Assessment?',
    'A 52-year-old father who sustained a cerebrovascular accident resulting in right-sided hemiplegia and expressive aphasia, receiving no physical rehabilitation.',
    [
      'A family living in a wooden shanty with exposed dangling electrical wires.',
      'A newly married couple preparing for the birth of their first child in 2 months.',
      'A family with a history of hypertension whose members consume high-sodium dried fish daily but have normal blood pressure.'
    ],
    'A Health Deficit represents instances of failure in health maintenance, existing illness, developmental lag, or disability. Active hemiplegia is an established deficit.',
    'Established neurological impairment and disability constitute a direct health deficit.'
  ],
  [
    'A public health nurse identifies that a family has a 16-year-old high school student who recently passed the entrance examination for university and will move to Manila. How should this be classified in the Family Health Assessment?',
    'Foreseeable Crisis / Stress Point - an anticipated developmental transition that demands family adjustment.',
    [
      'Health Deficit - a loss of family integrity and labor capability.',
      'Health Threat - an immediate danger to community sanitation.',
      'Family Maladaptation Syndrome - failure of indigenous family values.'
    ],
    'Foreseeable crises or stress points are anticipated periods of unusual demand on the family such as marriage, parenthood, graduation, entrance to school, or relocation.',
    'Developmental milestones and educational transitions are classic foreseeable crises.'
  ],
  [
    'During the Second Level Assessment of a family whose 3-year-old child is severely underweight, the nurse identifies that the mother feeds the child mostly diluted condensed milk because she believes "condensed milk is rich in cream and vitamins." How is this nursing problem formulated?',
    'Inability to provide adequate nutritional care to the child due to lack of knowledge regarding balanced toddler nutrition and nutritional value of milk.',
    [
      'Inability to recognize the presence of malnutrition due to ignorance and cultural stubbornness.',
      'Inability to utilize community health resources due to deep-seated fatalism (Bahala na).',
      'Inability to maintain a healthy home environment due to economic deprivation.'
    ],
    'Second level assessment defines the underlying reason for the family’s inability to perform health tasks; here, the mother lacks correct knowledge regarding food values.',
    'Misunderstanding nutritional content reflects an inability to provide adequate care secondary to knowledge deficit.'
  ],
  [
    'When prioritizing family health problems using the Maglaya Prioritization Matrix, what is the weight assigned to the criterion "Modifiability of the Problem"?',
    'Weight of 2 (Scored as 2 for easily modifiable, 1 for partially modifiable, 0 for not modifiable).',
    [
      'Weight of 1 (Scored 1 to 3).',
      'Weight of 3 (Scored 0 to 5).',
      'Weight of 4 (Fixed constant).'
    ],
    'In Maglaya’s priority setting criteria: Nature of problem has weight 1; Modifiability has weight 2; Preventive potential has weight 1; Salience has weight 1.',
    'Modifiability carries the highest weight of 2 because it reflects probability of success with nursing interventions.'
  ],
  [
    'In the prioritization matrix for a family with multiple health problems, a grandmother with chronic uncontrolled hypertension who refuses to take medications because "I feel no pain, so I have no sickness" receives what Salience score?',
    'Score of 0 - The condition is not felt or not perceived by the client/family as a problem requiring attention.',
    [
      'Score of 2 - A serious condition needing immediate attention.',
      'Score of 1 - A problem recognized but not needing urgent attention.',
      'Score of 3 - A life-threatening emergent crisis.'
    ],
    'Salience evaluates family perception: 2 = problem needing immediate attention; 1 = recognized problem not needing immediate attention; 0 = not felt as a problem.',
    'Denial of illness and feeling asymptomatic yields a salience score of 0.'
  ],
  [
    'Under the Department of Health (DOH) Traditional Health Program, what is the approved clinical indication for the herbal plant Akapulko (Cassia alata)?',
    'Treatment of superficial fungal skin infections such as ringworm (Tinea corporis), athlete\'s foot (Tinea pedis), and Tinea flava.',
    [
      'Lowers elevated systolic blood pressure and serum cholesterol.',
      'Relieves acute bronchial asthma spasms as an expectorant.',
      'Dissolves calcium oxalate nephrolithiasis and promotes diuresis.'
    ],
    'Akapulko contains chrysophanic acid, a potent natural antifungal agent approved by DOH for ringworm and fungal dermatomycoses.',
    'Crushed fresh leaves applied topically provide proven antifungal action.'
  ],
  [
    'Which DOH-approved medicinal plant has proven scientific efficacy in lowering fasting blood glucose in clients with mild, non-insulin dependent Type 2 Diabetes Mellitus?',
    'Ampalaya / Bitter Gourd (Momordica charantia).',
    [
      'Bawang / Garlic (Allium sativum).',
      'Bayabas / Guava (Psidium guajava).',
      'Yerba Buena / Peppermint (Clinopodium douglasii).'
    ],
    'Ampalaya contains charantin, vicine, and polypeptide-p, which act as plant insulins that enhance peripheral glucose uptake.',
    'Ampalaya leaves prepared as decoction or steamed are DOH-endorsed for supplementary glycemic control.'
  ],
  [
    'What is the DOH clinical indication and preparation advice for Bawang (Allium sativum) in primary community health care?',
    'Helps lower mild hypertension and serum cholesterol; best consumed as fresh cloves lightly toasted or eaten with meals, not on an empty stomach.',
    [
      'Topical treatment of open infected surgical incisions.',
      'Pediatric oral deworming for pinworm and hookworm infestations.',
      'Immediate sublingual antidote for acute myocardial infarction.'
    ],
    'Bawang contains allicin, which exhibits mild antiplatelet, vasorelaxant, and lipid-lowering properties. It should be taken with food to avoid gastric irritation.',
    'Allicin in garlic supports vascular dilation and lipid reduction.'
  ],
  [
    'A mother in a remote upland sitio asks the community nurse how to prepare Bayabas (Psidium guajava) leaves for her teenage son\'s newly circumcised wound. What is the correct nursing instruction?',
    'Boil washed young guava leaves in water for 15 minutes, cool to lukewarm, and use as an antiseptic wash for wound cleansing.',
    [
      'Crush raw leaves and pack the raw pulpy paste directly inside the open wound edges.',
      'Drink 3 glasses of concentrated hot bayabas tea every 4 hours as a systemic antibiotic.',
      'Burn the dried leaves to ash and sprinkle the black carbon over the foreskin.'
    ],
    'Bayabas leaves have high tannin content with proven astringent and antiseptic properties. A boiled leaf decoction is used externally as a wash.',
    'Warm decoction wash provides topical astringent and antiseptic benefits without introducing raw contaminants.'
  ],
  [
    'What are the primary therapeutic indications for the DOH-approved herbal plant Lagundi (Vitex negundo)?',
    'Relief of coughs, common colds, flu, and mild to moderate bronchial asthma as an anti-inflammatory and bronchodilator.',
    [
      'Dissolution of kidney stones and reduction of peripheral dependent edema.',
      'Eradication of intestinal roundworms (Ascaris lumbricoides).',
      'Topical treatment of scabies and pediculosis capitis.'
    ],
    'Lagundi contains flavonoids that inhibit leukotriene release, functioning as a clinically proven bronchodilator, antitussive, and antipyretic.',
    'Lagundi is manufactured into pharmaceutical syrups and tablets for respiratory complaints.'
  ],
  [
    'When educating mothers on the anthelmintic use of Niyog-niyogan (Quisqualis indica) for pediatric ascariasis, which safety rule is VITAL to prevent dangerous toxicity?',
    'Administer only mature, dried seeds taken 2 hours after supper; strictly limit dosage based on child age (4-7 yrs: 4 seeds; 8-9 yrs: 6 seeds; 10-12 yrs: 7 seeds).',
    [
      'Boil 50 green immature seeds in vinegar and drink on an empty morning stomach.',
      'Crush 25 seeds and mix with condensed milk for infants under 6 months of age.',
      'Repeat the maximum adult dose twice daily for 7 consecutive days.'
    ],
    'Niyog-niyogan seeds contain quisqualic acid. Overdosage causes severe vomiting, hiccups, and central nervous depression; strict seed counts and age limits apply.',
    'Strict adherence to age-specific seed limits prevents acute quisqualic neurotoxicity and gastrointestinal distress.'
  ],
  [
    'Which DOH-approved herbal plant is prescribed for its diuretic action and ability to aid in the dissolution and expulsion of small urinary calcium oxalate stones (urolithiasis)?',
    'Sambong (Blumea balsamifera).',
    [
      'Tsaang Gubat (Carmona retusa).',
      'Ulasimang Bato (Peperomia pellucida).',
      'Akapulko (Cassia alata).'
    ],
    'Sambong is a clinically validated herbal diuretic that prevents urinary calculus formation and facilitates passage of renal calculi < 5 mm.',
    'Sambong is formulated as a DOH-approved tablet and decoction for mild urolithiasis and edema.'
  ],
  [
    'What is the primary therapeutic use for Tsaang Gubat (Carmona retusa / Ehretia microphylla)?',
    'Relief of gastrointestinal spasms, stomach ache, abdominal cramps, and acute non-bloody diarrhea.',
    [
      'Reduction of high serum uric acid in acute gout flares.',
      'Control of fasting hyperglycemia in pregnant gestational diabetics.',
      'Topical treatment of severe tinea capitis scalp lesions.'
    ],
    'Tsaang Gubat contains rosmarinic acid and triterpenes that act as smooth muscle antispasmodics, soothing colicky abdominal distress.',
    'Tsaang Gubat is the DOH plant of choice for functional intestinal cramping and diarrhea.'
  ],
  [
    'A 55-year-old male presents at the Rural Health Unit with acute painful swelling of the right first metatarsophalangeal joint (great toe) and elevated uric acid. Which DOH herbal plant is indicated as an adjunct to lower uric acid levels?',
    'Ulasimang Bato / Pansit-pansitan (Peperomia pellucida).',
    [
      'Akapulko (Cassia alata).',
      'Niyog-niyogan (Quisqualis indica).',
      'Sambong (Blumea balsamifera).'
    ],
    'Ulasimang Bato exhibits xanthine oxidase inhibitory activity, helping reduce circulating uric acid and relieving joint inflammation in gout.',
    'Pansit-pansitan leaves prepared fresh as salad or decoction alleviate hyperuricemia.'
  ],
  [
    'What is the clinical indication of Yerba Buena (Clinopodium douglasii / Mentha cordifolia) in primary care?',
    'Relief of body aches, joint pain, toothache, and menstrual cramps as a natural analgesic and antispasmodic.',
    [
      'Eradication of intestinal tapeworm (Taenia saginata).',
      'Treatment of multi-drug resistant pulmonary tuberculosis.',
      'Emergency management of severe postpartum hemorrhage.'
    ],
    'Yerba Buena (marsh mint) contains menthol and pulegone, exerting analgesic and muscle-relaxing effects for somatic pain.',
    'Yerba Buena functions as an effective mild-to-moderate analgesic.'
  ],
  [
    'When teaching a family the scientific method of preparing an herbal decoction at home, which instruction is CRITICAL?',
    'Boil the leaves in water in an uncovered pot over low fire until the liquid is reduced by half; never use metallic aluminum pots.',
    [
      'Boil the leaves tightly covered in an aluminum pressure cooker for 2 hours.',
      'Add concentrated bleach to the decoction to sterilize any soil bacteria.',
      'Store the cooked herbal decoction at room temperature for up to 30 days.'
    ],
    'Decoctions should be prepared in enamel or clay pots (palayok) with the lid open over gentle flame to allow volatile toxic compounds to escape; metal pots can react chemically with plant tannins.',
    'Uncovered simmering in clay/enamel pots ensures volatile dispersion and prevents metallic contamination.'
  ],
  [
    'In an evacuation center following a severe typhoon, the municipal water pipeline is destroyed. What is the MINIMUM duration of rolling boil required to make flood-contaminated stream water safe for drinking?',
    'Maintain a continuous vigorous rolling boil for at least 2 to 3 full minutes (or up to 5 minutes at high altitudes).',
    [
      'Bring water to a simmer until tiny bubbles appear on the bottom for 10 seconds.',
      'Boil for 20 minutes continuously while adding table salt.',
      'Heat the water until warm to the touch (40°C) and let it stand overnight.'
    ],
    'WHO and DOH recommend that clear water be brought to a vigorous rolling boil for at least 1 to 3 minutes to kill all vegetative pathogens, cysts, and enteric viruses.',
    'Continuous rolling boil for 2-3 minutes eliminates Vibrio cholerae, Salmonella, and Giardia cysts.'
  ],
  [
    'If boiling is impossible in a remote disaster zone, how should the nurse instruct community leaders to disinfect clear water using standard household 5% liquid chlorine bleach (sodium hypochlorite)?',
    'Add 2 drops of 5% chlorine bleach per 1 liter (or 8 drops per gallon) of clear water, stir thoroughly, and allow it to stand undisturbed for 30 minutes before drinking.',
    [
      'Add 1 full cup of chlorine bleach per 1 liter of water and drink immediately.',
      'Add 2 tablespoons of bleach per glass of water with ice.',
      'Pour bleach on top without stirring and consume within 5 minutes.'
    ],
    'Two drops of 5% sodium hypochlorite per liter of clear water achieves the necessary 0.5 to 1.0 mg/L free residual chlorine after a 30-minute contact period.',
    'Two drops per liter with 30 minutes contact time renders clear water microbiologically safe.'
  ],
  [
    'According to the World Health Organization and DOH Five Keys to Safer Food, what is the critical temperature range known as the "Danger Zone" where bacteria multiply most rapidly?',
    'Between 5°C and 60°C (41°F to 140°F) - cooked food should not be left in this range for more than 2 hours.',
    [
      'Between -10°C and 0°C.',
      'Between 75°C and 100°C.',
      'Between 100°C and 150°C.'
    ],
    'The temperature danger zone (5°C to 60°C) allows rapid exponential multiplication of pathogens like Staphylococcus aureus and Salmonella. Hot food must be kept > 60°C; cold food < 5°C.',
    'Bacteria proliferate exponentially between 5°C and 60°C.'
  ],
  [
    'A public health nurse arrives at a client\'s home for a scheduled visit and finds that the family is in the middle of eating lunch together. What is the culturally competent and ethical nursing action?',
    'Apologize courteously for the timing, step out to the porch or return in 30 minutes, allowing the family privacy to finish their meal.',
    [
      'Demand that the family put away their plates immediately to avoid wasting the nurse\'s schedule.',
      'Pull up a chair directly to the dining table and begin interviewing the mother while she feeds her children.',
      'Cancel the family care plan permanently and record non-compliance.'
    ],
    'Filipino family values respect meal times as sacred family interaction; forcing an interview during meals breaches cultural etiquette (hiya and pakikisama) and destroys rapport.',
    'Rescheduling or waiting respectfully outside maintains community trust and honors family boundaries.'
  ],
  [
    'In home health assessment, what constitutes an "Inadequate Living Space" under environmental health threats for a family of 8 members?',
    'Living in a one-room studio shanty measuring less than 15 square meters, where family members sleep crowded cheek-by-jowl on a single mat.',
    [
      'Living in a 2-story concrete home with 3 separate bedrooms and 2 bathrooms.',
      'A rural farmhouse surrounded by 1 hectare of open agricultural rice fields.',
      'A home with an elevated bamboo floor and screen windows.'
    ],
    'Severe overcrowding (less than 3 square meters per person) severely increases the transmission velocity of respiratory droplets like TB, varicella, and meningococcemia.',
    'Extreme crowding without separate sleeping areas constitutes an environmental health threat.'
  ],
  [
    'When evaluating an infant with persistent diarrhea during a home visit, the nurse notices sunken fontanelles, lethargy, and a skin pinch on the abdomen that retracts after 3 seconds. What is the nurse\'s immediate judgment?',
    'The infant has Severe Dehydration requiring emergency intravenous fluid resuscitation (Plan C) at the nearest district hospital.',
    [
      'The infant has No Dehydration and can be safely managed with extra breast milk at home.',
      'The infant has Mild Dehydration that requires only withholding all fluids for 12 hours.',
      'The infant has physiological water intoxication.'
    ],
    'Sunken fontanelles, lethargy, and a skin pinch taking > 2 seconds to retract define Severe Dehydration, which is an immediate medical emergency.',
    'Skin turgor loss > 2 seconds combined with lethargy mandates urgent Plan C referral.'
  ],
  [
    'In Family Nursing Practice, what is the ultimate goal of community nursing interventions when working with a multi-problem household?',
    'To develop the family\'s autonomous capability and self-reliance to solve their own health problems without indefinite dependence on the nurse.',
    [
      'To provide free medications and financial subsidies indefinitely.',
      'To have the rural health physician take over all parenting decisions.',
      'To institutionalize the family members into government welfare centers.'
    ],
    'The core philosophy of public health nursing is fostering family self-determination, autonomy, and competence in executing essential health tasks.',
    'Building family self-reliance is the primary endpoint of the family nursing process.'
  ],
  [
    'Which document in the Rural Health Unit (RHU) serves as the legal and longitudinal health record for the entire household across generations?',
    'The Family Health Record (FHR) / Family Folder.',
    [
      'The Barangay Captain\'s Blotter Book.',
      'The RHU Daily Prescription Slip.',
      'The Municipal Cash Disbursement Register.'
    ],
    'The Family Health Record (FHR) integrates socioeconomic data, individual member clinical charts, environmental assessments, and care plans in a single folder.',
    'The Family Health Record provides comprehensive, longitudinal data on the family as a unit of care.'
  ]
];

for (const d of chn1Data) {
  addItem(
    'np1_chn1',
    'Community Health Nursing 1 (Individual & Family as Clients)',
    'Apply principles of family health nursing, home visit protocols, and primary care interventions.',
    'Difficult',
    'clinical_scenario',
    'Maglaya, Nursing Practice in the Community, 5th Ed.; DOH Guidelines',
    d[0],
    d[1],
    d[2],
    d[3],
    d[4]
  );
}

// ==========================================
// NP 1: CHN 2 (30 Items: 46 - 75)
// ==========================================
const chn2Data = [
  [
    'In Community Organizing Participatory Action Research (COPAR), which criterion is ESSENTIAL when selecting a target community during the Pre-Entry Phase?',
    'The community is economically depressed, underserved, has high disease morbidity/mortality, and lacks existing rival political factions that could hinder unity.',
    [
      'The community is wealthy with accessible private commercial hospitals.',
      'The community has already achieved complete economic self-reliance.',
      'The community was hand-picked by a commercial pharmaceutical sponsor.'
    ],
    'Pre-entry site selection prioritizes marginalized, underserved communities with high health needs, safety/security, and willingness to organize without insurmountable political factions.',
    'Selecting impoverished, unorganized communities with high health needs ensures maximum organizing impact.'
  ],
  [
    'During the Entry Phase of COPAR, what is the primary purpose of the public health nurse undergoing "Integration" (Pakikipamuhay)?',
    'To immerse in community life, understand local culture, lifestyle, and values, and build deep mutual trust with the people.',
    [
      'To impose hospital hygiene standards and immediately demolish non-compliant shanties.',
      'To campaign for local political candidates during municipal elections.',
      'To replace the traditional barangay captain with an urban healthcare professional.'
    ],
    'Integration involves living with the community, eating their food, respecting local customs, and establishing genuine empathetic rapport as an equal partner.',
    'Pakikipamuhay breaks down social barriers between health professionals and community members.'
  ],
  [
    'At what stage of COPAR are potential indigenous leaders identified and formed into a functional "Core Group"?',
    'Entry Phase (Sensitization and Social Preparation).',
    [
      'Pre-Entry Feasibility Phase.',
      'Phase-Out / Sustenance Phase.',
      'Evaluation / Disengagement Phase.'
    ],
    'Core group formation occurs during the Entry Phase when informal community leaders with genuine concern for the community are gathered to steer initial organizing.',
    'The Entry Phase centers on community sensitization and developing the indigenous core group.'
  ],
  [
    'In COPAR, when the Community Health Organization (CHO) drafts its constitution and bylaws, establishes standing health committees, and elects formal officers, what phase is active?',
    'Organization-Building Phase.',
    [
      'Pre-Entry Phase.',
      'Entry Phase.',
      'Phase-Out / Sustenance Phase.'
    ],
    'The Organization-Building phase formalizes community structures through elections, constitution drafting, and committee training.',
    'Formalization of officers and committees is the hallmark of the Organization-Building Phase.'
  ],
  [
    'When the community organization successfully manages a revolving drug fund, negotiates directly with municipal officials for infrastructure, and the nurse transitions to a consultant role, what phase is reached?',
    'Action / Sustenance and Strengthening (Phase-Out) Phase.',
    [
      'Pre-Entry Feasibility Phase.',
      'Entry Phase.',
      'Community Assembly Phase.'
    ],
    'Phase-out and sustenance occur when the community achieves self-reliance, sustainability, and legal linkages, allowing the organizing nurse to disengage.',
    'Community autonomy and self-management signify the Phase-Out/Sustenance stage.'
  ],
  [
    'What is the fundamental difference between a Comprehensive Community Diagnosis and a Problem-Oriented Community Diagnosis?',
    'Comprehensive diagnosis evaluates the totality of community demographic, socioeconomic, environmental, and health patterns; Problem-oriented focuses on a specific condition like dengue.',
    [
      'Comprehensive diagnosis is performed only in private tertiary hospitals.',
      'Problem-oriented diagnosis is illegal under the Philippine Nursing Act of 2002.',
      'Comprehensive diagnosis ignores vital statistics and focuses only on politics.'
    ],
    'Comprehensive community diagnosis gives a complete holistic profile of community health and determinants; problem-oriented diagnosis investigates a single focal issue.',
    'Comprehensive assessments encompass all community dimensions, while problem-oriented focuses on an isolated health challenge.'
  ],
  [
    'A municipality with a total midyear population of 40,000 recorded 1,000 live births in the calendar year 2025. What is the Crude Birth Rate (CBR) of this municipality?',
    '25 live births per 1,000 population ( [1,000 / 40,000] × 1,000 = 25 ).',
    [
      '40 live births per 1,000 population.',
      '10 live births per 1,000 population.',
      '4 live births per 1,000 population.'
    ],
    'Crude Birth Rate formula = (Total live births registered in a year / Midyear population) × 1,000. Here: (1,000 / 40,000) × 1,000 = 25 per 1,000.',
    '25 per 1,000 is the precise mathematical calculation of CBR.'
  ],
  [
    'A city with a midyear population of 100,000 recorded 600 total deaths from all causes in the year 2025. What is the Crude Death Rate (CDR)?',
    '6 deaths per 1,000 population ( [600 / 100,000] × 1,000 = 6 ).',
    [
      '60 deaths per 1,000 population.',
      '16 deaths per 1,000 population.',
      '0.6 deaths per 1,000 population.'
    ],
    'Crude Death Rate formula = (Total deaths from all causes in a year / Midyear population) × 1,000. (600 / 100,000) × 1,000 = 6 per 1,000.',
    '6 deaths per 1,000 measures overall population mortality.'
  ],
  [
    'Why is the Infant Mortality Rate (IMR) universally regarded as the MOST sensitive single indicator of a nation\'s general health status and socioeconomic development?',
    'Because infant survival is acutely sensitive to environmental sanitation, maternal nutrition, infectious disease control, and access to primary medical care.',
    [
      'Because infant deaths are the only vital statistic recorded by local municipal civil registrars.',
      'Because infant mortality is unaffected by poverty or water contamination.',
      'Because all other age groups have zero mortality in developing countries.'
    ],
    'Infants under 1 year are uniquely vulnerable to living conditions, infectious outbreaks, and healthcare delivery gaps, making IMR the gold standard index of community well-being.',
    'IMR directly reflects the immediate quality of sanitation, nutrition, and primary care infrastructure.'
  ],
  [
    'In a rural province, 50,000 live births were recorded in 2025. During the same year, 40 women died due to obstetric complications (preeclampsia, postpartum hemorrhage, sepsis). What is the Maternal Mortality Ratio (MMR)?',
    '80 maternal deaths per 100,000 live births ( [40 / 50,000] × 100,000 = 80 ).',
    [
      '40 per 100,000 live births.',
      '8 per 1,000 live births.',
      '125 per 100,000 live births.'
    ],
    'Maternal Mortality Ratio = (Number of maternal deaths from pregnancy/childbirth causes / Total live births) × 100,000. (40 / 50,000) × 100,000 = 80 per 100,000.',
    '80 per 100,000 live births is the standardized calculation for MMR.'
  ],
  [
    'A municipality recorded 500 total deaths from all causes in 2025. Of these, 350 deaths occurred in individuals aged 50 years and older. What is the Swaroop\'s Index for this municipality, and what does it indicate?',
    '70% ( [350 / 500] × 100 = 70% ), indicating an advanced level of community health development and longevity.',
    [
      '35%, indicating extreme premature mortality and severe socioeconomic collapse.',
      '50%, indicating that half of all deaths occurred in infants.',
      '140%, indicating an invalid statistical calculation.'
    ],
    'Swaroop’s Index = (Deaths aged 50 and older / Total deaths) × 100. Higher percentages (e.g. > 50-70%) reflect higher life expectancy and superior health development.',
    '70% reflects that a large proportion of the population lives past age 50.'
  ],
  [
    'During an outbreak of Cholera in a coastal barangay, 200 confirmed cases were reported, resulting in 10 deaths. What is the Case Fatality Rate (CFR)?',
    '5% ( [10 / 200] × 100 = 5% ), reflecting the virulence of the pathogen and clinical management effectiveness.',
    [
      '20% case fatality.',
      '0.5% case fatality.',
      '2% case fatality.'
    ],
    'Case Fatality Rate = (Deaths from a specific disease / Total confirmed cases of that disease) × 100. (10 / 200) × 100 = 5%.',
    '5% represents the proportion of affected individuals who died from the infection.'
  ],
  [
    'Under Republic Act 7160 (The Local Government Code of 1991), what fundamental change occurred in the delivery of healthcare services in the Philippines?',
    'Health services were devolved from the centralized Department of Health (DOH) to Local Government Units (LGUs - Provincial, City, and Municipal governments).',
    [
      'All public healthcare was privatized and sold to commercial insurance corporations.',
      'The Department of Health was permanently abolished.',
      'Barangay Health Stations were converted into commercial for-profit pharmacies.'
    ],
    'RA 7160 devolved primary and secondary health management to municipal and provincial governments, while DOH retained policy, technical guidance, and tertiary oversight.',
    'Devolution transferred operational authority and budgetary responsibility for health to local chief executives.'
  ],
  [
    'Under Republic Act 11223 (The Universal Health Care Act of 2019), what is the coverage status of Filipino citizens under the National Health Insurance Program (PhilHealth)?',
    'Every Filipino citizen is automatically enrolled in the National Health Insurance Program without needing a physical PhilHealth card to access primary care.',
    [
      'Only employed individuals who pay monthly cash premiums receive coverage.',
      'Citizens must pass a written civil service medical examination to qualify.',
      'PhilHealth coverage is restricted exclusively to government employees in Metro Manila.'
    ],
    'RA 11223 guarantees automatic universal health coverage for all Filipinos, categorized as direct contributors (formal wage earners) or indirect contributors (subsidized by government).',
    'Automatic enrollment eliminates financial barriers to primary essential health services for all citizens.'
  ],
  [
    'Under RA 11223, what is the role of the "Primary Care Provider Network" (PCPN)?',
    'To serve as the coordinated, first-contact healthcare gateway that navigates clients through primary care and specialty hospital referrals.',
    [
      'To replace all government physicians with overseas medical consultants.',
      'To eliminate all public health centers and mandate private hospital admission.',
      'To manage the municipal collection of local real estate taxes.'
    ],
    'The PCPN connects public and private primary care providers to deliver comprehensive outpatient benefits and direct appropriate specialty referrals.',
    'PCPNs provide a structured primary care foundation with seamless care coordination.'
  ],
  [
    'What is a major mandate of Republic Act 10354 (The Responsible Parenthood and Reproductive Health Act of 2012)?',
    'Guaranteed universal access to medically safe, non-abortifacient, modern family planning methods, maternal healthcare, and adolescent reproductive education.',
    [
      'Mandatory surgical sterilization for all families with more than 2 children.',
      'Legalization of commercial elective abortion in all public district hospitals.',
      'Prohibition of all modern artificial contraception across the Philippines.'
    ],
    'RA 10354 protects maternal health and family autonomy by guaranteeing free access to modern reproductive health supplies while strictly upholding the constitutional ban on abortion.',
    'The law provides voluntary modern family planning and age-appropriate adolescent health education.'
  ],
  [
    'According to Republic Act 9173 (The Philippine Nursing Act of 2002), which of the following is an explicit independent duty of the Registered Nurse?',
    'Provide comprehensive nursing care, health promotion, disease prevention, and administer intravenous injections pursuant to valid physician orders.',
    [
      'Prescribe oral Schedule II narcotic medications independently without a physician.',
      'Perform exploratory laparotomies and appendectomies in rural clinics.',
      'Authenticate and issue official death certificates in the absence of police.'
    ],
    'Section 28 of RA 9173 details the scope of nursing: nursing care, health education, supervision, and execution of medical prescriptions including IV injections.',
    'Independent nursing assessment and collaborative medical administration are legal keystones of RA 9173.'
  ],
  [
    'In the Field Health Services Information System (FHSIS), what is the function of the "Target Client List" (TCL)?',
    'To track and monitor specific eligible population cohorts (e.g., prenatal mothers, infants for immunization, TB patients) to ensure complete service delivery.',
    [
      'To record the daily financial cash income of rural health doctors.',
      'To document the political voter registration of barangay residents.',
      'To maintain hospital surgical waitlists for elective cosmetic surgery.'
    ],
    'TCLs are client-monitoring tools at the service delivery point (BHS/RHU) that ensure eligible individuals receive the full package of preventive health services.',
    'TCLs facilitate proactive tracking of clients needing scheduled immunizations and prenatal visits.'
  ],
  [
    'What is the reporting frequency and destination of the FHSIS M1 (Monthly Maternal & Child Health) Form?',
    'Prepared monthly by the Public Health Nurse and submitted to the Provincial Health Office / DOH Regional Health Office.',
    [
      'Prepared every 5 years for the Philippine Statistics Authority census.',
      'Submitted daily to the municipal police precinct.',
      'Published annually in local commercial newspapers.'
    ],
    'The M1 is a monthly consolidation of maternal, newborn, and infant care compiled from barangay records and forwarded to provincial health authorities.',
    'Monthly FHSIS M1 submission ensures timely epidemiologic surveillance.'
  ],
  [
    'Under the DOH Environmental Sanitation Code, how is a "Level I" Approved Excreta Disposal Facility defined?',
    'Non-water carriage toilet facilities such as ventilated improved pit (VIP) latrines, pit privies, and sanitary pour-flush latrines without piped water.',
    [
      'Water-sealed toilets connected to an engineered septic tank.',
      'Direct discharge into open public irrigation canals and rivers.',
      'Central municipal sewage collection with aerobic tertiary treatment plants.'
    ],
    'Level I toilet facilities do not require running water systems (pit latrines, reedless pit, boring pit privies). Level II uses septic tanks; Level III uses municipal sewerage.',
    'Pit latrines and non-piped sanitary privies are classified as Level I facilities.'
  ],
  [
    'How is a "Level II" Approved Excreta Disposal Facility characterized in Philippine community sanitation?',
    'Water-sealed or pour-flush toilet bowl connected directly to a sanitary on-site septic tank or leaching pit.',
    [
      'Simple open pit covered with wooden planks.',
      'A communal riverbank where waste is washed away by tides.',
      'A centralized municipal sewer network with ocean outfall.'
    ],
    'Level II facilities use water-sealed toilet fixtures with individual or shared on-site septic tanks.',
    'Septic tank-connected pour-flush toilets define Level II sanitation.'
  ],
  [
    'What describes a "Level III" Water Supply System in Philippine community infrastructure?',
    'Waterworks system with piped individual household connections providing treated running water directly inside every dwelling unit.',
    [
      'Protected community point source (shallow or deep well) within 250 meters.',
      'Communal public standpost or faucet serving a cluster of 4 to 6 households within 25 meters.',
      'Rainwater collected in untreated open plastic drums from galvanized roofs.'
    ],
    'Level I = point source (well/spring); Level II = communal faucet/standpost; Level III = individual piped home connections.',
    'Level III provides metered, running water directly into private homes.'
  ],
  [
    'What describes a "Level II" Water Supply System in rural barangays?',
    'A communal faucet system or public standpost located within 25 meters of a cluster of 4 to 6 households.',
    [
      'Individual automated piped taps inside every kitchen and bathroom.',
      'An unlined open spring where livestock and humans share water.',
      'Commercial bottled purified water delivered by refrigerated trucks.'
    ],
    'Level II systems feature communal faucets fed by a shared reservoir, serving household clusters within a 25-meter walking radius.',
    'Communal standposts within 25 meters characterize Level II water supply.'
  ],
  [
    'Under Republic Act 9003 (The Ecological Solid Waste Management Act of 2000), what is the mandatory primary strategy for municipal solid waste management?',
    'Waste segregation at source (household level) into biodegradable, recyclable, non-recyclable, and special hazardous wastes.',
    [
      'Open burning (siga) of all plastic and rubber materials in backyard pits.',
      'Dumping all municipal garbage into designated coastal mangrove swamps.',
      'Exporting all household refuse to international overseas territories.'
    ],
    'RA 9003 mandates segregation at source and prohibits open burning (siga) and open dumping, requiring materials recovery facilities (MRF) and sanitary landfills.',
    'Segregation at the household source is the statutory foundation of RA 9003.'
  ],
  [
    'What are the 4 fundamental cornerstones of Primary Health Care (PHC) established at the historic Alma-Ata International Conference (1978)?',
    'Active community participation, Intra- and inter-sectoral linkages, Use of appropriate and acceptable technology, and a Support mechanism for essential drugs/supplies.',
    [
      'Compulsory hospital admission, Private medical billing, Overseas pharmaceutical monopoly, and Surgical exclusivity.',
      'Centralized military policing, Compulsory quarantine, Urban hospital centralization, and Heavy industrialization.',
      'Commercial health marketing, Elimination of rural midwives, Foreign doctor licensing, and Privatized clinical insurance.'
    ],
    'The 4 pillars of PHC are: 1) Active community participation; 2) Intersectoral collaboration; 3) Appropriate affordable technology; 4) Support mechanisms.',
    'Community empowerment, intersectoral collaboration, appropriate technology, and supportive resources define PHC.'
  ],
  [
    'In epidemiology, what is the key difference between an "Endemic" disease and an "Epidemic" disease?',
    'Endemic refers to the constant, baseline presence of a disease within a geographic area; Epidemic refers to an unexpected, sudden increase above baseline levels.',
    [
      'Endemic means a worldwide global outbreak affecting multiple continents.',
      'Epidemic means a condition that only affects elderly hospitalized patients.',
      'Endemic diseases have zero mortality, whereas epidemics always kill 100% of cases.'
    ],
    'Endemic = usual baseline prevalence in an area (e.g., malaria in Palawan). Epidemic = sharp increase above expected endemic rates. Pandemic = worldwide epidemic.',
    'Baseline steady presence is endemic; sudden excess occurrence is epidemic.'
  ],
  [
    'A public health nurse reviews the spot map of a rural barangay. What is the primary purpose of constructing a Barangay Spot Map?',
    'To visually display the geographical distribution of households, water sources, latrines, and clustered cases of communicable diseases.',
    [
      'To record the market property value of local residential homes.',
      'To plan commercial highway construction for municipal tollways.',
      'To satisfy military defense mapping requirements.'
    ],
    'A spot map provides spatial visualization of environmental risks (water sources, open dumps) and disease clustering for targeted epidemiology.',
    'Spot maps visually correlate health conditions with geographic and environmental factors.'
  ],
  [
    'When investigating a foodborne outbreak at a barangay fiesta where 60 people developed vomiting within 4 hours of eating potato salad, what is the nurse\'s FIRST priority step?',
    'Verify the diagnosis, interview affected attendees to establish an epidemic curve and food-specific attack rates, and secure food samples for laboratory culture.',
    [
      'Arrest the food cook immediately and shut down all municipal grocery stores.',
      'Administer high-dose IV broad-spectrum antibiotics to every citizen in the municipality.',
      'Issue a public press release declaring a national biological emergency.'
    ],
    'Epidemiological investigation begins by verifying the diagnosis, determining attack rates for each food item, establishing the timeline (incubation period), and isolating the pathogen.',
    'Establishing the food-specific attack rates and verifying etiology directs targeted containment.'
  ],
  [
    'In Philippine public health, what is the role and maximum ratio of Barangay Health Workers (BHWs) under RA 7883 (Barangay Health Workers\' Benefits and Incentives Act)?',
    'BHWs are accredited community volunteers providing primary health education and tracking; standard ideal ratio is 1 BHW for every 20 households.',
    [
      'BHWs are licensed neurosurgeons deployed at a ratio of 1 per 10,000 citizens.',
      'BHWs are commercial pharmaceutical sales representatives with unlimited ratios.',
      'BHWs are armed security personnel guarding rural health gates.'
    ],
    'RA 7883 recognizes BHWs as community volunteer frontliners who bridge families with RHU professionals, ideally serving clusters of approximately 20 households.',
    'BHWs serve as essential community volunteer liaisons at a ratio of approximately 1 per 20 households.'
  ],
  [
    'What is the legal definition and consequence of "Malpractice" compared to "Negligence" in professional Philippine nursing practice?',
    'Negligence is the failure to do what a prudent nurse would do; Malpractice is professional negligence committed by a licensed professional with specialized skill resulting in injury.',
    [
      'Negligence only applies to doctors, while malpractice only applies to nursing students.',
      'Negligence carries capital punishment, while malpractice carries no penalty.',
      'There is no distinction between negligence and malpractice under Philippine law.'
    ],
    'Professional negligence by a licensed practitioner acting outside standards of practice causing direct client damage constitutes actionable malpractice.',
    'Malpractice is specialized professional negligence resulting in client harm.'
  ]
];

for (const d of chn2Data) {
  addItem(
    'np1_chn2',
    'Community Health Nursing 2 (Population Group & Community as Clients)',
    'Apply epidemiology, vital statistics, Philippine health legislation, and COPAR community organizing.',
    'Difficult',
    'clinical_scenario',
    'Maglaya, Nursing Practice in the Community; Philippine Health Laws',
    d[0],
    d[1],
    d[2],
    d[3],
    d[4]
  );
}

// ==========================================
// NP 1: COMMUNICABLE DISEASES & IMCI (25 Items: 76 - 100)
// ==========================================
const imciData = [
  [
    'According to the Integrated Management of Childhood Illness (IMCI) guidelines, which of the following is one of the 4 universal "General Danger Signs" in a sick child aged 2 months up to 5 years?',
    'The child vomits everything consumed (inability to retain any oral fluid or food).',
    [
      'The child has a mild runny nose with clear watery discharge.',
      'The child has a single loose stool following intake of fruit juice.',
      'The child has a normal appetite and plays actively with siblings.'
    ],
    'The 4 IMCI General Danger Signs are: 1) Inability to drink or breastfeed; 2) Vomits everything; 3) Convulsions during current illness; 4) Abnormally sleepy, lethargic, or unconscious.',
    'Vomiting everything prevents oral hydration and medication, signaling critical disease.'
  ],
  [
    'In IMCI, if a 14-month-old child presenting with fever and cough has even ONE General Danger Sign present, what is the mandatory action?',
    'Classify the child in the PINK (Severe) category, give urgent pre-referral treatment (first dose antibiotic, prevent hypoglycemia), and refer IMMEDIATELY to a hospital.',
    [
      'Send the child home with oral paracetamol and advise mother to return in 5 days.',
      'Prescribe oral multivitamins and reassess in 2 weeks.',
      'Perform a skin prick allergy test in the rural clinic and wait 48 hours.'
    ],
    'Presence of any general danger sign places the child in the emergency PINK triage row, necessitating immediate stabilization and hospital transfer.',
    'Pink classification requires urgent pre-referral therapy and immediate hospital referral.'
  ],
  [
    'A 9-month-old infant is brought to the Rural Health Unit with a 3-day history of cough. When assessing the respiratory rate according to IMCI, what is the correct nursing technique?',
    'The child must be calm and not crying; count the respiratory movements of the chest/abdomen for a FULL 60 SECONDS.',
    [
      'Count for 15 seconds while the child is vigorously screaming and multiply by 4.',
      'Auscultate breath sounds for 5 seconds over the right apex only.',
      'Estimate the rate by placing a cold stethoscope on the infant\'s bare chest while crying.'
    ],
    'Infants have irregular breathing patterns; IMCI mandates counting chest movements for a full 60 seconds while the child is quiet and calm.',
    'A full 60-second count while calm is required for accurate pediatric respiratory rate determination.'
  ],
  [
    'In a 7-month-old infant presenting with cough and a recorded respiratory rate of 54 breaths per minute, how does the nurse interpret this finding under IMCI criteria?',
    'Fast Breathing (Cutoff for infants aged 2 to 11 months is 50 breaths per minute or more) -> Classify as PNEUMONIA (Yellow Row).',
    [
      'Normal breathing rate for this age group -> Classify as NO PNEUMONIA (Green Row).',
      'Severe bradypnea requiring immediate mechanical bag-valve ventilation.',
      'Inconclusive result that requires an immediate computed tomography (CT) scan.'
    ],
    'Fast breathing cutoffs: < 2 months = 60+ bpm; 2 to 11 months = 50+ bpm; 12 months to 5 years = 40+ bpm. At 7 months, 54 bpm indicates fast breathing/pneumonia.',
    '54 breaths/min exceeds the 50 bpm cutoff for infants 2-11 months, confirming fast breathing.'
  ],
  [
    'In a 3-year-old child presenting with cough, what respiratory rate threshold constitutes "Fast Breathing" under IMCI guidelines?',
    '40 breaths per minute or more.',
    [
      '50 breaths per minute or more.',
      '60 breaths per minute or more.',
      '20 breaths per minute or more.'
    ],
    'For children aged 12 months up to 5 years, fast breathing is defined as 40 breaths per minute or greater.',
    '40 bpm is the diagnostic threshold for fast breathing in children aged 12 months to 5 years.'
  ],
  [
    'Under IMCI guidelines, what physical sign in a child with cough indicates that the child has "SEVERE PNEUMONIA OR VERY SEVERE DISEASE" (Pink Row)?',
    'Lower chest wall indrawing (the lower chest moves IN when the child breathes IN).',
    [
      'Clear nasal mucus discharge during sneezing.',
      'Occasional dry hacking cough during nighttime.',
      'Temperature elevation of 37.8°C.'
    ],
    'Chest indrawing occurs when the work of breathing is so intense that the lower ribcage retracts during inspiration. This indicates severe lower respiratory distress requiring urgent referral.',
    'Lower chest indrawing indicates critical respiratory failure and mandates immediate hospitalization.'
  ],
  [
    'A 2-year-old child with a 2-day history of watery diarrhea is evaluated in the RHU. The child is abnormally lethargic and floppy, has deeply sunken eyes, and an abdominal skin pinch retracts in 3.5 seconds. How should this child be classified?',
    'SEVERE DEHYDRATION (Pink Category) -> Initiate emergency IV fluid resuscitation using Plan C immediately.',
    [
      'SOME DEHYDRATION (Yellow Category) -> Treat with oral rehydration solution using Plan B.',
      'NO DEHYDRATION (Green Category) -> Treat with home fluids using Plan A.',
      'Simple dysentery that only requires oral metronidazole tablets.'
    ],
    'Two of the following signs confirm Severe Dehydration: lethargy/unconsciousness, sunken eyes, inability to drink/drinking poorly, skin pinch going back very slowly (> 2 seconds). Plan C IV fluids are required.',
    'Lethargy, sunken eyes, and skin pinch > 2 seconds fulfill criteria for Severe Dehydration.'
  ],
  [
    'A 10-month-old infant with acute diarrhea is irritable and restless, has sunken eyes, and drinks oral rehydration salts (ORS) eagerly and greedily. How is the infant managed under IMCI?',
    'SOME DEHYDRATION (Yellow Category) -> Administer measured ORS over a 4-hour period according to Plan B, along with 20 mg elemental Zinc daily for 14 days.',
    [
      'SEVERE DEHYDRATION -> Insert a femoral central line immediately.',
      'NO DEHYDRATION -> Send home with tap water only.',
      'Withhold all oral feeding and breastfeeding for 48 hours to rest the gut.'
    ],
    'Restlessness/irritability, sunken eyes, and drinking eagerly define Some Dehydration (Plan B). Zinc supplementation for 14 days reduces duration and prevents recurrence.',
    'Plan B with ORS and 14 days of Zinc is the evidence-based standard for Some Dehydration.'
  ],
  [
    'Under the Philippine National Tuberculosis Control Program (NTP), who is classified as a "Presumptive TB" candidate requiring immediate diagnostic sputum examination?',
    'Any individual presenting with an unexplained productive cough of 2 weeks (14 days) or longer duration, with or without fever, night sweats, and weight loss.',
    [
      'Any individual with a dry cough lasting less than 24 hours after drinking cold water.',
      'A person with seasonal allergic sneezing triggered by flower pollen.',
      'An athlete with shortness of breath immediately following a marathon.'
    ],
    'DOH guidelines define Presumptive TB as cough of >= 2 weeks, or any unexplained cough in high-risk individuals (HIV, diabetes, close contacts).',
    'Cough of 2 weeks or greater is the primary screening benchmark for presumptive TB.'
  ],
  [
    'What is the current primary rapid molecular diagnostic tool endorsed by the DOH for simultaneous detection of Mycobacterium tuberculosis and Rifampicin resistance in the Philippines?',
    'GeneXpert MTB/RIF assay (nucleic acid amplification test).',
    [
      'Standard chest X-ray interpreted by an artificial intelligence app.',
      'Widal serological agglutination test.',
      'Urine dipstick protein analysis.'
    ],
    'GeneXpert MTB/RIF provides automated molecular detection of TB DNA and the rpoB gene mutation responsible for Rifampicin resistance within 2 hours.',
    'GeneXpert is the DOH diagnostic standard for rapid TB and multi-drug resistance detection.'
  ],
  [
    'What are the standard antimicrobial components and duration of the DOH Category I treatment regimen for newly diagnosed pulmonary tuberculosis?',
    '2 months of Isoniazid (H), Rifampicin (R), Pyrazinamide (Z), and Ethambutol (E), followed by 4 months of Isoniazid and Rifampicin (2HRZE / 4HR).',
    [
      '12 months of high-dose daily intravenous Vancomycin monotherapy.',
      '2 weeks of oral Amoxicillin followed by 10 days of Ciprofloxacin.',
      '6 months of Dapsone and Clofazimine.'
    ],
    'Category I standard short-course therapy consists of an intensive 2-month 4-drug phase (HRZE) and a continuation 4-month 2-drug phase (HR) totaling 6 months.',
    '2HRZE / 4HR is the internationally endorsed Category I regimen.'
  ],
  [
    'A client undergoing TB-DOTS treatment panics and reports that his urine, sweat, and tears have turned bright reddish-orange. What is the nurse\'s appropriate response?',
    'Reassure the client that red-orange discoloration of bodily fluids is a harmless, expected side effect of Rifampicin and that he must continue taking his medication.',
    [
      'Advise the client to stop all TB medications immediately because of impending acute renal failure.',
      'Refer the patient for emergency cystoscopy to identify severe bladder hemorrhage.',
      'Instruct the client to double his fluid intake and take high doses of Vitamin C.'
    ],
    'Rifampicin and its metabolites are naturally pigmented red-orange, imparting a harmless discoloration to urine, saliva, tears, and contact lenses. It does not signify bleeding.',
    'Red-orange urine is a benign, expected side effect of Rifampicin.'
  ],
  [
    'Which vital health assessment must the nurse perform periodically for a patient receiving Ethambutol (EMB) as part of anti-TB therapy?',
    'Visual acuity and color discrimination testing (especially red-green color perception) to monitor for retrobulbar optic neuritis.',
    [
      'Audiometric testing to assess high-frequency hearing loss.',
      'Thyroid stimulating hormone (TSH) levels to detect severe hypothyroidism.',
      'Serial deep tendon reflex testing to check for myasthenia gravis.'
    ],
    'Ethambutol can cause dose-dependent retrobulbar optic neuritis presenting with decreased visual acuity and loss of red-green discrimination. Prompt discontinuation reverses toxicity.',
    'Visual acuity and color discrimination tests monitor for Ethambutol optic toxicity.'
  ],
  [
    'To prevent peripheral neuropathy in a patient receiving daily Isoniazid (INH) for pulmonary tuberculosis, what prophylactic vitamin is co-prescribed?',
    'Pyridoxine (Vitamin B6).',
    [
      'Cyanocobalamin (Vitamin B12).',
      'Ascorbic Acid (Vitamin C).',
      'Phytonadione (Vitamin K).'
    ],
    'Isoniazid competitively inhibits pyridoxal phosphate, precipitating peripheral neuropathy (numbness, paresthesias). Pyridoxine (Vitamin B6) supplementation prevents this.',
    'Vitamin B6 protects peripheral nerves from Isoniazid-induced neurotoxicity.'
  ],
  [
    'According to the revised World Health Organization and DOH Dengue Clinical Management Guidelines, which clinical finding is categorized as a "Dengue Warning Sign"?',
    'Persistent vomiting, severe abdominal pain, mucosal bleeding, and clinical fluid accumulation (ascites or pleural effusion).',
    [
      'Mild fever of 37.8°C that resolves with cool sponging.',
      'A single isolated sneeze during the morning.',
      'Transient mild headache relieved by sleep.'
    ],
    'Warning signs herald vascular plasma leakage and impending shock: severe abdominal pain, persistent vomiting, mucosal bleeding, lethargy, hepatomegaly > 2cm, and rapid drop in platelets with rising hematocrit.',
    'Persistent vomiting and abdominal pain signal capillary leakage in Dengue.'
  ],
  [
    'When performing the Tourniquet Test (Rumple-Leede Test) for suspected Dengue fever, what is the standardized diagnostic criterion for a positive result?',
    'Appearance of 20 or more petechiae within a 1-inch (2.5 cm × 2.5 cm) square on the forearm after maintaining cuff pressure midway between systolic and diastolic for 5 minutes.',
    [
      'Appearance of 5 tiny red dots anywhere on the entire arm.',
      'Complete cyanosis of the hand after 1 minute of cuff inflation.',
      'Severe pain in the brachial artery without skin changes.'
    ],
    'A positive Tourniquet test reflects capillary fragility and thrombocytopenia, defined as >= 20 petechial hemorrhages per 1 square inch after 5 minutes at midpoint BP.',
    '>= 20 petechiae per square inch confirms capillary fragility in dengue screening.'
  ],
  [
    'What laboratory triad is characteristic of Dengue Hemorrhagic Fever entering the critical plasma leakage phase?',
    'Leukopenia, severe thrombocytopenia (platelet count <= 100,000/uL), and concurrent hemoconcentration (hematocrit rise >= 20% above baseline).',
    [
      'Marked leukocytosis with elevated platelets (> 600,000/uL) and decreased hematocrit.',
      'Elevated serum creatinine with normal platelets and normal hematocrit.',
      'Hyperglycemia with severe metabolic alkalosis and normal blood counts.'
    ],
    'Capillary endothelial permeability allows plasma extravasation into third spaces, concentrating erythrocytes (rising Hct >= 20%) while platelets are consumed and destroyed (<= 100,000).',
    'Thrombocytopenia combined with rising hematocrit is the hallmark of plasma leakage.'
  ],
  [
    'What is the definitive laboratory gold standard for diagnosing Malaria in an endemic Philippine province like Palawan?',
    'Microscopic examination of Giemsa-stained thick and thin peripheral blood smears (thick smear for parasite detection, thin smear for species identification).',
    [
      'Urine culture and antibiotic sensitivity testing.',
      'Serum rapid amylase and lipase enzyme analysis.',
      'Stool concentration technique for ova and parasites.'
    ],
    'Thick blood smears concentrate red cells to detect low-density Plasmodium parasites; thin smears preserve erythrocyte morphology to identify species (P. falciparum vs P. vivax).',
    'Thick and thin Giemsa blood smears provide definitive confirmation and species speciation.'
  ],
  [
    'In the Philippines, what is the intermediate snail host responsible for the transmission of Schistosoma japonicum (Schistosomiasis)?',
    'Oncomelania quadrasi (a tiny amphibious freshwater snail).',
    [
      'Aedes aegypti mosquito.',
      'Anopheles flavirostris mosquito.',
      'Mansonia uniformis aquatic fly.'
    ],
    'Oncomelania quadrasi snails release cercariae that penetrate human skin in freshwater rivers and rice paddies. Drug of choice is Praziquantel.',
    'Oncomelania quadrasi is the obligate intermediate snail host for Schistosoma japonicum.'
  ],
  [
    'A 7-year-old child sustains a deep, transdermal bite from a stray dog with bleeding on the face. According to the DOH National Rabies Prevention and Control Program, how is this categorized, and what is the required management?',
    'Category III Exposure -> Immediate wound washing with soap and running water for 15 minutes, followed by both Rabies Vaccine AND Rabies Immune Globulin (RIG).',
    [
      'Category I Exposure -> Reassurance only, no vaccine required.',
      'Category II Exposure -> Rabies vaccine alone without rabies immunoglobulin.',
      'Category IV Exposure -> Immediate limb amputation to prevent virus migration.'
    ],
    'Category III includes transdermal bites/scratches, mucous membrane contamination, or any bite to head/neck. It requires immediate soap cleansing, rabies vaccine, AND Rabies Immune Globulin (RIG) infiltrated around the wound.',
    'Category III bites require both passive immunization (RIG) and active immunization (vaccine).'
  ],
  [
    'What is the recommended multi-drug therapy (MDT) regimen endorsed by the WHO and DOH for the treatment of Multi-Bacillary (MB) Leprosy (Hansen\'s Disease)?',
    'Rifampicin, Dapsone, and Clofazimine taken for 12 months.',
    [
      'Isoniazid, Pyrazinamide, and Ethambutol for 6 months.',
      'Ceftriaxone and Azithromycin as a single oral dose.',
      'Penicillin G benzathine weekly for 3 weeks.'
    ],
    'Multibacillary Leprosy requires a 3-drug regimen: monthly supervised Rifampicin and Clofazimine, plus daily self-administered Dapsone and Clofazimine for 12 months.',
    'Rifampicin, Dapsone, and Clofazimine cure multibacillary leprosy.'
  ],
  [
    'According to the DOH Expanded Program on Immunization (EPI) Cold Chain Protocol, which vaccines MUST be stored in the freezer compartment at -15°C to -25°C?',
    'Oral Polio Vaccine (OPV) and Measles / MMR vaccines.',
    [
      'Hepatitis B vaccine and Tetanus-diphtheria (Td) vaccine.',
      'Pentavalent (DPT-HepB-Hib) vaccine and Inactivated Polio Vaccine (IPV).',
      'Pneumococcal conjugate vaccine (PCV) and Human Papillomavirus (HPV) vaccine.'
    ],
    'Heat-sensitive live viral vaccines (OPV, Measles, MMR) are stored frozen (-15°C to -25°C). Inactivated and toxoid vaccines (Pentavalent, Td, HepB, IPV) must NEVER be frozen and are stored at +2°C to +8°C.',
    'OPV and Measles vaccines require sub-zero freezer storage to preserve viral potency.'
  ],
  [
    'What happens if freeze-sensitive vaccines such as Pentavalent (DPT-HepB-Hib) or Hepatitis B are accidentally frozen below 0°C?',
    'The aluminum adjuvant precipitates and forms coarse clumps, irreversibly destroying vaccine immunogenicity and increasing the risk of sterile abscesses.',
    [
      'The vaccine becomes twice as potent and should be diluted with sterile water.',
      'The vaccine is completely unaffected and should be thawed and shaken.',
      'The vaccine turns into an oral drop formulation.'
    ],
    'Freezing breaks the aluminum adjuvant-antigen emulsion, permanently inactivating the vaccine. The "Shake Test" is used to verify damage if freezing is suspected.',
    'Freezing permanently destroys aluminum-adsorbed toxoids and increases adverse reactions.'
  ],
  [
    'What is the correct anatomical site, needle gauge, and administration route for the BCG (Bacillus Calmette-Guérin) vaccine in newborns?',
    'Right deltoid region, 26-gauge needle, administered strictly INTRADERMALLY (0.05 mL) to produce a distinct pale wheal.',
    [
      'Left anterolateral thigh, 23-gauge needle, administered deep intramuscularly.',
      'Gluteus maximus muscle, 21-gauge needle, administered subcutaneously.',
      'Oral drops placed on the back of the infant\'s tongue.'
    ],
    'BCG is given intradermally (0.05 mL) over the right deltoid using a 26G tuberculin needle. Subcutaneous injection causes deep cold abscesses.',
    'Intradermal deltoid administration is the mandatory global standard for BCG.'
  ],
  [
    'A mother brings her 6-week-old infant back to the clinic and is alarmed because the BCG injection site on the right shoulder has developed a small red nodule that softened and formed a tiny draining ulcer. What is the nurse\'s guidance?',
    'Reassure the mother that this is the normal expected reaction occurring 2 to 4 weeks post-vaccination, which will heal spontaneously into a small permanent scar; do not apply alcohol or bandages.',
    [
      'Incise and drain the lesion immediately and pack with antibacterial iodoform gauze.',
      'Administer a full 6-month course of anti-TB drugs for localized cutaneous tuberculosis.',
      'Prescribe topical hydrocortisone steroid cream to suppress the immune reaction.'
    ],
    'BCG reaction sequence: papule after 2-3 weeks, ulceration/drainage at 4-6 weeks, spontaneous scar formation by 8-12 weeks. Applying alcohol or squeezing disrupts normal scar formation.',
    'Normal BCG evolution involves benign papule formation and spontaneous ulceration leading to a scar.'
  ]
];

for (const d of imciData) {
  addItem(
    'np1_cd_imci',
    'Communicable Diseases & IMCI',
    'Apply IMCI danger signs, dehydration protocols, TB-DOTS regimens, Dengue management, and EPI cold chain standards.',
    'Difficult',
    'clinical_scenario',
    'WHO/DOH IMCI Integrated Guidelines; DOH NTP & EPI Protocols',
    d[0],
    d[1],
    d[2],
    d[3],
    d[4]
  );
}

// Generate the TypeScript file
const outPath = path.join(__dirname, '../src/data/practices/np1Questions.ts');
const fileContent = `import { RawExamItem } from './types';

// Exactly 100 DISTINCT, TRICKY, NON-REDUNDANT items for Nursing Practice 1:
// Items 001 - 015: np1_fon (15 items)
// Items 016 - 045: np1_chn1 (30 items)
// Items 046 - 075: np1_chn2 (30 items)
// Items 076 - 100: np1_cd_imci (25 items)
export const NP1_QUESTIONS: RawExamItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(outPath, fileContent, 'utf8');
console.log('Successfully wrote NP1_QUESTIONS with count:', items.length);
