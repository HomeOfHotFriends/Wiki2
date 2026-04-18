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


function crossPollinate(contents) {
  // Mix lines from all sections, shuffle, and return a remix
  const allLines = contents.flatMap(c => c.split(/\n/).filter(Boolean));
  for (let i = allLines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allLines[i], allLines[j]] = [allLines[j], allLines[i]];
  }
  return allLines.slice(0, Math.max(10, Math.floor(allLines.length/sections.length))).join('\n');
}

function generateBook(bookName, outDir, depth = 5) {
  const system = new GenerativeSystem();
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  let toc = [];
  let sectionContents = [];
  // First pass: generate each section
  sections.forEach(section => {
    const content = system.run(section, 1, depth);
    sectionContents.push(content);
  });
  // Second pass: cross-pollinate and rewrite each section
  sections.forEach((section, idx) => {
    // Mix in content from other sections
    const remix = crossPollinate(sectionContents.filter((_,i) => i !== idx));
    const combined = sectionContents[idx] + '\n\n--- Cross-Pollination ---\n' + remix;
    const fileName = `${section.replace(/\s+/g,'-')}.md`;
    fs.writeFileSync(path.join(outDir, fileName), generateSection(section, combined));
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
