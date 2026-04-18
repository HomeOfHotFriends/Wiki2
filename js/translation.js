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
  // Motifs
  const motifs = [
    line => `🌱 [Rhizome] ${line.trim()} 🌱`,
    line => `🧙‍♂️ [Druidic] ${line.trim()} ✨`,
    line => `🧚 [Fae] ${line.trim()} 🦋`,
    line => `🔬 [Periodic Table: H] ${line.trim()} [He]`,
    line => `🎠 [Whimsy] ${line.trim()} 🎩`,
    line => `🌿 [Rhizomatic] ${line.trim()} 🍄`,
    line => `🌳 [Druid] ${line.trim()} 🍃`,
    line => `🧪 [Elemental] ${line.trim()} ⚗️`,
    line => `🦄 [Fae Whimsy] ${line.trim()} 🧝`,
    line => `🌈 [Whimsical Rhizome] ${line.trim()} 🌀`
  ];
  const lines = input.split(/\n|\./).filter(Boolean);
  return lines.map(line => {
    const motif = motifs[Math.floor(Math.random() * motifs.length)];
    return motif(line);
  }).join('\n');
}

// Example usage:
// fetchAndTranslate('https://www.gutenberg.org/files/1342/1342-0.txt', rhizomaticTranslate)
//   .then(translated => { document.getElementById('output').innerText = translated; });

window.fetchAndTranslate = fetchAndTranslate;
window.rhizomaticTranslate = rhizomaticTranslate;
