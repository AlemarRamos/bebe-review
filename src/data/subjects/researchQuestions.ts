import { ConceptDefinition } from '../questionTypes';

export const RESEARCH_CONCEPTS: ConceptDefinition[] = [
  {
    conceptId: 'res-designs-quantitative-qualitative',
    subjectId: 'research',
    topic: 'Research Methodology & Study Designs',
    learningObjective: 'Differentiate between quantitative and qualitative research traditions and their respective methodologies.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'Polit & Beck, Essentials of Nursing Research: Appraising Evidence for Nursing Practice, 10th Ed.',
    variants: [
      {
        questionText: 'A nurse researcher investigates the "lived experiences of parents caring for pediatric oncology patients during prolonged hospitalizations." Which qualitative research methodology is most appropriate for this inquiry?',
        options: {
          A: 'Phenomenology',
          B: 'Grounded Theory',
          C: 'Ethnography',
          D: 'Quasi-Experimental Design'
        },
        correctOption: 'A',
        rationale: {
          core: 'Phenomenology is the qualitative research approach aimed at describing and understanding the "lived experience" of individuals encountering a specific phenomenon.',
          whyCorrect: 'Phenomenology explores human experience through first-person in-depth interviews to capture the essence of what it feels like to live through an event.',
          distractors: {
            B: 'Grounded Theory focuses on generating a substantive sociological theory of social processes from empirical data.',
            C: 'Ethnography focuses on the study and immersion in the culture and lifeways of a specific cultural group.',
            D: 'Quasi-experimental is a quantitative, numerical design testing interventions.'
          }
        }
      },
      {
        questionText: 'Which research design is considered the gold standard for testing the causal efficacy of a new nursing clinical intervention due to its rigorous control against confounding bias?',
        options: {
          A: 'True Experimental Design (Randomized Controlled Trial - RCT)',
          B: 'Comparative Descriptive Cross-Sectional Study',
          C: 'Retrospective Case-Control Study',
          D: 'Pre-experimental One-Group Pretest-Posttest Design'
        },
        correctOption: 'A',
        rationale: {
          core: 'A True Experimental Design (RCT) features three indispensable components: 1) Active manipulation of the independent variable; 2) A control group; 3) Random assignment (randomization).',
          whyCorrect: 'Randomization evenly distributes known and unknown confounders between experimental and control arms, maximizing internal validity and proving causality.',
          distractors: {
            B: 'Descriptive designs describe associations without proving cause and effect.',
            C: 'Case-control studies are observational and susceptible to recall and selection biases.',
            D: 'One-group designs lack a control group, leaving history and maturation unaddressed.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'res-variables-independent-dependent',
    subjectId: 'research',
    topic: 'Research Variables & Hypothesis Formulation',
    learningObjective: 'Identify independent and dependent variables in clinical nursing research hypotheses.',
    difficulty: 'Easy',
    questionType: 'direct_knowledge',
    reference: 'Burns & Grove\'s The Practice of Nursing Research: Appraisal, Synthesis, and Generation of Evidence, 9th Ed.',
    variants: [
      {
        questionText: 'In a research study titled "The Effect of Preoperative Guided Imagery on Postoperative Pain Scores and Opioid Consumption in Adult Patients Undergoing Abdominal Surgery," what is the DEPENDENT variable?',
        options: {
          A: 'Preoperative guided imagery intervention',
          B: 'Postoperative pain scores and opioid consumption',
          C: 'The surgical specialty (abdominal surgery)',
          D: 'The adult age of the participants'
        },
        correctOption: 'B',
        rationale: {
          core: 'The dependent variable (outcome/effect) is the variable that is observed and measured for change in response to the manipulation of the independent variable.',
          whyCorrect: 'Pain scores and opioid consumption are the measured outcome variables resulting from the intervention. Guided imagery is the independent variable (cause/treatment).',
          distractors: {
            A: 'Preoperative guided imagery is the independent variable (intervention).',
            C: 'Abdominal surgery is part of the clinical setting/population delimitation.',
            D: 'Adult age is a demographic attribute / inclusion criterion.'
          }
        }
      },
      {
        questionText: 'A nursing study formulates the hypothesis: "There is no statistically significant difference in surgical site infection rates between patients receiving chlorhexidine skin prep versus povidone-iodine skin prep." What type of hypothesis is this?',
        options: {
          A: 'Null hypothesis (statistical hypothesis)',
          B: 'Directional research hypothesis',
          C: 'Non-directional research hypothesis',
          D: 'Complex associative hypothesis'
        },
        correctOption: 'A',
        rationale: {
          core: 'A null hypothesis (H0) states that there is no relationship, difference, or effect between the variables being studied, serving as the benchmark for statistical testing.',
          whyCorrect: 'Stating "no statistically significant difference" defines a null hypothesis, which researchers attempt to reject in favor of the alternative hypothesis.',
          distractors: {
            B: 'A directional hypothesis specifies the direction of the expected difference (e.g., "Chlorhexidine will result in lower infection rates").',
            C: 'A non-directional hypothesis predicts a difference without specifying which is superior.',
            D: 'Associative refers to co-variation, not the statistical null stance.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'res-sampling-methods',
    subjectId: 'research',
    topic: 'Sampling Strategies & Representativeness',
    learningObjective: 'Distinguish between probability and non-probability sampling methods and analyze sampling bias.',
    difficulty: 'Moderate',
    questionType: 'direct_knowledge',
    reference: 'Polit & Beck, Essentials of Nursing Research, Ch. 10',
    variants: [
      {
        questionText: 'A nurse researcher recruits hospitalized diabetic patients into a study simply by selecting those who are readily available and admitted to the medical ward during the researcher\'s work shift. Which sampling technique is being utilized?',
        options: {
          A: 'Simple Random Sampling',
          B: 'Convenience Sampling (Accidental Sampling)',
          C: 'Stratified Random Sampling',
          D: 'Systematic Probability Sampling'
        },
        correctOption: 'B',
        rationale: {
          core: 'Convenience sampling involves selecting the most conveniently available people as study participants. It is a non-probability sampling method with high risk of selection bias.',
          whyCorrect: 'Because participants are chosen strictly based on availability rather than random mathematical probability, the sample may not represent the broader population.',
          distractors: {
            A: 'Simple random sampling gives every member of the population an equal, non-zero probability of selection.',
            C: 'Stratified sampling divides population into subgroups (strata) and randomly samples from each.',
            D: 'Systematic sampling selects every kth individual from a sampling frame.'
          }
        }
      },
      {
        questionText: 'To study an elusive, hidden population—such as commercial sex workers or intravenous drug users with HIV—the researcher asks initial participants to identify and refer other individuals from their personal network. What sampling technique is this?',
        options: {
          A: 'Snowball Sampling (Network Sampling)',
          B: 'Purposive Sampling',
          C: 'Quota Sampling',
          D: 'Cluster Sampling'
        },
        correctOption: 'A',
        rationale: {
          core: 'Snowball sampling relies on referrals from early participants to recruit additional subjects who are difficult to access through standard public rosters.',
          whyCorrect: 'Network or snowball sampling is standard for hard-to-reach, marginalized, or stigmatized clinical populations.',
          distractors: {
            B: 'Purposive sampling uses researcher judgment to handpick typical cases.',
            C: 'Quota sampling fills predefined demographic buckets without network chain referrals.',
            D: 'Cluster sampling is a multi-stage probability method sampling geographical areas.'
          }
        }
      }
    ]
  },
  {
    conceptId: 'res-ebp-levels-of-evidence',
    subjectId: 'research',
    topic: 'Evidence-Based Practice (EBP) Hierarchy',
    learningObjective: 'Rank levels of clinical evidence and identify the highest level in the evidence hierarchy.',
    difficulty: 'Easy',
    questionType: 'direct_knowledge',
    reference: 'Melnyk & Fineout-Overholt, Evidence-Based Practice in Nursing & Healthcare, 4th Ed.',
    variants: [
      {
        questionText: 'According to the standard hierarchy of evidence in Evidence-Based Practice (EBP), which of the following represents the HIGHEST level (Level I) of clinical evidence to guide nursing practice guidelines?',
        options: {
          A: 'Systematic review and meta-analysis of all relevant randomized controlled trials (RCTs)',
          B: 'A single well-designed randomized controlled trial',
          C: 'Well-designed controlled trials without randomization (quasi-experimental)',
          D: 'Opinions of respected authorities, expert committee reports, and consensus panels'
        },
        correctOption: 'A',
        rationale: {
          core: 'Level I evidence sits at the pinnacle of the EBP pyramid: systematic reviews and meta-analyses synthesizing multiple randomized controlled trials.',
          whyCorrect: 'Meta-analyses statistically combine data from multiple independent RCTs, minimizing idiosyncratic study bias and maximizing statistical power.',
          distractors: {
            B: 'A single RCT is Level II evidence.',
            C: 'Controlled trials without randomization are Level III.',
            D: 'Expert consensus and authority opinions reside at the lowest tier (Level VII).'
          }
        }
      },
      {
        questionText: 'In evidence-based clinical inquiry, what does the standardized acronym "PICO" stand for when constructing an answerable clinical question?',
        options: {
          A: 'Patient/Population, Intervention, Comparison, Outcome',
          B: 'Problem, Investigation, Control, Observation',
          C: 'Protocol, Implementation, Criteria, Objectives',
          D: 'Pathology, Inpatient, Care plan, Output'
        },
        correctOption: 'A',
        rationale: {
          core: 'The PICO framework standardizes clinical research inquiry: P = Patient or Population; I = Intervention of interest; C = Comparison intervention; O = Desired clinical Outcome.',
          whyCorrect: 'Using PICO ensures all critical components are articulated clearly to facilitate targeted literature searches in biomedical databases.',
          distractors: {
            B: 'Problem/Investigation/Control/Observation is incorrect phrasing.',
            C: 'Protocol/Implementation/Criteria/Objectives is not the standard EBP formulation.',
            D: 'Pathology/Inpatient is inaccurate.'
          }
        }
      }
    ]
  }
];
