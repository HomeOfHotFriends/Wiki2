// translation.js
// Fetches open source/CC/public content, translates it, and returns for use in the simulated Rhizowiki

async function fetchAndTranslate(url, translator) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch content');
  let text = await response.text();
  // Basic filter: strip scripts, style, and HTML tags
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '')
             .replace(/<style[\s\S]*?<\/style>/gi, '')
             .replace(/<[^>]+>/g, '');
  // Pass through translation system
  return translator(text);
}

// Example translation: creative remix
function rhizomaticTranslate(input) {
  // Simulate a creative, rhizomatic translation
  const lines = input.split(/\n|\./).filter(Boolean);
  return lines.map(line => `🌱 ${line.trim()} 🌱`).join('\n');
}

// Example usage:
// fetchAndTranslate('https://www.gutenberg.org/files/1342/1342-0.txt', rhizomaticTranslate)
//   .then(translated => { document.getElementById('output').innerText = translated; });

window.fetchAndTranslate = fetchAndTranslate;
window.rhizomaticTranslate = rhizomaticTranslate;
