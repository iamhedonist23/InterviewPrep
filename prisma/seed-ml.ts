import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics: TopicSeed[];
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

      for (const topicSeed of moduleSeed.topics) {
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

        for (let index = 0; index < topicSeed.sections.length; index += 1) {
          const section = topicSeed.sections[index];
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
    sortOrder: 12, // adjust as needed
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
                estimatedMinutes: 20,
                sections: [
                  { title: "Definition", content: "Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It uses algorithms to parse data, learn from it, and make informed decisions based on those learnings." },
                  { title: "Types of Learning", content: "Supervised learning (labeled data), unsupervised learning (unlabeled data), reinforcement learning (reward-based). Also semi-supervised and self-supervised." },
                  { title: "The ML Pipeline", content: "Data collection → Data preprocessing → Feature engineering → Model training → Evaluation → Deployment → Monitoring. Each step is crucial for success." },
                  { title: "Common Applications", content: "Image recognition, natural language processing, recommendation systems, fraud detection, autonomous vehicles, and healthcare diagnostics." },
                  { title: "Ethics in ML", content: "Bias in data, fairness, transparency, accountability. Consider the societal impact of models." },
                ],
              },
              {
                title: "Data Preprocessing",
                slug: "data-preprocessing",
                shortDescription: "Clean, transform, and prepare data for modeling.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Handling Missing Values", content: "Options: remove rows, impute (mean/median/mode), or use algorithms that handle missing values. Understand the trade-offs." },
                  { title: "Encoding Categorical Variables", content: "Label encoding (ordinal), one-hot encoding (nominal), target encoding, and embeddings. Choose based on model type." },
                  { title: "Feature Scaling", content: "Standardization (z-score) and normalization (min-max). Scale features to prevent dominance in distance-based algorithms." },
                  { title: "Data Splitting", content: "Train/validation/test splits. Stratified sampling for classification to preserve class proportions." },
                  { title: "Handling Outliers", content: "Detection using IQR or Z-score, and treatment: cap, transform, or remove." },
                ],
              },
              {
                title: "Linear Regression",
                slug: "linear-regression",
                shortDescription: "The simplest supervised learning algorithm for continuous targets.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Concept", content: "Models relationship between a dependent variable (target) and one or more independent variables (features) using a linear equation." },
                  { title: "Cost Function", content: "Mean Squared Error (MSE) – measures average squared difference between predictions and actual values." },
                  { title: "Training", content: "Minimize cost using Ordinary Least Squares (closed-form) or Gradient Descent (iterative)." },
                  { title: "Assumptions", content: "Linearity, independence of errors, homoscedasticity, normality of errors. Violations can affect reliability." },
                  { title: "Evaluation", content: "R-squared, adjusted R-squared, RMSE, MAE. Interpret coefficients as feature importance." },
                ],
              },
              {
                title: "Logistic Regression",
                slug: "logistic-regression",
                shortDescription: "A classification algorithm for binary outcomes.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Concept", content: "Uses a logistic (sigmoid) function to model the probability of a binary outcome. Output between 0 and 1." },
                  { title: "Decision Boundary", content: "Threshold (usually 0.5) to classify as positive or negative. Can be adjusted for precision/recall trade-off." },
                  { title: "Cost Function", content: "Cross-entropy (log loss) – measures the difference between predicted probabilities and actual labels." },
                  { title: "Training", content: "Gradient descent to minimize cross-entropy. Regularization (L1/L2) to prevent overfitting." },
                  { title: "Interpretation", content: "Coefficients represent log-odds; can be exponentiated to get odds ratios." },
                ],
              },
              {
                title: "Evaluation Metrics",
                slug: "evaluation-metrics",
                shortDescription: "Measure model performance for classification and regression.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Regression Metrics", content: "MSE, RMSE, MAE, R-squared. Each has different sensitivity to outliers." },
                  { title: "Classification Metrics", content: "Accuracy, Precision, Recall, F1-score, AUC-ROC. Choose based on class imbalance and business objective." },
                  { title: "Confusion Matrix", content: "True positives, false positives, true negatives, false negatives. From these derive all other metrics." },
                  { title: "AUC-ROC", content: "Area under the Receiver Operating Characteristic curve – measures the model's ability to distinguish classes across thresholds." },
                  { title: "When to Use Which", content: "Use precision when false positives are costly (e.g., spam detection). Use recall when false negatives are costly (e.g., disease screening)." },
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
                title: "Feature Creation",
                slug: "feature-creation",
                shortDescription: "Polynomial features, interaction terms, domain-specific transformations.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Polynomial Features", content: "Add powers and interactions of existing features to capture non-linear relationships." },
                  { title: "Binning", content: "Convert continuous features into categorical bins to capture non-linearities." },
                  { title: "Domain Knowledge", content: "Use business or scientific understanding to create meaningful features (e.g., ratios, aggregations)." },
                  { title: "Temporal Features", content: "Extract day, month, year, hour, or time since an event." },
                  { title: "Text Features", content: "TF-IDF, word embeddings, sentiment scores." },
                ],
              },
              {
                title: "Feature Selection",
                slug: "feature-selection",
                shortDescription: "Reduce dimensionality and improve performance.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Filter Methods", content: "Statistical tests (chi-square, correlation, mutual information) to score features and select top-k." },
                  { title: "Wrapper Methods", content: "Forward/backward selection, recursive feature elimination (RFE)." },
                  { title: "Embedded Methods", content: "L1 regularization (Lasso) – shrinks coefficients of less important features to zero." },
                  { title: "Feature Importance", content: "Tree-based models provide importance scores; use to select features." },
                  { title: "Trade-offs", content: "Fewer features reduce overfitting and improve interpretability but may lose signal." },
                ],
              },
              {
                title: "Ensemble Methods",
                slug: "ensemble-methods",
                shortDescription: "Combine multiple models for better performance.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Bagging", content: "Bootstrap Aggregating – train multiple models on different subsets of data and average predictions (e.g., Random Forest)." },
                  { title: "Random Forest", content: "Ensemble of decision trees using bagging and random feature selection. Robust, handles non-linearity." },
                  { title: "Boosting", content: "Sequential training where each model corrects errors of previous (e.g., AdaBoost, Gradient Boosting, XGBoost)." },
                  { title: "Voting/Stacking", content: "Combine predictions from diverse models – can be simple majority vote or meta-model (stacking)." },
                  { title: "When to Use", content: "Ensembles usually outperform single models but are more computationally expensive and less interpretable." },
                ],
              },
              {
                title: "Support Vector Machines",
                slug: "svm",
                shortDescription: "Powerful classifier using maximum margin separation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Concept", content: "Finds the hyperplane that maximizes the margin between classes. Works well with clear margin of separation." },
                  { title: "Kernel Trick", content: "Maps data to higher-dimensional space to find a linear separator. Common kernels: linear, polynomial, RBF." },
                  { title: "Regularization", content: "C parameter controls trade-off between margin size and misclassification; important for bias-variance." },
                  { title: "Support Vectors", content: "The data points that define the margin; only these influence the model." },
                  { title: "Pros and Cons", content: "Effective in high dimensions, memory efficient; but not interpretable, slow on large datasets." },
                ],
              },
              {
                title: "Clustering",
                slug: "clustering",
                shortDescription: "Unsupervised learning to find natural groups in data.",
                estimatedMinutes: 20,
                sections: [
                  { title: "K-Means", content: "Partitions data into K clusters by minimizing within-cluster variance. Requires choosing K (elbow method)." },
                  { title: "Hierarchical Clustering", content: "Builds a tree of clusters; can be agglomerative (bottom-up) or divisive (top-down). Visualize with dendrogram." },
                  { title: "DBSCAN", content: "Density-based clustering – finds clusters of arbitrary shape and handles outliers. Parameters: eps, min_samples." },
                  { title: "Evaluation", content: "No ground truth – use silhouette score, Davies-Bouldin index, or visual inspection." },
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
        description: "Deep learning, reinforcement learning, and MLOps.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Deep Learning Fundamentals",
            slug: "deep-learning",
            description: "Neural networks, backpropagation, and modern architectures.",
            topics: [
              {
                title: "Neural Networks",
                slug: "neural-networks",
                shortDescription: "The building blocks of deep learning.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Neuron", content: "Linear combination of inputs + bias, followed by a non-linear activation function (ReLU, sigmoid, tanh)." },
                  { title: "Multi-Layer Perceptron (MLP)", content: "Stack of layers with neurons; universal approximator." },
                  { title: "Backpropagation", content: "Algorithm to compute gradients of the loss with respect to weights using chain rule; enables training via gradient descent." },
                  { title: "Activation Functions", content: "ReLU (commonly used), sigmoid (output layer for binary), softmax (multiclass), tanh." },
                  { title: "Regularization in NNs", content: "Dropout, L1/L2 regularization, batch normalization to prevent overfitting." },
                ],
              },
              {
                title: "Convolutional Neural Networks (CNNs)",
                slug: "cnn",
                shortDescription: "Specialized for image and spatial data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Convolution Operation", content: "Apply filters (kernels) to input to extract features (edges, textures, objects)." },
                  { title: "Pooling", content: "Downsample (max/average pooling) to reduce spatial dimensions and increase invariance." },
                  { title: "Architectures", content: "LeNet, AlexNet, VGG, ResNet (skip connections), Inception." },
                  { title: "Transfer Learning", content: "Use pre-trained models (e.g., ResNet, EfficientNet) and fine-tune on new tasks; saves training time." },
                  { title: "Applications", content: "Image classification, object detection (YOLO, SSD), segmentation (UNet), medical imaging." },
                ],
              },
              {
                title: "Recurrent Neural Networks (RNNs)",
                slug: "rnn",
                shortDescription: "Designed for sequential data (time series, text).",
                estimatedMinutes: 20,
                sections: [
                  { title: "RNN Basics", content: "Processes sequential data by maintaining a hidden state that carries information from previous steps." },
                  { title: "LSTM and GRU", content: "Address vanishing gradient problem with gated mechanisms; LSTMs have forget, input, output gates." },
                  { title: "Bidirectional RNNs", content: "Process sequence from both directions to capture context from future as well." },
                  { title: "Applications", content: "Language modeling, machine translation, sentiment analysis, speech recognition, time-series forecasting." },
                  { title: "Attention Mechanism", content: "Introduced in Transformers; allows model to focus on relevant parts of input; basis of modern NLP." },
                ],
              },
              {
                title: "Unsupervised and Generative Models",
                slug: "generative-models",
                shortDescription: "Autoencoders, GANs, and VAEs.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Autoencoders", content: "Learns a compressed representation (bottleneck) and reconstructs input; used for dimensionality reduction and denoising." },
                  { title: "Variational Autoencoders (VAEs)", content: "Probabilistic autoencoder that generates new data by sampling from a learned latent distribution." },
                  { title: "Generative Adversarial Networks (GANs)", content: "Two networks (generator, discriminator) compete; produces realistic synthetic data. Prone to mode collapse." },
                  { title: "Applications", content: "Image generation, style transfer, data augmentation, anomaly detection." },
                  { title: "Evaluation", content: "Inception Score (IS), Frechet Inception Distance (FID) for generated images." },
                ],
              },
              {
                title: "Reinforcement Learning",
                slug: "reinforcement-learning",
                shortDescription: "Learning through interaction and rewards.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Key Concepts", content: "Agent, environment, state, action, reward, policy, value function." },
                  { title: "Markov Decision Process (MDP)", content: "Formal framework for RL; future depends only on current state." },
                  { title: "Q-Learning", content: "Learns optimal action-value function Q(s,a) using Bellman equation. Off-policy, tabular." },
                  { title: "Policy Gradients", content: "Directly optimize the policy using gradient ascent; REINFORCE algorithm." },
                  { title: "Deep RL", content: "Use neural networks as function approximators (DQN, PPO, A3C). Applications: games, robotics, autonomous driving." },
                ],
              },
            ],
          },
          {
            title: "MLOps and Deployment",
            slug: "mlops",
            description: "Take models to production and maintain them.",
            topics: [
              {
                title: "Model Serialization",
                slug: "model-serialization",
                shortDescription: "Save and load trained models.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Pickle (Python)", content: "Standard but insecure; use joblib for scikit-learn models." },
                  { title: "ONNX", content: "Open Neural Network Exchange – interoperable format for different frameworks." },
                  { title: "TensorFlow SavedModel", content: "TF's serialization format; includes graph and weights." },
                  { title: "PyTorch", content: "torch.save/load; preferred format is state_dict." },
                  { title: "Versioning", content: "Track model versions (e.g., DVC, MLflow) for reproducibility." },
                ],
              },
              {
                title: "Serving Models",
                slug: "model-serving",
                shortDescription: "Deploy models as APIs or batch systems.",
                estimatedMinutes: 18,
                sections: [
                  { title: "REST APIs", content: "Use Flask/FastAPI to wrap model and expose /predict endpoints." },
                  { title: "Triton Inference Server", content: "NVIDIA's server supports multiple frameworks and batching." },
                  { title: "TensorFlow Serving", content: "Specifically for TF models; supports versioning." },
                  { title: "Serverless", content: "AWS Lambda, Google Cloud Functions – limited by time/memory." },
                  { title: "Batch Inference", content: "Run predictions on large datasets periodically using Spark or Dataflow." },
                ],
              },
              {
                title: "Monitoring and Drift",
                slug: "model-monitoring",
                shortDescription: "Detect performance degradation and data drift.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Data Drift", content: "Input distribution changes over time; monitor feature distributions (PSI, KL divergence)." },
                  { title: "Concept Drift", content: "Relationship between features and target changes; monitor model metrics over time." },
                  { title: "Model Performance", content: "Track accuracy, precision, recall on new data; set alerts for degradation." },
                  { title: "Logging", content: "Log predictions and actuals for offline analysis; ensure privacy." },
                  { title: "Retraining Strategies", content: "Fixed schedule, trigger-based, or continuous learning (online learning)." },
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
                title: "Bias-Variance Tradeoff",
                slug: "bias-variance",
                shortDescription: "Understand the tradeoff and how to manage it.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Definition", content: "Bias: error from overly simplistic assumptions (underfitting). Variance: error from sensitivity to training data (overfitting)." },
                  { title: "Visualizing", content: "Bullseye diagrams; low bias/high variance vs high bias/low variance." },
                  { title: "Managing", content: "Use regularization (L1/L2), cross-validation, ensemble methods, and adjust model complexity." },
                  { title: "Interview Question Example", content: "Explain how increasing model complexity affects bias and variance. What techniques can you use to reduce variance?" },
                ],
              },
              {
                title: "Handling Imbalanced Data",
                slug: "imbalanced-data",
                shortDescription: "Techniques to tackle class imbalance.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Problem", content: "When one class is rare, models tend to predict majority class." },
                  { title: "Resampling", content: "Oversampling (SMOTE) for minority, undersampling for majority." },
                  { title: "Algorithmic Approaches", content: "Class weights, cost-sensitive learning, and anomaly detection." },
                  { title: "Evaluation", content: "Use precision/recall, AUC-ROC, F1-score instead of accuracy." },
                  { title: "Interview Question", content: "You have a dataset with 99% negatives, 1% positives. How would you build a classifier? How would you evaluate it?" },
                ],
              },
              {
                title: "Explainability and Interpretability",
                slug: "explainability",
                shortDescription: "Make models understandable to stakeholders.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Importance", content: "Trust, fairness, regulatory compliance, debugging." },
                  { title: "Global Methods", content: "Feature importance, SHAP, LIME, partial dependence plots." },
                  { title: "Local Methods", content: "Explain individual predictions (LIME, SHAP)." },
                  { title: "Trade-off", content: "Often simpler models (linear, tree) are more interpretable but less accurate than black-box models." },
                  { title: "Interview Question", content: "How would you explain a random forest prediction to a non-technical business user?" },
                ],
              },
            ],
          },
          {
            title: "Case Studies and Problem-Solving",
            slug: "ml-case-studies",
            description: "Design ML systems for real-world problems.",
            topics: [
              {
                title: "Design a Recommendation System",
                slug: "recommendation-system",
                shortDescription: "Approach for collaborative and content-based filtering.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Problem Statement", content: "Given user-item interactions (e.g., ratings, purchases), predict items a user will like." },
                  { title: "Collaborative Filtering", content: "User-user or item-item similarity; matrix factorization (SVD, ALS)." },
                  { title: "Content-Based", content: "Use item attributes (e.g., genres, keywords) to recommend similar items." },
                  { title: "Hybrid Approaches", content: "Combine CF and content-based to overcome cold start." },
                  { title: "Evaluation", content: "Offline: RMSE, precision@k, recall@k. Online: A/B testing." },
                ],
              },
              {
                title: "Design a Fraud Detection System",
                slug: "fraud-detection",
                shortDescription: "Identify fraudulent transactions in real-time.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Business Context", content: "Financial losses, false positives harm user experience." },
                  { title: "Data", content: "Transaction amount, location, time, user history, device info." },
                  { title: "Model", content: "Anomaly detection (Isolation Forest) or supervised (imbalanced classification)." },
                  { title: "Real-time Inference", content: "Need low-latency predictions; use feature store, streaming (Kafka), and lightweight models." },
                  { title: "Feedback Loop", content: "Label confirmed frauds to retrain model; monitor drift." },
                ],
              },
              {
                title: "ML System Design – Overview",
                slug: "ml-system-design",
                shortDescription: "High-level architecture for ML applications.",
                estimatedMinutes: 20,
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
  console.log("✅ Machine Learning category seeded");
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