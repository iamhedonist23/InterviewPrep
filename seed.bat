Set-Location "D:\Interview Website"

$seeds = @(
  "seed.ts",
  "seed-learn.ts",
  "seed-study.ts",
  "seed-advance-java.ts",
  "seed-android.ts",
  "seed-api-web-services.ts",
  "seed-cs-fundamentals.ts",
  "seed-data-science.ts",
  "seed-devops.ts",
  "seed-digital-marketing.ts",
  "seed-dsa.ts",
  "seed-generative-ai.ts",
  "seed-html-css.ts",
  "seed-java.ts",
  "seed-js.ts",
  "seed-kotlin.ts",
  "seed-ml.ts",
  "seed-nextjs.ts",
  "seed-presales.ts",
  "seed-python.ts",
  "seed-qa.ts",
  "seed-react.ts",
  "seed-security-cybersecurity.ts",
  "seed-software-engineer.ts",
  "seed-springboot.ts",
  "seed-sql.ts",
  "seed-systemdesign.ts",
  "seed-typescript.ts",
  "seed-webdev.ts"
)

foreach ($seed in $seeds) {
  Write-Host "Running $seed..."
  npx tsx "prisma/$seed"
  if ($LASTEXITCODE -ne 0) {
    throw "Seed failed: $seed"
  }
}

Write-Host "All seeds completed successfully."