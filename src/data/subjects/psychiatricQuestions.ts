import { ConceptDefinition } from '../questionTypes';

export const PSYCHIATRIC_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'pmh-therapeutic-communication',
    subjectId: 'psychiatric',
    topic: 'Therapeutic Nurse-Client Relationship',
    learningObjective: 'Utilize verbal and nonverbal therapeutic communication techniques and avoid non-therapeutic traps.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Townsend & Morgan, Psychiatric Mental Health Nursing: Concepts of Care in Evidence-Based Practice, 9th Ed.',
    variants: [
      {
        questionText: 'A newly admitted depressed client tearfully tells the nurse, "Nobody cares about me anymore. My family would be so much better off if I weren\'t around." Which response by the nurse is the MOST therapeutic?',
        options: {
          A: '"You shouldn\'t talk like that; your family loves you very much and would be devastated."',
          B: '"Are you thinking about killing yourself or having thoughts of harming yourself?"',
          C: '"Things might seem difficult now, but I promise everything will look brighter in the morning."',
          D: '"Why do you think your family would be better off without you?"',
        },
        correctOption: 'B',
        rationale: {
          core: 'Directly asking about suicidal ideation in an empathetic, clear manner is mandatory when a client expresses hopelessness or worthlessness.',
          whyCorrect: 'Assessing suicide risk requires explicit, clear questions without ambiguity. Asking directly about suicide does not plant the idea in the client\'s mind.',
          distractors: {
            A: 'Giving false reassurance and minimizing the client\'s feelings cuts off communication.',
            C: 'Giving clichéd false reassurance invalidates the client\'s emotional despair.',
            D: 'Asking "Why" sounds interrogative and demanding, causing the client to become defensive.'
          }
        }
      },
      {
        questionText: 'A client with paranoid schizophrenia tells the nurse, "The CIA has bugged the air conditioning vents in this day room and is transmitting my private thoughts to the media." Which nursing response is most effective?',
        options: {
          A: '"That is impossible; mental health facilities do not allow government eavesdropping devices."',
          B: '"I understand that you feel frightened, but I do not hear or see any transmission devices in the room."',
          C: '"Let\'s go inspect the air vents together so you can prove it to me."',
          D: '"Why would the CIA be interested in your private thoughts?"'
        },
        correctOption: 'B',
        rationale: {
          core: 'Presenting reality gently while validating the underlying emotion (fear/anxiety) acknowledges the client\'s experience without validating or reinforcing the delusion.',
          whyCorrect: 'The nurse should validate the emotion ("I know you feel frightened") while stating current reality clearly ("I do not hear or see devices").',
          distractors: {
            A: 'Directly arguing or debating with a delusional client increases agitation and paranoia.',
            C: 'Inspecting vents validates and reinforces the delusional premise.',
            D: 'Asking "why" invites further delusional elaboration.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'pmh-lithium-toxicity',
    subjectId: 'psychiatric',
    topic: 'Psychopharmacology - Mood Stabilizers (Lithium Carbonate)',
    learningObjective: 'Recognize therapeutic levels and clinical manifestations of lithium toxicity and client education.',
    difficulty: 'Difficult',
    questionType: 'safety_ethics',
    reference: 'Stahl\'s Essential Psychopharmacology: Prescriber\'s Guide, 7th Ed.',
    variants: [
      {
        questionText: 'A client diagnosed with Bipolar I Disorder has been taking Lithium Carbonate 300 mg three times daily. A routine morning trough serum lithium level is reported at 1.9 mEq/L. The nurse observes nausea, coarse hand tremors, vomiting, and ataxia. What is the nurse\'s PRIORITY action?',
        options: {
          A: 'Administer the next scheduled dose with a glass of orange juice.',
          B: 'Withhold the next dose of lithium immediately and notify the healthcare provider.',
          C: 'Encourage the patient to restrict dietary sodium intake.',
          D: 'Reassure the patient that hand tremors are expected mild side effects.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Therapeutic serum lithium range is 0.6 to 1.2 mEq/L (up to 1.5 during acute mania). Levels > 1.5 mEq/L indicate toxicity, and levels > 2.0 can cause seizures and coma.',
          whyCorrect: 'At 1.9 mEq/L with gastrointestinal and neurological symptoms (coarse tremors, ataxia), the drug must be withheld immediately to prevent renal damage and irreversible neurotoxicity.',
          distractors: {
            A: 'Giving another dose would worsen life-threatening toxicity.',
            C: 'Restricting sodium decreases lithium excretion, driving blood levels even higher.',
            D: 'Fine tremors are common early side effects, but COARSE tremors and ataxia indicate severe toxicity.'
          }
        }
      },
      {
        questionText: 'Which dietary instruction is ESSENTIAL for a client receiving long-term maintenance Lithium Carbonate therapy?',
        options: {
          A: 'Maintain consistent daily intake of dietary sodium and drink 2,000 to 3,000 mL of fluids daily.',
          B: 'Completely eliminate table salt and all sodium-containing canned goods.',
          C: 'Avoid all tyramine-rich foods such as aged cheeses, chianti wine, and cured meats.',
          D: 'Take the medication strictly on an empty stomach with a large glass of water.'
        },
        correctOption: 'A',
        rationale: {
          core: 'Sodium and lithium are chemically similar monovalent cations handled identically by renal tubules. Low sodium intake causes kidneys to reabsorb lithium, precipitating toxicity.',
          whyCorrect: 'Clients must maintain consistent, normal sodium intake and drink adequate fluids (2-3 L/day) to prevent dehydration-induced lithium retention.',
          distractors: {
            B: 'Sodium restriction precipitates severe lithium toxicity.',
            C: 'Tyramine restrictions apply to Monoamine Oxidase Inhibitors (MAOIs), not lithium.',
            D: 'Lithium should be taken with meals to minimize gastrointestinal upset.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'pmh-clozapine-agranulocytosis',
    subjectId: 'psychiatric',
    topic: 'Psychopharmacology - Atypical Antipsychotics (Clozapine)',
    learningObjective: 'Monitor client on Clozapine for fatal adverse effects including severe neutropenia/agranulocytosis.',
    difficulty: 'Difficult',
    questionType: 'lab_interpretation',
    reference: 'FDA Clozapine Risk Evaluation and Mitigation Strategy (REMS) Program',
    variants: [
      {
        questionText: 'A client with treatment-resistant schizophrenia is prescribed Clozapine (Clozaril). The nurse must emphasize that routine weekly complete blood count (CBC) monitoring is required to detect which life-threatening adverse reaction?',
        options: {
          A: 'Agranulocytosis (severe neutropenia)',
          B: 'Acute hemolytic anemia',
          C: 'Thrombocytosis',
          D: 'Aplastic polycythemia'
        },
        correctOption: 'A',
        rationale: {
          core: 'Clozapine carries a black-box warning for severe neutropenia/agranulocytosis (ANC < 500/mcL), which can lead to fatal septicemia.',
          whyCorrect: 'Absolute Neutrophil Count (ANC) must be checked prior to initiation, weekly for the first 6 months, every 2 weeks for the next 6 months, and monthly thereafter.',
          distractors: {
            B: 'Hemolytic anemia is not the characteristic toxicity.',
            C: 'Clozapine causes leukopenia, not thrombocytosis.',
            D: 'Polycythemia is an excess of RBCs, not related to clozapine.'
          }
        }
      },
      {
        questionText: 'A patient taking Clozapine for 3 months calls the psychiatric outpatient clinic reporting a sore throat, fever of 38.9°C (102°F), and chills. What is the nurse\'s immediate instruction?',
        options: {
          A: 'Take acetaminophen 650 mg and gargle with warm salt water for 3 days.',
          B: 'Report immediately to the laboratory or emergency department for a stat Complete Blood Count with differential, and withhold Clozapine.',
          C: 'Double the next clozapine dose to counteract infection.',
          D: 'Drink plenty of citrus juices and schedule a visit next week.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Fever and sore throat in a client on clozapine are cardinal warning signs of agranulocytosis and impending sepsis.',
          whyCorrect: 'Immediate CBC and ANC determination is mandatory; the drug must be held until neutropenia is ruled out to prevent septic shock.',
          distractors: {
            A: 'Symptomatic treatment without blood testing could be fatal.',
            C: 'Increasing dose would worsen bone marrow suppression.',
            D: 'Delaying evaluation is negligence.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'pmh-neuroleptic-malignant-syndrome',
    subjectId: 'psychiatric',
    topic: 'Antipsychotic Complications - Neuroleptic Malignant Syndrome',
    learningObjective: 'Differentiate Neuroleptic Malignant Syndrome (NMS) from Serotonin Syndrome and implement emergency care.',
    difficulty: 'Difficult',
    questionType: 'clinical_scenario',
    reference: 'American Psychiatric Association (APA) Practice Guidelines for Schizophrenia',
    variants: [
      {
        questionText: 'A patient receiving intramuscular Haloperidol for acute agitation develops sudden hyperthermia (temp 40.2°C / 104.4°F), generalized "lead-pipe" muscle rigidity, altered consciousness, profuse diaphoresis, and labile blood pressure. What medical emergency is occurring?',
        options: {
          A: 'Acute Dystonic Reaction',
          B: 'Neuroleptic Malignant Syndrome (NMS)',
          C: 'Tardive Dyskinesia',
          D: 'Akathisia'
        },
        correctOption: 'B',
        rationale: {
          core: 'NMS is a life-threatening idiosyncratic reaction to dopamine-receptor antagonists characterized by extreme hyperthermia, severe lead-pipe muscle rigidity, autonomic instability, and elevated creatine kinase.',
          whyCorrect: 'Hyperthermia (>104°F) and generalized rigidity distinguish NMS from standard extrapyramidal symptoms (EPS). Immediate drug discontinuation, ICU admission, cooling, and Dantrolene or Bromocriptine are required.',
          distractors: {
            A: 'Acute dystonia involves localized muscle spasms (e.g., torticollis, oculogyric crisis) without high fever or autonomic instability.',
            C: 'Tardive dyskinesia consists of late, involuntary choreiform movements (tongue protrusion, grimacing).',
            D: 'Akathisia is subjective motor restlessness.'
          }
        }
      },
      {
        questionText: 'Which skeletal muscle relaxant medication is specifically administered to manage life-threatening hyperthermia and muscle hypertonicity in Neuroleptic Malignant Syndrome?',
        options: {
          A: 'Dantrolene sodium (Dantrium)',
          B: 'Diphenhydramine (Benadryl)',
          C: 'Benztropine mesylate (Cogentin)',
          D: 'Naloxone hydrochloride'
        },
        correctOption: 'A',
        rationale: {
          core: 'Dantrolene acts directly on skeletal muscle by inhibiting calcium release from the sarcoplasmic reticulum, relaxing muscle rigidity and halting malignant hyperthermia.',
          whyCorrect: 'Dantrolene and the dopamine agonist Bromocriptine are the pharmacologic therapies of choice for reversing NMS.',
          distractors: {
            B: 'Diphenhydramine treats acute dystonic reactions, not NMS.',
            C: 'Benztropine treats pseudoparkinsonism and dystonia, but anticholinergics can worsen hyperthermia in NMS by impairing sweating.',
            D: 'Naloxone reverses opioid depression.'
          }
        }
      }
    ]
  }
];
