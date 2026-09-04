const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prisma', 'article-seed.ts');

let content = fs.readFileSync(filePath, 'utf8');

// Replace \"...` with "..."
content = content.replace(/\\"([^`]*)\`/g, '"$1"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed stray backticks in article-seed.ts');