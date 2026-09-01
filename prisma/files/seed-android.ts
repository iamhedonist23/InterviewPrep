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
    ],
  };

  await ensureCategory(androidCategory);
  console.log("✓ Android Fundamentals category seeded");
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
