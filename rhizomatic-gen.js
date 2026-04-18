// rhizomatic-gen.js
// Asynchronous, rhizomatic, self-organizing content generator and HTML parser

const fs = require('fs');
const path = require('path');
const { GenerativeSystem } = require('./js/recursive.js');

// Utility: async sleep
const sleep = ms => new Promise(res => setTimeout(res, ms));

// 1. Async, rhizomatic, parallel generation
async function rhizomaticGenerate(startPoint, maxDepth = 3, visited = new Set()) {
  if (maxDepth <= 0 || visited.has(startPoint)) return [];
  visited.add(startPoint);
  const system = new GenerativeSystem();
  const result = system.run(startPoint, 1, 3);
  // Simulate async branching: spawn 2-3 new branches from motifs in result
  const motifs = Array.from(new Set(result.match(/\[(.*?)\]/g) || []));
  const branches = motifs.slice(0, 3).map(m => m.replace(/\[|\]/g, ''));
  const tasks = branches.map(b => rhizomaticGenerate(b, maxDepth - 1, visited));
  await sleep(100 + Math.random() * 200); // async flavor
  return [result, ...(await Promise.all(tasks)).flat()];
}

// 2. HTML parser: find generation points (e.g., <!--GENERATE:topic-->)
function findGenerationPoints(html) {
  const regex = /<!--GENERATE:([\w\- ]+)-->/g;
  const points = [];
  let match;
  while ((match = regex.exec(html))) {
    points.push(match[1]);
  }
  return points;
}

// 3. Book status tracker
const foundationalBooksFile = path.join(__dirname, 'foundational-books.json');
function markBookAsFoundational(bookPath) {
  let books = [];
  if (fs.existsSync(foundationalBooksFile)) {
    books = JSON.parse(fs.readFileSync(foundationalBooksFile, 'utf8'));
  }
  if (!books.includes(bookPath)) {
    books.push(bookPath);
    fs.writeFileSync(foundationalBooksFile, JSON.stringify(books, null, 2));
  }
}
function isBookFoundational(bookPath) {
  if (!fs.existsSync(foundationalBooksFile)) return false;
  const books = JSON.parse(fs.readFileSync(foundationalBooksFile, 'utf8'));
  return books.includes(bookPath);
}

// 4. Main: scan HTML, generate as needed, mark books
async function processHtmlFile(htmlPath) {
  if (isBookFoundational(htmlPath)) {
    console.log(`Skipping foundational book: ${htmlPath}`);
    return;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const points = findGenerationPoints(html);
  if (points.length === 0) {
    markBookAsFoundational(htmlPath);
    console.log(`Marked as foundational: ${htmlPath}`);
    return;
  }
  for (const point of points) {
    const generations = await rhizomaticGenerate(point, 2);
    // Replace the first occurrence of the generation marker with generated content
    const marker = `<!--GENERATE:${point}-->`;
    const newHtml = html.replace(marker, generations.join('\n'));
    fs.writeFileSync(htmlPath, newHtml, 'utf8');
    console.log(`Generated for ${point} in ${htmlPath}`);
  }
}

// CLI: node rhizomatic-gen.js file1.html file2.html ...
if (require.main === module) {
  const files = process.argv.slice(2);
  (async () => {
    for (const file of files) {
      await processHtmlFile(path.resolve(file));
    }
  })();
}
