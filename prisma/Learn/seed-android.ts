import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

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

        const sections = [...topicSeed.sections, ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
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

async function seedAndroidCategory() {
  const androidCategory: CategorySeed = {
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
                title: "Activity and UI Lifecycle – The Heart of Android",
                slug: "android-activity-ui-lifecycle",
                shortDescription: "Understand Android screen lifecycle and user interaction.",
                estimatedMinutes: 30,
                sections: [
                  { title: "What is an Activity?", content: "An Activity is a single, focused screen in an Android app – think of it as a 'page' or a 'window'. It provides a UI where the user can interact. For example, a login screen, a settings page, or a camera preview are all Activities. An app can have many Activities, and the system manages them in a stack (back stack). Each Activity has a lifecycle, which is a set of states it goes through from creation to destruction." },
                  { title: "The Activity Lifecycle – A Stage Play", content: "Imagine an Activity as a play on a stage. The director (Android system) calls specific methods at different times:\n\n- **onCreate()**: The curtain goes up – the play is born. This is where you initialise your UI, set up the layout (`setContentView`), and initialise variables. Called only once.\n- **onStart()**: The actors are ready, but the audience is not yet watching. The Activity becomes visible.\n- **onResume()**: The play begins – the Activity is now in the foreground and interactive. This is the 'running' state.\n- **onPause()**: The audience is distracted – another Activity is about to appear. This is where you pause ongoing tasks (e.g., stop animations, release camera).\n- **onStop()**: The play is temporarily off‑stage – the Activity is no longer visible. You should release heavy resources here.\n- **onDestroy()**: The final curtain – the Activity is being destroyed. Clean up everything.\n\nKnowing this sequence is crucial for preventing crashes and saving user state." },
                  { title: "Configuration Changes – Rotation and More", content: "When the phone is rotated, the keyboard appears, or the language changes, Android recreates the Activity by default. This means it calls `onDestroy()` and then `onCreate()` again. Without proper handling, you lose the user's input or state. Two solutions:\n1. **onSaveInstanceState() / onRestoreInstanceState()**: Save transient UI state (e.g., text in a field) in a Bundle. This is good for small amounts of data.\n2. **ViewModel**: A dedicated class that survives configuration changes. This is the recommended approach for larger, more complex data." },
                  { title: "Jetpack Compose – The Modern UI Framework", content: "Since 2021, Google recommends Jetpack Compose for building UIs. It's a declarative UI toolkit – you describe what the UI should look like based on the current state, and Compose handles the rendering. Example:\n```kotlin\n@Composable\nfun Greeting(name: String) {\n    Text(text = \"Hello, $name!\")\n}\n```\nYou define composable functions (annotated with `@Composable`). They are reactive: when state changes, Compose recomputes the UI. This is simpler and more performant than the old View system." },
                  { title: "ViewModel – Your State Manager", content: "The `ViewModel` class is part of Android Jetpack. It's a lifecycle‑aware component that holds UI‑related data. Unlike an Activity, a ViewModel survives configuration changes (like rotation). You typically use it to fetch data from a repository, hold LiveData/StateFlow, and expose it to the UI. Example:\n```kotlin\nclass MyViewModel : ViewModel() {\n    private val _user = MutableStateFlow(User())\n    val user: StateFlow<User> = _user.asStateFlow()\n\n    fun loadUser(id: String) {\n        viewModelScope.launch {\n            _user.value = repository.fetchUser(id)\n        }\n    }\n}\n```\nYou access it in your Activity/Composable with `viewModel()`. It also helps with testability." },
                  { title: "Common Pitfalls in Lifecycle Handling", content: "**Pitfall 1:** Doing heavy work in `onCreate` – it delays the UI launch. Use `onResume` for lightweight tasks, or use a background thread.\n**Pitfall 2:** Not unregistering listeners (like location updates) in `onPause` – this can cause memory leaks.\n**Pitfall 3:** Assuming `onDestroy` will always be called – in low‑memory situations, the system might kill the process without calling it. So don't rely on it for critical data persistence." },
                ],
              },
              {
                title: "Intents and Navigation – Moving Between Screens",
                slug: "android-intents-navigation",
                shortDescription: "Move between screens and communicate between components.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is an Intent?", content: "An Intent is a message object that tells Android to do something: start an Activity, start a Service, or send a broadcast. It's like a request or a command. You can also put extra data in it (like the user ID) to pass information." },
                  { title: "Explicit vs Implicit Intents", content: "- **Explicit Intent**: You name the exact component you want to start (e.g., `Intent(this, DetailActivity::class.java)`). Used for internal navigation within your app.\n- **Implicit Intent**: You describe the action you want to perform (e.g., `Intent(Intent.ACTION_VIEW, Uri.parse(\"https://google.com\"))`). The system will find an app that can handle it (e.g., the browser).\n\nImplicit intents are powerful but less predictable – always check if there is an app to handle it with `resolveActivity()`." },
                  { title: "Passing Data and Getting Results", content: "You can add extras to an Intent with `putExtra(\"key\", value)`. In the target Activity, use `getStringExtra(\"key\")`. To get a result back (e.g., pick a photo, get a user's selection), use `registerForActivityResult()` (the modern replacement for `startActivityForResult`). Example:\n```kotlin\nval getContent = registerForActivityResult(ActivityResultContracts.GetContent()) { uri ->\n    // handle selected image\n}\ngetContent.launch(\"image/*\")\n```" },
                  { title: "Navigation Component – The Modern Way", content: "The Navigation Component is a library that simplifies implementing navigation in your app. It uses a navigation graph (XML) to define all possible destinations and actions. Benefits:\n- Automatic back‑stack management\n- Type‑safe argument passing with `NavArgs`\n- Support for deep links and bottom navigation.\n\nYou define a NavHost in your layout, then use `NavController` to navigate: `findNavController().navigate(R.id.action_login_to_home)`." },
                  { title: "Deep Links – Opening Specific Screens from Outside", content: "A deep link is a URL or URI that opens your app directly at a specific screen. For example, clicking a link in a notification opens the order details page. You define these in the manifest with `<intent-filter>`. In modern Android, use App Links (which verify the URL with a digital asset link) for security." },
                ],
              },
              {
                title: "Resources and Localization – Building Global Apps",
                slug: "android-resources",
                shortDescription: "Manage strings, colours, dimensions, and support multiple languages.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Resource System", content: "Android resources (strings, colours, dimensions, drawables) are stored in the `res/` directory. Each resource type has its own folder: `values/strings.xml`, `values/colors.xml`, `drawable/`, `layout/`. You reference them in code with `R.string.my_string`." },
                  { title: "Localization", content: "To support multiple languages, create language‑specific resource folders: `values-fr/strings.xml` for French. The system will automatically load the appropriate resource based on the device's language. Always use string resources for user‑visible text to make translation easy." },
                  { title: "Resource Qualifiers", content: "You can provide alternative resources for different screen sizes, orientations, densities, and API levels using qualifiers (e.g., `layout-land/` for landscape, `drawable-hdpi/` for high density). This is essential for responsive design." },
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
                title: "Room Database – SQLite Made Easy",
                slug: "android-room",
                shortDescription: "SQLite abstraction with compile-time verification.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is Room?", content: "Room is a persistence library that provides an abstraction layer over SQLite. It makes database operations safer, easier, and less boilerplate. With Room, you define entities (models) and data access objects (DAOs). The library handles the SQL generation, type conversion, and migration." },
                  { title: "Entities and DAOs – The Core", content: "An Entity is a class annotated with `@Entity` – it maps to a database table. Example:\n```kotlin\n@Entity(tableName = \"users\")\ndata class User(\n    @PrimaryKey val id: Int,\n    @ColumnInfo(name = \"full_name\") val name: String,\n    val email: String\n)\n```\nA DAO (Data Access Object) is an interface or abstract class with methods annotated with `@Insert`, `@Update`, `@Delete`, `@Query`. Example:\n```kotlin\n@Dao\ninterface UserDao {\n    @Insert\n    suspend fun insert(user: User)\n\n    @Query(\"SELECT * FROM users WHERE id = :id\")\n    suspend fun getUser(id: Int): User?\n}\n```\nRoom validates SQL at compile time, so you catch errors early." },
                  { title: "Database Class and Migration", content: "Define an abstract class extending `RoomDatabase` with `@Database(entities = [User::class], version = 1)`. To create an instance, use `Room.databaseBuilder(...)`. When the schema changes (version increment), you must provide a `Migration` object to handle the transition. If you don't, the app will crash. For test, use `Room.inMemoryDatabaseBuilder()`." },
                  { title: "Type Converters – Storing Custom Types", content: "Room can't store complex objects by default. Use a `@TypeConverter` to convert them to a known type (e.g., Date ↔ Long). Example:\n```kotlin\nclass Converters {\n    @TypeConverter\n    fun fromTimestamp(value: Long?): Date? = value?.let { Date(it) }\n\n    @TypeConverter\n    fun dateToTimestamp(date: Date?): Long? = date?.time\n}\n```\nThen add `@TypeConverters(Converters::class)` to your database class." },
                ],
              },
              {
                title: "SharedPreferences and DataStore – Key‑Value Storage",
                slug: "android-datastore",
                shortDescription: "Key‑value storage with modern DataStore API.",
                estimatedMinutes: 18,
                sections: [
                  { title: "SharedPreferences – The Legacy Way", content: "SharedPreferences is a simple key‑value store for primitives (int, String, boolean). It's easy to use but has issues: it's synchronous (can block the UI), not type‑safe, and doesn't support Kotlin coroutines." },
                  { title: "Preferences DataStore – The Modern Replacement", content: "DataStore is a modern, asynchronous replacement for SharedPreferences. It's backed by Kotlin coroutines and Flow. Example:\n```kotlin\nval dataStore = context.createDataStore(\n    name = \"settings\"\n)\n\n// Read\nval themeFlow: Flow<String> = dataStore.data\n    .map { prefs -> prefs[PreferencesKeys.THEME] ?: \"light\" }\n\n// Write\nsuspend fun saveTheme(theme: String) {\n    dataStore.edit { prefs ->\n        prefs[PreferencesKeys.THEME] = theme\n    }\n}\n```\nIt supports both Preferences and Proto DataStore (type‑safe with protocol buffers)." },
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
                title: "Retrofit – Type‑Safe REST Client",
                slug: "android-retrofit",
                shortDescription: "Type‑safe HTTP client for REST APIs.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is Retrofit?", content: "Retrofit is a popular HTTP client for Android and Java. It turns your API endpoints into Java/Kotlin interfaces. It handles serialization (JSON ↔ objects) using converters (Moshi, Gson, or Kotlinx.serialization)." },
                  { title: "Setting Up Retrofit", content: "Add dependencies: `com.squareup.retrofit2:retrofit`, `com.squareup.retrofit2:converter-gson` (or Moshi). Then create a Retrofit instance:\n```kotlin\nval retrofit = Retrofit.Builder()\n    .baseUrl(\"https://api.example.com/\")\n    .addConverterFactory(GsonConverterFactory.create())\n    .build()\n```" },
                  { title: "Defining API Interfaces", content: "```kotlin\ninterface ApiService {\n    @GET(\"users/{id}\")\n    suspend fun getUser(@Path(\"id\") id: Int): User\n\n    @POST(\"users\")\n    suspend fun createUser(@Body user: User): User\n}\n```\nYou can use `suspend` functions with Coroutines for async calls. Or use `Call<T>` for callback‑based." },
                  { title: "Error Handling", content: "Always check `response.isSuccessful` (for `Response<T>`). Use `try/catch` for network exceptions. A common pattern is to use a `Result` or `Either` type to handle success and error states gracefully." },
                ],
              },
              {
                title: "OkHttp and Interceptors – Customizing Network Calls",
                slug: "android-okhttp",
                shortDescription: "Customize network calls with logging, caching, and auth.",
                estimatedMinutes: 20,
                sections: [
                  { title: "OkHttp – The HTTP Client", content: "Retrofit uses OkHttp under the hood. You can configure OkHttp directly to add interceptors, timeouts, and caching." },
                  { title: "Logging Interceptor", content: "Add the `LoggingInterceptor` to log request/response headers and bodies – invaluable for debugging.\n```kotlin\nval client = OkHttpClient.Builder()\n    .addInterceptor(HttpLoggingInterceptor().apply {\n        level = HttpLoggingInterceptor.Level.BODY\n    })\n    .build()\n```" },
                  { title: "Authentication Interceptor", content: "To add an authentication token to every request, create an interceptor:\n```kotlin\nclass AuthInterceptor(private val token: String) : Interceptor {\n    override fun intercept(chain: Interceptor.Chain): Response {\n        val request = chain.request().newBuilder()\n            .addHeader(\"Authorization\", \"Bearer $token\")\n            .build()\n        return chain.proceed(request)\n    }\n}\n```" },
                  { title: "Caching", content: "OkHttp can cache responses for offline use. Configure a cache directory and size, then add `cache` to the client." },
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
                title: "WorkManager – The Recommended Scheduler",
                slug: "android-workmanager",
                shortDescription: "Scheduler for deferrable background work.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is WorkManager?", content: "WorkManager is the modern Android library for scheduling background tasks that must run reliably, even if the app is killed or the device reboots. It's the recommended choice for most background work. It respects Doze mode and battery optimizations." },
                  { title: "Defining Work", content: "Create a class extending `Worker` (or `CoroutineWorker`) and override `doWork()`:\n```kotlin\nclass UploadWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {\n    override suspend fun doWork(): Result {\n        return try {\n            uploadData()\n            Result.success()\n        } catch (e: Exception) {\n            Result.retry()\n        }\n    }\n}\n```\nYou can return `Result.success()`, `Result.failure()`, or `Result.retry()`." },
                  { title: "Constraints", content: "You can specify constraints: network type, battery level, storage, charging state. Example:\n```kotlin\nval constraints = Constraints.Builder()\n    .setRequiredNetworkType(NetworkType.CONNECTED)\n    .setRequiresCharging(true)\n    .build()\n```" },
                  { title: "Chaining Work", content: "WorkManager supports sequential, parallel, and combined work. Use `WorkContinuation`:\n```kotlin\nval work1 = OneTimeWorkRequest.from(FirstWorker::class.java)\nval work2 = OneTimeWorkRequest.from(SecondWorker::class.java)\nWorkManager.getInstance(context)\n    .beginWith(work1)\n    .then(work2)\n    .enqueue()\n```" },
                ],
              },
              {
                title: "Services and Foreground – When You Need More Control",
                slug: "android-services",
                shortDescription: "Run tasks with service components.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Services – The Legacy Background", content: "A `Service` is a component that runs in the background without a UI. There are three types: **Started** (runs until it stops itself or is stopped), **Bound** (allows client‑server binding), and **Foreground** (shows a persistent notification, used for tasks that are user‑visible, like music playback)." },
                  { title: "Foreground Services – User‑Visible Background Work", content: "Android restricts background execution. For tasks that must continue while the user is not actively interacting (e.g., navigation, music), use a foreground service with a notification. You must show a notification within 5 seconds, or the system will stop the service." },
                  { title: "WorkManager vs Services", content: "For most use cases (sync, uploads, scheduled tasks), WorkManager is simpler and more reliable. Use a service only when you need precise timing (e.g., media playback) or when the system might kill your process (foreground service)." },
                ],
              },
            ],
          },
          {
            title: "Kotlin Coroutines and Flows – Modern Concurrency",
            slug: "android-coroutines",
            description: "Asynchronous programming with coroutines and Flows.",
            topics: [
              {
                title: "Coroutines Basics – Lightweight Threads",
                slug: "coroutines-basics",
                shortDescription: "Suspend functions, CoroutineScope, and Dispatchers.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What are Coroutines?", content: "Coroutines are a concurrency design pattern that allows you to write asynchronous code sequentially. They are lightweight, and you can have thousands of them without performance issues. They are the recommended way to handle background tasks in Android." },
                  { title: "Suspend Functions", content: "A function that can be paused and resumed later is marked with `suspend`. Example: `suspend fun fetchUser(): User`. Suspend functions can only be called from coroutines or other suspend functions." },
                  { title: "CoroutineScope and Dispatchers", content: "`CoroutineScope` defines the lifecycle of coroutines. `Dispatchers` determine which thread they run on: `Dispatchers.Main` (UI thread), `Dispatchers.IO` (network/disk), `Dispatchers.Default` (CPU‑intensive).\n```kotlin\nviewModelScope.launch(Dispatchers.IO) {\n    val user = fetchUser()\n    withContext(Dispatchers.Main) {\n        _user.value = user\n    }\n}\n```" },
                ],
              },
              {
                title: "Flows – Reactive Streams for Android",
                slug: "flows",
                shortDescription: "Cold streams for asynchronous data flow.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is a Flow?", content: "A Flow is a cold stream that emits multiple values asynchronously. It's similar to RxJava but built on coroutines. You collect the values with `collect`.\n```kotlin\nval flow = flow {\n    emit(1)\n    emit(2)\n}\nflow.collect { value -> println(value) }\n```" },
                  { title: "Operators", content: "Flows support operators like `map`, `filter`, `transform`, `flatMapConcat`, and `catch` for error handling." },
                  { title: "StateFlow and SharedFlow", content: "`StateFlow` is a hot stream that holds a state; it's often used in ViewModels. `SharedFlow` is for broadcasting events to multiple collectors. They replace LiveData in many cases." },
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
                title: "Composable Functions – Building Blocks",
                slug: "android-composable-basics",
                shortDescription: "Declarative UI with @Composable.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Anatomy of a Composable", content: "A composable is a function annotated with `@Composable`. It describes the UI based on its parameters and state. When state changes, Compose recomposes (re‑executes) the function to reflect the new UI. This is called **recomposition**." },
                  { title: "State in Compose", content: "Use `remember` and `mutableStateOf` to hold state. Example:\n```kotlin\nvar count by remember { mutableStateOf(0) }\nButton(onClick = { count++ }) {\n    Text(\"Clicked $count times\")\n}\n```\nWhen `count` changes, the button recomposes automatically." },
                  { title: "Layouts – Arranging UI", content: "`Column` arranges children vertically, `Row` horizontally, `Box` overlays them. Use `Modifier` to adjust size, padding, alignment, and more. Example:\n```kotlin\nColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {\n    Text(\"Hello\")\n    Spacer(modifier = Modifier.height(8.dp))\n    Button(onClick = {}) { Text(\"Click\") }\n}\n```" },
                ],
              },
              {
                title: "State Management in Compose – Unidirectional Data Flow",
                slug: "android-compose-state",
                shortDescription: "Unidirectional data flow and ViewModel integration.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Unidirectional Data Flow (UDF)", content: "In Compose, data flows **down** (from ViewModel to UI) and events flow **up** (from UI to ViewModel). This makes the app predictable and testable. The ViewModel holds the state, and the UI observes it via `StateFlow` or `LiveData`." },
                  { title: "Using ViewModel in Compose", content: "Inside a composable, get the ViewModel with `viewModel()` (from `androidx.lifecycle.viewmodel.compose`). Example:\n```kotlin\n@Composable\nfun MyScreen(viewModel: MyViewModel = viewModel()) {\n    val state by viewModel.state.collectAsState()\n    // use state\n}\n```" },
                  { title: "State Hoisting", content: "If a composable needs to share state with siblings, 'hoist' the state to a common parent and pass it down as parameters. This is similar to lifting state up in React." },
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
        description: "Architecture patterns, dependency injection, testing, security, and performance.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Architecture Patterns",
            slug: "android-architecture",
            description: "MVVM, MVI, Clean Architecture, and modularization.",
            topics: [
              {
                title: "MVVM with ViewModel and LiveData/StateFlow",
                slug: "android-mvvm",
                shortDescription: "Model‑View‑ViewModel pattern.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is MVVM?", content: "MVVM (Model‑View‑ViewModel) separates UI logic from business logic. **Model**: data layer (repositories, domain models). **View**: UI (Activity/Fragment/Composable). **ViewModel**: holds UI state, exposes data via observables (LiveData/StateFlow), and handles user actions." },
                  { title: "Data Binding", content: "Data binding binds UI components directly to ViewModel properties, reducing boilerplate. In Compose, it's automatic – the UI recomposes when state changes." },
                  { title: "Advantages", content: "Testable (ViewModel can be unit‑tested), separation of concerns, lifecycle‑aware." },
                ],
              },
              {
                title: "MVI (Model‑View‑Intent)",
                slug: "android-mvi",
                shortDescription: "Unidirectional data flow with intents.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is MVI?", content: "MVI (Model‑View‑Intent) is a unidirectional data flow pattern. **View** sends **Intents** (user actions). A reducer processes the intent and produces a new **State**. The state is rendered by the view. This is similar to Redux." },
                  { title: "State as Single Source of Truth", content: "All state is stored in one place (the Model). This makes the app predictable and easy to debug." },
                  { title: "MVVM vs MVI", content: "MVVM is simpler and works well for most apps. MVI is more predictable and better for complex screens with many interactions, but has a steeper learning curve." },
                ],
              },
              {
                title: "Clean Architecture – Separation of Concerns",
                slug: "android-clean-architecture",
                shortDescription: "Separation of concerns into layers.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Layers", content: "Clean Architecture divides the app into concentric layers:\n- **Data Layer**: Repositories, data sources (local/remote).\n- **Domain Layer**: Use cases (interactors), business logic, models.\n- **Presentation Layer**: ViewModel, UI (Activities/Composables).\n\nDependencies point inward – the domain layer doesn't depend on data or presentation." },
                  { title: "Benefits", content: "Testability, flexibility (swap data sources easily), and maintainability." },
                ],
              },
              {
                title: "Modularization – Building Scalable Apps",
                slug: "android-modularization",
                shortDescription: "Split your app into feature and library modules.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Why Modularize?", content: "Modularization splits the app into independent modules (e.g., `app`, `feature:home`, `feature:profile`, `core:network`). Benefits: faster builds (incremental compilation), parallel development, reusability, and better testability." },
                  { title: "Module Types", content: "**App module**: the main application, depends on features. **Feature modules**: contain UI and logic for a specific screen. **Core modules**: shared libraries (network, database, common UI components). Use Gradle `implementation` and `api` for dependencies." },
                  { title: "Dynamic Feature Modules", content: "These are installed on‑demand, reducing the initial APK size. Use the Play Core library to manage downloads." },
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
                title: "Dagger Basics – Manual and Automated DI",
                slug: "android-dagger-basics",
                shortDescription: "Manual DI and Dagger fundamentals.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is Dependency Injection?", content: "DI is a design pattern where objects receive their dependencies from an external source, rather than creating them internally. This makes code testable, modular, and easier to maintain." },
                  { title: "Dagger 2 Annotations", content: "`@Inject` – tells Dagger to provide the dependency. `@Module` – a class that provides dependencies. `@Provides` – method inside a module that returns a dependency. `@Component` – bridge between modules and the injection target." },
                ],
              },
              {
                title: "Hilt – Dagger for Android",
                slug: "android-hilt",
                shortDescription: "Simplified DI with Hilt.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Why Hilt?", content: "Hilt reduces Dagger boilerplate in Android. It auto‑generates Dagger components and provides pre‑defined scopes (`@Singleton`, `@ActivityScoped`, `@ViewModelScoped`)." },
                  { title: "Setup", content: "Annotate your Application with `@HiltAndroidApp`. For each Activity/Fragment, use `@AndroidEntryPoint`. Then, you can inject dependencies with `@Inject`." },
                  { title: "Modules", content: "Use `@Module` and `@InstallIn` (e.g., `@InstallIn(SingletonComponent::class)`) to define how dependencies are provided." },
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
                title: "Unit Testing – JUnit and Mockito",
                slug: "android-unit-testing",
                shortDescription: "Test business logic with JUnit and Mockito.",
                estimatedMinutes: 22,
                sections: [
                  { title: "JUnit 5/JUnit 4", content: "Write test classes with `@Test` methods. Use assertions like `assertEquals`, `assertTrue`, etc." },
                  { title: "Mocking Dependencies", content: "Use Mockito to mock dependencies (repositories, APIs). Example:\n```kotlin\nval mockRepo = mock(MyRepository::class.java)\nwhenever(mockRepo.getData()).thenReturn(flowOf(testData))\n```" },
                  { title: "Testing ViewModel", content: "Use `runTest` with `TestCoroutineDispatcher` to test coroutines. For LiveData, use `InstantTaskExecutorRule` to run operations synchronously." },
                ],
              },
              {
                title: "UI Testing – Espresso and Compose",
                slug: "android-ui-testing",
                shortDescription: "Automate UI interactions with Espresso.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Espresso Basics", content: "Write UI tests using `onView`, `perform`, and `check`. Example:\n```kotlin\nonView(withId(R.id.button))\n    .perform(click())\n    .check(matches(isDisplayed()))\n```" },
                  { title: "RecyclerView Testing", content: "Use `onView` with `RecyclerViewMatcher` to test items in a list." },
                  { title: "Compose UI Testing", content: "Use `ComposeTestRule` to test composables. Example:\n```kotlin\ncomposeTestRule.setContent { MyScreen() }\ncomposeTestRule.onNodeWithText(\"Hello\").assertIsDisplayed()\n```" },
                ],
              },
              {
                title: "Integration and End‑to‑End Testing",
                slug: "android-integration-testing",
                shortDescription: "Test the whole stack with real dependencies.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Integration Tests", content: "Use `AndroidJUnit4` and `@RunWith` to run tests that depend on Android framework. Use `Robolectric` for local tests with Android dependencies." },
                  { title: "MockWebServer", content: "For network integration, use `MockWebServer` to simulate API responses." },
                  { title: "End‑to‑End (E2E) Tests", content: "Use frameworks like `Appium` or `UI Automator` to test the entire app across devices." },
                ],
              },
            ],
          },
          {
            title: "Performance Optimization",
            slug: "android-performance",
            description: "Optimise memory, battery, rendering, and startup.",
            topics: [
              {
                title: "Memory Management",
                slug: "android-memory",
                shortDescription: "Avoid memory leaks and reduce memory footprint.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Understanding Memory", content: "Android apps run in a memory‑constrained environment. Use the Android Profiler to monitor heap usage. Common memory leaks: static references to Activities, inner classes holding implicit references, and unregistered listeners." },
                  { title: "LeakCanary – Automatic Leak Detection", content: "LeakCanary is a popular library that detects memory leaks in debug builds. It provides detailed stack traces to help you fix them." },
                  { title: "Large Objects", content: "Avoid storing large bitmaps in memory. Use `BitmapFactory.Options` to downsample images. Use `Glide` or `Coil` for efficient image loading." },
                ],
              },
              {
                title: "Rendering Performance",
                slug: "android-rendering",
                shortDescription: "Make your UI smooth and responsive.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Rendering Pipeline", content: "Android draws each frame in 16ms (60fps). If the UI thread takes longer, you get dropped frames and jank. Use `Layout Inspector` and `Profile GPU Rendering` to debug." },
                  { title: "Optimizing Layouts", content: "Reduce layout depth with `ConstraintLayout`. Use `<ViewStub>` for delayed inflation. Use `RecyclerView` instead of `ListView` for large lists." },
                  { title: "Recomposition in Compose", content: "In Compose, use `derivedStateOf` to avoid recomposition when intermediate states change. Use `remember` wisely." },
                ],
              },
              {
                title: "Battery Optimization",
                slug: "android-battery",
                shortDescription: "Reduce battery drain from network, location, and wake locks.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Network Usage", content: "Batch network requests using `WorkManager`. Use `DataSaver` mode. Compress data and use efficient formats (e.g., Protobuf)." },
                  { title: "Location Updates", content: "Use `FusedLocationProviderClient` with the right priority. Use `PRIORITY_BALANCED_POWER_ACCURACY` when you don't need high precision." },
                  { title: "Wake Locks", content: "Avoid holding wake locks longer than necessary. Use `AlarmManager` with `setExactAndAllowWhileIdle` sparingly." },
                ],
              },
              {
                title: "Startup Time Optimization",
                slug: "android-startup",
                shortDescription: "Reduce app launch time.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Measuring Startup Time", content: "Use the `reportFullyDrawn()` method to measure the time from launch to user‑interaction readiness. Use the `App Startup` library to initialise components lazily." },
                  { title: "Lazy Initialization", content: "Use `lazy` delegates and dependency injection to initialise heavy dependencies only when needed." },
                  { title: "Avoid Heavy Work in onCreate", content: "Move heavy initialisation to a background thread or use `WorkManager` to defer it." },
                ],
              },
            ],
          },
          {
            title: "Security",
            slug: "android-security",
            description: "Protect user data and secure your app.",
            topics: [
              {
                title: "Data Encryption",
                slug: "android-encryption",
                shortDescription: "Encrypt sensitive data at rest and in transit.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Encryption at Rest", content: "Use `EncryptedSharedPreferences` for storing sensitive data. For files, use `EncryptedFile` from the Android Security library. Use the Android Keystore to manage cryptographic keys securely." },
                  { title: "Encryption in Transit", content: "Always use HTTPS with certificate pinning. Use `NetworkSecurityConfig` to enforce TLS and restrict to trusted CAs." },
                ],
              },
              {
                title: "App Hardening",
                slug: "android-hardening",
                shortDescription: "Protect against reverse engineering and tampering.",
                estimatedMinutes: 20,
                sections: [
                  { title: "ProGuard/R8", content: "Use R8 to obfuscate your code, shrink resources, and optimise. This makes it harder to reverse engineer. Keep important classes (like `@Keep`)." },
                  { title: "Root Detection", content: "Detect if the device is rooted and take appropriate action (e.g., block sensitive features). Use libraries like `RootBeer`." },
                  { title: "Certificate Pinning", content: "Pin your server's certificate to prevent man‑in‑the‑middle attacks. Use `CertificatePinner` in OkHttp." },
                ],
              },
              {
                title: "Permissions and Privacy",
                slug: "android-permissions",
                shortDescription: "Handle permissions correctly and respect user privacy.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Runtime Permissions", content: "Request dangerous permissions at runtime. Explain why you need them before requesting. Handle denial and permanent denial gracefully." },
                  { title: "Data Privacy", content: "Follow Google Play's user data policy. Disclose data collection and usage in your app's privacy policy. Use Android's `Privacy Dashboard`." },
                ],
              },
            ],
          },
          {
            title: "CI/CD and Play Store",
            slug: "android-cicd",
            description: "Automate build, testing, and deployment.",
            topics: [
              {
                title: "Continuous Integration",
                slug: "android-ci",
                shortDescription: "Automate builds and tests with CI services.",
                estimatedMinutes: 20,
                sections: [
                  { title: "GitHub Actions", content: "Set up a workflow to build your app, run tests, and generate APK/AAB on every push. Example:\n```yaml\nname: Android CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up JDK\n        uses: actions/setup-java@v3\n        with: java-version: '17'\n      - name: Build with Gradle\n        run: ./gradlew build\n```" },
                  { title: "SonarQube", content: "Integrate SonarQube for static code analysis and code quality reports." },
                ],
              },
              {
                title: "Deploy to Play Store",
                slug: "android-play-store",
                shortDescription: "Publish your app using internal, alpha, beta, and production tracks.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Signing", content: "Use Google Play App Signing (recommended) or manage your own signing key. Keep the keystore secure." },
                  { title: "Publishing", content: "Use the Google Play Console to upload APK/AAB. Use internal testing for quick internal builds, alpha/beta for wider testing, and production for release." },
                  { title: "Release Management", content: "Create a release notes and set up staged rollouts to gradually release to users." },
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
                estimatedMinutes: 20,
                sections: [
                  { title: "Activity Lifecycle", content: "`onCreate` → `onStart` → `onResume` (active) → `onPause` → `onStop` → `onDestroy`. Know which state is visible, interactive, and when to save/restore." },
                  { title: "Fragment Lifecycle", content: "Fragments have an extra view lifecycle: `onCreateView`, `onViewCreated`, `onDestroyView`. They can be re‑attached to different Activities." },
                ],
              },
              {
                title: "State Restoration and ViewModel",
                slug: "android-interview-state-restore",
                shortDescription: "How to preserve UI state across configuration changes and process death.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Configuration Changes", content: "ViewModel survives rotation. Use `SavedStateHandle` to persist data across process death." },
                  { title: "Bundle vs ViewModel", content: "Bundle for transient UI state (text in input fields). ViewModel for larger, more complex data (e.g., user list)." },
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
                estimatedMinutes: 18,
                sections: [
                  { title: "MVVM", content: "ViewModel + LiveData/StateFlow. Simple, widely used." },
                  { title: "MVI", content: "Unidirectional flow, more predictable for complex screens." },
                ],
              },
              {
                title: "Dagger/Hilt",
                slug: "android-interview-hilt",
                shortDescription: "Explain dependency injection and Hilt's role.",
                estimatedMinutes: 18,
                sections: [
                  { title: "DI", content: "Decouples components, improves testability." },
                  { title: "Hilt", content: "Simplifies Dagger setup for Android, provides scopes." },
                ],
              },
            ],
          },
          {
            title: "Concurrency and Performance",
            slug: "android-interview-concurrency",
            description: "Coroutines, Flows, and performance tuning.",
            topics: [
              {
                title: "Coroutines vs Threads",
                slug: "android-interview-coroutines",
                shortDescription: "Why coroutines are better for Android.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Coroutines", content: "Lightweight, structured concurrency, easy cancellation." },
                  { title: "Threads", content: "Heavy, resource‑intensive, harder to manage." },
                ],
              },
              {
                title: "Performance Optimization",
                slug: "android-interview-performance",
                shortDescription: "Memory leaks, ANR, and profiling.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Memory Leaks", content: "Common causes: static references to Activities, listeners not unregistered, inner classes holding implicit references." },
                  { title: "ANR (Application Not Responding)", content: "When the main thread is blocked for >5 seconds. Avoid network, file, or heavy operations on the main thread." },
                ],
              },
            ],
          },
          {
            title: "Security and Background",
            slug: "android-interview-security",
            description: "Security best practices and background limitations.",
            topics: [
              {
                title: "Background Restrictions",
                slug: "android-interview-background",
                shortDescription: "WorkManager vs Services.",
                estimatedMinutes: 18,
                sections: [
                  { title: "WorkManager", content: "Best for deferrable, guaranteed tasks." },
                  { title: "Foreground Services", content: "For user‑visible background tasks." },
                ],
              },
              {
                title: "Security",
                slug: "android-interview-security",
                shortDescription: "Encryption, SSL, and ProGuard.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Data Security", content: "Encrypt sensitive data, use HTTPS." },
                  { title: "ProGuard", content: "Obfuscate code to prevent reverse engineering." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(androidCategory);
  console.log("✓ Android Fundamentals category seeded (ultra‑detailed with many topics)");
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