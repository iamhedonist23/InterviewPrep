import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{
    title: string;
    content: string;
  }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics?: TopicSeed[];
};

type PathSeed = {
  name: string;
  slug: string;
  description: string;
  level: StudyLevel;
  modules: ModuleSeed[];
};

type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
};

const categorySeed: CategorySeed = {
  name: "Machine Learning & Data Science",
  slug: "machine-learning-data-science",
  description:
    "A structured learning path covering data-science foundations, data collection and preprocessing, statistics, exploratory analysis, regression, model evaluation, generalization, regularization, tuning, production thinking and practical Python workflows.",
  icon: "BrainCircuit",
  sortOrder: 20,
  paths: [
    {
      name: "Beginner",
      slug: "beginner",
      description: "Build a strong foundation in data science, data collection and preprocessing before moving into modeling.",
      level: StudyLevel.BEGINNER,
      modules: [
      {
        title: "Data Science Foundations",
        slug: "data-science-foundations",
        description: "A structured learning module covering data science foundations.",
        topics: [
          {
            "title": "What Data Science Means",
            "slug": "11-what-data-science-means",
            "description": "Understand data science as an end-to-end discipline that turns raw data into useful evidence, predictions and decisions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Data science combines programming, statistics, domain knowledge, data management, visualization and machine learning to turn raw observations into useful decisions.\n\nA dataset may contain:\n- numerical measurements such as price, age or temperature\n- categories such as product type or city\n- dates and time series\n- free-form language\n- images, audio or video\n- event logs and transactions\n\nThe important distinction is that data science is not simply “running an algorithm.” The algorithm is one part of a larger workflow. A model trained on badly collected or poorly prepared data can produce impressive-looking but unreliable predictions.\n\nFresh example:\nA food-delivery company wants to estimate whether an order will arrive late. The raw information may include restaurant preparation time, distance, weather, traffic, order size and time of day. The useful solution requires defining lateness, collecting reliable historical records, preparing the variables, selecting a model, evaluating it on future-like orders and integrating the prediction into operations.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Scenario:** A grocery-delivery service wants to predict which orders are likely to miss their promised delivery window. The project combines order history, preparation time, distance, traffic and weather. The model is only one part of the solution: the team must also define the target, validate data quality, evaluate future-like orders and monitor the system after release."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Why Machine Learning Is Used",
            "slug": "12-why-machine-learning-is-used",
            "description": "Learn why machine learning is useful when relationships are difficult to express with fixed rules.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Traditional software normally follows explicit rules:\n    input + programmed rules -> output\n\nMachine learning instead learns a relationship from examples:\n    historical inputs + known outcomes -> learned model\n\nFor a regression task:\n    features -> continuous prediction\n\nFor a classification task:\n    features -> class or probability\n\nFor clustering:\n    observations -> groups based on similarity\n\nMachine learning is valuable when the relationship between inputs and outcomes is too complicated, variable or numerous to encode manually.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Scenario:** A support team could write a rule such as “if ticket contains the word `refund`, route it to billing,” but customers describe the same issue in many ways. A classifier can learn patterns from previously labeled tickets and generalize to new wording."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Data Science Lifecycle",
            "slug": "13-data-science-lifecycle",
            "description": "Learn the stages of a data or machine-learning project and how they form an iterative workflow.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "The course describes a five-stage lifecycle:\n\nCapture\n- acquire data\n- enter or receive measurements\n- extract information from existing systems\n\nMaintain\n- warehouse data\n- clean it\n- stage and process it\n- design suitable data architecture\n\nProcess\n- mine data\n- classify or cluster\n- build useful representations\n- summarize information\n\nAnalyze\n- explore and confirm patterns\n- perform prediction\n- regression\n- language or qualitative analysis\n\nCommunicate\n- reports\n- charts\n- dashboards\n- business intelligence\n- decisions\n\nThese stages are iterative rather than a one-way pipeline. An unexpected result during analysis can force a return to data collection or cleaning.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Exercise:** Take a late-delivery prediction project and write one concrete artifact for each stage: source table, quality report, preprocessing pipeline, EDA notebook, trained model, evaluation report, deployment endpoint and monitoring dashboard."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Project-Oriented Lifecycle",
            "slug": "14-project-oriented-lifecycle",
            "description": "Learn the stages of a data or machine-learning project and how they form an iterative workflow.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A practical ML project can also be viewed as:\n1. define the problem\n2. process the data\n3. build a model\n4. evaluate it\n5. deploy it\n\nProblem definition is the most important starting point. A vague objective such as “use machine learning to improve sales” is not enough.\n\nBetter objective:\n“Predict the probability that a visitor will purchase within the next 24 hours, using only information available before the visitor leaves.”\n\nThat definition identifies:\n- prediction target\n- time horizon\n- available inputs\n- evaluation requirement\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Exercise:** Take a late-delivery prediction project and write one concrete artifact for each stage: source table, quality report, preprocessing pipeline, EDA notebook, trained model, evaluation report, deployment endpoint and monitoring dashboard."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Roles Around a Data Project",
            "slug": "15-roles-around-a-data-project",
            "description": "Understand the responsibilities of the main roles that collaborate on data-driven systems.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Data Analyst\n- queries and prepares data\n- creates reports and dashboards\n- identifies trends and anomalies\n- communicates findings\n\nData Engineer\n- builds reliable ingestion and processing systems\n- manages scalable data pipelines\n- improves data availability and quality\n\nDatabase Administrator\n- manages database operation\n- permissions and security\n- backup and recovery\n- performance and reliability\n\nMachine Learning Engineer\n- builds and serves ML systems\n- prepares training pipelines\n- evaluates and monitors models\n- integrates models with applications\n\nData Scientist\n- frames analytical problems\n- investigates data\n- develops statistical or ML solutions\n- communicates business implications\n\nData Architect\n- designs the overall data structure\n- plans integration, storage and governance\n- balances scalability, reliability and security\n\nStatistician\n- applies statistical reasoning\n- designs studies and sampling approaches\n- analyzes uncertainty and relationships\n\nBusiness Analyst\n- connects business needs with analytical work\n- defines opportunities and constraints\n- translates findings into process improvements\n\nThe roles can overlap in smaller teams.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Scenario:** In a retail ML project, the data engineer builds the ingestion pipeline, the data scientist experiments with features and models, the ML engineer packages the model for serving, and the analyst turns predictions into operational reports. The responsibilities overlap in a small team, but the concerns remain distinct."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Major Applications",
            "slug": "16-major-applications",
            "description": "Study major applications with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Search and ranking:\nA search system can combine query relevance, historical interaction signals and content quality.\n\nTransportation:\nModels can estimate travel time, detect risky conditions or optimize routing.\n\nFinance:\nML can support fraud detection, risk scoring and forecasting. A prediction is not automatically a trading guarantee; uncertainty and changing market conditions matter.\n\nE-commerce:\nRecommendation systems can rank products based on user behavior and item characteristics.\n\nHealthcare:\nModels can assist image analysis, risk prediction and research. High-stakes use requires stronger validation and human oversight.\n\nComputer vision:\nImages can be converted into numerical representations and classified or searched.\n\nAdvertising:\nPrediction models can estimate which audience or placement is likely to respond.\n\nAirline operations:\nHistorical schedules and operational signals can be used to estimate delays and support planning.\n\nGaming:\nModels can adapt opponents, detect abnormal behavior or personalize game experiences.\n\nDrug development:\nData-driven models can prioritize candidates for further investigation. Predictions do not replace laboratory validation.\n\nLogistics:\nRouting and delivery-time prediction can use location, traffic, demand and capacity information.\n\nAutocomplete:\nA language model or statistical sequence model can rank likely continuations from the current context.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A logistics company can use ML for ETA prediction, anomaly detection for unusual routes and demand forecasting for staffing. Each use case still needs a clearly defined target and evaluation metric."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Data Security",
            "slug": "17-data-security",
            "description": "Learn how security, privacy and safe data access affect data-science systems.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Data security protects information against unauthorized access, alteration, destruction and loss.\n\nImportant risks:\n- accidental exposure\n- phishing and social engineering\n- insider threats\n- ransomware\n- insecure cloud sharing\n- injection attacks\n- weak authentication\n\nThree insider categories:\n- non-malicious: accidental mistakes\n- malicious: deliberate misuse\n- compromised: a legitimate account controlled by an attacker\n\nUseful controls:\n- data discovery and classification\n- masking sensitive values\n- encryption\n- strong password practices\n- authentication\n- authorization\n- multi-factor authentication\n- least-privilege access\n- audit logging\n- backups\n\nSecurity versus privacy:\nSecurity focuses strongly on protecting systems and information from unauthorized or harmful activity. Privacy focuses on appropriate collection, use, sharing and handling of information about people.\n\nML-specific security concern:\nTraining data can contain sensitive fields. Before training, determine whether every field is necessary, who can access it, where it is stored and whether it can leak through outputs.\n\nExample:\nInstead of placing real customer phone numbers in a development dataset, replace them with synthetic identifiers such as CUSTOMER_1042.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A training dataset contains customer email addresses even though the model only needs order history. Removing or replacing the emails reduces exposure without removing predictive information that the model actually needs."
              },
              {
                "title": "Practical use",
                "content": "Use this to turn experimentation into a repeatable learning or production workflow with clear controls and traceability."
              }
            ]
          },
          {
            "title": "SQL Injection and Safe Data Access",
            "slug": "18-sql-injection-and-safe-data-access",
            "description": "Learn how security, privacy and safe data access affect data-science systems.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "An application that builds database queries by concatenating untrusted input can be vulnerable to injection.\n\nUnsafe idea:\n    query = \"SELECT ... WHERE name = '\" + user_input + \"'\"\n\nSafer approach:\n- parameterized queries\n- validated input\n- restricted database privileges\n- monitoring\n\nThe same principle applies to ML pipelines: never assume that a data source is trustworthy merely because it is internal.\n\nUNIT 2 — DATA COLLECTION AND PREPROCESSING\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Safe pattern:** Never construct a query by concatenating a user's name into SQL. Use a parameterized statement such as `SELECT id FROM customers WHERE name = ?` and pass the value separately. The database driver then treats the value as data rather than executable SQL."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          }
        ],
      },
      {
        title: "Data Collection & Preprocessing",
        slug: "data-collection-preprocessing",
        description: "A structured learning module covering data collection & preprocessing.",
        topics: [
          {
            "title": "Data Collection",
            "slug": "21-data-collection",
            "description": "Understand how to collect data that is relevant, reliable and suitable for the analytical question.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Data collection means acquiring observations that can support an analytical goal.\n\nTwo broad categories:\n\nPrimary data\nCollected directly for the current investigation.\n\nExamples:\n- controlled observations\n- surveys\n- questionnaires\n- focus groups\n- recorded experiences\n\nSecondary data\nCollected previously by another organization or process.\n\nExamples:\n- public datasets\n- government statistics\n- research repositories\n- internal historical records\n- licensed commercial datasets\n\nFresh example:\nA university wants to predict whether students need additional academic support. Attendance records are secondary data for the current project, while a newly designed student survey is primary data.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A university predicts course-support needs. Existing attendance records are secondary data, while a new survey about study habits is primary data. Before combining them, the team checks definitions, timestamps and consent requirements."
              },
              {
                "title": "Practical use",
                "content": "Use this when deciding how evidence should be collected and what limitations must be documented before analysis."
              }
            ]
          },
          {
            "title": "Interviews",
            "slug": "22-interviews",
            "description": "Learn the strengths, limitations and appropriate use of this data-collection method.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Strength:\nRich context.\n\nLimitation:\nResponses can be influenced by wording, interviewer behavior and memory.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A product team interviews 12 users who abandoned checkout. The interviews reveal that some users do not understand shipping charges. The finding suggests a product change, but the small group should not automatically be treated as representative of every customer."
              },
              {
                "title": "Practical use",
                "content": "Use this when deciding how evidence should be collected and what limitations must be documented before analysis."
              }
            ]
          },
          {
            "title": "Observation",
            "slug": "23-observation",
            "description": "Learn the strengths, limitations and appropriate use of this data-collection method.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Observation records behavior or events as they occur.\n\nExample:\nA retailer records how long customers remain in different store sections.\n\nPotential issue:\nPeople may behave differently when they know they are being observed.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A warehouse records how long workers spend at each packing station. The observation captures actual behavior, while a questionnaire might capture what workers remember doing."
              },
              {
                "title": "Practical use",
                "content": "Use this when deciding how evidence should be collected and what limitations must be documented before analysis."
              }
            ]
          },
          {
            "title": "Surveys and Questionnaires",
            "slug": "24-surveys-and-questionnaires",
            "description": "Learn the strengths, limitations and appropriate use of this data-collection method.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Surveys can gather responses from many participants efficiently.\n\nGood survey design:\n- clear questions\n- one idea per question\n- neutral wording\n- appropriate response options\n- defined target population\n\nBad example:\n“Don’t you agree that our excellent app is easy to use?”\n\nBetter:\n“How easy or difficult was the app to use?”\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Replace “How excellent was our fast and easy app?” with “How easy or difficult was the app to use?” The second question avoids embedding the desired answer in the wording."
              },
              {
                "title": "Practical use",
                "content": "Use this when deciding how evidence should be collected and what limitations must be documented before analysis."
              }
            ]
          },
          {
            "title": "Focus Groups",
            "slug": "25-focus-groups",
            "description": "Learn the strengths, limitations and appropriate use of this data-collection method.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A focus group gathers several participants to discuss a topic. It is useful for understanding opinions, motivations and reactions.\n\nA focus group is not automatically representative of the full population. Group dynamics can strongly influence answers.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A team shows three checkout designs to a small focus group and listens to reactions. One participant dominating the conversation is a reminder that group feedback needs careful facilitation and should not be treated as a population estimate."
              },
              {
                "title": "Practical use",
                "content": "Use this when deciding how evidence should be collected and what limitations must be documented before analysis."
              }
            ]
          },
          {
            "title": "Secondary Sources",
            "slug": "26-secondary-sources",
            "description": "Learn the strengths, limitations and appropriate use of this data-collection method.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Secondary information may come from:\n- online repositories\n- government archives\n- libraries\n- existing organizational databases\n\nBefore using secondary data, inspect:\n- collection date\n- population covered\n- definitions\n- sampling method\n- missingness\n- measurement units\n- possible bias\n- license and usage conditions\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A forecasting team downloads a public weather dataset. Before using it, they verify the collection period, units, geographic coverage, missing values and license rather than assuming the dataset is automatically suitable."
              },
              {
                "title": "Practical use",
                "content": "Use this when deciding how evidence should be collected and what limitations must be documented before analysis."
              }
            ]
          },
          {
            "title": "Data Preprocessing",
            "slug": "27-data-preprocessing",
            "description": "Learn how raw data is profiled, cleaned, transformed and prepared for reliable modeling.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Preprocessing converts raw information into a form suitable for analysis or modeling.\n\nCommon operations:\n- sampling\n- transformation\n- denoising\n- missing-value treatment\n- normalization/scaling\n- feature extraction\n\nA reliable preprocessing workflow is:\n\nRaw data\n -> profile\n -> clean\n -> integrate\n -> transform\n -> reduce/enrich\n -> validate\n -> split\n -> train\n\nImportant rule:\nFit transformations using training data only whenever the transformation learns statistics from data. Otherwise information from the evaluation set can leak into training.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Raw customer data contains missing ages, inconsistent city names and numeric columns with very different scales. A preprocessing workflow profiles the data, cleans categories, imputes missing values, encodes categories and scales only the features that need it."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Data Profiling",
            "slug": "28-data-profiling",
            "description": "Learn how to inspect a dataset before modeling so structural and quality problems become visible.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Profiling means inspecting data quality and structure before modeling.\n\nCheck:\n- row count\n- column names\n- data types\n- unique values\n- minimum and maximum\n- missing percentage\n- duplicate records\n- unusual values\n- class distribution\n- correlations\n- time coverage\n\nExample:\nA temperature column containing values 21, 22, 24 and “twenty-five” has a structural inconsistency that should be addressed before numerical modeling.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A profile report finds that `order_id` has 2% duplicates, `price` contains negative values and `city` has 14 spelling variants. These findings are more actionable than immediately fitting a model."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Data Cleaning",
            "slug": "29-data-cleaning",
            "description": "Learn practical techniques for duplicates, invalid values, inconsistent categories, outliers and missing data.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Cleaning corrects or removes invalid, duplicated, inconsistent or incomplete records.\n\nStep 1: Remove duplicates\nTwo identical transaction rows may represent one event accidentally loaded twice.\n\nStep 2: Fix structural errors\nStandardize values such as:\n    \"Bengaluru\", \"Bangalore\", \"BLR\"\nif they refer to the same category for the intended analysis.\n\nStep 3: Detect unwanted outliers\nAn unusually large value may be:\n- a genuine rare event\n- a measurement error\n- a data-entry error\n- a unit mismatch\n\nDo not delete every outlier automatically.\n\nStep 4: Handle missing values\nPossible approaches:\n- remove rows when appropriate\n- remove a feature when it is unusable\n- use domain-informed replacement\n- use median for skewed numerical data\n- use mean when justified\n- use a category such as “Unknown”\n- use model-based imputation for advanced cases\n\nStep 5: Validate\nAfter cleaning, confirm that the data satisfies expected rules.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** `Bengaluru`, `Bangalore` and `BLR` are mapped to one canonical category only after confirming they mean the same location for the analysis. A negative order amount is investigated rather than blindly deleted because it could represent a legitimate refund."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Missing Data",
            "slug": "210-missing-data",
            "description": "Understand why values go missing and how different imputation or removal strategies affect a model.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Missingness can have different meanings.\n\nExample:\nIf income is missing because respondents intentionally skipped the question, the missingness may contain information about response behavior.\n\nSimple numerical example:\nValues:\n    42, 45, missing, 49, 51\n\nMedian of observed values:\n    47\n\nReplacing the missing value with 47 is simple, but it assumes that this is a reasonable representation. The correct choice depends on why values are missing.\n\n**Learning lens:** First understand why the value is missing; only then choose an imputation or removal strategy."
              },
              {
                "title": "Example",
                "content": "**Example:** In `[42, 45, null, 49, 51]`, the observed median is 47. Median imputation is simple, but if missing income is concentrated among a particular group, replacing every missing value with 47 can hide a meaningful pattern."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Categorical Data",
            "slug": "211-categorical-data",
            "description": "Learn how categorical values are represented for machine-learning algorithms without creating false numeric relationships.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Machine-learning algorithms often require numerical representations.\n\nBinary category:\n    yes -> 1\n    no  -> 0\n\nFor categories without natural order, one-hot encoding is generally safer than assigning arbitrary integers.\n\nExample:\nColor:\n    red, blue, green\n\nOne-hot representation:\n    red   = [1,0,0]\n    blue  = [0,1,0]\n    green = [0,0,1]\n\nIf we encoded red=1, blue=2, green=3, a model might incorrectly interpret the numbers as ordered distances.\n\nOrdinal data is different:\n    bronze < silver < gold\nmay reasonably use an ordered representation if the modeling assumptions support it.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `payment_method = card, cash, wallet`, one-hot encoding creates separate indicator features. Encoding them as 1, 2 and 3 would introduce an artificial order that does not exist."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Training and Test Sets",
            "slug": "212-training-and-test-sets",
            "description": "Understand how training, validation and test data support honest estimates of model performance.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A common split is 80/20 or 70/30, but there is no universal ratio.\n\nTraining data is used to learn parameters.\n\nTest data is reserved for final assessment on unseen examples.\n\nFor many projects, a third validation set is useful:\n\nTraining -> fit\nValidation -> choose model/hyperparameters\nTest -> final unbiased estimate\n\nFor time-dependent data, random splitting may be inappropriate. Train on earlier periods and evaluate on later periods when the production task is forecasting.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** With 10,000 labeled rows, 8,000 can be used for training and 2,000 held out for testing. If hyperparameters are chosen repeatedly from the 2,000 test rows, the test set is no longer a clean final estimate."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Feature Scaling",
            "slug": "213-feature-scaling",
            "description": "Learn when numerical features need rescaling and how common scaling formulas work.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Scaling puts numerical features on comparable numerical ranges.\n\nMin-max scaling:\n    x' = (x - min(x)) / (max(x) - min(x))\n\nStandardization:\n    z = (x - mean(x)) / standard_deviation(x)\n\nExample:\nSuppose one feature is annual income in rupees and another is age. Their raw magnitudes are very different. Scaling can help algorithms based on distances or gradient optimization.\n\nScaling is especially important for:\n- k-nearest neighbors\n- support vector machines\n- gradient-based models\n- many neural networks\n- regularized linear models\n\nTree-based models are generally less sensitive to feature scale.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A nearest-neighbor model uses `age` and `annual_income`. Without scaling, income can dominate distance calculations simply because its numeric values are much larger."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Data Integration",
            "slug": "214-data-integration",
            "description": "Learn how to combine datasets while controlling schema mismatches, conflicting values and timing differences.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Data integration combines information from multiple sources.\n\nExample:\nCustomer table:\n    customer_id, city\n\nOrders table:\n    customer_id, order_value\n\nSupport table:\n    customer_id, ticket_count\n\nA join on customer_id can create a richer modeling table.\n\nIntegration problems:\n- schema mismatch\n- duplicate information\n- different units\n- conflicting values\n- different naming conventions\n- different update times\n\nTight coupling means integrated systems may depend strongly on a shared structure.\n\nLoose coupling keeps source systems more independent and combines information through a separate integration layer.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Join customer, order and support tables using a stable customer identifier. Before joining, verify that identifiers are unique where expected and that the tables do not represent different time snapshots."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Data Transformation",
            "slug": "215-data-transformation",
            "description": "Learn how to change data representation to expose useful structure while preserving relevant information.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Transformation changes representation while preserving useful information.\n\nImportant techniques:\n\nData smoothing\nReduces noise, often by grouping values or applying statistical methods.\n\nAttribute construction\nCreates a useful feature from existing fields.\n\nExample:\n    total_minutes = hours * 60 + minutes\n\nAggregation\nConverts detailed records into summaries.\n\nExample:\nDaily transactions -> weekly customer spending.\n\nNormalization\nRescales numerical values.\n\nDiscretization\nConverts continuous values into intervals.\n\nExample:\n    age < 18       -> child\n    18 to 29       -> young adult\n    30 to 59       -> adult\n    60+            -> senior\n\nGeneralization\nMaps detailed values to higher-level categories.\n\nExample:\n    city -> state -> country\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Convert `login_timestamp` into `hour_of_day`, `day_of_week` and `is_weekend`. These derived features may expose recurring usage patterns that are difficult to learn from a raw timestamp alone."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Normalization Methods",
            "slug": "216-normalization-methods",
            "description": "Learn when numerical features need rescaling and how common scaling formulas work.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Min-max normalization:\n    x' = (x - min) / (max - min)\n\nDecimal scaling:\n    x' = x / 10^j\n\nChoose j so that the scaled values fall within a desired magnitude.\n\nExample:\nIf values range from -986 to 917, dividing by 1000 gives approximately:\n    -0.986 to 0.917\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For values from 10 to 30, min-max scaling maps 10 to 0 and 30 to 1. The transformation is easy to interpret, but its min and max must be learned from the training data when used in a predictive pipeline."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Data Reduction",
            "slug": "217-data-reduction",
            "description": "Understand ways to reduce data size or dimensionality while retaining information needed for analysis.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Data reduction seeks a smaller representation while retaining information needed for the task.\n\nMethods:\n- dimensionality reduction\n- numerosity reduction\n- aggregation\n- compression\n- sampling\n- discretization\n\nDimensionality reduction:\nRemoves or transforms features.\n\nPCA is one example. It creates new directions that capture as much variance as possible under its mathematical objective.\n\nNumerosity reduction:\nRepresents many observations using a smaller representation, such as a statistical model or sample.\n\nData cube aggregation:\nSummarizes detailed information at a higher level.\n\nCompression:\nReduces storage requirements. Lossless compression preserves exact recoverability; lossy compression sacrifices some detail.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A sensor platform stores 500 measurements per minute but a dashboard only needs hourly summaries. Aggregation can reduce storage and processing while preserving the information needed for that dashboard."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Sampling",
            "slug": "218-sampling",
            "description": "Learn how to select representative subsets and recognize sampling bias.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Sampling selects a subset from a larger population.\n\nSimple random sampling:\nEach unit has a known opportunity to be selected.\n\nStratified sampling:\nDivide the population into important groups and sample within each group.\n\nExample:\nIf a university has 70% undergraduate and 30% postgraduate students, a stratified sample can preserve that composition.\n\nBe careful:\nA sample can be large and still biased.\n\n**Learning lens:** A representative sample matters more than raw sample size."
              },
              {
                "title": "Example",
                "content": "**Example:** If a university population is 70% undergraduate and 30% postgraduate, a stratified sample can preserve that composition. A very large sample can still be biased if one important group is systematically excluded."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Discretization",
            "slug": "219-discretization",
            "description": "Learn how continuous values can be converted into meaningful intervals.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Discretization changes continuous values into intervals.\n\nUnsupervised methods do not use the target label when creating intervals.\n\nSupervised methods use target information.\n\nCommon approaches:\n- equal-width bins\n- equal-frequency bins\n- histogram analysis\n- clustering\n- decision-tree-based thresholds\n\nExample:\nExam score:\n    0-39   -> F\n    40-59  -> C\n    60-79  -> B\n    80-100 -> A\n\nThe boundaries should be chosen for the actual analytical purpose, not merely because they look convenient.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Convert a continuous exam score into bands such as 0–39, 40–59, 60–79 and 80–100. The bins should reflect the purpose of the analysis rather than being chosen only for convenience."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Concept Hierarchies",
            "slug": "220-concept-hierarchies",
            "description": "Learn how detailed values can be organized into broader concepts for analysis.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A hierarchy maps detailed values to broader concepts.\n\nExample:\n    Koramangala -> Bengaluru -> Karnataka -> India\n\nTop-down mapping starts from a broad concept and becomes more specific.\n\nBottom-up mapping starts with detailed observations and combines them into broader categories.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A location hierarchy can map `Koramangala → Bengaluru → Karnataka → India`. A report can therefore roll detailed observations up from neighborhood to city or country."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Practical Preprocessing Template in Python",
            "slug": "221-practical-preprocessing-template-in-python",
            "description": "Learn how raw data is profiled, cleaned, transformed and prepared for reliable modeling.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A clean implementation should separate transformation logic from model fitting.\n\nExample:\n\n    import pandas as pd\n    from sklearn.model_selection import train_test_split\n    from sklearn.compose import ColumnTransformer\n    from sklearn.pipeline import Pipeline\n    from sklearn.impute import SimpleImputer\n    from sklearn.preprocessing import StandardScaler, OneHotEncoder\n    from sklearn.linear_model import Ridge\n\n    data = pd.DataFrame({\n        \"age\": [22, 31, None, 45, 52],\n        \"income\": [32000, 51000, 47000, None, 82000],\n        \"city\": [\"Pune\", \"Delhi\", \"Pune\", \"Mumbai\", \"Delhi\"],\n        \"spend\": [1200, 2600, 2200, 3100, 4800]\n    })\n\n    X = data[[\"age\", \"income\", \"city\"]]\n    y = data[\"spend\"]\n\n    numeric = [\"age\", \"income\"]\n    categorical = [\"city\"]\n\n    numeric_pipe = Pipeline([\n        (\"imputer\", SimpleImputer(strategy=\"median\")),\n        (\"scale\", StandardScaler())\n    ])\n\n    categorical_pipe = Pipeline([\n        (\"imputer\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"encode\", OneHotEncoder(handle_unknown=\"ignore\"))\n    ])\n\n    prep = ColumnTransformer([\n        (\"num\", numeric_pipe, numeric),\n        (\"cat\", categorical_pipe, categorical)\n    ])\n\n    model = Pipeline([\n        (\"prep\", prep),\n        (\"regressor\", Ridge(alpha=1.0))\n    ])\n\n    X_train, X_test, y_train, y_test = train_test_split(\n        X, y, test_size=0.2, random_state=42\n    )\n\n    model.fit(X_train, y_train)\n\nThe key benefit is that the preprocessing steps become part of the model workflow and are fitted correctly using training information.\n\nUNIT 3 — STATISTICS, EDA AND DATA VISUALIZATION\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "```python\nimport pandas as pd\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.linear_model import Ridge\n\ndata = pd.DataFrame({\n    \"age\": [22, 31, None, 45, 52],\n    \"income\": [32000, 51000, 47000, None, 82000],\n    \"city\": [\"Pune\", \"Delhi\", \"Pune\", \"Mumbai\", \"Delhi\"],\n    \"spend\": [1200, 2600, 2200, 3100, 4800],\n})\n\nX = data[[\"age\", \"income\", \"city\"]]\ny = data[\"spend\"]\n\nnumeric = [\"age\", \"income\"]\ncategorical = [\"city\"]\n\nprep = ColumnTransformer([\n    (\"num\", Pipeline([\n        (\"imputer\", SimpleImputer(strategy=\"median\")),\n        (\"scale\", StandardScaler()),\n    ]), numeric),\n    (\"cat\", Pipeline([\n        (\"imputer\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"encode\", OneHotEncoder(handle_unknown=\"ignore\")),\n    ]), categorical),\n])\n\nmodel = Pipeline([\n    (\"prep\", prep),\n    (\"regressor\", Ridge(alpha=1.0)),\n])\n\nmodel.fit(X, y)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          }
        ],
      }
      ],
    },
    {
      name: "Intermediate",
      slug: "intermediate",
      description: "Develop statistical intuition, exploratory-analysis skills, regression knowledge and pipeline thinking.",
      level: StudyLevel.INTERMEDIATE,
      modules: [
      {
        title: "Statistics, EDA & Visualization",
        slug: "statistics-eda-visualization",
        description: "A structured learning module covering statistics, eda & visualization.",
        topics: [
          {
            "title": "Descriptive Statistics",
            "slug": "31-descriptive-statistics",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Descriptive statistics summarize observed data. They do not by themselves prove causal relationships.\n\nThree major questions:\n- Where is the data centered?\n- How spread out is it?\n- What shape does its distribution have?\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For daily response times `[10, 11, 12, 13, 40]`, the mean is pulled upward by 40, while the median stays at 12. Looking at both center and spread gives a better picture than using one number."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Frequency Distribution",
            "slug": "32-frequency-distribution",
            "description": "Learn how grouped frequencies reveal the shape, center and unusual regions of numerical data.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A frequency distribution counts how often values or intervals occur.\n\nExample:\nDaily support tickets:\n    0-4   -> 18 days\n    5-9   -> 27 days\n    10-14 -> 9 days\n    15+   -> 3 days\n\nThis immediately shows whether the process is usually quiet or occasionally overloaded.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A service records response times in bins: 0–2 seconds: 120 requests, 2–4: 310, 4–6: 190, 6–8: 70, 8–10: 25. The histogram shows a dominant middle range and a smaller long tail."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Mean",
            "slug": "33-mean",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Mean:\n    mean = sum(x_i) / n\n\nExample:\nScores = 12, 15, 18, 20, 25\n\nMean = (12+15+18+20+25)/5 = 18\n\nThe mean uses every observation and is sensitive to extreme values.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For scores `12, 15, 18, 20, 25`, the mean is `(12 + 15 + 18 + 20 + 25) / 5 = 18`. Every observation contributes to the result, which is why extreme values can move it."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Median",
            "slug": "34-median",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Sort values and select the middle.\n\nFor an odd number of observations:\n    4, 8, 10, 13, 17\nmedian = 10\n\nFor an even number:\n    4, 8, 10, 13\nmedian = (8+10)/2 = 9\n\nThe median is more resistant to extreme values.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Sort `4, 8, 10, 13, 17`; the middle value is 10. For an even-sized set such as `4, 8, 10, 13`, the median is `(8 + 10) / 2 = 9`."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Mode",
            "slug": "35-mode",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "The mode is the most frequently occurring value.\n\nExample:\n    2, 2, 3, 4, 4, 4, 7\nmode = 4\n\nA dataset can have more than one mode or no unique mode.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** In `[2, 2, 3, 4, 4, 4, 7]`, the mode is 4 because it occurs most often."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Choosing Mean, Median or Mode",
            "slug": "36-choosing-mean-median-or-mode",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Use the mean when:\n- numerical values are reasonably balanced\n- extreme values are not dominating\n\nUse the median when:\n- the distribution is skewed\n- outliers are important but should not dominate the center\n\nUse the mode when:\n- categories are involved\n- the most common value matters\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Sort `4, 8, 10, 13, 17`; the middle value is 10. For an even-sized set such as `4, 8, 10, 13`, the median is `(8 + 10) / 2 = 9`."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Variability",
            "slug": "37-variability",
            "description": "Learn why spread matters in addition to the average and how common variability measures differ.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Central tendency alone is insufficient.\n\nTwo teams can have the same average delivery time but very different consistency.\n\nCommon measures:\n- range\n- variance\n- standard deviation\n- interquartile range\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Two delivery teams both average 30 minutes. Team A usually stays between 28 and 32 minutes, while Team B ranges from 10 to 70. Their averages match, but their operational reliability is very different."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Range",
            "slug": "38-range",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Range:\n    maximum - minimum\n\nExample:\n    11, 15, 18, 22, 29\nrange = 29 - 11 = 18\n\nIt is easy to calculate but depends entirely on the two extremes.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `[11, 15, 18, 22, 29]`, range = `29 - 11 = 18`. It is simple but depends entirely on the extremes."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Variance",
            "slug": "39-variance",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Population variance:\n    sigma^2 = sum((x_i - mu)^2) / N\n\nSample variance commonly uses:\n    s^2 = sum((x_i - x_bar)^2) / (n-1)\n\nThe squared differences prevent positive and negative deviations from cancelling.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `[6, 8, 10]`, the mean is 8. Squared deviations are `4, 0, 4`, so the sample variance is `8 / (3 - 1) = 4`."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Standard Deviation",
            "slug": "310-standard-deviation",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Standard deviation is the square root of variance.\n\nFor a sample:\n    s = sqrt(sum((x_i - x_bar)^2)/(n-1))\n\nInterpretation:\nA larger standard deviation indicates observations are more spread out around the mean.\n\nWorked example:\nData:\n    6, 8, 10\n\nMean = 8\n\nDeviations:\n    -2, 0, +2\n\nSquared deviations:\n    4, 0, 4\n\nSample variance:\n    8 / 2 = 4\n\nSample standard deviation:\n    sqrt(4) = 2\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** If a sample has standard deviation 2 minutes around an average delivery time of 30 minutes, a typical observation is spread around that center by a smaller amount than a process with standard deviation 12 minutes."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Skewness",
            "slug": "311-skewness",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Skewness describes asymmetry in a distribution.\n\nPositive/right skew:\nA long tail extends toward larger values.\n\nExample:\nHousehold income can be right-skewed because a relatively small number of very high incomes can stretch the upper tail.\n\nNegative/left skew:\nA long tail extends toward smaller values.\n\nNear-symmetry:\nThe two sides have roughly balanced shape.\n\nA useful practical interpretation:\n- positive skew -> mean often above median\n- negative skew -> mean often below median\n- symmetric distribution -> mean and median often close\n\nDo not treat rough skewness ranges as universal laws; thresholds depend on context and the statistic used.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Income data often has a long upper tail because a small number of observations are very large. The mean can therefore sit above the median."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Kurtosis",
            "slug": "312-kurtosis",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Kurtosis describes tail behavior and concentration relative to a reference distribution.\n\nExcess kurtosis is often interpreted relative to the normal distribution:\n- positive excess -> heavier tails than normal\n- near zero -> similar tail weight to normal\n- negative excess -> lighter tails\n\nTerms:\nLeptokurtic:\nMore pronounced tails and greater sensitivity to extreme observations.\n\nMesokurtic:\nApproximately normal-like tail behavior.\n\nPlatykurtic:\nLighter tails and flatter concentration.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Two distributions can have similar averages and standard deviations but different tail behavior. A process with more extreme response-time events has heavier tails and can be described as having higher excess kurtosis."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Five-Number Summary",
            "slug": "313-five-number-summary",
            "description": "Study five-number summary with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A box plot is built around:\n1. minimum\n2. first quartile (Q1)\n3. median\n4. third quartile (Q3)\n5. maximum\n\nQuartiles divide ordered data into sections.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A dataset summarized by `min=5, Q1=12, median=18, Q3=27, max=41` can be understood quickly from these five values and visualized as a box plot."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Interquartile Range",
            "slug": "314-interquartile-range",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "IQR:\n    IQR = Q3 - Q1\n\nIt describes the spread of the middle 50% of observations and is less affected by extreme values than the full range.\n\nExample:\nQ1 = 24\nQ3 = 41\n\nIQR = 17\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `[11, 15, 18, 22, 29]`, range = `29 - 11 = 18`. It is simple but depends entirely on the extremes."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Box Plot and Outliers",
            "slug": "315-box-plot-and-outliers",
            "description": "Learn how quartiles and fences help summarize spread and flag unusual observations.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A common outlier rule is:\n    lower fence = Q1 - 1.5*IQR\n    upper fence = Q3 + 1.5*IQR\n\nObservations outside these fences are flagged as potential outliers.\n\nImportant:\nA flagged observation is not automatically an error. A genuine high-value customer may be unusual but important.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** With `Q1=20` and `Q3=32`, `IQR=12`. The common upper fence is `32 + 1.5×12 = 50`; a value of 75 is flagged as a potential outlier and should then be investigated."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Exploratory Data Analysis",
            "slug": "316-exploratory-data-analysis",
            "description": "Learn a repeatable EDA process for finding distributions, anomalies, relationships and data-quality issues.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "EDA is the systematic investigation of data before or alongside modeling.\n\nQuestions:\n- What are the distributions?\n- Which values are missing?\n- Are categories imbalanced?\n- Are there obvious relationships?\n- Are there outliers?\n- Are variables redundant?\n- Are there suspicious collection patterns?\n\nA useful EDA sequence:\n1. inspect shape and schema\n2. summarize numerical variables\n3. inspect categorical frequencies\n4. plot distributions\n5. compare target against important features\n6. inspect relationships and correlations\n7. investigate anomalies\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For a churn dataset, first inspect shape and missingness, then summarize numeric features, inspect category frequencies, plot distributions, compare features with churn, examine correlations and finally investigate suspicious records."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Pivot Tables",
            "slug": "317-pivot-tables",
            "description": "Learn practical tabular representations and summaries that make analytical patterns easier to inspect.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A pivot table summarizes data across dimensions.\n\nExample dataset:\n\n    city     vehicle   month   trips\n    Pune     Bike      Jan     120\n    Pune     Car       Jan      80\n    Delhi    Bike      Jan     150\n\nA pivot could place:\n- city on rows\n- vehicle on columns\n- trips as values\n- sum as aggregation\n\nIn pandas:\n\n    table = df.pivot_table(\n        index=\"city\",\n        columns=\"vehicle\",\n        values=\"trips\",\n        aggfunc=\"sum\"\n    )\n\nCommon aggregation functions:\n- sum\n- mean\n- count\n- min\n- max\n- median\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "```python\nimport pandas as pd\n\ndf = pd.DataFrame({\n    \"city\": [\"Pune\", \"Pune\", \"Delhi\"],\n    \"vehicle\": [\"Bike\", \"Car\", \"Bike\"],\n    \"trips\": [120, 80, 150],\n})\n\nsummary = df.pivot_table(\n    index=\"city\",\n    columns=\"vehicle\",\n    values=\"trips\",\n    aggfunc=\"sum\",\n)\n\nprint(summary)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Long versus Wide Data",
            "slug": "318-long-versus-wide-data",
            "description": "Learn practical tabular representations and summaries that make analytical patterns easier to inspect.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Long form stores observations in rows with variables represented as columns.\n\nWide form spreads categories across columns.\n\nLong format is often convenient for analysis and plotting because one variable can contain category labels. Wide format can be convenient for certain reports.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Long data might store one row per `(city, month, sales)`. Wide data might have columns `Jan`, `Feb`, `Mar`. Long form is often easier for grouped analysis and plotting, while wide form can be convenient for reports."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Missing Data in Aggregation",
            "slug": "319-missing-data-in-aggregation",
            "description": "Understand why values go missing and how different imputation or removal strategies affect a model.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Aggregation rules must define how missing values are handled.\n\nExample:\nIf one month's sales are unknown, a yearly total should not silently treat unknown sales as zero unless zero is actually the intended meaning.\n\nMissing and zero are different:\n- missing = value not known/available\n- zero = measured or logically determined to be zero\n\n**Learning lens:** First understand why the value is missing; only then choose an imputation or removal strategy."
              },
              {
                "title": "Example",
                "content": "**Example:** In `[42, 45, null, 49, 51]`, the observed median is 47. Median imputation is simple, but if missing income is concentrated among a particular group, replacing every missing value with 47 can hide a meaningful pattern."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "Heatmaps",
            "slug": "320-heatmaps",
            "description": "Learn how matrix-style visualizations expose patterns across two dimensions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A heatmap represents values in a two-dimensional grid where visual intensity indicates magnitude.\n\nUseful applications:\n- correlation matrices\n- activity by hour and day\n- missingness patterns\n- confusion matrices\n- feature importance summaries\n\nA clustered heatmap can reorder rows or columns according to similarity.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A correlation heatmap can reveal that `area` and `rooms` are strongly related. A separate heatmap of activity by weekday and hour can show when a service is busiest."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Correlation",
            "slug": "321-correlation",
            "description": "Understand association measures, their formulas, interpretation and limitations.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Correlation measures the degree to which two variables move together under a chosen correlation definition.\n\nPearson correlation:\n    r = cov(X,Y) / (s_X * s_Y)\n\nRange:\n    -1 <= r <= 1\n\nInterpretation:\nr close to +1 -> strong positive linear association\nr close to -1 -> strong negative linear association\nr close to 0 -> weak or no linear association\n\nImportant:\nCorrelation is not causation.\n\nExample:\nIce-cream sales and sunburn cases may both increase during hot weather. Temperature is a common underlying factor.\n\n**Learning lens:** When studying this, always separate association from causation and inspect whether the relationship is actually linear."
              },
              {
                "title": "Example",
                "content": "**Example:** If study time and score have Pearson correlation `r = 0.82`, they have a strong positive linear association in that dataset. This does not prove that increasing study time alone caused the higher scores."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Perfect and Zero Linear Association",
            "slug": "322-perfect-and-zero-linear-association",
            "description": "Study perfect and zero linear association with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "If every point lies exactly on an upward-sloping line, Pearson r can equal +1.\n\nIf every point lies exactly on a downward-sloping line, r can equal -1.\n\nA value near zero does not prove that two variables are unrelated. A strong nonlinear relationship can have weak Pearson correlation.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Learning example:** Take a small dataset related to perfect and zero linear association, write down what each input means, identify the expected output, and change one value at a time. Observe how the interpretation or result changes. This turns the topic from a definition into a testable idea."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Covariance",
            "slug": "323-covariance",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Covariance indicates whether two variables tend to move in the same or opposite directions, but its magnitude depends on measurement units.\n\nCorrelation standardizes the relationship and therefore is easier to compare across variable pairs.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `[6, 8, 10]`, the mean is 8. Squared deviations are `4, 0, 4`, so the sample variance is `8 / (3 - 1) = 4`."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "ANOVA",
            "slug": "324-anova",
            "description": "Learn how ANOVA compares variation within and between groups and what its conclusion does and does not mean.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "ANOVA means analysis of variance.\n\nIt is commonly used to compare means across three or more groups.\n\nCore idea:\nVariation within groups is compared with variation between groups.\n\nIf between-group variation is large relative to within-group variation, the evidence against equal group means becomes stronger.\n\n**Learning lens:** Focus on the meaning of within-group versus between-group variation before memorizing the F statistic."
              },
              {
                "title": "Example",
                "content": "**Example:** Compare average delivery times for three vehicle types. ANOVA asks whether the observed between-group variation is large relative to the variation within groups. A significant result indicates evidence that not all group means are equal; it does not identify every differing pair by itself."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Population and Sample",
            "slug": "325-population-and-sample",
            "description": "Understand the difference between the full population of interest and the sample used for analysis.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Population:\nThe full group of interest.\n\nSample:\nA subset used to learn about the population.\n\nExample:\nPopulation = every order placed by a national delivery service during a year.\nSample = 20,000 orders selected for analysis.\n\nSampling introduces uncertainty, so statistical conclusions should account for it.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** All orders placed nationally during a year are the population for a business question; 20,000 sampled orders can be the sample used to estimate characteristics of that population."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Hypothesis Testing",
            "slug": "326-hypothesis-testing",
            "description": "Learn how null and alternative hypotheses, test statistics and p-values support evidence-based decisions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A hypothesis test begins with a null hypothesis H0 and an alternative hypothesis H1.\n\nExample:\nH0: Three teaching methods have equal mean exam scores.\n\nH1: At least one mean differs.\n\nThe test produces evidence such as a p-value. A small p-value under the chosen assumptions indicates that the observed data would be relatively unusual if H0 were true.\n\nAvoid saying “p-value is the probability that H0 is true.” That is not the standard interpretation.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Suppose `H0` says three teaching methods have equal mean scores and `H1` says at least one differs. A small p-value under the test assumptions provides evidence against `H0`, but it is not the probability that `H0` is true."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Type I and Type II Errors",
            "slug": "327-type-i-and-type-ii-errors",
            "description": "Understand false-positive and false-negative errors and why their relative cost matters.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Type I error:\nRejecting a true null hypothesis.\n\nType II error:\nFailing to reject a false null hypothesis.\n\nMedical example:\nH0: A new treatment has no measurable improvement.\n\nType I:\nConclude that it works when it does not.\n\nType II:\nFail to detect a real improvement.\n\nThe relative cost of these errors depends on the application.\n\nUNIT 4 — MODEL DEVELOPMENT\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** In a medical screening test, a false positive can lead to unnecessary follow-up, while a false negative can miss a real condition. Which error matters more depends on the application."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          }
        ],
      },
      {
        title: "Regression & Data Pipelines",
        slug: "regression-data-pipelines",
        description: "A structured learning module covering regression & data pipelines.",
        topics: [
          {
            "title": "Regression Analysis",
            "slug": "41-regression-analysis",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Regression predicts a numerical target from one or more predictors.\n\nExamples:\n- predict delivery time\n- estimate electricity consumption\n- forecast demand\n- predict house price\n- estimate monthly revenue\n\nA regression model attempts to learn:\n    X -> Y\n\nwhere X represents input features and Y is the continuous target.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "**Learning example:** Take a small dataset related to regression analysis, write down what each input means, identify the expected output, and change one value at a time. Observe how the interpretation or result changes. This turns the topic from a definition into a testable idea."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Simple Linear Regression",
            "slug": "42-simple-linear-regression",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Simple linear regression uses one predictor.\n\nEquation:\n    y_hat = m*x + c\n\nwhere:\n- m = slope\n- c = intercept\n- y_hat = predicted target\n\nExample:\nPredict monthly electricity cost from apartment area.\n\nIf:\n    m = 7\n    c = 500\n\nthen for 80 square meters:\n    y_hat = 7*80 + 500\n         = 1060\n\nThe coefficients are estimated from training data rather than guessed manually.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "```python\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([32, 38, 44, 51, 57])\n\nmodel = LinearRegression()\nmodel.fit(X, y)\n\nprint(model.predict([[6]])[0])\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Least Squares Intuition",
            "slug": "43-least-squares-intuition",
            "description": "Study least squares intuition with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A common fitting objective minimizes the sum of squared residuals:\n\n    SSE = sum((y_i - y_hat_i)^2)\n\nSquaring gives greater weight to larger errors and avoids positive/negative errors cancelling.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For actual values `[10, 12, 20]` and predictions `[11, 10, 18]`, residuals are `[-1, 2, 2]`. The squared-error total is `1 + 4 + 4 = 9`; least squares chooses coefficients that minimize this quantity over the training data."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Multiple Linear Regression",
            "slug": "44-multiple-linear-regression",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Multiple linear regression uses several predictors.\n\nEquation:\n    y_hat = b0 + b1*x1 + b2*x2 + ... + bk*xk\n\nExample:\nPredict a car's fuel consumption from:\n- engine size\n- vehicle mass\n- number of cylinders\n\nEach coefficient represents the model's estimated change in the prediction for a one-unit change in that feature while holding the other included features fixed, subject to the model assumptions.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "**Example:** Predict house price from area, bedrooms and age. A coefficient for area describes the model's change in predicted price for a one-unit increase in area while the other included predictors are held fixed."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Fresh Python Example",
            "slug": "45-fresh-python-example",
            "description": "Study fresh python example with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "import pandas as pd\n    from sklearn.model_selection import train_test_split\n    from sklearn.linear_model import LinearRegression\n\n    df = pd.DataFrame({\n        \"area\": [550, 700, 850, 1000, 1200, 1500],\n        \"bedrooms\": [1, 1, 2, 2, 3, 3],\n        \"price\": [32, 40, 51, 61, 76, 95]\n    })\n\n    X = df[[\"area\", \"bedrooms\"]]\n    y = df[\"price\"]\n\n    X_train, X_test, y_train, y_test = train_test_split(\n        X, y, test_size=0.25, random_state=42\n    )\n\n    model = LinearRegression()\n    model.fit(X_train, y_train)\n\n    predictions = model.predict(X_test)\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, random_state=42\n)\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)\nprint(predictions)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "R-Squared",
            "slug": "46-r-squared",
            "description": "Learn what R-squared measures, how it is computed and why it should not be used as the only model-quality measure.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "R-squared measures the proportion of target variance explained by the fitted regression model relative to a baseline based on the mean, under the usual definition.\n\n    R^2 = 1 - SS_res / SS_tot\n\nA value closer to 1 can indicate better fit, but R-squared is not a universal quality score.\n\nProblems:\n- a high R-squared does not prove causality\n- adding predictors can increase R-squared even if they add little practical value\n- a model can have reasonable R-squared but poor performance on future data\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** If `SS_res = 20` and `SS_tot = 100`, then `R² = 1 - 20/100 = 0.80`. The fitted model reduces squared error relative to the mean baseline by 80% under this definition."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Residuals",
            "slug": "47-residuals",
            "description": "Understand residuals as prediction errors and use their patterns to diagnose missing structure or changing variance.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Residual:\n    e_i = y_i - y_hat_i\n\nA residual is the vertical difference between an observed value and its predicted value.\n\nExample:\nActual delivery time = 42 minutes\nPredicted = 38 minutes\n\nResidual:\n    42 - 38 = 4 minutes\n\nPositive residual means the actual value is above the prediction.\n\nNegative residual means the actual value is below the prediction.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Actual delivery time is 42 minutes and the prediction is 38 minutes. Residual = `42 - 38 = 4`. A positive residual means the model predicted too low for that observation."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Residual Plots",
            "slug": "48-residual-plots",
            "description": "Understand residuals as prediction errors and use their patterns to diagnose missing structure or changing variance.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A residual plot displays residuals against a predictor or fitted value.\n\nA useful residual pattern is:\n- points scattered around zero\n- no obvious curve\n- no funnel shape\n- no systematic trend\n- roughly stable spread\n\nBad pattern:\nA curved shape can suggest that a linear relationship is missing an important nonlinear component.\n\nAnother bad pattern:\nA funnel shape can suggest changing error variance.\n\nClusters can indicate omitted groups or variables.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Actual delivery time is 42 minutes and the prediction is 38 minutes. Residual = `42 - 38 = 4`. A positive residual means the model predicted too low for that observation."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Why Residual Independence Matters",
            "slug": "49-why-residual-independence-matters",
            "description": "Understand residuals as prediction errors and use their patterns to diagnose missing structure or changing variance.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Many statistical regression interpretations assume errors are independent.\n\nTime-series example:\nIf today's prediction error is related to yesterday's error, the residuals are not independent. A standard regression model may then underestimate uncertainty or miss temporal structure.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Actual delivery time is 42 minutes and the prediction is 38 minutes. Residual = `42 - 38 = 4`. A positive residual means the model predicted too low for that observation."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Regression Error Metrics",
            "slug": "410-regression-error-metrics",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Mean Absolute Error:\n    MAE = mean(|y_i - y_hat_i|)\n\nEasy to interpret in the original target units.\n\nMean Squared Error:\n    MSE = mean((y_i - y_hat_i)^2)\n\nPenalizes large errors more strongly.\n\nRoot Mean Squared Error:\n    RMSE = sqrt(MSE)\n\nReturns to the original target units.\n\nExample:\nActual = [10, 12, 20]\nPrediction = [11, 10, 18]\n\nErrors:\n    [-1, 2, 2]\n\nMAE:\n    (1+2+2)/3 = 1.67\n\nMSE:\n    (1+4+4)/3 = 3\n\nRMSE:\n    sqrt(3) ≈ 1.73\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Actual `[10, 12, 20]`, prediction `[11, 10, 18]` gives errors `[-1, 2, 2]`. MAE = `1.67`, MSE = `3`, and RMSE ≈ `1.73`. MAE is easy to interpret; MSE emphasizes large errors."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Polynomial Regression",
            "slug": "411-polynomial-regression",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Polynomial regression extends a regression model with powers of a feature.\n\nExample:\n    y_hat = b0 + b1*x + b2*x^2\n\nA cubic version:\n    y_hat = b0 + b1*x + b2*x^2 + b3*x^3\n\nThe relationship between x and y can curve even though the coefficients remain linear in the parameters.\n\nFresh example:\nSuppose battery performance first improves slightly with temperature, reaches a useful operating region and then deteriorates. A polynomial feature may capture curvature better than a straight line.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.pipeline import Pipeline\n\nmodel = Pipeline([\n    (\"poly\", PolynomialFeatures(degree=2, include_bias=False)),\n    (\"regressor\", LinearRegression()),\n])\n\nmodel.fit(X, y)\nprediction = model.predict([[6]])\nprint(prediction)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Polynomial Degree",
            "slug": "412-polynomial-degree",
            "description": "Study polynomial degree with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Degree 1:\nLinear\n\nDegree 2:\nQuadratic\n\nDegree 3:\nCubic\n\nHigher degree:\nMore flexible curve\n\nBut flexibility can increase overfitting. The best degree should be selected using validation rather than simply choosing the largest possible value.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A degree-2 curve can capture a U-shaped relationship. A degree-15 curve may fit training points almost perfectly but behave wildly between observations or outside the observed range. Select degree using validation."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Linear versus Polynomial Regression",
            "slug": "413-linear-versus-polynomial-regression",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Linear regression:\n- simpler\n- easier to interpret\n- works well when a linear approximation is adequate\n\nPolynomial regression:\n- can model curvature\n- may capture nonlinear patterns\n- can become unstable or overfit at high degrees\n\nExample:\nFor data following a U-shaped pattern, a degree-2 polynomial may be more appropriate than a straight line.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.pipeline import Pipeline\n\nmodel = Pipeline([\n    (\"poly\", PolynomialFeatures(degree=2, include_bias=False)),\n    (\"regressor\", LinearRegression()),\n])\n\nmodel.fit(X, y)\nprediction = model.predict([[6]])\nprint(prediction)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Regression Assumptions",
            "slug": "414-regression-assumptions",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Depending on the statistical purpose, common assumptions include:\n- appropriate functional form\n- independent errors\n- stable error variance\n- limited problematic multicollinearity\n- appropriate treatment of extreme observations\n- for some inference procedures, assumptions about error distribution\n\nMachine-learning prediction does not require every classical inference assumption in exactly the same way, but violations can still affect performance and interpretation.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "**Example:** Plot residuals after fitting a regression model. A strong curve suggests the functional form may be incomplete; a funnel suggests changing variance; strong predictor overlap can make coefficients unstable."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Data Science Pipeline",
            "slug": "415-data-science-pipeline",
            "description": "Learn how preprocessing, modeling, evaluation and deployment can be organized into a reproducible pipeline.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A data pipeline is a sequence of processes that moves raw information toward a usable analytical result.\n\nTypical stages:\n1. source discovery\n2. ingestion\n3. storage\n4. cleaning\n5. transformation\n6. analysis\n7. modeling\n8. evaluation\n9. delivery/deployment\n10. monitoring\n\nExample:\nA sales team wants quarterly targets.\n\nPipeline:\n- ingest historical orders\n- standardize product identifiers\n- remove duplicate transactions\n- aggregate sales by week\n- create features for seasonality and promotions\n- train a forecasting model\n- evaluate future-like periods\n- publish forecasts to the planning system\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A sales pipeline ingests historical orders, standardizes product IDs, removes duplicates, aggregates weekly sales, creates seasonal features, trains a forecasting model, evaluates future-like periods and publishes forecasts."
              },
              {
                "title": "Practical use",
                "content": "Use this to turn experimentation into a repeatable learning or production workflow with clear controls and traceability."
              }
            ]
          },
          {
            "title": "Key Pipeline Characteristics",
            "slug": "416-key-pipeline-characteristics",
            "description": "Learn how preprocessing, modeling, evaluation and deployment can be organized into a reproducible pipeline.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A good pipeline should be:\n- reproducible\n- observable\n- testable\n- scalable\n- secure\n- versioned\n- fault-tolerant where necessary\n\nData quality checks should be automated where practical.\n\nExample checks:\n    price >= 0\n    order_id is unique\n    currency is known\n    timestamp is parseable\n    required fields are not unexpectedly missing\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A production pipeline can log input schema versions, test `price >= 0`, track model versions, retry recoverable ingestion failures and emit metrics when data quality checks fail."
              },
              {
                "title": "Practical use",
                "content": "Use this to turn experimentation into a repeatable learning or production workflow with clear controls and traceability."
              }
            ]
          },
          {
            "title": "Pipeline Feedback Loops",
            "slug": "417-pipeline-feedback-loops",
            "description": "Learn how preprocessing, modeling, evaluation and deployment can be organized into a reproducible pipeline.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A model project rarely ends after deployment.\n\nPossible loop:\nprediction quality drops\n -> investigate incoming data\n -> detect changed behavior\n -> retrain or redesign\n -> validate\n -> redeploy\n\nThis is one reason production ML differs from a one-time classroom experiment.\n\nUNIT 5 — MODEL EVALUATION AND GENERALIZATION\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Delivery prediction error rises from 4 to 8 minutes after a routing-system change. The team investigates feature distributions, confirms changed traffic behavior, retrains if necessary, validates again and only then redeploys."
              },
              {
                "title": "Practical use",
                "content": "Use this to turn experimentation into a repeatable learning or production workflow with clear controls and traceability."
              }
            ]
          }
        ],
      }
      ],
    },
    {
      name: "Advanced",
      slug: "advanced",
      description: "Master model evaluation, generalization, tuning, deeper concepts and an end-to-end practical workflow.",
      level: StudyLevel.ADVANCED,
      modules: [
      {
        title: "Model Evaluation, Generalization & Tuning",
        slug: "model-evaluation-generalization-tuning",
        description: "A structured learning module covering model evaluation, generalization & tuning.",
        topics: [
          {
            "title": "Generalization",
            "slug": "51-generalization",
            "description": "Learn why performance on unseen data is the real target of machine-learning evaluation.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "The central question in ML evaluation is:\n\n“How well will this model perform on data it has not seen before?”\n\nTraining performance alone is not enough.\n\nA model can memorize training examples and still fail on new cases.\n\nGeneralization means transferring learned patterns to unseen observations drawn from the intended future distribution.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A model scores 99% on training data but 71% on unseen orders. The relevant question is not how well it memorized the training set; it is whether the 71% performance is acceptable for future cases."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Holdout Evaluation",
            "slug": "52-holdout-evaluation",
            "description": "Learn how a held-out dataset provides an independent evaluation of a trained model.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A holdout set is kept separate from training.\n\nExample:\n10,000 labeled examples\n    8,000 training\n    2,000 test\n\nThe model never uses test labels while fitting.\n\nIf multiple models are repeatedly chosen using the same test set, the test set is no longer a clean final estimate. Use a validation process for model selection and preserve a final test set when practical.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Keep the final 2,000 examples untouched while candidate models are developed on the first 8,000. The final score on those 2,000 is then used once for the final assessment."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Confusion Matrix",
            "slug": "53-confusion-matrix",
            "description": "Learn how TP, TN, FP and FN describe binary classification outcomes and lead to useful metrics.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "For binary classification:\n\n                 Actual Positive   Actual Negative\nPred Positive       TP                FP\nPred Negative       FN                TN\n\nTP = true positive\nTN = true negative\nFP = false positive\nFN = false negative\n\nExample:\nA model predicts whether a transaction is suspicious.\n\nTP:\nSuspicious transaction correctly flagged.\n\nTN:\nNormal transaction correctly allowed.\n\nFP:\nNormal transaction incorrectly flagged.\n\nFN:\nSuspicious transaction incorrectly missed.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `TP=42, TN=48, FP=6, FN=4`, there are 100 predictions. Accuracy is 90%, precision is `42/48 = 0.875`, and recall is `42/46 ≈ 0.913`."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Accuracy",
            "slug": "54-accuracy",
            "description": "Learn how accuracy is calculated and when class imbalance makes it misleading.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Accuracy = (TP + TN) / (TP + TN + FP + FN)\n\nUseful when classes are reasonably balanced and the costs of mistakes are similar.\n\nExample:\nIf 980 of 1000 predictions are correct:\n    accuracy = 98%\n\nBut suppose only 1% of transactions are fraudulent. A model that predicts “normal” every time gets 99% accuracy while detecting no fraud. Accuracy can therefore be misleading under strong class imbalance.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A fraud dataset contains 9,900 normal transactions and 100 fraudulent ones. Predicting “normal” for every transaction gives 99% accuracy while detecting zero fraud, so accuracy alone is inadequate."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Precision",
            "slug": "55-precision",
            "description": "Learn how precision measures the reliability of positive predictions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Precision = TP / (TP + FP)\n\nQuestion:\n“Among the cases predicted positive, how many were actually positive?”\n\nHigh precision is valuable when false alarms are expensive.\n\nExample:\nIf an operations team manually investigates every flagged transaction, too many false positives create unnecessary workload.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** If a model flags 50 transactions as suspicious and 40 are actually suspicious, precision is `40/50 = 0.80`. Eighty percent of alerts are useful under this definition."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Recall",
            "slug": "56-recall",
            "description": "Learn how recall measures the ability to find actual positive cases.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Recall = TP / (TP + FN)\n\nQuestion:\n“Among all actual positive cases, how many did the model find?”\n\nHigh recall is valuable when missing a positive case is costly.\n\nExample:\nFor a safety screening system, missing a genuinely risky case may be much worse than reviewing an extra false alarm.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** If there are 50 truly suspicious transactions and the model catches 40, recall is `40/50 = 0.80`. Ten suspicious cases were missed."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "F1 Score",
            "slug": "57-f1-score",
            "description": "Learn how the F1 score combines precision and recall into one harmonic-mean metric.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "F1 = 2 * precision * recall / (precision + recall)\n\nF1 balances precision and recall through their harmonic mean.\n\nUse it when both kinds of classification error matter and a single summary is useful.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** With precision 0.80 and recall 0.60, F1 is `2×0.80×0.60/(0.80+0.60) ≈ 0.686`. It is high only when both precision and recall are reasonably strong."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Thresholds and Probabilities",
            "slug": "58-thresholds-and-probabilities",
            "description": "Learn how changing a probability threshold changes classification decisions and the precision-recall trade-off.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Many classifiers produce a probability rather than a final class.\n\nExample:\n    P(fraud | features) = 0.82\n\nA threshold of 0.50 might classify this as fraud.\n\nChanging the threshold changes precision and recall.\n\nIf missing fraud is very expensive, a lower threshold may increase recall at the cost of more false positives.\n\nTherefore the threshold is part of the business decision, not merely a default technical setting.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A fraud model outputs `P(fraud)=0.62`. At a threshold of 0.50 it is flagged; at 0.70 it is not. Lowering the threshold generally catches more positives but can create more false alarms."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Hypothesis Testing and Classification Errors",
            "slug": "59-hypothesis-testing-and-classification-errors",
            "description": "Learn how null and alternative hypotheses, test statistics and p-values support evidence-based decisions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "There is a useful conceptual analogy:\n\nType I error corresponds to a false positive:\nReject a true null hypothesis.\n\nType II error corresponds to a false negative:\nFail to reject a false null hypothesis.\n\nThe exact statistical setup depends on the test, so the analogy should not be used as a substitute for understanding the confusion matrix.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Suppose `H0` says three teaching methods have equal mean scores and `H1` says at least one differs. A small p-value under the test assumptions provides evidence against `H0`, but it is not the probability that `H0` is true."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "Cross-Validation",
            "slug": "510-cross-validation",
            "description": "Learn how repeated train-validation splits provide more stable estimates and support model selection.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Cross-validation estimates how a model may generalize by repeatedly training and evaluating across different partitions.\n\nK-fold process:\n1. divide training data into K folds\n2. use K-1 folds for training\n3. use the remaining fold for validation\n4. repeat until every fold has been validation data\n5. aggregate the scores\n\nExample with K=5:\nFold 1 validation, folds 2-5 training\nFold 2 validation, folds 1,3-5 training\n...\nFold 5 validation, folds 1-4 training\n\nThe average score is often used as a more stable estimate than a single split.\n\n**Learning lens:** The important idea is repeated use of different validation folds without contaminating the final test estimate."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import Ridge\n\nscores = cross_val_score(\n    Ridge(alpha=1.0),\n    X,\n    y,\n    cv=5,\n    scoring=\"neg_mean_absolute_error\",\n)\n\nprint(\"Mean MAE:\", -scores.mean())\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Choosing K",
            "slug": "511-choosing-k",
            "description": "Study choosing k with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Common choices include 5 or 10.\n\nLarger K:\n- more training data in each fit\n- more computational cost\n- estimates can become more correlated\n\nSmaller K:\n- faster\n- each validation set is larger\n- estimate may have different bias/variance properties\n\nThere is no universally best K.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Compare 5-fold and 10-fold cross-validation on the same training set. Ten folds require more model fits, so the choice is a trade-off between computational cost and how much data each training run uses."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Stratified Cross-Validation",
            "slug": "512-stratified-cross-validation",
            "description": "Learn how repeated train-validation splits provide more stable estimates and support model selection.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "For classification, preserve class proportions in each fold when appropriate.\n\nExample:\nIf positive cases represent 10% of the dataset, each fold should be close to that proportion.\n\nThis prevents an unlucky split where a validation fold contains too few positive examples.\n\n**Learning lens:** The important idea is repeated use of different validation folds without contaminating the final test estimate."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import Ridge\n\nscores = cross_val_score(\n    Ridge(alpha=1.0),\n    X,\n    y,\n    cv=5,\n    scoring=\"neg_mean_absolute_error\",\n)\n\nprint(\"Mean MAE:\", -scores.mean())\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Time-Series Validation",
            "slug": "513-time-series-validation",
            "description": "Study time-series validation with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Do not randomly shuffle temporal data when future information must remain unavailable.\n\nExample:\nTrain:\n    Jan-Apr\n\nValidate:\n    May\n\nThen:\n    Train Jan-May\n    Validate Jun\n\nThis better resembles real forecasting.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Train on January–April and validate on May; then train on January–May and validate on June. This respects the fact that future observations should not influence the past."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "Overfitting",
            "slug": "514-overfitting",
            "description": "Learn why a model can perform extremely well on training data yet fail on unseen cases.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Overfitting occurs when a model captures training-specific noise or accidental patterns and performs poorly on unseen data.\n\nSymptoms:\n- training score very high\n- validation/test score much lower\n- complex model with unstable predictions\n\nExample:\nA degree-15 polynomial may pass almost exactly through training observations but produce wild predictions between or beyond them.\n\nWays to reduce overfitting:\n- collect more representative data\n- simplify the model\n- regularize\n- reduce unnecessary features\n- use cross-validation\n- tune hyperparameters\n- early stopping for suitable iterative models\n- improve feature quality\n- prevent leakage\n\n**Learning lens:** Compare training and validation behavior rather than judging complexity from the model name alone."
              },
              {
                "title": "Example",
                "content": "**Example:** A degree-15 polynomial follows every training point closely but produces extreme predictions between points. The large gap between training and validation performance is a classic warning sign."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Underfitting",
            "slug": "515-underfitting",
            "description": "Learn how an overly simple or constrained model can miss useful structure.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Underfitting occurs when a model is too simple to capture useful structure.\n\nSymptoms:\n- training performance poor\n- validation performance also poor\n\nPossible causes:\n- overly simple model\n- weak features\n- excessive regularization\n- insufficient training\n\nSolutions:\n- improve features\n- use a more expressive model\n- reduce excessive regularization\n- train appropriately longer for iterative algorithms\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A straight-line model is used for a clearly curved relationship and performs poorly on both training and validation data. The model is too constrained to represent the useful structure."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Bias and Variance Intuition",
            "slug": "516-bias-and-variance-intuition",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "High bias:\nModel is too constrained and misses important structure.\n\nHigh variance:\nModel reacts strongly to training-set details.\n\nA useful goal is not “make the model as complex as possible,” but “find the right complexity for the amount and quality of available information.”\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `[6, 8, 10]`, the mean is 8. Squared deviations are `4, 0, 4`, so the sample variance is `8 / (3 - 1) = 4`."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Ridge Regression",
            "slug": "517-ridge-regression",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Ridge regression adds an L2 penalty to the loss.\n\nA common objective is:\n\n    sum((y_i - y_hat_i)^2) + lambda * sum(b_j^2)\n\nwhere lambda controls the strength of regularization.\n\nAs lambda increases, coefficients are generally pushed toward zero.\n\nWhy this helps:\nLarge coefficients can make a model sensitive to noise, especially when predictors are correlated.\n\nRidge usually does not force coefficients exactly to zero; it shrinks them.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.linear_model import Ridge\n\nmodel = Ridge(alpha=1.0)\nmodel.fit(X_train, y_train)\n\nprediction = model.predict(X_test)\nprint(prediction)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "Effect of Regularization",
            "slug": "518-effect-of-regularization",
            "description": "Learn how L2 regularization controls coefficient size and can improve stability.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "lambda = 0:\nOrdinary least squares behavior.\n\nSmall lambda:\nMild shrinkage.\n\nLarge lambda:\nStrong shrinkage and potentially underfitting.\n\nHyperparameter selection should use validation or cross-validation.\n\n**Learning lens:** Think of regularization as adding a preference for smaller coefficients, not as magically making a model accurate."
              },
              {
                "title": "Example",
                "content": "**Example:** With `lambda=0`, ridge behaves like ordinary least squares. Increasing `lambda` shrinks coefficients more strongly. If it becomes too large, useful signal can also be suppressed and the model can underfit."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Grid Search",
            "slug": "519-grid-search",
            "description": "Learn how hyperparameter search balances model quality, validation reliability and computational cost.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Grid search systematically evaluates combinations of candidate hyperparameters.\n\nExample:\nFor a model with:\n    alpha = [0.01, 0.1, 1, 10]\n    max_depth = [3, 5, 8]\n\nThe grid contains:\n    4 * 3 = 12 combinations\n\nWith 5-fold cross-validation:\n    12 * 5 = 60 model fits\n\nGrid search is easy to understand but can become expensive as the number of hyperparameters and candidate values grows.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.svm import SVR\n\nsearch = GridSearchCV(\n    SVR(kernel=\"rbf\"),\n    {\n        \"C\": [0.1, 1, 10],\n        \"epsilon\": [0.01, 0.1, 0.5],\n        \"gamma\": [\"scale\", 0.1],\n    },\n    cv=5,\n    scoring=\"neg_mean_squared_error\",\n)\n\nsearch.fit(X_train, y_train)\nprint(search.best_params_)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Hyperparameters versus Parameters",
            "slug": "520-hyperparameters-versus-parameters",
            "description": "Understand which values are learned from data and which are selected before or around training.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Parameters:\nLearned from training data.\n\nExamples:\n- regression coefficients\n- neural-network weights\n\nHyperparameters:\nChosen before or around training.\n\nExamples:\n- ridge alpha/lambda\n- tree depth\n- number of neighbors\n- kernel parameters\n- learning rate\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A linear regression coefficient is learned from training data, so it is a parameter. Ridge `alpha` is selected by the practitioner or validation process, so it is a hyperparameter."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Example Grid Search",
            "slug": "521-example-grid-search",
            "description": "Learn how hyperparameter search balances model quality, validation reliability and computational cost.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "from sklearn.model_selection import GridSearchCV\n    from sklearn.svm import SVR\n\n    model = SVR(kernel=\"rbf\")\n\n    grid = {\n        \"C\": [0.1, 1, 10],\n        \"epsilon\": [0.01, 0.1, 0.5],\n        \"gamma\": [\"scale\", 0.1]\n    }\n\n    search = GridSearchCV(\n        estimator=model,\n        param_grid=grid,\n        cv=5,\n        scoring=\"neg_mean_squared_error\"\n    )\n\n    search.fit(X_train, y_train)\n\n    best_model = search.best_estimator_\n\nThe RBF kernel can represent nonlinear relationships. C controls the tradeoff between fitting training data and allowing violations, epsilon defines a tolerance region in SVR, and gamma controls the influence scale of individual training points.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.svm import SVR\n\nsearch = GridSearchCV(\n    SVR(kernel=\"rbf\"),\n    {\n        \"C\": [0.1, 1, 10],\n        \"epsilon\": [0.01, 0.1, 0.5],\n        \"gamma\": [\"scale\", 0.1],\n    },\n    cv=5,\n    scoring=\"neg_mean_squared_error\",\n)\n\nsearch.fit(X_train, y_train)\nprint(search.best_params_)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Evaluation Leakage",
            "slug": "522-evaluation-leakage",
            "description": "Learn how information that would not exist at prediction time can silently invalidate an evaluation.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Leakage occurs when information unavailable at prediction time influences training or evaluation.\n\nExample:\nPredict whether a customer will cancel tomorrow.\n\nBad feature:\n“Cancellation confirmation timestamp.”\n\nThat field exists only after the event, so using it gives the model information that would not exist at prediction time.\n\nPreprocessing leakage is another common problem:\nComputing the mean and standard deviation using the entire dataset before splitting can allow evaluation information to influence training transformations.\n\n**Learning lens:** Ask one question: would this value genuinely exist at the exact moment the production prediction is made?"
              },
              {
                "title": "Example",
                "content": "**Example:** To predict tomorrow's cancellation, a feature named `cancellation_confirmed_at` is invalid because it is populated after the event. Even a highly accurate model using that feature would be solving the wrong prediction problem."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Model Selection Workflow",
            "slug": "523-model-selection-workflow",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A robust workflow:\n\n1. define target and prediction time\n2. identify legitimate features\n3. split data appropriately\n4. build preprocessing pipeline\n5. establish a simple baseline\n6. train candidate models\n7. use validation or cross-validation\n8. tune hyperparameters\n9. select a model\n10. evaluate once on the final test set\n11. inspect errors\n12. deploy if quality and risk are acceptable\n13. monitor production behavior\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** In `[2, 2, 3, 4, 4, 4, 7]`, the mode is 4 because it occurs most often."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Baseline Models",
            "slug": "524-baseline-models",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Always compare a complex model against a simple baseline.\n\nRegression baseline:\nPredict the training-set mean.\n\nClassification baseline:\nPredict the majority class.\n\nIf a sophisticated model barely beats the baseline, investigate the data and objective before adding complexity.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** In `[2, 2, 3, 4, 4, 4, 7]`, the mode is 4 because it occurs most often."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "Error Analysis",
            "slug": "525-error-analysis",
            "description": "Learn how to inspect individual and segment-level failures instead of relying only on aggregate metrics.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Aggregate metrics can hide important failures.\n\nInspect examples where:\n- error is very large\n- confidence is high but prediction is wrong\n- a specific category performs poorly\n- recent data behaves differently\n- one geographic or demographic segment performs differently\n\nExample:\nOverall MAE = 5 minutes.\n\nBut:\n- urban MAE = 3\n- rural MAE = 11\n\nThe overall number hides a useful operational problem.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Overall delivery MAE is 4.4 minutes, but heavy-rain MAE is 8.9 while normal-weather MAE is 3.8. The aggregate metric hides a segment where the model is substantially weaker."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "Model Evaluation Checklist",
            "slug": "526-model-evaluation-checklist",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 23,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Before accepting a model, ask:\n\nData\n- Is the evaluation set representative?\n- Are labels reliable?\n- Is there leakage?\n- Are duplicates crossing train and test?\n\nModel\n- Is the model appropriate for the task?\n- Is it too simple or too complex?\n- Is it stable across folds?\n\nMetrics\n- Does the chosen metric match business costs?\n- Are multiple metrics needed?\n- Is class imbalance handled?\n\nRobustness\n- Does performance hold across important segments?\n- Does performance degrade over time?\n- Are there unusual failure modes?\n\nProduction\n- Can predictions be generated within the required latency?\n- Is the model reproducible?\n- Can data and model versions be traced?\n- Is monitoring available?\n\nPYTHON TOOLKIT FOR THE COURSE\n\nNumPy\n\nNumPy provides efficient numerical arrays and operations useful for mathematical computation.\n\nExample:\n    import numpy as np\n\n    x = np.array([10, 20, 30])\n    print(x.mean())\n    print(x.std())\n\nPandas\n\nPandas is useful for tabular data manipulation.\n\nExample:\n    import pandas as pd\n\n    df = pd.DataFrame({\n        \"hours\": [2, 4, 6, 8],\n        \"score\": [45, 55, 72, 88]\n    })\n\n    print(df.describe())\n\nMatplotlib\n\nUseful for basic plotting.\n\nExample:\n    import matplotlib.pyplot as plt\n\n    plt.scatter(df[\"hours\"], df[\"score\"])\n    plt.xlabel(\"Study hours\")\n    plt.ylabel(\"Score\")\n    plt.show()\n\nScikit-learn\n\nCommon components:\n- train_test_split\n- preprocessing\n- pipelines\n- LinearRegression\n- Ridge\n- classification models\n- metrics\n- GridSearchCV\n- cross-validation utilities\n\nA reusable pattern:\n\n    from sklearn.model_selection import train_test_split\n    from sklearn.metrics import mean_absolute_error\n    from sklearn.linear_model import LinearRegression\n\n    X_train, X_test, y_train, y_test = train_test_split(\n        X, y, test_size=0.2, random_state=42\n    )\n\n    model = LinearRegression()\n    model.fit(X_train, y_train)\n\n    pred = model.predict(X_test)\n\n    mae = mean_absolute_error(y_test, pred)\n    print(\"MAE:\", mae)\n\nUse a fixed random_state during experiments when reproducibility is useful. It does not make a model universally better; it simply makes that split repeatable.\n\nEND-TO-END MINI PROJECT — DELIVERY TIME PREDICTION\n\nProblem\n\nPredict delivery time in minutes before an order is dispatched.\n\nTarget:\n    delivery_minutes\n\nCandidate features:\n- distance_km\n- order_items\n- restaurant_load\n- driver_experience_months\n- hour_of_day\n- weather_category\n- vehicle_type\n\nStep 1 — Define success\n\nSuppose the business cares about average absolute error and wants MAE below 5 minutes on future-like orders.\n\nStep 2 — Inspect data\n\nCheck:\n- missing values\n- impossible distances\n- duplicate order IDs\n- negative delivery times\n- category consistency\n- timestamp validity\n\nStep 3 — Prevent leakage\n\nDo not use:\n- actual arrival timestamp\n- post-dispatch customer feedback\n- final route duration\n\nThose values are unavailable at prediction time.\n\nStep 4 — Split\n\nIf the goal is future prediction, use a chronological split.\n\nStep 5 — Preprocess\n\nNumerical:\n- median imputation\n- scaling if required\n\nCategorical:\n- most-frequent imputation\n- one-hot encoding\n\nStep 6 — Baseline\n\nPredict the median historical delivery time.\n\nStep 7 — Train candidates\n\nTry:\n- linear regression\n- ridge regression\n- tree-based regression\n- another suitable nonlinear method\n\nStep 8 — Validate\n\nUse a validation strategy consistent with time order.\n\nStep 9 — Tune\n\nTune hyperparameters with cross-validation on the training portion only.\n\nStep 10 — Final test\n\nEvaluate once on the untouched final period.\n\nStep 11 — Error analysis\n\nSuppose results are:\n    Overall MAE = 4.4\n    Heavy-rain MAE = 8.9\n    Normal-weather MAE = 3.8\n\nThe overall metric is acceptable, but the rain segment needs investigation.\n\nPossible causes:\n- insufficient rain examples\n- missing traffic features\n- unreliable weather labels\n- operational changes during storms\n\nStep 12 — Deployment\n\nExpose the model through the application's prediction service.\n\nStep 13 — Monitoring\n\nTrack:\n- prediction error when labels arrive\n- feature distributions\n- missingness\n- latency\n- model version\n- segment-level performance\n\nThis example demonstrates why machine learning is a complete engineering and analytical process rather than just calling fit().\n\n\n1. What is machine learning?\nMachine learning is a method of learning useful patterns or relationships from data so a system can make predictions or decisions on new observations.\n\n2. Why is preprocessing important?\nBecause raw data can contain missing values, inconsistent categories, noise, different scales, duplicates and irrelevant information. Poor inputs can lead to poor models.\n\n3. Why split data?\nTo estimate performance on observations not used for fitting.\n\n4. Why not train and test on the same data?\nThe model can memorize training examples, so training performance can be overly optimistic.\n\n5. What is overfitting?\nExcellent training performance combined with poor generalization.\n\n6. What is underfitting?\nThe model is too limited to capture important structure, causing poor training and validation performance.\n\n7. What is a residual?\nObserved target minus predicted target.\n\n8. What is R-squared?\nA measure comparing regression residual variation with total variation relative to a mean baseline.\n\n9. Difference between MAE and MSE?\nMAE averages absolute errors; MSE averages squared errors and therefore emphasizes large errors more.\n\n10. Why use ridge regression?\nTo shrink coefficients and control model complexity, especially when predictors are correlated or the unregularized model is unstable.\n\n11. What is cross-validation?\nA repeated train/validation procedure across multiple partitions used to estimate model performance and support model selection.\n\n12. What is grid search?\nSystematic evaluation of predefined hyperparameter combinations.\n\n13. What is precision?\nAmong predicted positives, the fraction that are truly positive.\n\n14. What is recall?\nAmong actual positives, the fraction successfully detected.\n\n15. Why can accuracy be misleading?\nBecause a heavily imbalanced dataset can produce high accuracy even when the minority class is almost never detected.\n\n16. Correlation versus causation?\nCorrelation describes statistical association; it does not by itself establish that one variable causes another.\n\n17. What is data leakage?\nUsing information during training or evaluation that would not legitimately be available when making the real prediction.\n\n18. Why use a pipeline?\nTo make preprocessing and modeling reproducible and to reduce accidental inconsistency or leakage.\n\n19. Why inspect residual plots?\nTo detect systematic patterns that suggest the regression form, variance assumptions or missing structure may be inadequate.\n\n20. Why use a baseline?\nTo determine whether the machine-learning model provides meaningful improvement over a simple strategy.\n\nADDITIONAL COURSE TOPICS AND DEEPER EXPLANATIONS\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** In `[2, 2, 3, 4, 4, 4, 7]`, the mode is 4 because it occurs most often."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          }
        ],
      },
      {
        title: "Deeper Data Science & ML Concepts",
        slug: "deeper-data-science-ml-concepts",
        description: "A structured learning module covering deeper data science & ml concepts.",
        topics: [
          {
            "title": "EVOLUTION OF DATA SCIENCE",
            "slug": "a-evolution-of-data-science",
            "description": "Study evolution of data science with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "The course presents data science as a field that grew from the combination of statistics, computing and practical problem solving.\n\nImportant milestones discussed in the course include:\n- early statistical thinking about data analysis\n- growth of statistical computing organizations\n- development of knowledge-discovery and classification communities\n- expansion of database marketing\n- widespread internet connectivity and digital data generation\n- the rise of large-scale data processing technologies\n- rapid growth in demand for data professionals\n- increasing influence of machine learning, deep learning and AI\n- stronger attention to regulation and responsible data use\n- continuing growth of AI and large-scale data systems\n\nThe deeper lesson is more important than memorizing dates:\nData science evolved because organizations moved from relatively small manually analyzed datasets toward continuously generated, large and heterogeneous data.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A modern recommendation system combines ideas that developed across statistics, databases, software engineering, machine learning and large-scale computing. The field evolved as data became larger, faster and more heterogeneous."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "DATA QUALITY DIMENSIONS",
            "slug": "b-data-quality-dimensions",
            "description": "Study data quality dimensions with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Before training a model, examine quality from several angles.\n\nAccuracy:\nDoes the value represent reality?\n\nCompleteness:\nAre important values present?\n\nConsistency:\nDo related systems use compatible definitions?\n\nValidity:\nDoes a value satisfy expected rules?\n\nUniqueness:\nAre records duplicated?\n\nTimeliness:\nIs the information current enough for the decision?\n\nExample:\nA customer record may be complete but still invalid if age is -4. Another record may contain a valid age but use an outdated address.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A customer table may be complete but still invalid if ages are negative, consistent but stale if it has not been updated for a year, and unique but inaccurate if addresses were copied incorrectly."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "DATA CLEANING METHODS IN PRACTICE",
            "slug": "c-data-cleaning-methods-in-practice",
            "description": "Learn practical techniques for duplicates, invalid values, inconsistent categories, outliers and missing data.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Common cleaning actions include:\n- remove exact duplicates\n- resolve inconsistent labels\n- standardize units\n- parse dates consistently\n- repair obvious formatting errors\n- treat impossible values\n- investigate outliers\n- impute missing observations\n- validate constraints after cleaning\n\nImportant distinction:\nCorrection should be based on evidence. Never silently change unusual observations simply because they reduce model error.\n\nExample:\nA recorded weight of 850 kg for a human is probably a measurement or entry problem.\nA transaction of 850,000 rupees may be perfectly valid for a high-value purchase.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** `Bengaluru`, `Bangalore` and `BLR` are mapped to one canonical category only after confirming they mean the same location for the analysis. A negative order amount is investigated rather than blindly deleted because it could represent a legitimate refund."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "DATA INTEGRATION: SCHEMA AND VALUE CONFLICTS",
            "slug": "d-data-integration-schema-and-value-conflicts",
            "description": "Learn how to combine datasets while controlling schema mismatches, conflicting values and timing differences.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Schema integration combines different structural definitions.\n\nExample:\nSystem A:\n    customer_id, city_name\n\nSystem B:\n    cust_id, location\n\nThe integration layer must map:\n    cust_id -> customer_id\n    location -> city_name\n\nValue conflict:\nSystem A says:\n    \"IN\"\nSystem B says:\n    \"India\"\n\nThe values may represent the same country but use different coding conventions.\n\nAnother conflict:\nOne system stores distance in kilometers while another stores miles.\n\nIf units are not converted, a model may learn meaningless relationships.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Join customer, order and support tables using a stable customer identifier. Before joining, verify that identifiers are unique where expected and that the tables do not represent different time snapshots."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "LOG-LINEAR MODELS FOR DATA REDUCTION",
            "slug": "e-log-linear-models-for-data-reduction",
            "description": "Understand ways to reduce data size or dimensionality while retaining information needed for analysis.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A log-linear model can describe relationships among categorical or discrete variables using logarithms of expected cell counts.\n\nThe important course-level idea is:\nInstead of preserving every combination in a large multidimensional table, a statistical model can represent relationships more compactly.\n\nUse case:\nSuppose a company tracks:\n- region\n- device type\n- subscription level\n- purchase status\n\nA very large contingency table may be compressed into a model that captures the major interactions.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A sensor platform stores 500 measurements per minute but a dashboard only needs hourly summaries. Aggregation can reduce storage and processing while preserving the information needed for that dashboard."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "PARAMETRIC AND NON-PARAMETRIC REDUCTION",
            "slug": "f-parametric-and-non-parametric-reduction",
            "description": "Understand ways to reduce data size or dimensionality while retaining information needed for analysis.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Parametric reduction represents data through a model with a limited number of parameters.\n\nExamples:\n- regression\n- log-linear modeling\n\nNon-parametric approaches can include:\n- histograms\n- clustering\n- sampling\n- data cube aggregation\n- compression\n\nThe choice depends on whether the reduced representation must preserve exact records or only preserve information needed for a specific analysis.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A regression model can summarize many observations using a small number of coefficients, while a histogram preserves distribution shape through bins without assuming a specific parametric form."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "HISTOGRAM ANALYSIS",
            "slug": "g-histogram-analysis",
            "description": "Learn how grouped frequencies reveal the shape, center and unusual regions of numerical data.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A histogram groups numerical values into bins and displays their frequencies.\n\nExample:\nResponse times in seconds:\n    0-2   : 120 requests\n    2-4   : 310 requests\n    4-6   : 190 requests\n    6-8   : 70 requests\n    8-10  : 25 requests\n\nFrom this we can quickly inspect:\n- center\n- spread\n- skew\n- multiple peaks\n- unusually large values\n\nBin width affects what we see. Very wide bins can hide structure; very narrow bins can make noise look important.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A service records response times in bins: 0–2 seconds: 120 requests, 2–4: 310, 4–6: 190, 6–8: 70, 8–10: 25. The histogram shows a dominant middle range and a smaller long tail."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "BINNING AS SMOOTHING",
            "slug": "h-binning-as-smoothing",
            "description": "Study binning as smoothing with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Binning can reduce the effect of small fluctuations.\n\nSuppose values are:\n    11, 12, 12, 13, 35\n\nThe final value may be a legitimate extreme observation or an error. Binning can help visualize the overall distribution, but it should not be used to erase meaningful extremes automatically.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Sensor readings `[11, 12, 12, 13, 35]` can be grouped into ranges to make the broad distribution easier to inspect. The value 35 should still be investigated rather than erased automatically."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "CLUSTERING FOR DATA REDUCTION",
            "slug": "i-clustering-for-data-reduction",
            "description": "Understand ways to reduce data size or dimensionality while retaining information needed for analysis.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Clustering groups observations according to similarity.\n\nExample:\nA retailer has 100,000 customers. Instead of analyzing every customer individually for a preliminary campaign, clustering might identify broad groups such as:\n- frequent low-value buyers\n- infrequent high-value buyers\n- frequent high-value buyers\n\nClustering is exploratory and the meaning of a cluster must be interpreted from its features.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A sensor platform stores 500 measurements per minute but a dashboard only needs hourly summaries. Aggregation can reduce storage and processing while preserving the information needed for that dashboard."
              },
              {
                "title": "Practical use",
                "content": "Use this before model training to make inputs consistent, reproducible and appropriate for the intended prediction task."
              }
            ]
          },
          {
            "title": "DATA CUBE AGGREGATION",
            "slug": "j-data-cube-aggregation",
            "description": "Learn how multidimensional aggregation summarizes measures across business dimensions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A data cube can organize measures across multiple dimensions.\n\nExample dimensions:\n- month\n- region\n- product\n\nMeasure:\n- revenue\n\nA detailed cube might support questions such as:\n- revenue by month\n- revenue by region\n- revenue by product\n- revenue by region and product\n\nAggregation reduces the amount of detailed information required for a particular analytical question.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A revenue cube can store measures by month, region and product, allowing analysts to roll up from detailed product-region results to total regional or monthly revenue."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "DATA COMPRESSION",
            "slug": "k-data-compression",
            "description": "Understand ways to reduce data size or dimensionality while retaining information needed for analysis.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Compression reduces storage or transmission cost.\n\nLossless compression:\nThe original representation can be reconstructed exactly.\n\nLossy compression:\nSome information is discarded to obtain greater reduction.\n\nFor ML datasets, lossless approaches are usually preferred when exact values are required for training or auditability. Lossy compression may be reasonable for certain media workflows where small perceptual differences are acceptable.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Learning example:** Take a small dataset related to data compression, write down what each input means, identify the expected output, and change one value at a time. Observe how the interpretation or result changes. This turns the topic from a definition into a testable idea."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "FEATURE EXTRACTION",
            "slug": "l-feature-extraction",
            "description": "Learn how raw observations can be converted into stable, useful predictive signals.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Feature extraction converts raw information into a smaller set of useful signals.\n\nExamples:\nRaw timestamp:\n    2026-09-09 14:30\n\nPossible features:\n    hour = 14\n    weekday = Wednesday\n    weekend = 0\n\nRaw transaction history:\n    12 orders in 90 days\n\nPossible features:\n    order_count_90d = 12\n    average_order_value\n    days_since_last_order\n\nThe extracted feature should be available at prediction time.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Convert `2026-09-09 14:30` into `hour=14`, `weekday=Wednesday` and `weekend=0`. The extracted values are useful only if they are available at prediction time."
              },
              {
                "title": "Practical use",
                "content": "Use this to convert raw operational data into stable signals that a model can learn from without using future information."
              }
            ]
          },
          {
            "title": "FEATURE ENGINEERING",
            "slug": "m-feature-engineering",
            "description": "Learn how raw observations can be converted into stable, useful predictive signals.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Feature engineering is the deliberate construction or transformation of variables to make useful structure easier for a model to learn.\n\nExamples:\n    total_spend = item_price * quantity\n    utilization = used_capacity / total_capacity\n    conversion_rate = purchases / visits\n\nA good feature:\n- has a clear meaning\n- uses valid information\n- is stable enough for production\n- avoids leakage\n- is reproducible\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** From `item_price` and `quantity`, create `total_spend = item_price * quantity`. From capacity values, create `utilization = used_capacity / total_capacity`. The feature should be reproducible and leakage-free."
              },
              {
                "title": "Practical use",
                "content": "Use this to convert raw operational data into stable signals that a model can learn from without using future information."
              }
            ]
          },
          {
            "title": "DESCRIPTIVE STATISTICS — DEEPER VIEW",
            "slug": "n-descriptive-statistics-deeper-view",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Mean, median and mode answer different questions.\n\nMean:\nBalance point of numerical values.\n\nMedian:\nMiddle position after ordering.\n\nMode:\nMost frequent value.\n\nExample:\n    2, 3, 3, 4, 50\n\nMean = 12.4\nMedian = 3\nMode = 3\n\nThe mean is pulled strongly upward by 50, while the median remains representative of the central observations.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For daily response times `[10, 11, 12, 13, 40]`, the mean is pulled upward by 40, while the median stays at 12. Looking at both center and spread gives a better picture than using one number."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "STANDARD DEVIATION — INTERPRETATION",
            "slug": "o-standard-deviation-interpretation",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Suppose two production lines both average 100 units per hour.\n\nLine A:\n    99, 100, 101, 100, 100\n\nLine B:\n    70, 120, 105, 95, 110\n\nTheir averages may be similar, but Line B is less consistent.\n\nThis is why a model or business metric should not report only an average. Spread often reveals operational risk.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** If a sample has standard deviation 2 minutes around an average delivery time of 30 minutes, a typical observation is spread around that center by a smaller amount than a process with standard deviation 12 minutes."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "SKEWNESS — PRACTICAL INTERPRETATION",
            "slug": "p-skewness-practical-interpretation",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Right-skewed:\nMost observations are relatively small, with a smaller number of very large observations.\n\nExamples:\n- income\n- hospital stay duration\n- high-value purchase amount\n\nLeft-skewed:\nMost observations are relatively large, with a smaller number of very low observations.\n\nExample:\nAn easy exam where most students score near the top but a small number score very low.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Income data often has a long upper tail because a small number of observations are very large. The mean can therefore sit above the median."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "KURTOSIS — WHY TAILS MATTER",
            "slug": "q-kurtosis-why-tails-matter",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Two distributions can have similar means and standard deviations while differing in how frequently extreme observations occur.\n\nTail behavior matters in:\n- financial losses\n- system latency\n- insurance claims\n- transaction values\n\nA model built for average behavior may fail badly if extreme events occur more often than expected.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Two distributions can have similar averages and standard deviations but different tail behavior. A process with more extreme response-time events has heavier tails and can be described as having higher excess kurtosis."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "QUARTILES WITH AN EVEN-SIZED DATASET",
            "slug": "r-quartiles-with-an-even-sized-dataset",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "For:\n    12, 18, 21, 25, 30, 34, 40, 44\n\nMedian:\n    (25 + 30) / 2 = 27.5\n\nThe lower half and upper half can then be used to compute Q1 and Q3 according to the selected quartile convention.\n\nImportant:\nDifferent software packages can use slightly different quartile interpolation rules. In practical work, document the method when exact reproducibility matters.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For sorted values `[4, 8, 10, 13, 17, 21]`, the lower half is `[4, 8, 10]` and the upper half is `[13, 17, 21]`. Using the median-of-halves convention gives `Q1=8`, `median=11.5`, `Q3=17`."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "HEATMAP TYPES",
            "slug": "s-heatmap-types",
            "description": "Learn how matrix-style visualizations expose patterns across two dimensions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Heatmaps can be used in different ways.\n\nMatrix heatmap:\nA numerical matrix is displayed through intensity.\n\nCorrelation heatmap:\nShows pairwise correlation coefficients.\n\nClustered heatmap:\nRows or columns are reordered according to similarity.\n\nMissingness heatmap:\nShows where values are absent.\n\nTime-by-category heatmap:\nExample:\n    rows = days\n    columns = hours\n    value = number of incidents\n\nThis can reveal operational patterns that are difficult to see in a raw table.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A correlation heatmap can reveal that `area` and `rooms` are strongly related. A separate heatmap of activity by weekday and hour can show when a service is busiest."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "CORRELATION — LIMITATIONS",
            "slug": "t-correlation-limitations",
            "description": "Understand association measures, their formulas, interpretation and limitations.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Correlation can be:\n- positive\n- negative\n- near zero\n\nBut correlation alone does not establish:\n- causation\n- temporal direction\n- absence of confounding\n- absence of nonlinear relationships\n\nExample:\nSuppose advertising spend and sales correlate strongly. That does not prove every additional unit of advertising caused the observed increase. Seasonality, promotions and market conditions may also contribute.\n\n**Learning lens:** When studying this, always separate association from causation and inspect whether the relationship is actually linear."
              },
              {
                "title": "Example",
                "content": "**Example:** If study time and score have Pearson correlation `r = 0.82`, they have a strong positive linear association in that dataset. This does not prove that increasing study time alone caused the higher scores."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "ANOVA — DEEPER INTUITION",
            "slug": "u-anova-deeper-intuition",
            "description": "Learn how ANOVA compares variation within and between groups and what its conclusion does and does not mean.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Suppose three training programs produce scores:\n\nProgram A:\n    71, 72, 70\n\nProgram B:\n    72, 71, 73\n\nProgram C:\n    90, 92, 91\n\nThe variation inside each group is small, while the difference among group means is large. ANOVA asks whether this pattern provides enough evidence that all group means are not equal.\n\nThe F statistic compares:\n    between-group variation\nwith\n    within-group variation\n\nLarge F values indicate that between-group differences are large relative to within-group noise.\n\nANOVA does not by itself identify every pair of groups that differs. Post-hoc comparisons may be needed.\n\n**Learning lens:** Focus on the meaning of within-group versus between-group variation before memorizing the F statistic."
              },
              {
                "title": "Example",
                "content": "**Example:** Compare average delivery times for three vehicle types. ANOVA asks whether the observed between-group variation is large relative to the variation within groups. A significant result indicates evidence that not all group means are equal; it does not identify every differing pair by itself."
              },
              {
                "title": "Practical use",
                "content": "Use this during EDA to understand structure, compare groups, identify anomalies and form testable hypotheses."
              }
            ]
          },
          {
            "title": "SIMPLE LINEAR REGRESSION — COMPLETE WALKTHROUGH",
            "slug": "v-simple-linear-regression-complete-walkthrough",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Suppose:\n    experience = [1, 2, 3, 4, 5]\n    salary      = [32, 38, 44, 51, 57]\n\nWe model:\n    salary_hat = m * experience + c\n\nThe fitting procedure chooses m and c to minimize squared prediction errors.\n\nAfter fitting, suppose:\n    m = 6.3\n    c = 25.5\n\nFor 6 years:\n    salary_hat = 6.3*6 + 25.5\n               = 63.3\n\nThe value is a prediction, not a guarantee.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "**Example:** With experience `[1,2,3,4,5]` and salary `[32,38,44,51,57]`, a fitted model might be `salary_hat = 6.3 × experience + 25.5`. At six years it predicts 63.3, which remains a prediction rather than a guarantee."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "MULTIPLE REGRESSION — COEFFICIENT INTERPRETATION",
            "slug": "w-multiple-regression-coefficient-interpretation",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Suppose:\n    price = b0 + b1*area + b2*bedrooms\n\nIf b1 is positive, larger area is associated with higher predicted price when bedroom count is held fixed.\n\nIf b2 is positive, more bedrooms are associated with higher predicted price when area is held fixed.\n\nThis “holding other variables fixed” interpretation is mathematical model interpretation, not proof of causation.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "**Example:** Predict house price from area, bedrooms and age. A coefficient for area describes the model's change in predicted price for a one-unit increase in area while the other included predictors are held fixed."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "MULTICOLLINEARITY",
            "slug": "x-multicollinearity",
            "description": "Study multicollinearity with an emphasis on intuition, practical reasoning and correct application.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Predictors can overlap strongly.\n\nExample:\n    house_area\n    number_of_rooms\n\nLarger homes often have more rooms, so the predictors may be strongly related.\n\nConsequences can include:\n- unstable coefficient estimates\n- difficult interpretation\n- sensitivity to small data changes\n\nRegularization such as ridge can improve stability.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** `house_area` and `number_of_rooms` often rise together. A regression can still predict well, but individual coefficient estimates may become unstable because the predictors carry overlapping information."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "RESIDUAL PLOT PATTERNS",
            "slug": "y-residual-plot-patterns",
            "description": "Understand residuals as prediction errors and use their patterns to diagnose missing structure or changing variance.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Random cloud around zero:\nOften desirable.\n\nCurved pattern:\nMay indicate missing nonlinear structure.\n\nFunnel shape:\nMay indicate non-constant variance.\n\nSeparated bands:\nMay indicate groups with different behavior.\n\nLong runs above or below zero over time:\nMay indicate autocorrelation or changing conditions.\n\nResidual analysis is therefore a diagnostic tool, not just a decorative graph.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Actual delivery time is 42 minutes and the prediction is 38 minutes. Residual = `42 - 38 = 4`. A positive residual means the model predicted too low for that observation."
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "POLYNOMIAL REGRESSION — SAFE USAGE",
            "slug": "z-polynomial-regression-safe-usage",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Polynomial features should be selected carefully.\n\nA degree-2 model:\n    y = b0 + b1*x + b2*x^2\n\nA degree-5 model:\n    y = b0 + b1*x + b2*x^2 + ... + b5*x^5\n\nHigher degree gives more flexibility but can:\n- amplify noise\n- create unstable curves\n- behave badly outside the training range\n- increase variance\n\nUse validation to select degree and inspect the resulting curve.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.pipeline import Pipeline\n\nmodel = Pipeline([\n    (\"poly\", PolynomialFeatures(degree=2, include_bias=False)),\n    (\"regressor\", LinearRegression()),\n])\n\nmodel.fit(X, y)\nprediction = model.predict([[6]])\nprint(prediction)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "GENERALIZATION ERROR",
            "slug": "aa-generalization-error",
            "description": "Learn why performance on unseen data is the real target of machine-learning evaluation.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Generalization error is the prediction error expected on new observations from the intended data-generating process.\n\nTraining error:\n    error on data used for fitting\n\nValidation error:\n    error used during model selection\n\nTest error:\n    final estimate on held-out data\n\nA large gap:\n    training error << validation/test error\n\nis a warning sign for overfitting.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A model scores 99% on training data but 71% on unseen orders. The relevant question is not how well it memorized the training set; it is whether the 71% performance is acceptable for future cases."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "CONFUSION MATRIX — WORKED EXAMPLE",
            "slug": "ab-confusion-matrix-worked-example",
            "description": "Learn how TP, TN, FP and FN describe binary classification outcomes and lead to useful metrics.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Suppose a classifier produced:\n\n    TP = 42\n    TN = 48\n    FP = 6\n    FN = 4\n\nTotal:\n    42 + 48 + 6 + 4 = 100\n\nAccuracy:\n    (42 + 48) / 100 = 0.90\n\nPrecision:\n    42 / (42 + 6) = 0.875\n\nRecall:\n    42 / (42 + 4) ≈ 0.913\n\nF1:\n    2 * 0.875 * 0.913 / (0.875 + 0.913)\n    ≈ 0.893\n\nInterpretation:\nThe classifier catches most positive cases while keeping false alarms reasonably controlled.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** For `TP=42, TN=48, FP=6, FN=4`, there are 100 predictions. Accuracy is 90%, precision is `42/48 = 0.875`, and recall is `42/46 ≈ 0.913`."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "METRIC SELECTION BY BUSINESS COST",
            "slug": "ac-metric-selection-by-business-cost",
            "description": "Learn how to choose evaluation metrics from the real costs of false positives, false negatives and numeric error.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Imagine two systems.\n\nSystem A:\n- very high precision\n- lower recall\n\nSystem B:\n- lower precision\n- very high recall\n\nIf the task is detecting a dangerous event, System B may be preferable because missed positives are costly.\n\nIf the task is sending expensive manual-review alerts, System A may be preferable because false positives are costly.\n\nTherefore metric selection should begin with the consequences of errors.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** In fraud detection, missing a fraudulent transaction may cost much more than investigating a false alarm, so recall may deserve more weight. In a customer-review classifier where manual review is expensive, precision may be more important."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "CROSS-VALIDATION WITH PIPELINES",
            "slug": "ad-cross-validation-with-pipelines",
            "description": "Learn how preprocessing, modeling, evaluation and deployment can be organized into a reproducible pipeline.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "The safest pattern is to put learned preprocessing inside the pipeline.\n\nExample:\n\n    from sklearn.pipeline import Pipeline\n    from sklearn.preprocessing import StandardScaler\n    from sklearn.linear_model import Ridge\n\n    pipe = Pipeline([\n        (\"scale\", StandardScaler()),\n        (\"model\", Ridge())\n    ])\n\n    scores = cross_val_score(\n        pipe,\n        X_train,\n        y_train,\n        cv=5,\n        scoring=\"neg_mean_absolute_error\"\n    )\n\nThe scaler is fitted separately inside each training fold instead of learning statistics from the entire dataset first.\n\n**Learning lens:** The important idea is repeated use of different validation folds without contaminating the final test estimate."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import Ridge\n\nscores = cross_val_score(\n    Ridge(alpha=1.0),\n    X,\n    y,\n    cv=5,\n    scoring=\"neg_mean_absolute_error\",\n)\n\nprint(\"Mean MAE:\", -scores.mean())\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "GRID SEARCH COST",
            "slug": "ae-grid-search-cost",
            "description": "Learn how hyperparameter search balances model quality, validation reliability and computational cost.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Suppose:\n- 4 values for parameter A\n- 3 values for parameter B\n- 2 values for parameter C\n- 5 folds\n\nNumber of parameter combinations:\n    4 * 3 * 2 = 24\n\nTotal fits:\n    24 * 5 = 120\n\nThis simple calculation explains why exhaustive grid search can become expensive.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Four alpha values and three tree depths create 12 configurations. With 5-fold cross-validation, that is 60 model fits before considering preprocessing or repeated experiments."
              },
              {
                "title": "Practical use",
                "content": "Use this when selecting, tuning and validating models so reported performance reflects how the system is expected to behave on unseen data."
              }
            ]
          },
          {
            "title": "RANDOM SEARCH AND PRACTICAL TUNING",
            "slug": "af-random-search-and-practical-tuning",
            "description": "Learn how hyperparameter search balances model quality, validation reliability and computational cost.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Grid search evaluates every listed combination.\n\nRandom search samples combinations from defined distributions or candidate ranges.\n\nWhen many hyperparameters exist, random search can explore a larger effective space with a fixed computation budget.\n\nThe course emphasizes grid search, but the broader lesson is:\nHyperparameter optimization should balance search quality against computational cost.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** Instead of evaluating every combination from a huge grid, sample 30 configurations from meaningful ranges. Random search can spend more trials exploring important dimensions when only a few hyperparameters strongly affect performance."
              },
              {
                "title": "Practical use",
                "content": "Use this to strengthen the corresponding stage of an end-to-end machine-learning workflow."
              }
            ]
          },
          {
            "title": "RIDGE REGRESSION — EFFECT OF SCALE",
            "slug": "ag-ridge-regression-effect-of-scale",
            "description": "Learn how regression models a numerical target from one or more predictors and how to diagnose and evaluate the fit.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Because ridge penalizes coefficient magnitude, feature scale affects the penalty.\n\nIf one feature is measured in rupees and another in years, coefficient magnitudes are not directly comparable.\n\nTherefore scaling is commonly applied before L2 regularization when features use very different units.\n\n**Learning lens:** Work through the mapping from features to prediction, then inspect residuals and unseen-data performance."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.linear_model import Ridge\n\nmodel = Ridge(alpha=1.0)\nmodel.fit(X_train, y_train)\n\nprediction = model.predict(X_test)\nprint(prediction)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this when predicting a numerical target, diagnosing model behavior or deciding whether a linear approximation is adequate."
              }
            ]
          },
          {
            "title": "MODEL DEVELOPMENT DECISION TREE",
            "slug": "ah-model-development-decision-tree",
            "description": "Build intuition for the statistic, its formula, interpretation and appropriate use.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Question 1:\nWhat is the target?\n\nContinuous:\n    regression\n\nDiscrete class:\n    classification\n\nNo target:\n    clustering or another unsupervised approach\n\nQuestion 2:\nWhat information is available at prediction time?\n\nRemove unavailable future information.\n\nQuestion 3:\nHow much data exists?\n\nSmall data may favor simpler models and stronger validation.\n\nQuestion 4:\nAre relationships likely nonlinear?\n\nIf yes, consider nonlinear models or engineered features.\n\nQuestion 5:\nWhat errors matter?\n\nChoose metrics and thresholds accordingly.\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** In `[2, 2, 3, 4, 4, 4, 7]`, the mode is 4 because it occurs most often."
              },
              {
                "title": "Practical use",
                "content": "Use this when summarizing distributions, comparing groups, checking data quality or deciding which model assumptions need attention."
              }
            ]
          },
          {
            "title": "RESPONSIBLE USE OF DATA",
            "slug": "ai-responsible-use-of-data",
            "description": "Learn how privacy, fairness, security, transparency and appropriate use affect data-science decisions.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Data collection should have a legitimate purpose and should respect applicable organizational and legal requirements.\n\nPractical principles:\n- collect only useful information\n- restrict access\n- protect sensitive fields\n- document data sources\n- maintain retention rules\n- audit transformations\n- avoid unnecessary personal attributes\n- validate models for important groups\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Example:** A model trained on historical lending decisions may reproduce historical disparities. A responsible workflow examines data provenance, relevant groups, feature necessity, privacy, security, evaluation segments and human oversight before deployment."
              },
              {
                "title": "Practical use",
                "content": "Use this to turn experimentation into a repeatable learning or production workflow with clear controls and traceability."
              }
            ]
          },
          {
            "title": "MASTER STUDY STRATEGY",
            "slug": "ak-master-study-strategy",
            "description": "Use a structured learning strategy to connect concepts, calculations, coding practice and end-to-end projects.",
            "estimatedMinutes": 15,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Study each topic in six passes:\n\nPass 1 — Definition\nExplain the concept in one or two sentences.\n\nPass 2 — Intuition\nExplain why the concept exists.\n\nPass 3 — Formula\nWrite the mathematical definition when one exists.\n\nPass 4 — Example\nWork through a small original dataset.\n\nPass 5 — Implementation\nWrite a short Python example.\n\nAnswer:\n“What problem does it solve, how does it work, what can go wrong, and when would I choose it?”\n\nExample for Ridge:\nDefinition:\nA linear regression method with an L2 coefficient penalty.\n\nWhy:\nReduce excessive coefficient magnitude and improve stability.\n\nFormula:\nSSE + lambda * sum(beta_j^2)\n\nExample:\nHighly correlated housing features.\n\nImplementation:\nUse sklearn.linear_model.Ridge.\n\nRisk:\nToo much regularization can underfit.\n\n“Ridge keeps the linear model but adds an L2 penalty, shrinking coefficients toward zero. I would use it when I want to control complexity or stabilize coefficients, especially with correlated predictors.”\n\n**Learning lens:** Learn the idea, reproduce the example, change one input, predict the result, and then explain why the result changed."
              },
              {
                "title": "Example",
                "content": "**Study loop:** Read one topic → reproduce the example → change one input → predict the new result → run it → explain why the result changed → identify one production failure mode → write the control that would prevent it."
              },
              {
                "title": "Practical use",
                "content": "Use this to turn experimentation into a repeatable learning or production workflow with clear controls and traceability."
              }
            ]
          }
        ],
      },
      {
        title: "Python Toolkit & End-to-End Practice",
        slug: "python-toolkit-end-to-end-practice",
        description: "A structured learning module covering python toolkit & end-to-end practice.",
        topics: [
          {
            "title": "NumPy for Numerical Work",
            "slug": "numpy-numerical-work",
            "description": "Learn the NumPy array operations commonly used for numerical machine-learning work.",
            "estimatedMinutes": 20,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "NumPy provides compact numerical arrays and vectorized operations. In machine learning, this matters because many calculations operate on whole arrays rather than one Python value at a time. Vectorization usually makes code shorter and can be much faster than manually looping over every element.\n\n**Learning lens:** Start with array creation, shape, indexing, aggregation and element-wise operations before moving to matrix operations."
              },
              {
                "title": "Example",
                "content": "```python\nimport numpy as np\n\nx = np.array([10, 20, 30, 40])\nprint(x.mean())\nprint(x.std())\nprint(x * 2)\n```"
              },
              {
                "title": "Practical use",
                "content": "Use NumPy for numerical preprocessing, vectorized calculations and data passed between scientific Python libraries."
              }
            ]
          },
          {
            "title": "Pandas for Tabular Data",
            "slug": "pandas-tabular-data",
            "description": "Learn how Pandas represents, inspects and transforms tabular datasets.",
            "estimatedMinutes": 20,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Pandas provides DataFrame and Series structures for working with rows, columns, missing values, grouping and tabular transformations. A good workflow uses Pandas for inspection and preparation while keeping model-specific transformations inside reproducible ML pipelines when appropriate.\n\n**Learning lens:** Practice selecting columns, filtering rows, grouping, aggregating and checking missing values."
              },
              {
                "title": "Example",
                "content": "```python\nimport pandas as pd\n\ndf = pd.DataFrame({\n    \"hours\": [2, 4, 6, 8],\n    \"score\": [45, 55, 72, 88],\n})\n\nprint(df.describe())\nprint(df[df[\"score\"] >= 70])\n```"
              },
              {
                "title": "Practical use",
                "content": "Use Pandas for exploratory analysis, dataset preparation and tabular feature construction."
              }
            ]
          },
          {
            "title": "Matplotlib for Data Visualization",
            "slug": "matplotlib-data-visualization",
            "description": "Learn how basic plots support exploratory analysis and model diagnostics.",
            "estimatedMinutes": 20,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Visualization turns numerical summaries into patterns that are easier to inspect. Scatter plots can reveal relationships, histograms show distributions, box plots expose spread and potential outliers, and residual plots help diagnose regression behavior.\n\n**Learning lens:** Do not plot only for presentation; use plots to ask a specific question about the data."
              },
              {
                "title": "Example",
                "content": "```python\nimport matplotlib.pyplot as plt\n\nhours = [2, 4, 6, 8]\nscores = [45, 55, 72, 88]\n\nplt.scatter(hours, scores)\nplt.xlabel(\"Study hours\")\nplt.ylabel(\"Score\")\nplt.show()\n```"
              },
              {
                "title": "Practical use",
                "content": "Use Matplotlib during EDA and model diagnosis when a visual pattern can reveal what a metric hides."
              }
            ]
          },
          {
            "title": "Scikit-learn Reusable Workflow",
            "slug": "scikit-learn-reusable-workflow",
            "description": "Learn the common scikit-learn pattern for splitting data, fitting models and evaluating predictions.",
            "estimatedMinutes": 25,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Scikit-learn provides consistent APIs for preprocessing, model fitting, metrics, pipelines and model selection. The reusable pattern is to keep the target separate, split data appropriately, fit only on training information, generate predictions and evaluate using a metric aligned with the task.\n\n**Learning lens:** Reproduce the workflow with a tiny dataset before introducing a complex estimator."
              },
              {
                "title": "Example",
                "content": "```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npred = model.predict(X_test)\n\nprint(\"MAE:\", mean_absolute_error(y_test, pred))\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this pattern as the starting point for small supervised-learning experiments and reproducible evaluation."
              }
            ]
          },
          {
            "title": "Building a Delivery-Time Prediction Project",
            "slug": "delivery-time-prediction-project",
            "description": "Follow an end-to-end regression project from target definition through monitoring.",
            "estimatedMinutes": 35,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "The delivery-time project connects the major ideas in the course. The target is delivery time in minutes before dispatch. Candidate inputs include distance, order size, restaurant load, driver experience, hour, weather and vehicle type. The important engineering constraint is that post-dispatch information cannot be used.\n\nThe project should use a future-like split when forecasting future orders, a preprocessing pipeline for numeric and categorical variables, a simple baseline, candidate regressors, time-aware validation, final testing and segment-level error analysis.\n\n**Learning lens:** Treat every modeling decision as a response to the prediction-time constraints rather than as a default recipe."
              },
              {
                "title": "Example",
                "content": "```text\nBusiness goal\n  -> define delivery_minutes\n  -> validate raw orders\n  -> remove post-dispatch features\n  -> chronological split\n  -> preprocess numeric/categorical data\n  -> compare against median baseline\n  -> train candidate regressors\n  -> validate and tune\n  -> final test\n  -> inspect rain/traffic segments\n  -> deploy and monitor\n```"
              },
              {
                "title": "Practical use",
                "content": "Use this project as a capstone for connecting preprocessing, regression, evaluation, leakage prevention and production monitoring."
              }
            ]
          },
          {
            "title": "Defining the Prediction Target",
            "slug": "define-prediction-target",
            "description": "Learn how to define a target and prediction time precisely enough for reliable evaluation.",
            "estimatedMinutes": 20,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "A machine-learning project begins with a measurable target and a precise prediction moment. For delivery prediction, `delivery_minutes` is the target and dispatch time is the prediction moment. This immediately determines which features are legal inputs and how evaluation data should be split.\n\n**Learning lens:** Write the sentence “At time T, predict Y using information available at T” before selecting an algorithm."
              },
              {
                "title": "Example",
                "content": "**Example:** “At dispatch time, predict the total delivery duration in minutes using information known before dispatch.” This excludes actual arrival time and post-delivery feedback."
              },
              {
                "title": "Practical use",
                "content": "Use this step to prevent vague objectives and leakage before model development begins."
              }
            ]
          },
          {
            "title": "Chronological Evaluation for the Project",
            "slug": "chronological-project-evaluation",
            "description": "Learn why future prediction projects should preserve temporal order during evaluation.",
            "estimatedMinutes": 20,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "When the production task predicts future orders, random shuffling can make the evaluation unrealistically easy because older and newer behavior become mixed. A chronological split better simulates deployment: train on earlier observations and evaluate on later observations.\n\n**Learning lens:** The validation design should resemble how the model will actually encounter data after release."
              },
              {
                "title": "Example",
                "content": "**Example:** Train on January through September, tune using October, and reserve November for the final test. Never use November labels while selecting the model."
              },
              {
                "title": "Practical use",
                "content": "Use chronological validation for forecasting and other time-dependent prediction problems."
              }
            ]
          },
          {
            "title": "Production Monitoring for the Project",
            "slug": "production-monitoring-project",
            "description": "Learn what to monitor after an ML model is deployed.",
            "estimatedMinutes": 25,
            "sections": [
              {
                "title": "Detailed explanation",
                "content": "Deployment does not end the ML lifecycle. Monitor prediction quality when labels arrive, input distributions, missingness, latency, model version and segment-level performance. A model can degrade even when the code has not changed because user behavior, operations or upstream data can change.\n\n**Learning lens:** Separate data problems, model problems and business-environment changes when investigating degradation."
              },
              {
                "title": "Example",
                "content": "**Example:** Overall MAE rises from 4.4 to 7.2 minutes. Monitoring shows heavy-rain traffic features are increasingly missing, so the first response is a data-pipeline investigation rather than immediate retraining."
              },
              {
                "title": "Practical use",
                "content": "Use monitoring to detect drift, data-quality failures and performance degradation early."
              }
            ]
          }
        ],
      }
      ],
    }
  ],
};

async function seedCategory(categorySeed: CategorySeed) {
  const category = await prisma.studyCategory.upsert({
    where: { name: categorySeed.name },
    update: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
    create: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
  });

  for (const pathSeed of categorySeed.paths) {
    const path = await prisma.studyPath.upsert({
      where: {
        categoryId_level: {
          categoryId: category.id,
          level: pathSeed.level,
        },
      },
      update: {
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        isPublished: true,
      },
      create: {
        categoryId: category.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
      },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex++) {
      const moduleSeed = pathSeed.modules[moduleIndex];

      const studyModule = await prisma.studyModule.upsert({
        where: {
          studyPathId_slug: {
            studyPathId: path.id,
            slug: moduleSeed.slug,
          },
        },
        update: {
          title: moduleSeed.title,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
      });

      for (let topicIndex = 0; topicIndex < (moduleSeed.topics ?? []).length; topicIndex++) {
        const topicSeed = moduleSeed.topics![topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;

        const topic = await prisma.studyTopic.upsert({
          where: {
            categoryId_slug: {
              categoryId: category.id,
              slug: topicSlug,
            },
          },
          update: {
            moduleId: studyModule.id,
            title: topicSeed.title,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
          create: {
            categoryId: category.id,
            moduleId: studyModule.id,
            title: topicSeed.title,
            slug: topicSlug,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex++) {
          const section = topicSeed.sections![sectionIndex];
          const sectionId = `${topic.id}-section-${sectionIndex}`;

          await prisma.studyTopicSection.upsert({
            where: { id: sectionId },
            update: {
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
            create: {
              id: sectionId,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
          });
        }
      }
    }
  }

  return category;
}

async function main() {
  const category = await seedCategory(categorySeed);

  const topicCount = categorySeed.paths.reduce(
    (total, path) =>
      total +
      path.modules.reduce(
        (moduleTotal, module) => moduleTotal + (module.topics?.length ?? 0),
        0,
      ),
    0,
  );

  console.log(
    `Seeded ${category.name}: ${categorySeed.paths.length} paths, ${topicCount} topics.`,
  );
}

main()
  .catch((error) => {
    console.error("Machine Learning & Data Science seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
