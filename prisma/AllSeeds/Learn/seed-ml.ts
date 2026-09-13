import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
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

async function ensureCategory(category: CategorySeed) {
  const createdCategory = await prisma.studyCategory.upsert({
    where: { slug: category.slug },
    update: { name: category.name, description: category.description, icon: category.icon, isPublished: true, sortOrder: category.sortOrder },
    create: {
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      isPublished: true,
      sortOrder: category.sortOrder,
    },
  });

  for (const pathSeed of category.paths) {
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: createdCategory.id, slug: pathSeed.slug } },
      update: { name: pathSeed.name, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: 0 },
      create: {
        categoryId: createdCategory.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: 0,
      },
    });

    for (const moduleSeed of pathSeed.modules) {
      const module = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, isPublished: true, sortOrder: 0 },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          isPublished: true,
          sortOrder: 0,
        },
      });

      const topics = moduleSeed.topics ?? [];
      for (const topicSeed of topics) {
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: createdCategory.id, slug: topicSeed.slug } },
          update: {
            title: topicSeed.title,
            moduleId: module.id,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        const sections = [...(topicSeed.sections ?? []), ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
        for (let index = 0; index < sections.length; index += 1) {
          const section = sections[index];
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${index}` },
            update: { title: section.title, content: section.content, sortOrder: index },
            create: {
              id: `${topic.id}-section-${index}`,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: index,
            },
          });
        }
      }
    }
  }
}

async function seedMachineLearningCategory() {
  const mlCategory: CategorySeed = {
    name: "Machine Learning",
    slug: "machine-learning",
    description: "Learn the fundamentals of machine learning, from data preprocessing to model deployment.",
    icon: "ML",
    sortOrder: 12,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Understand core ML concepts, data handling, and simple models.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Foundations of Machine Learning",
            slug: "ml-foundations",
            description: "What ML is, types of learning, and the data science pipeline.",
            topics: [
              {
                title: "What is Machine Learning?",
                slug: "what-is-ml",
                shortDescription: "Define ML and its relationship to AI and statistics.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Definition and Scope", content: "Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It uses statistical algorithms to parse data, learn from it, and make informed decisions. The core idea is to build models that generalise well to new, unseen data." },
                  { title: "Types of Learning", content: "**Supervised**: learns from labelled data (inputs → outputs). **Unsupervised**: finds patterns in unlabelled data (clustering, dimensionality reduction). **Reinforcement**: learns through rewards and penalties (agent in an environment). Semi‑supervised and self‑supervised are also emerging." },
                  { title: "The ML Pipeline", content: "1. Data Collection → 2. Data Preprocessing (cleaning, scaling) → 3. Feature Engineering (creating relevant features) → 4. Model Selection → 5. Training → 6. Evaluation → 7. Hyperparameter Tuning → 8. Deployment → 9. Monitoring. Each step is critical and requires careful attention." },
                  { title: "Common Applications", content: "Image recognition (CNNs), natural language processing (transformers), recommendation systems (collaborative filtering), fraud detection (anomaly detection), autonomous vehicles (reinforcement learning), and healthcare diagnostics (supervised classification)." },
                  { title: "Ethics in ML", content: "Models can inherit biases from training data, leading to unfair outcomes. Consider fairness, transparency, accountability, and privacy. Use techniques like fairness‑aware learning, model explainability, and differential privacy." },
                ],
              },
              {
                title: "Data Preprocessing – Cleaning and Preparing",
                slug: "data-preprocessing",
                shortDescription: "Clean, transform, and prepare data for modeling.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Handling Missing Values", content: "Options: remove rows (if few), impute with mean/median/mode (simple), use iterative imputation (MICE), or choose algorithms that handle missing values (e.g., XGBoost). The choice depends on the amount and nature of missing data." },
                  { title: "Encoding Categorical Variables", content: "**Label encoding**: maps categories to integers (good for ordinal). **One‑hot encoding**: creates binary columns (for nominal). **Target encoding**: replaces categories with the mean target value (use with cross‑validation to avoid leakage). **Embeddings**: learn dense representations (useful for high‑cardinality)." },
                  { title: "Feature Scaling", content: "**Standardization** (z‑score): `(x – μ) / σ` – makes mean 0, std 1. **Normalization** (min‑max): `(x – min) / (max – min)` – scales to [0,1]. Distance‑based algorithms (SVM, KNN, PCA) require scaling to prevent features with larger scales from dominating." },
                  { title: "Data Splitting", content: "Train/validation/test splits. Stratified sampling for classification to preserve class proportions. Time‑based splits for time‑series to avoid leakage." },
                  { title: "Handling Outliers", content: "Detect using IQR (boxplot) or Z‑score. Treatment: cap (winsorize), transform (log), or remove (if clearly erroneous). Outliers can skew models like linear regression." },
                ],
              },
              {
                title: "Linear Regression – The Foundation",
                slug: "linear-regression",
                shortDescription: "The simplest supervised learning algorithm for continuous targets.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Concept", content: "Models the relationship between a dependent variable (target) and one or more independent variables (features) using a linear equation: `y = w₀ + w₁x₁ + ... + wₙxₙ`. Finds the best line (or hyperplane) that fits the data." },
                  { title: "Cost Function", content: "Mean Squared Error (MSE) – average squared difference between predictions and actual values. Minimising MSE yields the best‑fit line." },
                  { title: "Training Methods", content: "**Ordinary Least Squares (OLS)**: closed‑form solution, but costly for large datasets. **Gradient Descent**: iterative, suitable for large data. Variants: Batch, Stochastic, Mini‑batch." },
                  { title: "Assumptions", content: "Linearity, independence of errors, homoscedasticity (constant variance), normality of errors. Violations can affect reliability; use residual plots to check." },
                  { title: "Evaluation", content: "R² (coefficient of determination), adjusted R², RMSE (root mean squared error), MAE (mean absolute error). Interpret coefficients as feature importance (if features are scaled)." },
                ],
              },
              {
                title: "Logistic Regression – For Classification",
                slug: "logistic-regression",
                shortDescription: "A classification algorithm for binary outcomes.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Concept", content: "Uses the logistic (sigmoid) function to model the probability of a binary outcome: `P(y=1) = 1 / (1 + e^{-z})`, where `z = w₀ + w₁x₁ + ...`. Output is between 0 and 1." },
                  { title: "Decision Boundary", content: "Threshold (usually 0.5) classifies as positive or negative. Can be adjusted to trade‑off precision and recall." },
                  { title: "Cost Function", content: "Cross‑entropy (log loss): measures the difference between predicted probabilities and true labels." },
                  { title: "Regularisation", content: "L1 (Lasso) and L2 (Ridge) to prevent overfitting. L1 can also perform feature selection." },
                  { title: "Interpretation", content: "Coefficients represent log‑odds; exponentiate to get odds ratios. Useful for understanding feature impact." },
                ],
              },
              {
                title: "Evaluation Metrics – Measuring Performance",
                slug: "evaluation-metrics",
                shortDescription: "Measure model performance for classification and regression.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Regression Metrics", content: "MSE (sensitive to outliers), RMSE (interpretable), MAE (robust), R² (proportion of variance explained). Each has different sensitivity to outliers." },
                  { title: "Classification Metrics", content: "Accuracy (overall), Precision (positive predictive value), Recall (sensitivity), F1 (harmonic mean of precision and recall), AUC‑ROC (separability)." },
                  { title: "Confusion Matrix", content: "TP, FP, TN, FN – from these derive all metrics. Essential for understanding model behaviour." },
                  { title: "AUC‑ROC", content: "Area under the Receiver Operating Characteristic curve. Measures the model's ability to distinguish classes across thresholds. AUC = 0.5 is random; 1.0 is perfect." },
                  { title: "When to Use Which", content: "Use precision when false positives are costly (spam detection). Use recall when false negatives are costly (disease screening). F1 balances both. AUC‑ROC is good for imbalanced data." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERMEDIATE --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Feature engineering, model selection, and ensemble methods.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Feature Engineering and Selection",
            slug: "feature-engineering",
            description: "Create new features and select the most informative ones.",
            topics: [
              {
                title: "Feature Creation – Polynomials, Interactions, and Domain",
                slug: "feature-creation",
                shortDescription: "Polynomial features, interaction terms, domain-specific transformations.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Polynomial Features", content: "Add powers and interactions to capture non‑linear relationships. Example: `x²`, `x³`, `x1*x2`. Beware of overfitting – use regularisation." },
                  { title: "Binning and Discretisation", content: "Convert continuous features into categorical bins to capture non‑linearities and reduce noise." },
                  { title: "Domain‑Specific Features", content: "Use business knowledge: ratios (e.g., debt‑to‑income), aggregations (e.g., average purchase value), date components (day, month, year), time since last event." },
                  { title: "Text Features", content: "TF‑IDF, word embeddings (Word2Vec, GloVe), and BERT embeddings for advanced NLP." },
                ],
              },
              {
                title: "Feature Selection – Reducing Dimensionality",
                slug: "feature-selection",
                shortDescription: "Reduce dimensionality and improve performance.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Filter Methods", content: "Statistical tests: chi‑square, correlation, mutual information. Score each feature and select top‑k. Fast but ignores feature interactions." },
                  { title: "Wrapper Methods", content: "Forward/backward selection, recursive feature elimination (RFE). Uses model performance as a guide. Computationally expensive." },
                  { title: "Embedded Methods", content: "L1 regularisation (Lasso) shrinks coefficients to zero, performing feature selection during training. Tree‑based models provide feature importance scores." },
                  { title: "Feature Importance", content: "Random Forest and XGBoost provide importance scores (gain, weight, cover). Use these to drop low‑importance features." },
                  { title: "Trade‑offs", content: "Fewer features reduce overfitting, improve interpretability, and speed up training, but may lose signal." },
                ],
              },
              {
                title: "Ensemble Methods – Combining Models",
                slug: "ensemble-methods",
                shortDescription: "Combine multiple models for better performance.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Bagging – Bootstrap Aggregating", content: "Train multiple models on bootstrapped subsets of the training data, then average predictions (regression) or vote (classification). Reduces variance. Example: Random Forest." },
                  { title: "Random Forest – Trees with Randomness", content: "An ensemble of decision trees using bagging and random feature selection. Robust to noise, handles non‑linearity, provides feature importance. It's a go‑to for many tabular problems." },
                  { title: "Boosting – Sequential Correction", content: "Sequential training: each model corrects errors of the previous. Examples: AdaBoost, Gradient Boosting, XGBoost, LightGBM, CatBoost. Boosting reduces bias and variance." },
                  { title: "Voting and Stacking", content: "Voting: combine predictions (hard/soft). Stacking: use a meta‑model to combine predictions from base models. Can improve performance but is more complex." },
                  { title: "When to Use Ensembles", content: "Ensembles usually outperform single models but are more computationally expensive and less interpretable. Use when accuracy is critical and resources allow." },
                ],
              },
              {
                title: "Support Vector Machines (SVM)",
                slug: "svm",
                shortDescription: "Powerful classifier using maximum margin separation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Concept", content: "Finds the hyperplane that maximises the margin between classes. Works well when classes have a clear separation." },
                  { title: "Kernel Trick", content: "Maps data to a higher‑dimensional space to find a linear separator. Common kernels: linear, polynomial, RBF (radial basis function). RBF is the most commonly used." },
                  { title: "Regularisation (C)", content: "C controls the trade‑off between margin size and misclassification. Small C: wider margin, more misclassifications (high bias). Large C: narrow margin, fewer misclassifications (high variance)." },
                  { title: "Support Vectors", content: "The data points that define the margin. Only these influence the model – SVM is memory‑efficient." },
                  { title: "Pros and Cons", content: "Effective in high dimensions, memory efficient, but not interpretable and slow on large datasets." },
                ],
              },
              {
                title: "Clustering – Unsupervised Grouping",
                slug: "clustering",
                shortDescription: "Unsupervised learning to find natural groups in data.",
                estimatedMinutes: 24,
                sections: [
                  { title: "K‑Means", content: "Partitions data into K clusters by minimising within‑cluster variance. Requires choosing K (elbow method or silhouette score). Sensitive to scaling and outliers." },
                  { title: "Hierarchical Clustering", content: "Builds a tree of clusters (agglomerative or divisive). Visualise with a dendrogram. Does not require specifying K upfront." },
                  { title: "DBSCAN", content: "Density‑based clustering – finds clusters of arbitrary shape, handles outliers. Parameters: eps (neighbourhood radius) and min_samples." },
                  { title: "Evaluation", content: "No ground truth – use silhouette score, Davies‑Bouldin index, or visual inspection." },
                  { title: "Applications", content: "Customer segmentation, anomaly detection, image compression, document clustering." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- ADVANCED --------------------
      {
        name: "Advanced",
        slug: "advanced",
        description: "Deep learning, reinforcement learning, MLOps, transformers, and advanced topics.",
        level: StudyLevel.ADVANCED,
        modules: [
          // Module 1: Deep Learning Fundamentals
          {
            title: "Deep Learning Fundamentals",
            slug: "deep-learning",
            description: "Neural networks, backpropagation, and modern architectures.",
            topics: [
              {
                title: "Neural Networks – The Building Blocks",
                slug: "neural-networks",
                shortDescription: "The building blocks of deep learning.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Neuron", content: "Linear combination of inputs + bias, followed by a non‑linear activation (ReLU, sigmoid, tanh)." },
                  { title: "Multi‑Layer Perceptron (MLP)", content: "Stack of layers with neurons; universal approximator. Depth and width determine capacity." },
                  { title: "Backpropagation", content: "Computes gradients of the loss with respect to weights using the chain rule. Enables training via gradient descent." },
                  { title: "Activation Functions", content: "ReLU (most common), sigmoid (binary classification), softmax (multiclass), tanh (‑1 to 1)." },
                  { title: "Regularisation in NNs", content: "Dropout (randomly drop neurons), L1/L2 weight decay, batch normalisation (normalise activations)." },
                ],
              },
              {
                title: "Convolutional Neural Networks (CNNs)",
                slug: "cnn",
                shortDescription: "Specialized for image and spatial data.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Convolution", content: "Filters (kernels) slide over input to extract features (edges, textures, objects). Each filter learns a different pattern." },
                  { title: "Pooling", content: "Downsample (max/average pooling) to reduce spatial dimensions and increase translation invariance." },
                  { title: "Architectures", content: "LeNet (digits), AlexNet (breakthrough), VGG (deep), ResNet (skip connections), Inception (parallel convolutions)." },
                  { title: "Transfer Learning", content: "Use pre‑trained models on large datasets (e.g., ImageNet) and fine‑tune on your task. Saves time and data." },
                  { title: "Applications", content: "Image classification, object detection (YOLO, SSD), segmentation (UNet), medical imaging." },
                ],
              },
              {
                title: "Recurrent Neural Networks (RNNs)",
                slug: "rnn",
                shortDescription: "Designed for sequential data (time series, text).",
                estimatedMinutes: 24,
                sections: [
                  { title: "RNN Basics", content: "Processes sequential data by maintaining a hidden state that carries information from previous steps. Suffers from vanishing gradients." },
                  { title: "LSTM and GRU", content: "Address vanishing gradient with gated mechanisms. LSTM: forget, input, output gates. GRU: simpler, fewer parameters." },
                  { title: "Bidirectional RNNs", content: "Process sequence from both directions to capture future context. Useful for NLP tasks." },
                  { title: "Attention Mechanism", content: "Allows the model to focus on relevant parts of the input. Basis of Transformers." },
                  { title: "Applications", content: "Language modelling, translation, sentiment analysis, speech recognition, time‑series forecasting." },
                ],
              },
              {
                title: "Transformers and Attention – The Revolution",
                slug: "transformers",
                shortDescription: "The architecture behind modern NLP and beyond.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Attention Mechanism", content: "`Attention(Q,K,V) = softmax(QK^T/√d_k)V` – allows each token to attend to all others. Enables parallel processing." },
                  { title: "Transformer Architecture", content: "Encoder‑decoder with self‑attention, multi‑head attention, positional encoding, feed‑forward layers. Used in BERT, GPT, etc." },
                  { title: "BERT and GPT", content: "BERT: bidirectional, pre‑trained on masked language modelling. GPT: unidirectional, generative. Both are fine‑tuned for downstream tasks." },
                  { title: "Fine‑tuning Transformers", content: "Use pre‑trained models (HuggingFace) and fine‑tune on your task. Requires less data than training from scratch." },
                  { title: "Applications", content: "NLP (translation, Q&A, summarisation), computer vision (ViT), and multi‑modal." },
                ],
              },
              {
                title: "Unsupervised and Generative Models",
                slug: "generative-models",
                shortDescription: "Autoencoders, GANs, and VAEs.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Autoencoders", content: "Learns a compressed representation (bottleneck) and reconstructs input. Used for denoising, anomaly detection, and dimensionality reduction." },
                  { title: "Variational Autoencoders (VAEs)", content: "Probabilistic autoencoder that generates new data by sampling from a learned latent distribution." },
                  { title: "Generative Adversarial Networks (GANs)", content: "Two networks (generator, discriminator) compete. Produces realistic synthetic data. Prone to mode collapse." },
                  { title: "Applications", content: "Image generation (StyleGAN), style transfer, data augmentation, anomaly detection." },
                  { title: "Evaluation", content: "Inception Score (IS), Frechet Inception Distance (FID) for generated images." },
                ],
              },
            ],
          },
          // Module 2: Reinforcement Learning
          {
            title: "Reinforcement Learning",
            slug: "reinforcement-learning",
            description: "Learning through interaction and rewards.",
            topics: [
              {
                title: "Reinforcement Learning – Key Concepts",
                slug: "rl-key-concepts",
                shortDescription: "Agent, environment, state, action, reward, policy.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Key Concepts", content: "Agent, environment, state, action, reward, policy, value function." },
                  { title: "Markov Decision Process (MDP)", content: "Formal framework for RL. Future depends only on current state." },
                  { title: "Q‑Learning", content: "Learns optimal action‑value function Q(s,a) using Bellman equation. Off‑policy, tabular." },
                  { title: "Policy Gradients", content: "Directly optimise the policy using gradient ascent. REINFORCE algorithm." },
                  { title: "Deep RL", content: "Uses neural networks as function approximators (DQN, PPO, A3C). Applications: games, robotics, autonomous driving." },
                ],
              },
            ],
          },
          // Module 3: MLOps and Deployment (corrected – now a sibling module)
          {
            title: "MLOps and Deployment",
            slug: "mlops",
            description: "Take models to production and maintain them.",
            topics: [
              {
                title: "Model Serialisation – Saving Your Work",
                slug: "model-serialization",
                shortDescription: "Save and load trained models.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Pickle (Python)", content: "Native but insecure; use `joblib` for scikit‑learn models." },
                  { title: "ONNX", content: "Open Neural Network Exchange – interoperable format for different frameworks." },
                  { title: "TensorFlow SavedModel", content: "TF's standard format; includes graph and weights." },
                  { title: "PyTorch", content: "`torch.save`/`load`; preferred format is `state_dict`." },
                  { title: "Versioning", content: "Track model versions with DVC or MLflow for reproducibility." },
                ],
              },
              {
                title: "Serving Models – Making Predictions Live",
                slug: "model-serving",
                shortDescription: "Deploy models as APIs or batch systems.",
                estimatedMinutes: 20,
                sections: [
                  { title: "REST APIs", content: "Wrap model with Flask/FastAPI, expose `/predict` endpoint." },
                  { title: "Triton Inference Server", content: "NVIDIA's server supports multiple frameworks and batching." },
                  { title: "TensorFlow Serving", content: "Optimised for TF models; supports versioning." },
                  { title: "Serverless", content: "AWS Lambda, Google Cloud Functions – limited by time/memory." },
                  { title: "Batch Inference", content: "Run predictions on large datasets using Spark or Dataflow." },
                ],
              },
              {
                title: "Monitoring and Drift Detection",
                slug: "model-monitoring",
                shortDescription: "Detect performance degradation and data drift.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Data Drift", content: "Input distribution changes over time. Monitor with PSI (Population Stability Index) or Kolmogorov‑Smirnov test." },
                  { title: "Concept Drift", content: "Relationship between features and target changes. Monitor model performance metrics on new data." },
                  { title: "Model Performance", content: "Track accuracy, precision, recall on new data; set alerts for degradation." },
                  { title: "Logging", content: "Log predictions and actuals for offline analysis; ensure privacy." },
                  { title: "Retraining Strategies", content: "Fixed schedule, trigger‑based, or continuous learning (online learning)." },
                ],
              },
              {
                title: "Model Explainability – SHAP and LIME",
                slug: "explainability-advanced",
                shortDescription: "Make black‑box models understandable.",
                estimatedMinutes: 22,
                sections: [
                  { title: "SHAP (SHapley Additive exPlanations)", content: "Uses game theory to assign importance to each feature for a given prediction. Provides consistent, local explanations." },
                  { title: "LIME (Local Interpretable Model‑agnostic Explanations)", content: "Fits a local surrogate model to explain individual predictions. Works for any model." },
                  { title: "Global vs Local", content: "Global: feature importance, partial dependence plots. Local: SHAP/LIME for individual predictions." },
                  { title: "Trade‑offs", content: "Interpretability vs accuracy. Simpler models are easier to explain." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERVIEW PREP --------------------
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common ML interview questions, case studies, and problem-solving.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core ML Concepts",
            slug: "ml-core-concepts",
            description: "Fundamental questions asked in every ML interview.",
            topics: [
              {
                title: "Bias‑Variance Tradeoff",
                slug: "bias-variance",
                shortDescription: "Understand the tradeoff and how to manage it.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Definition", content: "Bias: error from overly simplistic assumptions (underfitting). Variance: error from sensitivity to training data (overfitting)." },
                  { title: "Visualizing", content: "Bullseye diagrams; low bias/high variance vs high bias/low variance." },
                  { title: "Managing", content: "Regularisation (L1/L2), cross‑validation, ensemble methods, and adjusting model complexity." },
                ],
              },
              {
                title: "Handling Imbalanced Data",
                slug: "imbalanced-data",
                shortDescription: "Techniques to tackle class imbalance.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Problem", content: "When one class is rare, models tend to predict majority class." },
                  { title: "Resampling", content: "Oversampling (SMOTE) for minority, undersampling for majority." },
                  { title: "Algorithmic Approaches", content: "Class weights, cost‑sensitive learning, and anomaly detection." },
                  { title: "Evaluation", content: "Use precision/recall, AUC‑ROC, F1‑score instead of accuracy." },
                ],
              },
              {
                title: "Explainability and Interpretability",
                slug: "explainability",
                shortDescription: "Make models understandable to stakeholders.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Importance", content: "Trust, fairness, regulatory compliance, debugging." },
                  { title: "Global Methods", content: "Feature importance, SHAP, LIME, partial dependence plots." },
                  { title: "Local Methods", content: "Explain individual predictions (LIME, SHAP)." },
                ],
              },
            ],
          },
          {
            title: "Case Studies and Problem‑Solving",
            slug: "ml-case-studies",
            description: "Design ML systems for real‑world problems.",
            topics: [
              {
                title: "Design a Recommendation System",
                slug: "recommendation-system",
                shortDescription: "Approach for collaborative and content‑based filtering.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Problem Statement", content: "Given user‑item interactions, predict items a user will like." },
                  { title: "Collaborative Filtering", content: "User‑user or item‑item similarity; matrix factorisation (SVD, ALS)." },
                  { title: "Content‑Based", content: "Use item attributes (genres, keywords) to recommend similar items." },
                  { title: "Hybrid Approaches", content: "Combine CF and content‑based to overcome cold start." },
                  { title: "Evaluation", content: "Offline: RMSE, precision@k, recall@k. Online: A/B testing." },
                ],
              },
              {
                title: "Design a Fraud Detection System",
                slug: "fraud-detection",
                shortDescription: "Identify fraudulent transactions in real‑time.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Business Context", content: "Financial losses, false positives harm user experience." },
                  { title: "Data", content: "Transaction amount, location, time, user history, device info." },
                  { title: "Model", content: "Anomaly detection (Isolation Forest) or supervised (imbalanced classification)." },
                  { title: "Real‑time Inference", content: "Need low‑latency predictions; use feature store, streaming (Kafka), and lightweight models." },
                  { title: "Feedback Loop", content: "Label confirmed frauds to retrain model; monitor drift." },
                ],
              },
              {
                title: "ML System Design – Overview",
                slug: "ml-system-design",
                shortDescription: "High‑level architecture for ML applications.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Components", content: "Data ingestion, feature store, model training, model serving, monitoring, alerting." },
                  { title: "Data Pipeline", content: "ETL/ELT, data validation, versioning." },
                  { title: "Training Pipeline", content: "Feature engineering, model selection, hyperparameter tuning, experiment tracking." },
                  { title: "Serving", content: "Online vs batch; latency requirements; caching." },
                  { title: "Scalability", content: "Distributed training (Horovod), model parallelism, and handling large traffic." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(mlCategory);
  console.log("✅ Machine Learning category seeded (ultra‑detailed)");
}

async function main() {
  await seedMachineLearningCategory();
}

main()
  .catch((error) => {
    console.error("ML seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });