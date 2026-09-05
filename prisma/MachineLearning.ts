// ---- 200+ Machine Learning Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["Machine Learning", "Machine Learning"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["Machine Learning", "What is Machine Learning and what are its main types?", "ml-overview", "Define ML and list its types.", "Machine Learning is a subset of AI that enables systems to learn from data without explicit programming. Main types: Supervised Learning (labeled data), Unsupervised Learning (unlabeled data), Reinforcement Learning (reward-based learning)."],
  ["Machine Learning", "What is the difference between supervised and unsupervised learning?", "supervised-vs-unsupervised", "Compare the two.", "Supervised learning uses labeled data to predict outcomes (classification/regression). Unsupervised learning finds hidden patterns in unlabeled data (clustering/dimensionality reduction)."],
  ["Machine Learning", "What is reinforcement learning?", "reinforcement-learning", "Explain RL.", "Reinforcement learning is about agents learning to make decisions by taking actions in an environment to maximize cumulative reward. Uses rewards and punishments."],
  ["Machine Learning", "What is the difference between classification and regression?", "classification-vs-regression", "Compare the two.", "Classification predicts discrete labels (e.g., spam/not spam). Regression predicts continuous values (e.g., house price)."],
  ["Machine Learning", "What is overfitting and how do you prevent it?", "overfitting", "Explain overfitting.", "Overfitting occurs when a model learns noise in training data, performing well on train but poorly on test. Prevention: cross-validation, regularization (L1/L2), pruning, more data, simpler models."],
  ["Machine Learning", "What is underfitting and how do you address it?", "underfitting", "Explain underfitting.", "Underfitting occurs when a model is too simple to capture the underlying pattern. Address by using more complex models, adding features, reducing regularization."],
  ["Machine Learning", "What is the bias-variance tradeoff?", "bias-variance", "Explain the tradeoff.", "Bias is error due to overly simplistic assumptions; variance is error due to sensitivity to training data. Tradeoff: high bias -> underfitting; high variance -> overfitting. Aim for optimal balance."],
  ["Machine Learning", "What is cross-validation and why is it important?", "cross-validation", "Explain CV.", "Cross-validation splits data into folds, trains on some and validates on others, rotating. K-fold CV averages performance, reducing variance and overfitting."],
  ["Machine Learning", "What is a confusion matrix?", "confusion-matrix", "Explain confusion matrix.", "A table showing true positives, false positives, true negatives, false negatives. Used to evaluate classification performance."],
  ["Machine Learning", "What are precision and recall?", "precision-recall", "Define precision and recall.", "Precision = TP/(TP+FP), measures accuracy of positive predictions. Recall = TP/(TP+FN), measures ability to find all positive instances. Tradeoff."],
  ["Machine Learning", "What is the F1 score?", "f1-score", "Explain F1 score.", "F1 is the harmonic mean of precision and recall: 2*(precision*recall)/(precision+recall). Useful for imbalanced datasets."],
  ["Machine Learning", "What is the ROC curve and AUC?", "roc-auc", "Explain ROC and AUC.", "ROC plots TPR vs FPR at various thresholds. AUC (Area Under Curve) measures overall performance; higher AUC means better discrimination."],
  ["Machine Learning", "What is feature engineering?", "feature-engineering", "Explain feature engineering.", "Feature engineering is the process of creating new features from raw data to improve model performance. Includes scaling, encoding, interaction terms, and domain-specific transformations."],
  ["Machine Learning", "What is feature selection and why is it important?", "feature-selection", "Explain feature selection.", "Feature selection selects a subset of relevant features to reduce dimensionality, improve accuracy, and reduce overfitting. Methods: filter, wrapper, embedded."],
  ["Machine Learning", "What is regularization?", "regularization", "Explain regularization.", "Regularization adds a penalty to the loss function to discourage complex models. L1 (Lasso) leads to sparse weights; L2 (Ridge) shrinks weights."],
  ["Machine Learning", "What are hyperparameters?", "hyperparameters", "Define hyperparameters.", "Hyperparameters are settings that are not learned from data, but set before training (e.g., learning rate, number of trees, regularization strength)."],
  ["Machine Learning", "What is the difference between a parameter and a hyperparameter?", "param-vs-hyperparam", "Compare the two.", "Parameters are learned from data (e.g., weights in linear regression). Hyperparameters are set by the practitioner and control the learning process."],
  ["Machine Learning", "What is the training set, validation set, and test set?", "train-val-test", "Explain data splits.", "Training set: used to train the model. Validation set: used to tune hyperparameters and select models. Test set: used for final evaluation, unseen during training."],
  ["Machine Learning", "What is the curse of dimensionality?", "curse-of-dimensionality", "Explain the curse.", "As dimensions increase, data becomes sparse, making it hard to find patterns. Models need exponentially more data to generalize. Use dimensionality reduction."],
  ["Machine Learning", "What is the difference between generative and discriminative models?", "generative-vs-discriminative", "Compare model types.", "Generative models learn joint probability P(X,Y) and can generate new samples (e.g., Naive Bayes, GANs). Discriminative models learn P(Y|X) for classification (e.g., SVM, logistic regression)."],

  // ==================== ALGORITHMS (30) ====================
  ["Machine Learning", "What is linear regression?", "linear-regression", "Explain linear regression.", "Linear regression models the relationship between input features and a continuous target using a linear equation. Minimizes sum of squared errors."],
  ["Machine Learning", "What is logistic regression?", "logistic-regression", "Explain logistic regression.", "Logistic regression is a classification algorithm that models the probability of a binary outcome using a sigmoid function. It outputs probabilities."],
  ["Machine Learning", "What is the difference between linear regression and logistic regression?", "linear-vs-logistic", "Compare the two.", "Linear regression predicts continuous values; logistic regression predicts binary outcomes. Logistic uses sigmoid and cross-entropy loss."],
  ["Machine Learning", "What is a decision tree?", "decision-tree", "Explain decision trees.", "Decision trees split data based on feature values, creating a tree-like model. They are easy to interpret but prone to overfitting."],
  ["Machine Learning", "What is entropy and information gain?", "entropy-gain", "Explain entropy and gain.", "Entropy measures impurity of a node. Information gain is the reduction in entropy after a split. Used in decision tree splitting criteria."],
  ["Machine Learning", "What is the Gini index?", "gini-index", "Explain Gini index.", "Gini index measures impurity (probability of misclassification). Used in CART trees. Lower Gini means purer node."],
  ["Machine Learning", "What is a random forest?", "random-forest", "Explain random forest.", "Random forest is an ensemble of decision trees, each trained on a bootstrapped sample and random feature subset. It reduces overfitting and improves accuracy."],
  ["Machine Learning", "What is gradient boosting?", "gradient-boosting", "Explain gradient boosting.", "Gradient boosting builds trees sequentially, each correcting errors of the previous. It minimizes a loss function using gradient descent. Examples: XGBoost, LightGBM."],
  ["Machine Learning", "What is the difference between bagging and boosting?", "bagging-vs-boosting", "Compare ensemble methods.", "Bagging (e.g., Random Forest) trains models in parallel and averages predictions to reduce variance. Boosting (e.g., AdaBoost) trains sequentially, each model focuses on previous errors to reduce bias."],
  ["Machine Learning", "What is a support vector machine (SVM)?", "svm", "Explain SVM.", "SVM finds the hyperplane that maximally separates classes. Uses kernel trick to handle non-linear data by mapping to higher dimensions."],
  ["Machine Learning", "What is the kernel trick in SVM?", "kernel-trick", "Explain kernel trick.", "The kernel trick allows SVM to operate in a high-dimensional feature space without explicitly computing the transformation, enabling non-linear classification."],
  ["Machine Learning", "What is k-nearest neighbors (KNN)?", "knn", "Explain KNN.", "KNN is a lazy learning algorithm that classifies a point based on the majority class of its k nearest neighbors. No training, just distance computation."],
  ["Machine Learning", "What is Naive Bayes?", "naive-bayes", "Explain Naive Bayes.", "Naive Bayes is a probabilistic classifier based on Bayes' theorem with the independence assumption between features. Fast and effective for text classification."],
  ["Machine Learning", "What is PCA (Principal Component Analysis)?", "pca", "Explain PCA.", "PCA is a dimensionality reduction technique that transforms data to a new coordinate system, capturing the directions of maximum variance. Used for compression and visualization."],
  ["Machine Learning", "What is LDA (Linear Discriminant Analysis)?", "lda", "Explain LDA.", "LDA is a supervised dimensionality reduction technique that maximizes class separability. Often used for classification and reducing dimensions."],
  ["Machine Learning", "What is clustering and what are common algorithms?", "clustering", "Explain clustering.", "Clustering groups similar data points. Algorithms: K-means, Hierarchical clustering, DBSCAN, Gaussian Mixture Models."],
  ["Machine Learning", "What is K-means clustering?", "kmeans", "Explain K-means.", "K-means partitions data into k clusters by minimizing within-cluster variance. Steps: initialize centroids, assign points, update centroids, repeat."],
  ["Machine Learning", "How do you choose the number of clusters (k) in K-means?", "choose-k", "Explain elbow method.", "Use the elbow method: plot within-cluster sum of squares vs k and look for the 'elbow' point. Also use silhouette score."],
  ["Machine Learning", "What is DBSCAN?", "dbscan", "Explain DBSCAN.", "DBSCAN is a density-based clustering algorithm that groups points in high-density regions and marks low-density points as outliers. It can find arbitrary shapes."],
  ["Machine Learning", "What is hierarchical clustering?", "hierarchical-clustering", "Explain hierarchical clustering.", "Hierarchical clustering builds a dendrogram by iteratively merging or splitting clusters. Agglomerative (bottom-up) and divisive (top-down)."],
  ["Machine Learning", "What is the difference between K-means and hierarchical clustering?", "kmeans-vs-hierarchical", "Compare the two.", "K-means requires pre-specifying k and is sensitive to initializations. Hierarchical does not need k, but is slower and produces a dendrogram."],
  ["Machine Learning", "What is a neural network?", "neural-network", "Explain neural networks.", "A neural network is a computational model composed of layers of interconnected neurons (nodes). It learns patterns through forward propagation and backpropagation."],
  ["Machine Learning", "What is activation function and why is it used?", "activation-function", "Explain activation functions.", "Activation functions introduce non-linearity, enabling neural networks to learn complex patterns. Examples: ReLU, sigmoid, tanh, softmax."],
  ["Machine Learning", "What is backpropagation?", "backpropagation", "Explain backpropagation.", "Backpropagation is an algorithm for training neural networks. It computes gradients of the loss with respect to weights using the chain rule and updates weights via gradient descent."],
  ["Machine Learning", "What is gradient descent?", "gradient-descent", "Explain gradient descent.", "Gradient descent is an optimization algorithm that updates model parameters in the direction of the negative gradient of the loss function. Variants: batch, stochastic, mini-batch."],
  ["Machine Learning", "What is the difference between stochastic gradient descent (SGD) and batch gradient descent?", "sgd-vs-batch", "Compare GD types.", "Batch GD uses the entire dataset to compute gradients; SGD uses one sample per update; mini-batch uses a small batch. SGD is faster, but noisier."],
  ["Machine Learning", "What is the learning rate and how does it affect training?", "learning-rate", "Explain learning rate.", "Learning rate controls step size in gradient descent. Too high: overshoots; too low: slow convergence. Use learning rate scheduling."],
  ["Machine Learning", "What is the loss function?", "loss-function", "Explain loss function.", "A loss function measures how far the model's predictions are from the true values. Examples: MSE (regression), cross-entropy (classification)."],
  ["Machine Learning", "What is regularization in neural networks?", "nn-regularization", "Explain regularization techniques.", "Regularization prevents overfitting: L1/L2 weight decay, dropout (randomly dropping neurons), batch normalization, early stopping."],
  ["Machine Learning", "What is dropout?", "dropout", "Explain dropout.", "Dropout randomly sets a fraction of neurons to zero during training, preventing co-adaptation and acting as ensemble regularization."],

  // ==================== DATA PREPROCESSING (15) ====================
  ["Machine Learning", "What are the steps in data preprocessing?", "preprocessing-steps", "List preprocessing steps.", "Data cleaning (missing values, outliers), data transformation (scaling, encoding), feature engineering, and data splitting."],
  ["Machine Learning", "How do you handle missing values?", "missing-values", "Explain handling missing data.", "Options: remove rows/columns, impute with mean/median/mode, use predictive imputation, or use algorithms that handle missing values (e.g., XGBoost)."],
  ["Machine Learning", "What is data normalization and standardization?", "normalization-standardization", "Explain scaling techniques.", "Normalization (min-max scaling) scales to [0,1]. Standardization centers to mean 0, standard deviation 1. Used for algorithms sensitive to scale."],
  ["Machine Learning", "What is one-hot encoding?", "one-hot-encoding", "Explain one-hot encoding.", "One-hot encoding converts categorical variables to binary vectors. Creates a new column for each category, with 1 for presence, 0 otherwise."],
  ["Machine Learning", "What is label encoding?", "label-encoding", "Explain label encoding.", "Label encoding assigns a unique integer to each category. Suitable for ordinal data, but can imply ordinal relationships for nominal data."],
  ["Machine Learning", "What is the difference between one-hot encoding and label encoding?", "one-hot-vs-label", "Compare encodings.", "One-hot creates binary columns; label encoding assigns integers. One-hot is better for nominal categories; label encoding for ordinal."],
  ["Machine Learning", "What is feature scaling and why is it important?", "feature-scaling", "Explain scaling.", "Feature scaling standardizes feature ranges to prevent dominance of large-scale features. Important for gradient-based algorithms and distance-based models."],
  ["Machine Learning", "What are outliers and how do you detect them?", "outliers", "Explain outliers.", "Outliers are extreme values that deviate from other observations. Detection: Z-score, IQR, visual methods (box plots). Treatment: remove, cap, or transform."],
  ["Machine Learning", "What is data augmentation?", "data-augmentation", "Explain data augmentation.", "Data augmentation artificially increases training data by applying transformations (e.g., rotation, flipping for images). Improves generalization."],
  ["Machine Learning", "What is the difference between imputation and interpolation?", "imputation-vs-interpolation", "Compare missing data methods.", "Imputation fills missing values (e.g., mean). Interpolation estimates missing values within a sequence (e.g., time series)."],
  ["Machine Learning", "What is data imbalance and how do you handle it?", "data-imbalance", "Explain class imbalance.", "Imbalanced data has skewed class distribution. Techniques: resampling (oversample minority, undersample majority), SMOTE, class weights, using appropriate metrics (F1, AUC)."],
  ["Machine Learning", "What is dimensionality reduction?", "dimensionality-reduction", "Explain dimensionality reduction.", "Dimensionality reduction reduces the number of features to avoid curse of dimensionality, remove noise, and speed up training. Methods: PCA, t-SNE, LDA."],
  ["Machine Learning", "What is the difference between PCA and t-SNE?", "pca-vs-tsne", "Compare dimensionality reduction methods.", "PCA is linear and focuses on variance; t-SNE is non-linear and focuses on preserving local structure, great for visualization but not for feature extraction."],
  ["Machine Learning", "What is feature normalization vs feature standardization?", "norm-vs-std", "Compare scaling methods.", "Normalization scales to a fixed range (e.g., [0,1]); standardization transforms to zero mean and unit variance. Choose based on algorithm."],
  ["Machine Learning", "How do you handle categorical features in machine learning?", "categorical-features", "Explain handling.", "Encode using one-hot, label encoding, or target encoding. For high cardinality, use embedding or frequency encoding."],

  // ==================== MODEL EVALUATION (15) ====================
  ["Machine Learning", "What are the common evaluation metrics for classification?", "classification-metrics", "List metrics.", "Accuracy, precision, recall, F1-score, AUC-ROC, log-loss, confusion matrix. Choose based on problem (imbalanced vs balanced)."],
  ["Machine Learning", "What are the common evaluation metrics for regression?", "regression-metrics", "List metrics.", "MSE, RMSE, MAE, R-squared (coefficient of determination). MSE penalizes large errors; MAE is robust to outliers."],
  ["Machine Learning", "What is R-squared and how is it interpreted?", "r-squared", "Explain R².", "R² measures the proportion of variance explained by the model. Ranges from 0 to 1; higher means better fit. Adjusted R² accounts for number of predictors."],
  ["Machine Learning", "What is the difference between MSE and MAE?", "mse-vs-mae", "Compare regression metrics.", "MSE squares errors, heavily penalizing large errors. MAE uses absolute errors, more robust to outliers."],
  ["Machine Learning", "What is cross-entropy loss?", "cross-entropy", "Explain cross-entropy.", "Cross-entropy loss is used for classification, measuring the difference between predicted probabilities and true labels. Lower is better."],
  ["Machine Learning", "What is the ROC curve used for?", "roc-curve", "Explain ROC.", "ROC curve plots TPR vs FPR across thresholds. It helps choose a threshold and evaluate model performance independent of class distribution."],
  ["Machine Learning", "What is the area under the ROC curve (AUC)?", "auc", "Explain AUC.", "AUC measures the model's ability to distinguish between classes. AUC=0.5 is random; AUC=1 is perfect. Higher is better."],
  ["Machine Learning", "What is a learning curve?", "learning-curve", "Explain learning curve.", "Learning curve plots training and validation error as a function of training set size. It helps diagnose bias/variance and underfitting/overfitting."],
  ["Machine Learning", "What is the difference between validation and test set?", "validation-vs-test", "Compare validation and test.", "Validation set is used for hyperparameter tuning and model selection; test set is used for final unbiased evaluation."],
  ["Machine Learning", "What is stratified k-fold cross-validation?", "stratified-kfold", "Explain stratified CV.", "Stratified k-fold ensures each fold has the same class distribution as the whole dataset, especially useful for imbalanced data."],
  ["Machine Learning", "What is grid search and random search?", "grid-random-search", "Explain hyperparameter tuning methods.", "Grid search exhaustively searches a predefined grid of hyperparameters. Random search samples randomly, often more efficient for high-dimensional spaces."],
  ["Machine Learning", "What is Bayesian optimization?", "bayesian-optimization", "Explain Bayesian optimization.", "Bayesian optimization builds a probabilistic model of the objective function and uses it to select the next hyperparameters, more efficient than grid/random."],
  ["Machine Learning", "What is the Kolmogorov-Smirnov (KS) statistic?", "ks-statistic", "Explain KS.", "KS measures the separation between positive and negative distributions. Used in credit scoring to evaluate model discrimination."],
  ["Machine Learning", "What is the Matthews correlation coefficient (MCC)?", "mcc", "Explain MCC.", "MCC is a balanced measure of binary classification quality, ranging from -1 to +1. It considers all four confusion matrix categories."],
  ["Machine Learning", "What is the F-beta score?", "f-beta", "Explain F-beta.", "F-beta is a weighted harmonic mean of precision and recall, where beta weights recall higher than precision (beta>1)."],

  // ==================== DEEP LEARNING (20) ====================
  ["Machine Learning", "What is deep learning and how does it differ from traditional ML?", "deep-learning-overview", "Explain deep learning.", "Deep learning uses neural networks with many layers (deep architectures) to automatically learn hierarchical features. It excels with large data, unlike traditional ML that requires feature engineering."],
  ["Machine Learning", "What is a convolutional neural network (CNN)?", "cnn", "Explain CNN.", "CNN is a neural network specialized for grid-like data (images). It uses convolutional layers, pooling, and fully connected layers. It captures spatial hierarchies."],
  ["Machine Learning", "What are the components of a CNN?", "cnn-components", "List CNN components.", "Convolutional layer (applies filters), pooling layer (downsampling), activation (ReLU), fully connected layer, and output layer."],
  ["Machine Learning", "What is a recurrent neural network (RNN)?", "rnn", "Explain RNN.", "RNNs are designed for sequential data (time series, text). They have recurrent connections that allow memory of previous inputs."],
  ["Machine Learning", "What is the vanishing gradient problem?", "vanishing-gradient", "Explain vanishing gradient.", "In deep networks, gradients become very small in early layers, preventing learning. Mitigated by ReLU, batch normalization, and residual connections."],
  ["Machine Learning", "What is LSTM and how does it solve the vanishing gradient problem?", "lstm", "Explain LSTM.", "LSTM (Long Short-Term Memory) is a type of RNN with gated units (input, forget, output) that control information flow, allowing long-term memory."],
  ["Machine Learning", "What is the difference between GRU and LSTM?", "gru-vs-lstm", "Compare GRU and LSTM.", "GRU has fewer gates (reset and update), is simpler and faster. LSTM has more gates and can capture longer dependencies. Both solve vanishing gradient."],
  ["Machine Learning", "What is transfer learning?", "transfer-learning", "Explain transfer learning.", "Transfer learning reuses a pre-trained model on a new but related task, reducing training time and data requirements. Common in computer vision (e.g., ImageNet models)."],
  ["Machine Learning", "What is fine-tuning in deep learning?", "fine-tuning", "Explain fine-tuning.", "Fine-tuning involves taking a pre-trained model and continuing training on a new dataset, often with a lower learning rate. It adapts the model to new task."],
  ["Machine Learning", "What is an autoencoder?", "autoencoder", "Explain autoencoder.", "Autoencoder is a neural network that learns to compress data (encode) and reconstruct it (decode). Used for dimensionality reduction, denoising, and anomaly detection."],
  ["Machine Learning", "What is a generative adversarial network (GAN)?", "gan", "Explain GAN.", "GANs consist of a generator and discriminator competing: generator creates fake samples, discriminator tries to distinguish real from fake. They produce realistic data (images, text)."],
  ["Machine Learning", "What is the difference between GAN and VAE?", "gan-vs-vae", "Compare generative models.", "GANs produce sharp, realistic samples but can be unstable. VAEs (Variational Autoencoders) are more stable but produce blurrier samples. Both are generative."],
  ["Machine Learning", "What is batch normalization?", "batch-norm", "Explain batch normalization.", "Batch normalization normalizes the inputs of each layer to have zero mean and unit variance. It speeds up training, reduces internal covariate shift, and acts as regularization."],
  ["Machine Learning", "What is dropout in neural networks?", "dropout-nn", "Explain dropout.", "Dropout randomly sets a fraction of neurons to zero during training, preventing co-adaptation and overfitting. It acts as ensemble of sub-networks."],
  ["Machine Learning", "What is data augmentation in deep learning?", "data-augmentation-dl", "Explain data augmentation.", "Data augmentation applies random transformations (rotation, flipping, cropping) to training images to increase diversity and improve generalization."],
  ["Machine Learning", "What is the Adam optimizer?", "adam", "Explain Adam.", "Adam is an adaptive learning rate optimizer combining momentum and RMSprop. It adapts learning rates per parameter, often performing well in practice."],
  ["Machine Learning", "What is learning rate scheduling?", "lr-scheduling", "Explain LR scheduling.", "Learning rate scheduling decreases the learning rate over time (step decay, exponential decay, or using cyclic schedules like cosine annealing) to improve convergence."],
  ["Machine Learning", "What is weight initialization and why is it important?", "weight-init", "Explain weight initialization.", "Proper weight initialization (Xavier, He) ensures gradients don't vanish/explode. It sets initial weights to appropriate scales for stable training."],
  ["Machine Learning", "What is a residual network (ResNet)?", "resnet", "Explain ResNet.", "ResNet uses skip connections that add the input of a layer to its output. This allows training very deep networks by alleviating vanishing gradients."],
  ["Machine Learning", "What is the attention mechanism?", "attention", "Explain attention.", "Attention allows models to focus on relevant parts of the input, used in transformers and NLP. It computes weighted sums of values based on query-key similarity."],

  // ==================== NLP & TEXT (15) ====================
  ["Machine Learning", "What is Natural Language Processing (NLP)?", "nlp-overview", "Define NLP.", "NLP is a field of AI that deals with understanding and generating human language. Tasks: sentiment analysis, machine translation, chatbots, summarization."],
  ["Machine Learning", "What are the common steps in text preprocessing?", "text-preprocessing", "List text preprocessing steps.", "Tokenization, stopword removal, stemming/lemmatization, lowercasing, punctuation removal, and vectorization (TF-IDF, word embeddings)."],
  ["Machine Learning", "What is tokenization?", "tokenization", "Explain tokenization.", "Tokenization splits text into words, subwords, or characters. It is the first step in NLP preprocessing."],
  ["Machine Learning", "What is the difference between stemming and lemmatization?", "stemming-vs-lemmatization", "Compare stem and lemma.", "Stemming reduces words to their root (e.g., 'running' -> 'run'), often crude. Lemmatization uses vocabulary to return the base form (e.g., 'better' -> 'good'), more accurate."],
  ["Machine Learning", "What is TF-IDF?", "tf-idf", "Explain TF-IDF.", "TF-IDF (Term Frequency-Inverse Document Frequency) is a numerical statistic reflecting word importance. It weights frequent words less and rare words more."],
  ["Machine Learning", "What is word embedding?", "word-embedding", "Explain word embeddings.", "Word embeddings are dense vector representations of words that capture semantic meaning. Examples: Word2Vec, GloVe, FastText."],
  ["Machine Learning", "What is Word2Vec and how does it work?", "word2vec", "Explain Word2Vec.", "Word2Vec is a neural network-based method to create word embeddings. It uses either Skip-gram (predict context from word) or CBOW (predict word from context)."],
  ["Machine Learning", "What is the difference between Word2Vec and GloVe?", "word2vec-vs-glove", "Compare embedding methods.", "Word2Vec predicts context using local windows; GloVe uses global co-occurrence statistics. Both produce useful embeddings."],
  ["Machine Learning", "What is the Transformer architecture?", "transformer", "Explain Transformer.", "Transformer is a deep learning model that uses self-attention mechanisms to process sequences. It forms the basis of BERT, GPT, and other state-of-the-art models."],
  ["Machine Learning", "What is BERT and how does it work?", "bert", "Explain BERT.", "BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained transformer that reads text bidirectionally. It is fine-tuned for various NLP tasks."],
  ["Machine Learning", "What is the difference between BERT and GPT?", "bert-vs-gpt", "Compare BERT and GPT.", "BERT is bidirectional (encoder), good for understanding tasks. GPT is unidirectional (decoder), good for generation. Both are transformers."],
  ["Machine Learning", "What is the attention mechanism in transformers?", "attention-transformer", "Explain self-attention.", "Self-attention computes a weighted sum of all positions in a sequence, allowing the model to focus on relevant parts. It is the core of transformers."],
  ["Machine Learning", "What is an LLM (Large Language Model)?", "llm", "Explain LLM.", "Large Language Models are massive models trained on vast text corpora, capable of general language understanding and generation. Examples: GPT-4, Llama, Gemini."],
  ["Machine Learning", "What is fine-tuning of LLMs?", "llm-finetuning", "Explain fine-tuning.", "Fine-tuning adapts a pre-trained LLM to a specific downstream task by training on task-specific data. It is efficient and improves performance."],
  ["Machine Learning", "What are the challenges in NLP?", "nlp-challenges", "List NLP challenges.", "Ambiguity, context understanding, sarcasm, multilingualism, bias, lack of labelled data, and computational cost."],

  // ==================== ENSEMBLE METHODS (10) ====================
  ["Machine Learning", "What are ensemble methods?", "ensemble-methods", "Define ensemble methods.", "Ensemble methods combine multiple models to improve performance over individual models. Types: bagging, boosting, stacking."],
  ["Machine Learning", "What is random forest and how does it work?", "random-forest-detail", "Explain random forest.", "Random forest is an ensemble of decision trees. Each tree is trained on a bootstrapped sample and random feature subset. Predictions are averaged (regression) or majority vote (classification)."],
  ["Machine Learning", "What is XGBoost?", "xgboost", "Explain XGBoost.", "XGBoost is an optimized gradient boosting library that uses parallel processing, regularization, and tree pruning. It is popular for structured data."],
  ["Machine Learning", "What is LightGBM?", "lightgbm", "Explain LightGBM.", "LightGBM is a gradient boosting framework that uses leaf-wise tree growth, making it faster and more memory-efficient than XGBoost, especially for large datasets."],
  ["Machine Learning", "What is CatBoost?", "catboost", "Explain CatBoost.", "CatBoost is a gradient boosting algorithm that handles categorical features natively with minimal preprocessing. It uses symmetric trees."],
  ["Machine Learning", "What is the difference between XGBoost, LightGBM, and CatBoost?", "boost-comparison", "Compare boosting libraries.", "XGBoost: traditional gradient boosting; LightGBM: leaf-wise growth, faster; CatBoost: handles categorical features, less tuning."],
  ["Machine Learning", "What is stacking?", "stacking", "Explain stacking.", "Stacking combines multiple models by training a meta-model (stacker) on the predictions of base models. It often improves performance."],
  ["Machine Learning", "What is the difference between voting and averaging?", "voting-vs-averaging", "Compare ensemble aggregation.", "Voting (classification) takes majority class. Averaging (regression) takes mean of predictions. Both are simple ensemble methods."],
  ["Machine Learning", "What is a weak learner?", "weak-learner", "Explain weak learner.", "A weak learner is a model that is slightly better than random (e.g., shallow decision tree). Boosting uses weak learners sequentially."],
  ["Machine Learning", "What is early stopping in boosting?", "early-stopping", "Explain early stopping.", "Early stopping stops adding more trees when validation performance stops improving. Prevents overfitting and reduces training time."],

  // ==================== UNSUPERVISED LEARNING (10) ====================
  ["Machine Learning", "What is clustering and what is it used for?", "clustering-usage", "Explain clustering applications.", "Clustering is used for customer segmentation, anomaly detection, document grouping, image compression, and exploratory data analysis."],
  ["Machine Learning", "What is the difference between hard and soft clustering?", "hard-vs-soft-clustering", "Compare clustering types.", "Hard clustering assigns each point to exactly one cluster (e.g., K-means). Soft clustering gives a probability of belonging to each cluster (e.g., Gaussian Mixture Models)."],
  ["Machine Learning", "What is a Gaussian Mixture Model (GMM)?", "gmm", "Explain GMM.", "GMM is a probabilistic clustering model that assumes data is generated from a mixture of Gaussian distributions. It uses expectation-maximization (EM) to estimate parameters."],
  ["Machine Learning", "What is the EM algorithm?", "em-algorithm", "Explain EM.", "EM (Expectation-Maximization) is an iterative algorithm for maximum likelihood estimation in models with latent variables. E-step: estimate latent variables; M-step: maximize likelihood."],
  ["Machine Learning", "What is dimensionality reduction for visualization?", "dimensionality-reduction-viz", "Explain visualization.", "Techniques like t-SNE, UMAP, and PCA are used to project high-dimensional data to 2D or 3D for visualization while preserving structure."],
  ["Machine Learning", "What is t-SNE?", "tsne", "Explain t-SNE.", "t-SNE is a non-linear dimensionality reduction technique that preserves local structure, making it great for visualizing high-dimensional data in 2D."],
  ["Machine Learning", "What is UMAP?", "umap", "Explain UMAP.", "UMAP (Uniform Manifold Approximation and Projection) is a fast, non-linear dimensionality reduction method that preserves both local and global structure."],
  ["Machine Learning", "What is anomaly detection?", "anomaly-detection", "Explain anomaly detection.", "Anomaly detection identifies rare items or events that deviate from the majority. Used in fraud detection, network security, and quality control."],
  ["Machine Learning", "What are isolation forests?", "isolation-forest", "Explain isolation forest.", "Isolation forest is an anomaly detection algorithm that isolates anomalies by randomly selecting features and splitting values. Anomalies are easier to isolate."],
  ["Machine Learning", "What is the difference between clustering and classification?", "clustering-vs-classification", "Compare unsupervised vs supervised.", "Clustering is unsupervised (no labels) and discovers groups. Classification is supervised (labeled) and predicts labels."],

  // ==================== PRACTICAL & DEPLOYMENT (10) ====================
  ["Machine Learning", "What is MLOps?", "mlops", "Explain MLOps.", "MLOps is a set of practices for deploying, managing, and monitoring ML models in production. It covers CI/CD, model versioning, monitoring, and scaling."],
  ["Machine Learning", "What is the difference between batch and online learning?", "batch-vs-online", "Compare learning modes.", "Batch learning trains on the entire dataset at once. Online learning updates the model incrementally as new data arrives (e.g., SGD)."],
  ["Machine Learning", "What is model drift and how do you detect it?", "model-drift", "Explain model drift.", "Model drift occurs when the data distribution changes, degrading model performance. Detect by monitoring prediction accuracy and feature distributions over time."],
  ["Machine Learning", "What is feature store?", "feature-store", "Explain feature store.", "A feature store is a centralized repository for storing, sharing, and serving features for ML models. It ensures consistency between training and inference."],
  ["Machine Learning", "What is the difference between training and inference?", "training-vs-inference", "Compare training and inference.", "Training is the process of learning model parameters from data. Inference is using the trained model to make predictions on new data."],
  ["Machine Learning", "What are the challenges in deploying ML models?", "deployment-challenges", "List deployment challenges.", "Model versioning, API latency, monitoring, data drift, security, scalability, and integration with existing systems."],
  ["Machine Learning", "What is A/B testing in ML?", "ab-testing", "Explain A/B testing.", "A/B testing compares two model versions by splitting traffic. It measures performance on live data to decide which model to deploy."],
  ["Machine Learning", "What is a model registry?", "model-registry", "Explain model registry.", "A model registry is a centralized system for storing and managing model artifacts, including versioning, metadata, and staging."],
  ["Machine Learning", "What is the difference between scikit-learn and TensorFlow?", "sklearn-vs-tf", "Compare libraries.", "scikit-learn is for traditional ML (linear models, trees, clustering). TensorFlow is for deep learning with neural networks. Scikit-learn is easier for prototyping."],
  ["Machine Learning", "What is ONNX?", "onnx", "Explain ONNX.", "ONNX (Open Neural Network Exchange) is an open format for representing ML models, enabling interoperability between frameworks (PyTorch, TensorFlow, etc.)."],

  // ==================== ETHICS & FAIRNESS (10) ====================
  ["Machine Learning", "What is bias in machine learning?", "ml-bias", "Explain bias.", "Bias in ML refers to systematic errors that lead to unfair outcomes, often due to biased training data or algorithmic design. It can perpetuate discrimination."],
  ["Machine Learning", "What is fairness in ML?", "fairness", "Explain fairness.", "Fairness ensures that ML models do not discriminate against certain groups. Metrics include demographic parity, equal opportunity, and equalized odds."],
  ["Machine Learning", "What is the difference between equality and equity in ML?", "equality-vs-equity", "Compare fairness concepts.", "Equality treats everyone the same; equity accounts for different needs to achieve fair outcomes. In ML, fairness often requires adjusting for disparities."],
  ["Machine Learning", "What is interpretable AI?", "interpretable-ai", "Explain interpretability.", "Interpretable AI builds models that humans can understand, providing explanations for predictions. Methods: LIME, SHAP, decision trees."],
  ["Machine Learning", "What is SHAP?", "shap", "Explain SHAP.", "SHAP (SHapley Additive exPlanations) is a game-theoretic approach to explain model predictions by attributing importance to each feature."],
  ["Machine Learning", "What is LIME?", "lime", "Explain LIME.", "LIME (Local Interpretable Model-agnostic Explanations) explains individual predictions by approximating the model locally with an interpretable model."],
  ["Machine Learning", "What is the difference between explainability and interpretability?", "explainability-vs-interpretability", "Compare the two.", "Interpretability is the degree to which a human can understand the model; explainability is the ability to explain model decisions in human terms."],
  ["Machine Learning", "What is differential privacy?", "differential-privacy", "Explain differential privacy.", "Differential privacy adds noise to data or queries to protect individual privacy, ensuring that the output does not reveal too much about any single record."],
  ["Machine Learning", "What is federated learning?", "federated-learning", "Explain federated learning.", "Federated learning trains models on decentralized data (e.g., on user devices) without sharing raw data, preserving privacy."],
  ["Machine Learning", "What are the ethical considerations in ML?", "ml-ethics", "List ethical concerns.", "Bias and fairness, privacy, transparency, accountability, job displacement, and misuse (e.g., deepfakes, surveillance)."],

  // ==================== SCENARIO-BASED (20) ====================
  ["Machine Learning", "How would you build a spam detection model?", "spam-detection", "Explain spam model.", "Collect labeled emails. Preprocess text (tokenization, TF-IDF). Use Naive Bayes or logistic regression. Evaluate with precision/recall. Deploy as API."],
  ["Machine Learning", "How would you predict house prices?", "house-price-prediction", "Explain housing model.", "Use regression (linear, random forest). Features: location, size, rooms, age. Preprocess: scale numeric, encode categorical. Evaluate with RMSE."],
  ["Machine Learning", "How would you build a recommendation system?", "recommendation-system", "Explain recommendation.", "Use collaborative filtering (user-item interactions) or content-based (item features). For large scale, use matrix factorization or neural networks. Evaluate with RMSE or precision@k."],
  ["Machine Learning", "How would you detect credit card fraud?", "fraud-detection", "Explain fraud detection.", "Use anomaly detection or supervised classification. Imbalanced data: use SMOTE, cost-sensitive learning. Models: Random Forest, XGBoost. Monitor with ROC-AUC."],
  ["Machine Learning", "How would you build a chatbot?", "chatbot", "Explain chatbot.", "Use sequence-to-sequence models (Transformers) with attention. Train on dialogue data. Use retrieval-based (IR) or generative (LLM). Integrate with NLU."],
  ["Machine Learning", "How would you handle missing data in a large dataset?", "missing-data-large", "Explain handling missing data.", "Impute with median/mode for small proportion. For large missing, use predictive imputation or drop. Use XGBoost as it handles missing values natively."],
  ["Machine Learning", "How would you select features for a high-dimensional dataset?", "feature-selection-scenario", "Explain feature selection.", "Use correlation analysis, mutual information, or model-based selection (e.g., Lasso). For extremely high dimensions, use PCA first."],
  ["Machine Learning", "How would you evaluate a model with imbalanced data?", "imbalanced-evaluation", "Explain evaluation.", "Use precision, recall, F1, and AUC-ROC (not accuracy). Use confusion matrix. Stratified k-fold for cross-validation."],
  ["Machine Learning", "How would you tune hyperparameters for a large model?", "hyperparameter-tuning", "Explain tuning.", "Use random search or Bayesian optimization. Use early stopping. For deep learning, use learning rate scheduling and batch size tuning."],
  ["Machine Learning", "How would you deploy a model as a REST API?", "deploy-api", "Explain deployment.", "Package model (pickle/ONNX). Use Flask/FastAPI. Add request validation. Containerize with Docker. Deploy to cloud (AWS, GCP). Monitor latency and errors."],
  ["Machine Learning", "How would you handle concept drift in production?", "concept-drift", "Explain concept drift handling.", "Monitor model performance over time. Retrain periodically or use online learning. Use alerting when performance drops. Use A/B testing for new models."],
  ["Machine Learning", "How would you design an experiment to compare two ML models?", "experiment-design", "Explain experiment.", "Use A/B testing (online) or hold-out test set (offline). Ensure statistical significance (t-test). Use cross-validation for more robust offline comparison."],
  ["Machine Learning", "How would you build a time series forecasting model?", "time-series-forecasting", "Explain forecasting.", "Use ARIMA, Prophet, or LSTM. Preprocess: handle seasonality, stationarity. Evaluate with MAE, RMSE. Use rolling window validation."],
  ["Machine Learning", "How would you handle categorical features with many levels?", "high-cardinality", "Explain handling high cardinality.", "Use target encoding (mean of target per category), frequency encoding, or embedding layers (neural networks). One-hot encoding may cause high dimensionality."],
  ["Machine Learning", "How would you deal with outliers in a regression task?", "outliers-regression", "Explain handling outliers.", "Detect using Z-score or IQR. Remove, cap (winsorize), or transform (log). Use robust regression (Huber loss)."],
  ["Machine Learning", "How would you implement image classification?", "image-classification", "Explain image classification.", "Use CNN with pretrained models (ResNet, EfficientNet) via transfer learning. Augment data. Use early stopping and learning rate scheduling. Evaluate with accuracy/F1."],
  ["Machine Learning", "How would you build a sentiment analysis model?", "sentiment-analysis", "Explain sentiment analysis.", "Use text preprocessing, word embeddings (word2vec or BERT). Use LSTM or transformer. Fine-tune BERT. Evaluate with accuracy and confusion matrix."],
  ["Machine Learning", "How would you handle very large datasets that don't fit in memory?", "large-datasets", "Explain handling large data.", "Use out-of-core learning (partial_fit), streaming, or chunking (e.g., Dask). Use distributed frameworks (Spark MLlib). Sample if possible."],
  ["Machine Learning", "How would you implement a model for multi-label classification?", "multi-label", "Explain multi-label.", "Use binary relevance (one vs rest), classifier chains, or deep learning with sigmoid output and binary cross-entropy. Evaluate with Hamming loss or F1-macro."],
  ["Machine Learning", "How would you choose between deep learning and traditional ML?", "dl-vs-ml-choice", "Explain selection criteria.", "Use deep learning for unstructured data (images, text, audio) with large datasets. Use traditional ML for structured/tabular data, small data, and when interpretability is important."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Machine Learning concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing ML algorithms without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "machine-learning" },
    update: { name: "Machine Learning", group: "Technology", description: "Machine Learning interview questions." },
    create: { name: "Machine Learning", slug: "machine-learning", group: "Technology", description: "Machine Learning interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "machine-learning" } },
    update: {},
    create: { name: "Machine Learning", slug: "machine-learning", categoryId: category.id },
  });

  for (let topicIndex = 0; topicIndex < topics.length; topicIndex += 1) {
    const [, question, slug, shortDescription, sampleAnswer] = topics[topicIndex];
    const commonMistakes = buildCommonMistakes(question);
    const followUpQuestions = [
      topics[(topicIndex + 1) % topics.length][1],
      topics[(topicIndex + 2) % topics.length][1],
      topics[(topicIndex + 3) % topics.length][1],
    ];
    await prisma.interviewQuestion.upsert({
      where: { slug },
      update: {
        question,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["Machine Learning"],
        isPublished: true,
      },
      create: {
        question,
        slug,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["Machine Learning"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Machine Learning questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");