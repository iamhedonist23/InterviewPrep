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

async function seedDataScienceCategory() {
  const category: CategorySeed = {
    name: "Data Science",
    slug: "data-science",
    description: "Master the full data science lifecycle: statistics, Python, data wrangling, visualization, machine learning, and deployment.",
    icon: "DS",
    sortOrder: 21,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Build a strong foundation in statistics, Python, data wrangling, and visualization.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Statistics and Probability",
            slug: "statistics",
            description: "Fundamental concepts for understanding data and models.",
            topics: [
              {
                title: "Descriptive Statistics – Summarising Data",
                slug: "descriptive-stats",
                shortDescription: "Mean, median, mode, variance, standard deviation, quartiles.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Measures of Central Tendency", content: "**Mean**: the average (sum/n). Sensitive to outliers. **Median**: the middle value; robust to outliers. Use mean for symmetric distributions, median for skewed (e.g., income data). **Mode**: the most frequent value; useful for categorical data." },
                  { title: "Measures of Dispersion", content: "**Range**: max – min (very sensitive). **Variance**: average squared deviation from the mean. **Standard Deviation**: square root of variance, in the same unit as the data. It measures how spread out the data is. A low SD means data points are close to the mean." },
                  { title: "Quartiles and IQR", content: "Q1 (25th percentile), Q2 (median), Q3 (75th percentile). **IQR = Q3 – Q1** – a robust measure of spread. Outliers are often defined as points below Q1 – 1.5*IQR or above Q3 + 1.5*IQR." },
                  { title: "Skewness and Kurtosis", content: "**Skewness** measures asymmetry. Positive skew: tail on right (mean > median). Negative skew: tail on left. **Kurtosis** measures tail heaviness; high kurtosis means heavy tails (more outliers)." },
                  { title: "Histograms and Boxplots", content: "**Histograms** show distribution shape. **Boxplots** show median, IQR, and outliers – great for comparing groups." },
                ],
              },
              {
                title: "Probability Basics – The Language of Uncertainty",
                slug: "probability",
                shortDescription: "Probability rules, conditional probability, Bayes' theorem.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Core Concepts", content: "**Probability** quantifies uncertainty (0 to 1). **Sample space**: all possible outcomes. **Event**: a subset of the sample space. **Complement**: P(not A) = 1 – P(A). **Addition rule**: P(A ∪ B) = P(A) + P(B) – P(A ∩ B)." },
                  { title: "Conditional Probability", content: "P(A|B) = P(A ∩ B) / P(B). This is the probability of A given B has occurred. **Independence**: P(A|B) = P(A), meaning B gives no information about A." },
                  { title: "Bayes' Theorem", content: "P(A|B) = P(B|A) * P(A) / P(B). It's the basis for updating beliefs with new evidence. In ML, it's used in Naïve Bayes classifiers and Bayesian inference." },
                  { title: "Random Variables", content: "**Discrete** (e.g., number of heads, count of customers). **Continuous** (e.g., height, temperature). PDF (probability density function) for continuous, PMF (probability mass function) for discrete." },
                ],
              },
              {
                title: "Probability Distributions – The Patterns of Randomness",
                slug: "distributions",
                shortDescription: "Normal, binomial, Poisson, and their applications.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Normal Distribution (Gaussian)", content: "Bell‑shaped, symmetric, defined by μ (mean) and σ² (variance). About 68% of data lies within ±1σ, 95% within ±2σ, 99.7% within ±3σ. Used in many natural phenomena (height, test scores)." },
                  { title: "Binomial Distribution", content: "Models the number of successes in n independent trials, each with probability p. Example: number of heads in 10 coin flips." },
                  { title: "Poisson Distribution", content: "Models the number of events occurring in a fixed interval (time/space) with a known average rate λ. Example: number of customers arriving in an hour." },
                  { title: "Standard Normal and Z‑score", content: "Standard normal has mean 0 and std 1. Z = (x – μ)/σ. Used to compare observations from different distributions." },
                ],
              },
            ],
          },
          {
            title: "Python for Data Science",
            slug: "python-data-science",
            description: "Essential Python libraries: NumPy, Pandas, Matplotlib, Seaborn.",
            topics: [
              {
                title: "NumPy – The Foundation of Scientific Computing",
                slug: "numpy",
                shortDescription: "Arrays, vectorized operations, broadcasting.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is NumPy", content: "NumPy provides n‑dimensional arrays and fast mathematical operations. It's the backbone of Pandas, Scikit‑learn, and many other DS libraries." },
                  { title: "Creating Arrays", content: "`np.array([1,2,3])`, `np.zeros((2,3))`, `np.ones((4,))`, `np.arange(10)`, `np.linspace(0,1,5)`. Also `np.random.randn(100)` for random normal." },
                  { title: "Vectorized Operations", content: "Operations are element‑wise and C‑fast. Example: `arr * 2`, `arr + arr`, `np.sqrt(arr)`. Avoid Python loops." },
                  { title: "Broadcasting", content: "Perform operations on arrays of different shapes (e.g., add a vector to a matrix). Rules: align trailing dimensions, then match." },
                  { title: "Aggregations and Slicing", content: "`arr.sum()`, `arr.mean()`, `arr.std()`. Slicing: `arr[1:4]`, `arr[:, 2:5]`. Boolean indexing: `arr[arr > 0]`." },
                ],
              },
              {
                title: "Pandas – Data Wrangling Made Easy",
                slug: "pandas",
                shortDescription: "Series, DataFrames, filtering, grouping, merging.",
                estimatedMinutes: 30,
                sections: [
                  { title: "What is Pandas", content: "Pandas provides high‑performance, easy‑to‑use data structures: Series (1D) and DataFrame (2D). It's the Swiss Army knife for data cleaning and analysis." },
                  { title: "Reading Data", content: "`pd.read_csv('file.csv')`, `pd.read_excel()`, `pd.read_json()`, `pd.read_sql()`." },
                  { title: "Exploring Data", content: "`df.head()`, `df.tail()`, `df.info()` (dtypes, non‑null counts), `df.describe()` (summary stats), `df.shape`, `df.columns`." },
                  { title: "Filtering and Selection", content: "**Boolean indexing**: `df[df['age'] > 30]`. **loc** (by label): `df.loc[0:5, ['name', 'age']]`. **iloc** (by position): `df.iloc[0:5, 0:2]`." },
                  { title: "Handling Missing Values", content: "`df.isna().sum()` to count missings. `df.dropna()` to remove rows/columns. `df.fillna(value)` to impute (e.g., mean, median, forward fill)." },
                  { title: "Grouping and Aggregation", content: "`df.groupby('category')['value'].mean()`. Use `agg()` for multiple functions: `.agg(['mean', 'std'])`. `transform()` for group‑wise operations." },
                  { title: "Merging and Joining", content: "`pd.merge(df1, df2, on='key')` (SQL‑style). `df1.join(df2, how='inner')`. `pd.concat()` for stacking." },
                ],
              },
              {
                title: "Exploratory Data Analysis (EDA) – Getting to Know Your Data",
                slug: "eda",
                shortDescription: "Summary statistics, distributions, correlations, and visualizations.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is EDA", content: "EDA is the process of analyzing datasets to summarize their main characteristics, often with visual methods. It helps spot anomalies, patterns, and relationships before modeling." },
                  { title: "Univariate Analysis", content: "Examine each variable individually. Use histograms (continuous), bar charts (categorical), boxplots (outliers), and summary statistics (mean, median, IQR)." },
                  { title: "Bivariate Analysis", content: "Explore relationships between pairs. Scatter plots for two continuous variables. Boxplots for continuous vs categorical. Correlation matrices and heatmaps." },
                  { title: "Multivariate Analysis", content: "Pair plots (`sns.pairplot`), parallel coordinates, and dimensionality reduction (PCA) to visualise high‑dimensional data." },
                  { title: "Detecting Outliers and Missing Data", content: "Use boxplots (IQR rule), Z‑scores, or visual inspection. Decide how to handle: remove, cap, or impute." },
                ],
              },
              {
                title: "Data Visualization – Telling Stories with Data",
                slug: "visualization",
                shortDescription: "Matplotlib, Seaborn, and effective plotting.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Matplotlib Basics", content: "**Plot**: `plt.plot(x, y)`. **Scatter**: `plt.scatter(x, y)`. **Histogram**: `plt.hist(data, bins=30)`. **Bar**: `plt.bar(categories, values)`. **Subplots**: `fig, axes = plt.subplots(2,2)`." },
                  { title: "Seaborn – Statistical Visualizations", content: "Seaborn provides high‑level interfaces: `sns.histplot()`, `sns.boxplot()`, `sns.pairplot()`, `sns.heatmap()`. It integrates with Pandas." },
                  { title: "Choosing the Right Plot", content: "**Histogram** for distribution. **Scatter** for relationship (two continuous). **Boxplot** for summary and outliers. **Bar chart** for comparisons (categorical). **Line plot** for trends over time. **Heatmap** for correlation matrix." },
                  { title: "Customisation", content: "Set labels (`plt.xlabel()`), title (`plt.title()`), legend (`plt.legend()`), colours, themes (`sns.set_style('whitegrid')`). Always label your axes and include units." },
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
        description: "Machine learning fundamentals, model evaluation, feature engineering, and SQL.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Machine Learning – The Core",
            slug: "ml",
            description: "Supervised and unsupervised learning, evaluation, and feature engineering.",
            topics: [
              {
                title: "Supervised Learning – Predicting with Labels",
                slug: "supervised",
                shortDescription: "Regression and classification algorithms.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Linear Regression", content: "Models relationship between features and continuous target. Uses MSE as cost, solved by OLS or gradient descent. Assumptions: linearity, independence, homoscedasticity, normality. Interpret coefficients as feature impact." },
                  { title: "Logistic Regression", content: "Binary classification. Uses sigmoid function to output probability. Cross‑entropy loss. Good for interpretability and baselines." },
                  { title: "Decision Trees", content: "Tree‑based model that splits on features to maximise information gain (or reduce Gini impurity). Interpretable, handles non‑linearity, but can overfit (prune or set max depth)." },
                  { title: "Random Forest", content: "Ensemble of decision trees using bagging (bootstrapped data) and random feature selection. Reduces overfitting, gives feature importance. Robust and works well on tabular data." },
                  { title: "XGBoost", content: "Gradient boosting with regularisation. State‑of‑the‑art for tabular data. Uses boosting (sequential trees, each corrects previous errors). Handles missing values, and is fast." },
                  { title: "SVM (Support Vector Machines)", content: "Finds hyperplane that maximises margin. Works well in high dimensions. Kernel trick for non‑linear boundaries. Not as interpretable, but powerful." },
                  { title: "K‑Nearest Neighbours (KNN)", content: "Simple, lazy learner. Predictions based on K closest training points. No training, but slow inference. Sensitive to scale and distance metric." },
                ],
              },
              {
                title: "Unsupervised Learning – Discovering Hidden Structure",
                slug: "unsupervised",
                shortDescription: "Clustering, PCA, and dimensionality reduction.",
                estimatedMinutes: 24,
                sections: [
                  { title: "K‑Means Clustering", content: "Partitions data into K clusters, minimising within‑cluster variance. Iterative: assign points to nearest centroid, update centroids. Choose K via elbow method (inertia) or silhouette score." },
                  { title: "Hierarchical Clustering", content: "Builds a tree of clusters (agglomerative or divisive). Use dendrogram to decide the number of clusters. Good for exploratory analysis." },
                  { title: "PCA (Principal Component Analysis)", content: "Linear dimensionality reduction. Finds principal components (directions of maximum variance). Used for visualisation (2D/3D), noise reduction, and feature compression." },
                  { title: "t‑SNE and UMAP", content: "Non‑linear dimensionality reduction for visualisation. t‑SNE preserves local structure; UMAP preserves both local and global. Good for high‑dimensional data (e.g., embeddings)." },
                ],
              },
              {
                title: "Model Evaluation – Measuring Success",
                slug: "model-evaluation",
                shortDescription: "Train/test split, cross‑validation, metrics, and hyperparameter tuning.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Train/Test Split", content: "Split data into training (e.g., 70%) and testing (30%) to evaluate generalisation. Use stratified sampling for classification to preserve class proportions." },
                  { title: "Cross‑Validation (CV)", content: "K‑fold CV: split data into K folds; train on K‑1, validate on the remaining. Repeat K times. Reduces variance in evaluation. Use `cross_val_score` in sklearn." },
                  { title: "Classification Metrics", content: "**Accuracy**: (TP+TN)/total (not for imbalanced). **Precision**: TP/(TP+FP) – how many predicted positives are correct. **Recall**: TP/(TP+FN) – how many actual positives were found. **F1**: harmonic mean. **ROC‑AUC**: area under the ROC curve, measures separability." },
                  { title: "Regression Metrics", content: "**MSE**: average squared error (sensitive to outliers). **RMSE**: root MSE (interpretable). **MAE**: mean absolute error (robust to outliers). **R²**: proportion of variance explained." },
                  { title: "Hyperparameter Tuning", content: "**Grid search**: exhaustive search over a parameter grid. **Random search**: random sampling – more efficient. **Bayesian optimisation**: uses a probabilistic model to guide search." },
                ],
              },
              {
                title: "Feature Engineering – Creating Good Inputs",
                slug: "feature-engineering",
                shortDescription: "Create, transform, and select features.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Creating Features", content: "**Polynomial**: `x², x³` for non‑linearity. **Interactions**: `x1 * x2`. **Domain‑specific**: ratios, aggregates, rolling statistics, date components (day, month, hour)." },
                  { title: "Encoding Categorical Variables", content: "**One‑hot encoding**: creates binary columns for each category (for nominal). **Label encoding**: maps categories to integers (for ordinal, or for tree‑based models). **Target encoding**: replace categories with mean target value (use with cross‑validation to avoid leakage)." },
                  { title: "Scaling and Normalization", content: "**Standardization (z‑score)**: (x – μ) / σ – makes mean 0, std 1. **Min‑Max scaling**: (x – min) / (max – min) – scales to [0,1]. Scaling is important for distance‑based algorithms (SVM, KNN, PCA)." },
                  { title: "Feature Selection", content: "**Filter**: based on statistical tests (correlation, mutual information). **Wrapper**: forward/backward selection or RFE (recursive feature elimination). **Embedded**: L1 regularisation (Lasso) shrinks coefficients to zero." },
                ],
              },
              {
                title: "Handling Imbalanced Data – The Minority Problem",
                slug: "imbalanced",
                shortDescription: "Techniques for classification with rare classes.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Problem", content: "When one class is rare (e.g., fraud detection, 1% fraud), accuracy is misleading. Models tend to predict majority class." },
                  { title: "Resampling Techniques", content: "**Oversampling**: duplicate minority samples (SMOTE creates synthetic examples). **Undersampling**: randomly remove majority samples (loss of information). Combine with cross‑validation." },
                  { title: "Algorithmic Approaches", content: "**Class weights**: give higher weight to minority class in loss function. **Cost‑sensitive learning**: adjust penalty for misclassification. Use `class_weight='balanced'` in sklearn." },
                  { title: "Evaluation", content: "Use **precision‑recall curve** and **AUC‑PR** instead of ROC‑AUC. F1‑score and balanced accuracy are also useful." },
                ],
              },
            ],
          },
          {
            title: "SQL for Data Science",
            slug: "sql-data-science",
            description: "Extract, transform, and aggregate data from databases.",
            topics: [
              {
                title: "SQL Basics – Querying Databases",
                slug: "sql-basics",
                shortDescription: "SELECT, WHERE, JOIN, GROUP BY, HAVING.",
                estimatedMinutes: 22,
                sections: [
                  { title: "SELECT and WHERE", content: "`SELECT column1, column2 FROM table WHERE condition`. Use `ORDER BY` and `LIMIT`." },
                  { title: "JOINs", content: "`INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN` to combine tables." },
                  { title: "GROUP BY and Aggregates", content: "`GROUP BY column` with `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. `HAVING` filters groups." },
                ],
              },
              {
                title: "Advanced SQL – Analytics and Performance",
                slug: "advanced-sql",
                shortDescription: "Subqueries, CTEs, window functions, and performance.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Subqueries", content: "Nested queries in `SELECT`, `FROM`, `WHERE`. Example: `SELECT name FROM users WHERE id IN (SELECT user_id FROM orders)`." },
                  { title: "CTEs (Common Table Expressions)", content: "`WITH cte AS (SELECT ...) SELECT * FROM cte`. Improves readability and reusability." },
                  { title: "Window Functions", content: "`ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`, `SUM() OVER (PARTITION BY ... ORDER BY ...)`. Used for running totals, ranking, and time‑series comparisons." },
                  { title: "Query Optimisation", content: "Use `EXPLAIN` to understand execution plans. Create indexes on columns used in `WHERE`, `JOIN`, `ORDER BY`." },
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
        description: "Deep learning, NLP, time series, and model deployment.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Deep Learning",
            slug: "deep-learning",
            description: "Neural networks, CNNs, RNNs, and transformers.",
            topics: [
              {
                title: "Neural Networks – The Building Blocks",
                slug: "nn",
                shortDescription: "Perceptron, activation functions, backpropagation.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Neuron", content: "Linear combination of inputs + bias, followed by non‑linear activation. Activation: ReLU (max(0,x)), sigmoid (0‑1), tanh (‑1 to 1)." },
                  { title: "Architecture", content: "Input layer (features), hidden layers (learn features), output layer (predictions). Depth and width determine capacity." },
                  { title: "Training – Backpropagation and Optimisation", content: "**Forward pass**: compute predictions. **Loss**: measure error (MSE, cross‑entropy). **Backward pass**: compute gradients via chain rule. **Optimiser**: SGD, Adam, RMSprop. **Learning rate** controls step size." },
                  { title: "Regularisation", content: "**Dropout**: randomly drop neurons during training to prevent co‑adaptation. **L1/L2 weight decay** penalises large weights. **Batch normalisation**: normalise activations to stabilise training." },
                ],
              },
              {
                title: "Convolutional Neural Networks (CNNs)",
                slug: "cnn",
                shortDescription: "Convolutional layers for image data.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Convolution", content: "Filters (kernels) slide over input to extract features (edges, textures). Each filter learns a different pattern." },
                  { title: "Pooling", content: "Downsample (max pooling or average pooling) to reduce spatial dimensions and increase translation invariance." },
                  { title: "Architectures", content: "**LeNet‑5** (handwritten digits). **AlexNet** (breakthrough in ImageNet). **ResNet** (skip connections enable very deep networks)." },
                  { title: "Transfer Learning", content: "Use pre‑trained models (e.g., ResNet, EfficientNet) on ImageNet, fine‑tune on your dataset. Saves time and data." },
                ],
              },
              {
                title: "NLP and Transformers",
                slug: "nlp",
                shortDescription: "Text preprocessing, embeddings, and transformers.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Text Preprocessing", content: "Tokenisation (split into words), stop word removal, stemming (Porter), lemmatisation (to root form)." },
                  { title: "Word Embeddings", content: "**Word2Vec** (CBOW, Skip‑gram) – dense vectors capturing semantic meaning. **GloVe** – global word‑word co‑occurrence. **FastText** – subword information." },
                  { title: "Transformers – The State of the Art", content: "**Attention mechanism**: weights each token's importance. **Transformer architecture**: encoder‑decoder with self‑attention and feed‑forward layers. **BERT**: bidirectional, pre‑trained on masked language modelling. **GPT**: unidirectional, generative." },
                  { title: "Fine‑Tuning Transformers", content: "Use pre‑trained models (e.g., HuggingFace) and fine‑tune on your downstream task (classification, NER, Q&A). Requires less data." },
                ],
              },
              {
                title: "Time Series Analysis and Forecasting",
                slug: "time-series",
                shortDescription: "Trend, seasonality, ARIMA, Prophet, and LSTMs.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Decomposition", content: "Separate time series into trend (long‑term), seasonal (regular patterns), and residual (noise). Use `statsmodels.tsa.seasonal_decompose`." },
                  { title: "ARIMA (AutoRegressive Integrated Moving Average)", content: "**p**: AR order (lagged values). **d**: differencing degree (to make stationary). **q**: MA order (lagged forecast errors). Use ACF/PACF to choose p,q. Requires stationarity." },
                  { title: "Prophet", content: "Facebook's Prophet: decomposes into trend, seasonality (day, week, year), holiday effects. Handles missing data and outliers. Easy to use." },
                  { title: "LSTM for Time Series", content: "Long Short‑Term Memory networks can capture long‑term dependencies. They are effective for sequences (e.g., sensor data, stock prices). Requires careful preprocessing and hyperparameter tuning." },
                ],
              },
            ],
          },
          // -------------------- CORRECTED: Deployment module is now a sibling, not nested inside Deep Learning --------------------
          {
            title: "Deployment and MLOps",
            slug: "mlops-ds",
            description: "Model serialisation, serving, monitoring, and versioning.",
            topics: [
              {
                title: "Model Serialisation – Saving Your Work",
                slug: "serialisation",
                shortDescription: "Pickle, joblib, ONNX, TensorFlow SavedModel.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Pickle", content: "Python's native serialization. Simple but not secure (can execute arbitrary code)." },
                  { title: "joblib", content: "More efficient for large NumPy arrays (common in sklearn models)." },
                  { title: "ONNX", content: "Open Neural Network Exchange – interoperable format for different frameworks (PyTorch, TF, sklearn)." },
                  { title: "TensorFlow SavedModel", content: "TF's standard format; includes graph and weights." },
                ],
              },
              {
                title: "Serving Models – Making Predictions Live",
                slug: "model-serving",
                shortDescription: "REST APIs, TensorFlow Serving, Triton.",
                estimatedMinutes: 22,
                sections: [
                  { title: "REST API with Flask/FastAPI", content: "Wrap your model in a web app. Endpoint `/predict` takes JSON input, returns prediction. Good for low‑traffic." },
                  { title: "TensorFlow Serving", content: "Optimised for TF models; supports versioning, batching, and GPU. Used in production." },
                  { title: "Triton Inference Server", content: "NVIDIA's server supports multiple frameworks (TF, PyTorch, ONNX). High performance." },
                  { title: "Batch Inference", content: "Run predictions on large datasets offline (e.g., using Spark, Airflow)." },
                ],
              },
              {
                title: "Monitoring and Drift Detection",
                slug: "monitoring-drift",
                shortDescription: "Data drift, concept drift, and performance monitoring.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Data Drift", content: "Input feature distribution changes over time. Monitor with PSI (Population Stability Index) or Kolmogorov‑Smirnov test." },
                  { title: "Concept Drift", content: "Relationship between features and target changes. Monitor model performance metrics on new data." },
                  { title: "Monitoring Tools", content: "**Evidently AI** – open‑source for drift detection. **Prometheus + Grafana** for metrics. **Alerts** on significant drift." },
                  { title: "Retraining Strategies", content: "**Fixed schedule** (e.g., monthly). **Trigger‑based** (when drift exceeds threshold). **Online learning** (continual updates)." },
                ],
              },
              {
                title: "MLflow and Model Versioning",
                slug: "mlflow",
                shortDescription: "Track experiments, manage models, and deploy.",
                estimatedMinutes: 22,
                sections: [
                  { title: "MLflow Tracking", content: "Log parameters, metrics, artifacts (models, plots). Compare runs to choose best model." },
                  { title: "MLflow Models", content: "Model packaging format (python_function). Easy to deploy to serving." },
                  { title: "Model Registry", content: "Stage models (Staging, Production, Archived). Manage versions and aliases." },
                  { title: "Integration with Docker", content: "Containerise your app with model and dependencies. Use Docker for consistent deployments." },
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
        description: "Common Data Science interview questions, case studies, and coding problems.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-concepts-ds",
            description: "Statistics, machine learning, and evaluation.",
            topics: [
              {
                title: "Statistical Questions",
                slug: "stat-interview",
                shortDescription: "Explain p‑values, confidence intervals, hypothesis testing.",
                estimatedMinutes: 22,
                sections: [
                  { title: "P‑value", content: "Probability of observing data as extreme as what you got, assuming the null hypothesis is true. It does NOT mean the probability that the null is true." },
                  { title: "Confidence Interval", content: "A range that contains the true parameter with a given confidence level (e.g., 95%). It's about the interval, not the parameter." },
                  { title: "Hypothesis Testing", content: "Null (H₀) and alternative (H₁). Type I error: false positive. Type II: false negative. Power = 1 – Type II." },
                ],
              },
              {
                title: "ML Algorithms – Compare and Contrast",
                slug: "ml-interview",
                shortDescription: "Random Forest vs XGBoost, linear vs logistic, etc.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Random Forest vs XGBoost", content: "RF uses bagging (parallel trees) – reduces variance. XGBoost uses boosting (sequential trees) – reduces bias and variance. XGBoost often wins on performance, but RF is easier to tune and interpret." },
                  { title: "Bias‑Variance Tradeoff", content: "Bias: error from simplistic assumptions (underfitting). Variance: error from sensitivity to training data (overfitting). Trade‑off: more complex models reduce bias but increase variance." },
                  { title: "Linear vs Logistic Regression", content: "Linear for continuous target; Logistic for classification. They both assume linearity, but Logistic outputs probabilities." },
                ],
              },
            ],
          },
          {
            title: "Coding and Case Studies",
            slug: "coding-case-studies",
            description: "Practical problems and design scenarios.",
            topics: [
              {
                title: "Data Manipulation in Python",
                slug: "data-manipulation",
                shortDescription: "Use pandas to clean and transform data.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Handling Missing Values", content: "Show how to use `isna()`, `dropna()`, `fillna()`. Also `interpolate()` for time series." },
                  { title: "Groupby and Aggregation", content: "Compute grouped summary stats (mean, median, count). Use `agg` for multiple operations." },
                  { title: "Merging DataFrames", content: "SQL‑style joins with `pd.merge`. Show `inner`, `left`, `right`, `outer`." },
                ],
              },
              {
                title: "Design a Recommendation System",
                slug: "recsys",
                shortDescription: "Collaborative filtering, content‑based, hybrid.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Problem", content: "Suggest items (movies, products) to users based on past behaviour." },
                  { title: "Collaborative Filtering", content: "User‑based (find similar users) or item‑based (find similar items). Use matrix factorisation (SVD, ALS) to reduce dimensions." },
                  { title: "Content‑Based", content: "Use item attributes (genre, description) to recommend similar items. Build a user profile from liked items." },
                  { title: "Hybrid", content: "Combine CF and content‑based to overcome cold start (new users/items) and improve accuracy." },
                  { title: "Evaluation", content: "**Precision@k**, **Recall@k**, **NDCG** (ranking). Also A/B testing." },
                ],
              },
              {
                title: "Design an A/B Testing Platform",
                slug: "ab-testing",
                shortDescription: "Experiment design, hypothesis testing, sample size calculation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "A/B Testing", content: "Randomised controlled experiment: split users into control (A) and treatment (B). Measure a metric (conversion rate, engagement)." },
                  { title: "Hypothesis", content: "H₀: no difference; H₁: difference. Choose significance level (α = 0.05) and power (1‑β = 0.8)." },
                  { title: "Sample Size", content: "Depends on effect size (minimum detectable difference), variance, α, and power. Use power analysis." },
                  { title: "Analysing Results", content: "Use t‑test (continuous) or chi‑squared (binary). Watch for peeking (don't stop early). Report confidence intervals." },
                ],
              },
              {
                title: "Design a Fraud Detection System",
                slug: "fraud-detection",
                shortDescription: "Imbalanced classification, real‑time scoring, and explainability.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Problem", content: "Identify fraudulent transactions from large‑scale financial data. Usually rare (imbalanced)." },
                  { title: "Model Approach", content: "Use XGBoost or Random Forest with class weights. Consider anomaly detection (Isolation Forest)." },
                  { title: "Real‑time Scoring", content: "Use a fast inference service (e.g., TensorFlow Serving) and feature store. Latency must be low (<100ms)." },
                  { title: "Explainability", content: "Use SHAP to explain why a transaction was flagged. Important for compliance and customer trust." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ Data Science category seeded (ultra‑detailed)");
}

async function main() {
  await seedDataScienceCategory();
}

main()
  .catch((error) => {
    console.error("Data Science seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });