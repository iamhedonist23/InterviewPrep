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

async function ensureCategory(category: {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
}) {
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

async function seedAndroidCategory() {
  const androidCategory = {
    name: "Android Fundamentals",
    slug: "android-fundamentals",
    description: "Learn Android app building blocks, UI lifecycle, and common mobile patterns.",
    icon: "AND",
    sortOrder: 10,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Understand how Android apps structure user interfaces and lifecycle behavior.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Android Basics",
            slug: "android-basics",
            description: "Core mobile concepts and app structure.",
            topics: [
              {
                title: "Activity and UI Lifecycle",
                slug: "android-activity-ui-lifecycle",
                shortDescription: "Understand Android screen lifecycle and user interaction.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Activity lifecycle", content: "An Android Activity moves through onCreate, onStart, onResume, onPause, onStop, and onDestroy states. Lifecycle handling is essential for state preservation and resource cleanup." },
                  { title: "Configuration changes", content: "Events like screen rotation destroy and recreate the Activity by default. onSaveInstanceState/onRestoreInstanceState or a ViewModel preserve UI state across this recreation." },
                  { title: "UI rendering", content: "Modern Android UI is rendered through a view hierarchy and state-driven updates, often coordinated through Jetpack Compose (declarative) or the traditional View system (imperative)." },
                  { title: "Jetpack Compose basics", content: "Example:\n@Composable\nfun Greeting(name: String) {\n    Text(text = \"Hello, $name!\")\n}" },
                  { title: "ViewModel and state survival", content: "A ViewModel outlives configuration changes (though not process death), holding UI-related data so it doesn't need to be reloaded every time the screen rotates." },
                ],
              },
              {
                title: "Intents and Navigation",
                slug: "android-intents-navigation",
                shortDescription: "Move between screens and communicate between components.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What Intents are", content: "An Intent describes an action to perform. It can start activities, services, or broadcast receivers, optionally passing data as extras." },
                  { title: "Explicit vs implicit intents", content: "An explicit intent names the exact component to launch (within your own app); an implicit intent describes an action (like 'view a URL') and lets the system pick a matching app to handle it.\n\nExample:\nval intent = Intent(this, DetailActivity::class.java)\nintent.putExtra(\"id\", 42)\nstartActivity(intent)" },
                  { title: "Passing data back", content: "registerForActivityResult (replacing the older startActivityForResult) lets a launched Activity return data to the caller when it finishes." },
                  { title: "Navigation Component", content: "Modern Android apps use Navigation Component to define and manage navigation graphs between fragments/composables, handling back-stack management and passing arguments in a type-safe way." },
                  { title: "Deep links", content: "Deep links let external sources (a notification, a web URL) open a specific screen inside the app directly, rather than always starting at the launcher screen." },
                ],
              },
            ],
          }
        ],
      },

      // -------------------- INTERMEDIATE --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Persistence, networking, and background tasks.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Data Persistence",
            slug: "android-persistence",
            description: "Store data locally with Room, Preferences, and files.",
            topics: [
              {
                title: "Room Database",
                slug: "android-room",
                shortDescription: "SQLite abstraction with compile-time verification.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Entities and DAOs", content: "@Entity, @Dao, @Query, @Insert, @Update, @Delete." },
                  { title: "Database class", content: "@Database, version, exportSchema." },
                  { title: "Type converters", content: "Store custom objects with @TypeConverter." },
                  { title: "Migrations", content: "Handle schema changes with Migration class." },
                  { title: "Testing Room", content: "Use in-memory database for tests." },
                ],
              },
              {
                title: "SharedPreferences and DataStore",
                slug: "android-datastore",
                shortDescription: "Key‑value storage with modern DataStore API.",
                estimatedMinutes: 16,
                sections: [
                  { title: "SharedPreferences basics", content: "Store primitives, apply/commit." },
                  { title: "Preferences DataStore", content: "Kotlin coroutines and Flow support." },
                  { title: "Proto DataStore", content: "Type‑safe with protocol buffers." },
                  { title: "Migration from Preferences", content: "Existing to new DataStore." },
                ],
              },
            ],
          },
          {
            title: "Networking",
            slug: "android-networking",
            description: "HTTP clients and API integration.",
            topics: [
              {
                title: "Retrofit",
                slug: "android-retrofit",
                shortDescription: "Type‑safe HTTP client for REST APIs.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Retrofit setup", content: "Add dependency, create Retrofit instance with base URL and converter." },
                  { title: "Defining API interfaces", content: "@GET, @POST, @Path, @Query, @Body." },
                  { title: "Response handling", content: "Call<T>, enqueue, or suspend functions with Coroutines." },
                  { title: "Error handling", content: "Check response.isSuccessful, use Response<T> for body and error info." },
                  { title: "Custom converters", content: "Moshi, Gson, or Kotlinx.serialization." },
                ],
              },
              {
                title: "OkHttp and Interceptors",
                slug: "android-okhttp",
                shortDescription: "Customize network calls with logging, caching, and auth.",
                estimatedMinutes: 18,
                sections: [
                  { title: "OkHttpClient configuration", content: "Add interceptors, timeouts, cache." },
                  { title: "Logging interceptor", content: "Log request/response for debugging." },
                  { title: "Authentication interceptor", content: "Add token to headers." },
                  { title: "Caching", content: "Cache responses for offline and reduce bandwidth." },
                ],
              },
            ],
          },
          {
            title: "Background Work",
            slug: "android-background",
            description: "Run tasks reliably in the background.",
            topics: [
              {
                title: "WorkManager",
                slug: "android-workmanager",
                shortDescription: "Scheduler for deferrable background work.",
                estimatedMinutes: 22,
                sections: [
                  { title: "WorkManager basics", content: "One‑time and periodic work." },
                  { title: "Constraints", content: "Network, battery, storage, charging." },
                  { title: "Input and output data", content: "Data.Builder for passing arguments." },
                  { title: "Chaining work", content: "Sequential, parallel, and combined work." },
                  { title: "Unique work and backoff", content: "UniqueWorkPolicy and Exponential backoff." },
                ],
              },
              {
                title: "Services and Foreground",
                slug: "android-services",
                shortDescription: "Run tasks with service components.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Service vs IntentService", content: "IntentService deprecated, use WorkManager." },
                  { title: "Foreground services", content: "Show a persistent notification, require permission." },
                  { title: "Bound services", content: "Bind to a service for client‑server interaction." },
                  { title: "JobScheduler vs WorkManager", content: "WorkManager is preferred for most cases." },
                ],
              },
            ],
          },
          {
            title: "Modern UI with Compose",
            slug: "android-compose",
            description: "Build reactive UIs with Jetpack Compose.",
            topics: [
              {
                title: "Composable Functions",
                slug: "android-composable-basics",
                shortDescription: "Declarative UI with @Composable.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Anatomy of a Composable", content: "@Composable, recomposition." },
                  { title: "State in Compose", content: "remember, mutableStateOf, state hoisting." },
                  { title: "Layouts", content: "Column, Row, Box, Modifier." },
                  { title: "Handling events", content: "Callbacks from UI to ViewModel." },
                  { title: "Theming", content: "MaterialTheme, custom themes." },
                ],
              },
              {
                title: "State Management in Compose",
                slug: "android-compose-state",
                shortDescription: "Unidirectional data flow and ViewModel integration.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Unidirectional data flow", content: "State flows down, events flow up." },
                  { title: "viewModel()", content: "Get ViewModel in composable." },
                  { title: "State hoisting", content: "Lift state to parent when shared." },
                  { title: "MutableState vs StateFlow", content: "Use StateFlow for reactive streams." },
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
        description: "Architecture patterns, dependency injection, and testing.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Architecture Patterns",
            slug: "android-architecture",
            description: "MVVM, MVI, and Clean Architecture.",
            topics: [
              {
                title: "MVVM with ViewModel and LiveData",
                slug: "android-mvvm",
                shortDescription: "Model‑View‑ViewModel pattern.",
                estimatedMinutes: 22,
                sections: [
                  { title: "MVVM components", content: "Model (data), View (Activity/Fragment), ViewModel." },
                  { title: "ViewModel lifecycle", content: "Survives configuration changes." },
                  { title: "LiveData and StateFlow", content: "Observe data in UI." },
                  { title: "Data binding", content: "Bind UI directly to ViewModel." },
                ],
              },
              {
                title: "MVI (Model‑View‑Intent)",
                slug: "android-mvi",
                shortDescription: "Unidirectional data flow with intents.",
                estimatedMinutes: 20,
                sections: [
                  { title: "MVI concepts", content: "Intent → reduce → new state → render." },
                  { title: "State as single source of truth", content: "All state in one place." },
                  { title: "Reducing with Side Effects", content: "Handle one‑time events (navigation, toast)." },
                  { title: "Comparing MVVM vs MVI", content: "When to use each." },
                ],
              },
              {
                title: "Clean Architecture",
                slug: "android-clean-architecture",
                shortDescription: "Separation of concerns into layers.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Layers: data, domain, presentation", content: "Dependency direction inward." },
                  { title: "Use cases (interactors)", content: "Business logic encapsulated." },
                  { title: "Repositories", content: "Data sources abstraction." },
                  { title: "Benefits and trade-offs", content: "Testability, flexibility, complexity." },
                ],
              },
            ],
          },
          {
            title: "Dependency Injection",
            slug: "android-di",
            description: "Manage dependencies with Dagger/Hilt.",
            topics: [
              {
                title: "Dagger Basics",
                slug: "android-dagger-basics",
                shortDescription: "Manual DI and Dagger fundamentals.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What DI solves", content: "Decouples creation from usage." },
                  { title: "Dagger annotations", content: "@Module, @Provides, @Inject, @Component." },
                  { title: "Scopes", content: "@Singleton, custom scopes." },
                  { title: "Subcomponents and components dependencies", content: "Inherit dependencies." },
                ],
              },
              {
                title: "Hilt",
                slug: "android-hilt",
                shortDescription: "Simplified DI with Hilt.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Hilt setup", content: "@HiltAndroidApp, @AndroidEntryPoint." },
                  { title: "Hilt modules", content: "@Module, @InstallIn, @Provides." },
                  { title: "Scopes in Hilt", content: "@Singleton, @ActivityScoped, @ViewModelScoped." },
                  { title: "Injecting into Android classes", content: "Activity, Fragment, ViewModel, Service." },
                ],
              },
            ],
          },
          {
            title: "Testing",
            slug: "android-testing",
            description: "Unit tests, integration tests, and UI tests.",
            topics: [
              {
                title: "Unit Testing",
                slug: "android-unit-testing",
                shortDescription: "Test business logic with JUnit and Mockito.",
                estimatedMinutes: 20,
                sections: [
                  { title: "JUnit 5 / JUnit 4 basics", content: "@Test, assertions." },
                  { title: "Mocking with Mockito", content: "Mock dependencies, stubbing, verifying." },
                  { title: "Test ViewModel", content: "Test LiveData with InstantTaskExecutorRule." },
                  { title: "Coroutine testing", content: "runTest, TestDispatcher." },
                ],
              },
              {
                title: "UI Testing",
                slug: "android-ui-testing",
                shortDescription: "Automate UI interactions with Espresso.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Espresso basics", content: "onView, perform, check." },
                  { title: "RecyclerView actions", content: "onView with RecyclerViewMatcher." },
                  { title: "Idling resources", content: "Wait for async operations." },
                  { title: "Testing Compose UI", content: "ComposeTestRule and semantics." },
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
        description: "Common Android interview questions and deep dives.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Lifecycle and State Management",
            slug: "android-interview-lifecycle",
            description: "Activity, Fragment, ViewModel, and process death.",
            topics: [
              {
                title: "Activity and Fragment Lifecycles",
                slug: "android-interview-activity-fragment",
                shortDescription: "Key lifecycle callbacks and differences.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Activity lifecycle", content: "onCreate, onStart, onResume, onPause, onStop, onDestroy." },
                  { title: "Fragment lifecycle", content: "onAttach, onCreate, onCreateView, onViewCreated, onDestroyView, onDetach." },
                  { title: "Differences between Activity and Fragment", content: "Fragments have view lifecycle." },
                  { title: "Saved state and process death", content: "onSaveInstanceState and ViewModel." },
                ],
              },
              {
                title: "State Restoration and ViewModel",
                slug: "android-interview-state-restore",
                shortDescription: "How to preserve UI state across configuration changes and process death.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Configuration changes", content: "Handling rotation with ViewModel." },
                  { title: "SavedStateHandle", content: "Persist state across process death." },
                  { title: "Bundle vs ViewModel", content: "When to use each." },
                ],
              },
            ],
          },
          {
            title: "Architecture and DI",
            slug: "android-interview-architecture",
            description: "Common architecture questions and patterns.",
            topics: [
              {
                title: "MVVM and MVI",
                slug: "android-interview-mvvm-mvi",
                shortDescription: "Explain and compare.",
                estimatedMinutes: 16,
                sections: [
                  { title: "MVVM explanation", content: "Components and data flow." },
                  { title: "MVI explanation", content: "Unidirectional flow and intents." },
                  { title: "Pros and cons", content: "When to choose which." },
                ],
              },
              {
                title: "Dagger/Hilt",
                slug: "android-interview-hilt",
                shortDescription: "Explain dependency injection and Hilt's role.",
                estimatedMinutes: 16,
                sections: [
                  { title: "What is DI", content: "Decoupling and testing." },
                  { title: "Hilt vs Dagger", content: "Hilt simplifies setup." },
                  { title: "Scopes in Hilt", content: "Singleton, Activity, ViewModel." },
                ],
              },
            ],
          },
          {
            title: "Common Android Questions",
            slug: "android-interview-common",
            description: "Frequently asked topics like background tasks, permissions, and performance.",
            topics: [
              {
                title: "Background Processing",
                slug: "android-interview-background",
                shortDescription: "WorkManager, Services, and alarms.",
                estimatedMinutes: 18,
                sections: [
                  { title: "WorkManager vs Services", content: "Deferrable vs immediate." },
                  { title: "JobScheduler and Firebase JobDispatcher", content: "Legacy vs modern." },
                  { title: "Doze mode and app standby", content: "Impact on background work." },
                ],
              },
              {
                title: "Performance and Memory",
                slug: "android-interview-performance",
                shortDescription: "Memory leaks, ANR, and profiling.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Memory leaks", content: "Common causes (static references, listeners, inner classes)." },
                  { title: "ANR", content: "Main thread blocked, solutions." },
                  { title: "Profiling tools", content: "Android Profiler, LeakCanary." },
                  { title: "Optimizing layouts", content: "ViewStub, include, merge." },
                ],
              },
              {
                title: "Permissions",
                slug: "android-interview-permissions",
                shortDescription: "Dangerous permissions and runtime request.",
                estimatedMinutes: 14,
                sections: [
                  { title: "Normal vs dangerous permissions", content: "Manifest vs runtime." },
                  { title: "Requesting permissions", content: "requestPermissions and callback." },
                  { title: "Rationale and denial handling", content: "Explain to user." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(androidCategory);
  console.log("✓ Android Fundamentals category seeded (all levels)");
}

async function main() {
  await seedAndroidCategory();
}

main()
  .catch((error) => {
    console.error("Android seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });