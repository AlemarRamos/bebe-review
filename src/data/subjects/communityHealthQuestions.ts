import { ConceptDefinition } from '../questionTypes';

export const COMMUNITY_HEALTH_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'chn-copar-phases',
    subjectId: 'community_health',
    topic: 'Community Organizing Participatory Action Research (COPAR)',
    learningObjective: 'Identify the sequence and nursing activities across COPAR phases in Philippine community development.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'Maglaya, Nursing Practice in the Community, 5th Ed., Ch. 7; DOH Health Promotion Framework',
    variants: [
      {
        questionText: 'During which phase of Community Organizing Participatory Action Research (COPAR) does the public health nurse identify potential indigenous community leaders and conduct core group formation?',
        options: {
          A: 'Pre-Entry Phase',
          B: 'Entry Phase',
          C: 'Organization-Building Phase',
          D: 'Action / Sustenance Phase'
        },
        correctOption: 'B',
        rationale: {
          core: 'Core group formation, identifying potential community leaders, and establishing informal contacts are key hallmarks of the Entry Phase.',
          whyCorrect: 'The Entry Phase (sensitization and integration) includes social preparation, integration with the community, identification of potential indigenous leaders, and formation of a core group that will later steer the community health organization.',
          distractors: {
            A: 'Pre-Entry Phase focuses on site selection, ocular survey, and institutional profiling before entering the community.',
            C: 'Organization-Building Phase involves formal election of officers, committee structure, and formal community-wide training.',
            D: 'Sustenance Phase focuses on institutionalization, self-reliance, and replication.'
          }
        }
      },
      {
        questionText: 'In COPAR, when the Community Health Organization (CHO) has achieved formal legal recognition, successfully manages community-financed revolving drug funds, and the nurse transitions to a consultant role, the community is in which phase?',
        options: {
          A: 'Entry Phase',
          B: 'Community Diagnosis Phase',
          C: 'Phase-out / Sustenance and Strengthening Phase',
          D: 'Pre-entry Feasibility Phase'
        },
        correctOption: 'C',
        rationale: {
          core: 'The Sustenance and Strengthening (Phase-Out) phase occurs when the community assumes full responsibility and self-reliance, and the nurse disengages to act strictly as external consultant.',
          whyCorrect: 'Self-reliance, linkage-building with government/NGOs, and handover of full leadership signifies the phase-out/sustenance stage.',
          distractors: {
            A: 'Entry phase is initial integration.',
            B: 'Community diagnosis is data gathering and prioritization.',
            D: 'Pre-entry is initial site selection.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'chn-epi-bcg-administration',
    subjectId: 'community_health',
    topic: 'Expanded Program on Immunization (EPI) - BCG',
    learningObjective: 'Describe administration route, dosage, expected site reaction, and post-vaccine care for BCG.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Department of Health (DOH) Expanded Program on Immunization Field Manual',
    variants: [
      {
        questionText: 'A public health nurse is administering the BCG (Bacillus Calmette-Guérin) vaccine to a 2-day-old term newborn. What is the correct dose, route, and anatomical site according to the Philippine Expanded Program on Immunization (EPI)?',
        options: {
          A: '0.05 mL, Intradermal, Right deltoid region',
          B: '0.1 mL, Subcutaneous, Anterolateral thigh',
          C: '0.5 mL, Intramuscular, Left vastus lateralis',
          D: '0.05 mL, Intramuscular, Left deltoid region'
        },
        correctOption: 'A',
        rationale: {
          core: 'For newborns aged 0-11 months, BCG dose is 0.05 mL administered strictly Intradermally in the Right deltoid muscle.',
          whyCorrect: 'Intradermal administration produces a visible wheal (bleb) measuring approximately 5-7 mm. The standard site in the Philippines is the right deltoid to facilitate easy scar identification during mass screening surveys.',
          distractors: {
            B: '0.1 mL is the dose for children >1 year old; BCG is never given subcutaneous (causes deep cold abscesses).',
            C: '0.5 mL IM is used for Pentavalent/Hepatitis B, not BCG.',
            D: 'BCG is never administered intramuscularly.'
          }
        }
      },
      {
        questionText: 'Six weeks after receiving the BCG vaccination, an infant\'s mother returns to the Rural Health Unit (RHU) alarmed because a small red papule at the injection site has ulcerated and is discharging a drop of clear-to-whitish fluid. What is the nurse\'s most appropriate response?',
        options: {
          A: 'Apply an alcohol-soaked gauze and dress with antibacterial ointment.',
          B: 'Reassure the mother that this is the expected normal reaction, keep the area clean and dry, and avoid putting pressure, herbs, or bandages on it.',
          C: 'Administer an intramuscular dose of ampicillin for secondary bacterial skin infection.',
          D: 'Aspirate the ulcer contents with a 23-gauge needle to relieve tension.'
        },
        correctOption: 'B',
        rationale: {
          core: 'The normal BCG reaction involves a papule at 2-3 weeks, followed by ulceration at 4-6 weeks, which crusts and heals into a permanent scar by 8-12 weeks.',
          whyCorrect: 'This course is expected and indicates successful immunological response. The site must be left open to air, cleansed only with boiled water, and never treated with antiseptics or tight dressings.',
          distractors: {
            A: 'Alcohol, ointments, and antiseptics interfere with local cell-mediated immune conversion.',
            C: 'This is not bacterial sepsis or cellulitis; systemic antibiotics are contraindicated.',
            D: 'Needle aspiration disrupts natural cicatrization.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'chn-cold-chain-management',
    subjectId: 'community_health',
    topic: 'Vaccine Cold Chain & Storage',
    learningObjective: 'Categorize vaccines according to thermal sensitivity and correct refrigerator compartment storage.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'WHO Guidelines on Vaccine Storage & DOH Cold Chain Protocols',
    variants: [
      {
        questionText: 'Under the Philippine Department of Health cold chain management guidelines, which group of vaccines is the MOST sensitive to heat and must be stored in the freezer compartment (-15°C to -25°C)?',
        options: {
          A: 'Oral Polio Vaccine (OPV) and Measles / MMR vaccine',
          B: 'Hepatitis B vaccine and Tetanus Toxoid (TT)',
          C: 'Pentavalent vaccine (DPT-HepB-Hib) and Pneumococcal Conjugate Vaccine (PCV)',
          D: 'BCG vaccine (diluted) and Rotavirus vaccine'
        },
        correctOption: 'A',
        rationale: {
          core: 'OPV and Measles/MMR are live attenuated viral vaccines and are the most heat-sensitive vaccines, requiring freezer storage (-15°C to -25°C) at regional/provincial hubs.',
          whyCorrect: 'Oral Polio and Measles lose potency rapidly at ambient room temperatures and tolerate freezing well without degradation. In contrast, alum-adsorbed vaccines (DPT, HepB, TT) are destroyed if frozen.',
          distractors: {
            B: 'Hepatitis B and TT are freeze-sensitive and are permanently damaged if frozen; they must be kept between +2°C and +8°C.',
            C: 'Pentavalent and PCV contain aluminum adjuvants that aggregate when frozen.',
            D: 'Reconstituted BCG must be used within 6 hours and never refrozen.'
          }
        }
      },
      {
        questionText: 'A public health nurse discovers that the refrigerator in the health center experienced a power outage, and the temperature inside the main compartment dropped to -4°C overnight. Which test should the nurse perform before using the Pentavalent vaccine vials?',
        options: {
          A: 'Litmus Paper Acidity Test',
          B: 'Shake Test',
          C: 'Spectrophotometric Density Test',
          D: 'Thermal Stability Stripping Test'
        },
        correctOption: 'B',
        rationale: {
          core: 'The Shake Test is the validated WHO/DOH field method to determine whether freeze-sensitive adsorbed vaccines (DPT, TT, HepB, Pentavalent) have suffered irreversible freeze damage.',
          whyCorrect: 'Freezing causes the aluminum adjuvant particles to aggregate and precipitate quickly. In a damaged vial, sedimentation occurs much faster than in a control unfrozen vial.',
          distractors: {
            A: 'Litmus testing does not assess physical suspension.',
            C: 'Spectrophotometry is a laboratory method, not a field test.',
            D: 'Thermal stripping is a non-existent test.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'chn-bag-technique-principles',
    subjectId: 'community_health',
    topic: 'Public Health Nursing Bag Technique',
    learningObjective: 'Apply aseptic and infection control principles when utilizing the public health bag during home visits.',
    difficulty: 'Easy',
    questionType: 'safety_ethics',
    reference: 'Public Health Nursing in the Philippines, National League of Philippine Government Nurses',
    variants: [
      {
        questionText: 'During a home visit, which fundamental infection control principle dictates the order and execution of the Public Health Nurse\'s Bag Technique?',
        options: {
          A: 'Arranging supplies according to commercial brand preference.',
          B: 'Minimizing or preventing the spread of infection from the nurse\'s hands and bag to the client, family, and community.',
          C: 'Always placing the bag directly on the floor near the patient\'s bedside for ergonomic accessibility.',
          D: 'Washing hands only after the entire clinical procedure has concluded.'
        },
        correctOption: 'B',
        rationale: {
          core: 'The primary rationale for the bag technique is to prevent transmission of pathogens between the home environment, the client, and other households.',
          whyCorrect: 'The bag technique creates an uncompromised clean work area in variable home conditions. The bag is placed on a clean paper barrier on a table, never on the floor.',
          distractors: {
            A: 'Commercial preference has no relationship to medical asepsis.',
            C: 'Placing the bag directly on the floor heavily contaminates the outer canvas and is strictly prohibited.',
            D: 'Handwashing must be performed both before touching bag contents and after completing patient care.'
          }
        }
      },
      {
        questionText: 'When preparing the work field for the bag technique inside a rural home, the paper lining should be placed with which surface in direct contact with the table?',
        options: {
          A: 'The clean inner surface facing the table.',
          B: 'The clean outer surface facing the table, keeping the inner surface sterile.',
          C: 'The contaminated (outer) side touching the table, keeping the clean (inner) side upward as the working area.',
          D: 'A moist paper towel folded in half.'
        },
        correctOption: 'C',
        rationale: {
          core: 'The outer surface of the paper lining protects the inner surface from table contamination, preserving the inner side as a clean field for instruments.',
          whyCorrect: 'The side of the paper that contacts the potentially contaminated home table is considered dirty; the upper/inner side remains the designated clean area for placing supplies.',
          distractors: {
            A: 'Placing the clean surface on the dirty table contaminates it immediately.',
            B: 'The inner surface is clean, not surgically sterile.',
            D: 'Moist paper facilitates capillary strike-through of bacteria from the table.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'chn-tb-dots-medications',
    subjectId: 'community_health',
    topic: 'National Tuberculosis Control Program (NTP) & DOTS',
    learningObjective: 'Identify primary anti-TB drugs, major adverse effects, and client monitoring under the DOTS strategy.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Philippine Clinical Practice Guidelines for Tuberculosis in Adults (NTP Manual)',
    variants: [
      {
        questionText: 'A 42-year-old patient diagnosed with pulmonary tuberculosis begins Category 1 DOTS therapy with Rifampicin, Isoniazid, Pyrazinamide, and Ethambutol. During follow-up, the patient is terrified because his urine, saliva, and tears have turned orange-red. What is the nurse\'s most appropriate action?',
        options: {
          A: 'Immediately discontinue all medications and schedule urgent liver function tests.',
          B: 'Reassure the patient that orange-red discoloration of body secretions is a benign, expected effect of Rifampicin.',
          C: 'Administer pyridoxine (vitamin B6) 50 mg daily to reverse the discoloration.',
          D: 'Refer for emergency hemodialysis for suspected acute tubular necrosis.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Rifampicin imparts a harmless red-orange discoloration to urine, sweat, saliva, tears, and soft contact lenses.',
          whyCorrect: 'This is a well-known pharmacodynamic property of Rifampicin. Explaining this expected side effect prevents unnecessary drug default and anxiety.',
          distractors: {
            A: 'Discontinuing treatment is unwarranted as this is not a toxic allergic manifestation.',
            C: 'Pyridoxine prevents peripheral neuropathy from Isoniazid (INH), not Rifampicin color changes.',
            D: 'There is no renal failure indicated.'
          }
        }
      },
      {
        questionText: 'A patient on anti-tuberculosis therapy complains of progressive numbness, burning sensations, and tingling in both feet and hands. Which medication is the most likely cause, and what is the co-prescribed antidote?',
        options: {
          A: 'Ethambutol; treated with vitamin C',
          B: 'Isoniazid (INH); prevented/treated with Pyridoxine (Vitamin B6)',
          C: 'Pyrazinamide; treated with allopurinol',
          D: 'Rifampicin; treated with calcium carbonate'
        },
        correctOption: 'B',
        rationale: {
          core: 'Isoniazid competitively inhibits pyridoxine phosphokinase, causing pyridoxine deficiency and peripheral neuropathy.',
          whyCorrect: 'INH-induced peripheral neuritis is preventable and treatable with daily supplementation of Pyridoxine (Vitamin B6) 25 to 50 mg.',
          distractors: {
            A: 'Ethambutol causes retrobulbar optic neuritis (decreased visual acuity, red-green color blindness).',
            C: 'Pyrazinamide causes hyperuricemia and arthralgia.',
            D: 'Rifampicin causes hepatotoxicity and orange secretions.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'chn-dengue-tourniquet-test',
    subjectId: 'community_health',
    topic: 'Vector-Borne Diseases - Dengue Management',
    learningObjective: 'Perform and interpret the Tourniquet Test (Rumpel-Leede) according to DOH Dengue Clinical Guidelines.',
    difficulty: 'Moderate',
    questionType: 'clinical_scenario',
    reference: 'Department of Health (DOH) National Dengue Prevention and Control Program Guidelines',
    variants: [
      {
        questionText: 'In a Rural Health Unit, the nurse performs a Tourniquet Test (Rumpel-Leede) on a febrile school-aged child suspected of dengue. After maintaining pressure for 5 minutes at the midpoint between systolic and diastolic BP, which finding constitutes a POSITIVE test?',
        options: {
          A: 'Presence of 10 or more petechiae per square inch (2.5 cm × 2.5 cm).',
          B: 'Presence of 5 petechiae over the entire forearm.',
          C: 'Development of severe bruising and blanching of the fingers.',
          D: 'Appearance of a generalized urticarial rash on the trunk.'
        },
        correctOption: 'A',
        rationale: {
          core: 'The Tourniquet Test is positive if there are 10 or more petechiae per 1 square inch (2.5 cm × 2.5 cm) area.',
          whyCorrect: 'According to WHO and DOH criteria, >= 10 petechiae per square inch indicates increased capillary fragility and thrombocytopenic diathesis.',
          distractors: {
            B: 'Fewer than 10 petechiae per square inch is negative or inconclusive.',
            C: 'Bruising indicates overinflation, not standard petechial count.',
            D: 'Generalized urticaria indicates allergy, not capillary fragility.'
          }
        }
      },
      {
        questionText: 'Which clinical sign in a dengue patient entering the critical phase (afebrile period between day 3 to 7) is an alarming early warning sign of severe dengue shock?',
        options: {
          A: 'Resolution of fever with warm dry skin and good appetite.',
          B: 'Persistent vomiting, severe abdominal pain, and mucosal bleeding.',
          C: 'Mild maculopapular rash on the lower extremities with pruritus.',
          D: 'Occasional dry cough and clear nasal discharge.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Persistent vomiting, abdominal pain, mucosal bleeding, and lethargy are DOH warning signs signaling imminent plasma leakage and hypovolemic shock.',
          whyCorrect: 'The critical phase begins as fever drops. Plasma leakage into pleural and peritoneal cavities manifests as severe abdominal pain and vomiting, preceding circulatory collapse.',
          distractors: {
            A: 'Resolution of fever with good appetite indicates convalescence.',
            C: 'The "isles of white in a sea of red" rash with itching occurs during the recovery/convalescent phase.',
            D: 'Dry cough is a non-specific upper respiratory symptom.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'chn-vital-health-statistics-imr',
    subjectId: 'community_health',
    topic: 'Demography & Vital Health Statistics',
    learningObjective: 'Calculate and interpret the Infant Mortality Rate (IMR) as an indicator of community socioeconomic health status.',
    difficulty: 'Difficult',
    questionType: 'calculation',
    reference: 'Community Health Nursing Services in the Philippines (DOH/UP Manila)',
    variants: [
      {
        questionText: 'In a municipality with a total mid-year population of 50,000, there were 1,200 registered live births, 36 infant deaths (under 1 year of age), and 240 total deaths from all causes in a calendar year. What is the Infant Mortality Rate (IMR) per 1,000 live births?',
        options: {
          A: '0.72 per 1,000 live births',
          B: '30.0 per 1,000 live births',
          C: '24.0 per 1,000 live births',
          D: '15.0 per 1,000 live births'
        },
        correctOption: 'B',
        rationale: {
          core: 'IMR = (Number of deaths under 1 year of age / Total registered live births in the same year) × 1,000.',
          whyCorrect: 'Calculation: (36 / 1,200) × 1,000 = 0.03 × 1,000 = 30 per 1,000 live births.',
          distractors: {
            A: '0.72 results from dividing by the total population (50,000) instead of live births.',
            C: '24.0 is a calculation error utilizing the death total.',
            D: '15.0 is an erroneous arithmetic reduction.'
          }
        }
      },
      {
        questionText: 'Why is the Infant Mortality Rate (IMR) universally recognized as one of the most sensitive single indicators of the overall health, sanitary conditions, and socioeconomic development of a community?',
        options: {
          A: 'Because infants are the largest single demographic cohort in any developing country.',
          B: 'Because infant survival is acutely vulnerable to environmental sanitation, nutritional adequacy, maternal care, and primary health service access.',
          C: 'Because infant mortality calculations exclude congenital anomalies.',
          D: 'Because it is the only rate that utilizes mid-year population as its denominator.'
        },
        correctOption: 'B',
        rationale: {
          core: 'Infants have high physiological vulnerability; inadequate water, malnutrition, sanitation, and primary care directly result in infant mortality.',
          whyCorrect: 'Improvements in maternal care, nutrition, immunization, and environmental sanitation directly decrease infant deaths, making IMR a barometer of human development.',
          distractors: {
            A: 'Infants are not the largest demographic proportion.',
            C: 'IMR includes all infant deaths regardless of cause.',
            D: 'IMR uses live births as the denominator, not mid-year population.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'chn-environmental-sanitation-water',
    subjectId: 'community_health',
    topic: 'Environmental Sanitation & Water Safety',
    learningObjective: 'Classify approved water supply sources according to Presidential Decree 856 (Code on Sanitation of the Philippines).',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'Presidential Decree No. 856: Code on Sanitation of the Philippines',
    variants: [
      {
        questionText: 'Under Presidential Decree 856, a protected spring or well with no distribution system, serving an average of 15 to 25 households within a maximum walking distance of 250 meters, is classified as:',
        options: {
          A: 'Level I (Point Source)',
          B: 'Level II (Communal Faucet System or Standpost)',
          C: 'Level III (Waterworks System / Individual House Connections)',
          D: 'Level IV (Regional Municipal Reservoir)'
        },
        correctOption: 'A',
        rationale: {
          core: 'Level I water facility is a protected well or spring without a distribution system, suitable for rural areas with 15-25 households within 250 meters.',
          whyCorrect: 'Level I = point source (protected well/spring); Level II = communal faucet/standposts (piped distribution to central faucets for 4-6 households each); Level III = individual household piped connections.',
          distractors: {
            B: 'Level II has a piped distribution system with communal faucets serving multiple households.',
            C: 'Level III provides individual metered household indoor taps.',
            D: 'Level IV does not exist in PD 856 classification.'
          }
        }
      },
      {
        questionText: 'When advising rural families on household water purification in the aftermath of a flood or typhoon, what is the minimum duration of rolling boiling required to render contaminated water bacteriologically safe?',
        options: {
          A: '1 to 2 minutes of vigorous rolling boil',
          B: '10 to 15 minutes of vigorous rolling boil',
          C: '30 minutes of mild simmering',
          D: '5 minutes of covered steaming'
        },
        correctOption: 'A',
        rationale: {
          core: 'A vigorous rolling boil for 1 to 2 minutes destroys all enteric bacterial pathogens, viruses, and protozoan cysts.',
          whyCorrect: 'WHO and CDC confirm that heating water to 100°C with 1 full minute of rolling boil kills virtually all human waterborne pathogens.',
          distractors: {
            B: '10-15 minutes wastes fuel unnecessarily in disaster emergencies without added bacterial benefit.',
            C: 'Simmering at lower temperatures may not kill heat-resistant cysts.',
            D: 'Steaming is ineffective for bulk water.'
          }
        }
      }
    ]
  }
];
