// bookgen.js
// Automates and links the recursive generative system to book generation

const fs = require('fs');
const path = require('path');

// Import the recursive generative system
const { GenerativeSystem } = require('./js/recursive.js');

// Book section templates
const sections = [
  'Seed Teachings',
  'Emergent Practices',
  'Cross-Synthesis',
  'Recursive Prompts',
  'Whakapapa Map'
];

function generateSection(title, content) {
  return `---\ntitle: ${title}\ndate: ${new Date().toISOString().slice(0,10)}\n---\n\n# ${title}\n\n${content}\n`;
}

function generateBook(bookName, outDir, depth = 5) {
  const system = new GenerativeSystem();
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  let toc = [];
  sections.forEach(section => {
    const content = system.run(section, 1, depth);
    const fileName = `${section.replace(/\s+/g,'-')}.md`;
    fs.writeFileSync(path.join(outDir, fileName), generateSection(section, content));
    toc.push(`- [${section}](${fileName})`);
  });
  // Write a main book file with TOC
  const main = `---\ntitle: ${bookName}\ndate: ${new Date().toISOString().slice(0,10)}\n---\n\n# ${bookName}\n\n## Table of Contents\n\n${toc.join('\n')}\n`;
  fs.writeFileSync(path.join(outDir, `Book-of-${bookName.replace(/\s+/g,'-')}.md`), main);
}

// CLI usage: node bookgen.js BookName [outDir] [depth]
if (require.main === module) {
  const bookName = process.argv[2] || 'Generative-Esoterica';
  const outDir = process.argv[3] || `books/${bookName.replace(/\s+/g,'-')}`;
  const depth = parseInt(process.argv[4] || '5', 10);
  generateBook(bookName, outDir, depth);
  console.log(`Book generated: ${outDir}`);
}
