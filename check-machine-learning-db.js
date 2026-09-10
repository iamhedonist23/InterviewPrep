const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  try {
    const category = await prisma.studyCategory.findFirst({
      where: { slug: 'machine-learning' },
      select: {
        id: true,
        name: true,
        slug: true,
        isPublished: true,
        _count: {
          select: {
            topics: {
              where: { isPublished: true }
            }
          }
        },
        paths: {
          where: { isPublished: true },
          select: {
            id: true,
            name: true,
            slug: true,
            level: true,
            _count: {
              select: {
                modules: { where: { isPublished: true } }
              }
            }
          }
        }
      }
    });

    console.log(JSON.stringify(category, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
