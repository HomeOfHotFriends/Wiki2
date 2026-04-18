// encyclopaedia-gen.js
// Builds encyclopaedia.html by treating all book sections as source code for unique construction

const fs = require('fs');
const path = require('path');

const booksDir = path.join(__dirname, 'books');
const outputFile = path.join(__dirname, 'encyclopaedia.html');

function getAllBookSections() {
  const sections = [];
  fs.readdirSync(booksDir, { withFileTypes: true }).forEach(entry => {
    if (entry.isDirectory()) {
      const dir = path.join(booksDir, entry.name);
      fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.md')) {
          const content = fs.readFileSync(path.join(dir, file), 'utf8');
          sections.push({
            book: entry.name,
            file,
            content
          });
        }
      });
    }
  });
  return sections;
}

function remixSections(sections) {
  // Shuffle and interleave lines from all sections for a unique encyclopaedia
  const allLines = sections.flatMap(s => s.content.split(/\n/).filter(Boolean));
  for (let i = allLines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allLines[i], allLines[j]] = [allLines[j], allLines[i]];
  }
  return allLines;
}

function buildEncyclopaedia() {
  const sections = getAllBookSections();
  const remixed = remixSections(sections);
  const html = `<!DOCTYPE html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8'>\n<title>Rhizomatic Encyclopaedia</title>\n<style>body{background:#0a0f0a;color:#eaffea;font-family:monospace;max-width:900px;margin:0 auto;padding:2em;} .entry{margin-bottom:1.5em;} .book{color:#bada55;} .file{color:#88ff88;} </style>\n</head>\n<body>\n<h1>Rhizomatic Encyclopaedia</h1>\n<section>\n${remixed.map(line => `<div class='entry'>${line}</div>`).join('')}\n</section>\n</body>\n</html>`;
  fs.writeFileSync(outputFile, html);
  console.log('Encyclopaedia generated:', outputFile);
}

if (require.main === module) {
  buildEncyclopaedia();
}
