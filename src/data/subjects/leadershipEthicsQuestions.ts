import { ConceptDefinition } from '../questionTypes';

export const LEADERSHIP_ETHICS_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'lme-ra9173-licensure',
    subjectId: 'leadership_ethics',
    topic: 'Philippine Nursing Law - Republic Act No. 9173',
    learningObjective: 'Apply the statutory provisions of RA 9173 regarding licensure examination ratings, qualifications, and scope of practice.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'Republic Act No. 9173 (The Philippine Nursing Act of 2002), Article IV & V',
    variants: [
      {
        questionText: 'Under Republic Act No. 9173 (The Philippine Nursing Act of 2002), what is the statutory rating requirement to pass the Philippine Nurse Licensure Examination (PNLE)?',
        options: {
          A: 'A general average rating of at least 75% with a rating of not below 60% in any subject.',
          B: 'A general average rating of at least 70% with no rating below 65% in any subject.',
          C: 'A general average rating of at least 80% with no rating below 70% in any subject.',
          D: 'A passing score of 75% in each of the 5 examination competency clusters independently.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Section 15 of RA 9173 mandates: "In order to pass the examination, an examinee must obtain a general average of at least seventy-five percent (75%) with a rating of not below sixty percent (60%) in any subject."',
          whyCorrect: 'If an examinee obtains a general average of 75% or higher but gets a rating below 60% in any subject, the candidate takes the examination again in that subject only (conditional passer).',
          distractors: {
            B: '70% is below the statutory passing average.',
            C: '80% is not the minimum benchmark required by law.',
            D: 'Clusters are not scored independently in this manner.'
          }
        }
      },
      {
        questionText: 'According to Section 28 of RA 9173 (Scope of Nursing), which of the following is an autonomous, independent function of a registered nurse in the Philippines?',
        options: {
          A: 'Administering intravenous medications and biological products without a physician\'s written prescription.',
          B: 'Executing health teaching, promoting health, and initiating nursing interventions based on the nursing process.',
          C: 'Suturing complex perineal lacerations during delivery without special training accreditation.',
          D: 'Prescribing oral anti-hypertensive drugs in a private hospital setting.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Under RA 9173 Section 28, health teaching, wellness promotion, and provision of comprehensive nursing care using the nursing process are autonomous professional nursing responsibilities.',
          whyCorrect: 'Nurses operate autonomously in nursing assessment, diagnosis, care planning, intervention, and evaluation. Prescription of drugs and complex surgery are medical acts outside autonomous nursing scope.',
          distractors: {
            A: 'IV medications require a written order from a licensed physician (collaborative function).',
            C: 'Suturing perineal lacerations requires specialized accreditation and certification under Section 28.',
            D: 'Nurses in the Philippines cannot prescribe drugs.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'lme-delegation-principles',
    subjectId: 'leadership_ethics',
    topic: 'Delegation & Assignment Principles',
    learningObjective: 'Apply the 5 Rights of Delegation and identify nursing responsibilities that cannot be delegated to assistive personnel.',
    difficulty: 'Moderate',
    questionType: 'prioritization',
    reference: 'NCSBN & ANA Joint National Guidelines for Nursing Delegation',
    variants: [
      {
        questionText: 'Which patient care task is MOST appropriate for the registered nurse (RN) to delegate to an experienced Unlicensed Assistive Personnel (UAP / Nursing Aide)?',
        options: {
          A: 'Assessing the breath sounds of a newly admitted post-operative thoracotomy patient.',
          B: 'Measuring and recording the oral fluid intake and urinary output of a stable patient with congestive heart failure.',
          C: 'Teaching a newly diagnosed diabetic patient how to self-administer subcutaneous insulin.',
          D: 'Evaluating the effectiveness of intravenous morphine administered 30 minutes ago.'
        },
        correctOption: 'B',
        rationale: {
          core: 'The RN cannot delegate Assessment, Teaching, Evaluation, or Clinical Judgment (mnemonic: EAT). UAPs may perform routine, non-invasive tasks on stable patients.',
          whyCorrect: 'Recording intake and output on a stable patient is a standardized measurement task that does not require professional nursing assessment or synthesis.',
          distractors: {
            A: 'Auscultation and assessment require RN professional licensure and clinical judgment.',
            C: 'Patient teaching is an exclusive RN role.',
            D: 'Evaluation of medication response requires professional judgment.'
          }
        }
      },
      {
        questionText: 'A charge nurse makes patient assignments on a medical unit. Which client must be assigned to the Registered Nurse rather than a Licensed Practical/Vocational Nurse or Nursing Aide?',
        options: {
          A: 'A client 3 days post-stroke with stable vital signs requiring assistance with passive range-of-motion exercises.',
          B: 'A client admitted 1 hour ago with acute crushing chest pain, dyspnea, and unstable vital signs.',
          C: 'A client with a healing Stage 2 pressure ulcer requiring a routine hydrocolloid dressing change.',
          D: 'A client with chronic kidney disease on hemodialysis scheduled for discharge tomorrow.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Unstable, newly admitted, or deteriorating patients requiring ongoing complex assessment and rapid clinical decision-making must always be cared for by the RN.',
          whyCorrect: 'A newly admitted patient with unstable acute coronary syndrome is highly volatile, carrying immediate risk of ventricular fibrillation or cardiogenic shock.',
          distractors: {
            A: 'Stable passive ROM can be performed by assistive personnel.',
            C: 'Standard chronic wound dressing can be performed by an LPN.',
            D: 'Stable discharge preparation of a long-term patient does not take precedence over active chest pain.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'lme-legal-torts-malpractice',
    subjectId: 'leadership_ethics',
    topic: 'Legal Aspects of Nursing - Torts & Negligence',
    learningObjective: 'Analyze the four essential elements required to establish professional negligence (malpractice) in a court of law.',
    difficulty: 'Difficult',
    questionType: 'safety_ethics',
    reference: 'Guido, Legal and Ethical Issues in Nursing, 7th Ed.',
    variants: [
      {
        questionText: 'For a registered nurse to be held legally liable for professional negligence (malpractice), which four legal elements must be established by the plaintiff?',
        options: {
          A: 'Duty, Breach of Duty, Injury (Damages), and Proximate Causation.',
          B: 'Intent, Battery, Assault, and Emotional Distress.',
          C: 'Malice, Foreseeability, Violation of Hospital Policy, and Financial Loss.',
          D: 'Incompetence, License Revocation, Substandard Equipment, and Harm.'
        },
        correctOption: 'A',
        rationale: {
          core: 'The four classical legal elements of malpractice are: 1) Duty of care owed to patient; 2) Breach of that duty; 3) Actual injury/damage; 4) Proximate cause linking breach to injury.',
          whyCorrect: 'Without all four elements proven, a lawsuit for malpractice fails. For instance, a breach of duty that causes no demonstrable physical, emotional, or financial harm cannot result in malpractice liability.',
          distractors: {
            B: 'Battery and assault are intentional torts, whereas negligence is an unintentional tort.',
            C: 'Malice is an element of defamation or criminal act, not civil negligence.',
            D: 'License revocation is an administrative disciplinary consequence, not a required civil element.'
          }
        }
      },
      {
        questionText: 'During a laparoscopic cholecystectomy, the surgical sponge count is recorded as correct by the operating room nurses. Post-operatively, the patient develops peritonitis, and an exploratory laparotomy reveals a retained surgical sponge. Under which legal doctrine may negligence be presumed without requiring the patient to prove the specific mechanism of fault?',
        options: {
          A: 'Respondeat Superior ("Let the master answer")',
          B: 'Res Ipsa Loquitur ("The thing speaks for itself")',
          C: 'Damnum Absque Injuria ("Damage without legal injury")',
          D: 'Stare Decisis ("Let the decision stand")'
        },
        correctOption: 'B',
        rationale: {
          core: 'Res Ipsa Loquitur applies when an injury is of a type that ordinarily does not happen without negligence, the instrument was in exclusive control of defendants, and the plaintiff was innocent.',
          whyCorrect: 'Leaving a foreign object inside a patient\'s body is a classic textbook illustration of Res Ipsa Loquitur; negligence is legally inferred from the mere occurrence of the event.',
          distractors: {
            A: 'Respondeat Superior refers to vicarious employer liability.',
            C: 'Damnum absque injuria means damage without legal violation.',
            D: 'Stare decisis is legal precedent doctrine.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'lme-informed-consent-witness',
    subjectId: 'leadership_ethics',
    topic: 'Informed Consent & Patient Autonomy',
    learningObjective: 'Clarify the legal role of the registered nurse when witnessing an informed consent document.',
    difficulty: 'Moderate',
    questionType: 'safety_ethics',
    reference: 'The Code of Ethics for Registered Nurses in the Philippines (PRC BON Res. 220, s. 2004)',
    variants: [
      {
        questionText: 'A nurse is asked to witness a client\'s signature on an operative consent form for an elective hip replacement. Legally, what does the nurse\'s signature as a witness certify?',
        options: {
          A: 'That the nurse has explained the surgical risks, potential benefits, and surgical alternatives to the patient.',
          B: 'That the client appeared competent, signed voluntarily, and the signature is authentic.',
          C: 'That the surgeon will adhere strictly to standard operative safety protocols.',
          D: 'That the patient has waived all rights to file a malpractice suit in the event of complications.'
        },
        correctOption: 'B',
        rationale: {
          core: 'The nurse\'s role in witnessing informed consent is strictly limited to verifying that the patient signed voluntarily, is competent, and that the signature is authentic.',
          whyCorrect: 'Explaining the procedure, risks, benefits, and surgical alternatives is the non-delegable legal duty of the performing surgeon, not the nurse.',
          distractors: {
            A: 'Explaining surgical risks and alternatives is the legal responsibility of the physician.',
            C: 'Witnessing does not guarantee operative performance.',
            D: 'Consent never waives a patient\'s right to competent care or legal redress for negligence.'
          }
        }
      },
      {
        questionText: 'When the nurse enters the room with the surgical consent form, the patient states, "The doctor said something about cutting my bowel, but I really don\'t understand why or what the risks are." What is the nurse\'s appropriate action?',
        options: {
          A: 'Explain the surgical procedure and risks to the patient, then witness the signature.',
          B: 'Do not have the patient sign the form; notify the surgeon immediately that the patient requires further explanation.',
          C: 'Assure the patient that the surgeon is highly skilled and have the patient sign anyway.',
          D: 'Ask the patient\'s next of kin to sign the consent form instead.'
        },
        correctOption: 'B',
        rationale: {
          core: 'If the patient expresses lack of understanding regarding the procedure or risks, informed consent is absent. The nurse must not obtain the signature and must contact the physician.',
          whyCorrect: 'Informed consent is a process of communication between doctor and patient. The nurse must advocate for the client by halting the consent signing until the surgeon explains.',
          distractors: {
            A: 'The nurse must not explain surgical details outside nursing scope.',
            C: 'Pressuring the patient to sign without understanding invalidates legal consent.',
            D: 'A competent adult patient cannot have their autonomy bypassed by having relatives sign.'
          }
        }
      }
    ]
  }
];
