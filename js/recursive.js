// recursive.js
// Unified, recursive generative and translation system for Wiki2

// --- Generative logic ---
class LogicSet {
    generateSeed() {
        const seeds = [
            'The archipelago dreams in code.',
            'A rhizome of thought emerges.',
            'Desiring-machines assemble in the void.',
            'The marae of computation welcomes all voices.',
            'Singularity whispers in many tongues.'
        ];
        return seeds[Math.floor(Math.random() * seeds.length)];
    }
}

class CSPrinciples {
    applyPrinciples(data) {
        return `[CS] ${data} (modularity, recursion, emergence)`;
    }
}

class Innovations {
    transform(data) {
        const styles = [
            x => `${x}\n-- in the style of a cybernetic poet.`,
            x => `${x}\n-- as told by a marae elder.`,
            x => `${x}\n-- rendered in recursive code.`,
            x => `${x}\n-- with a voice from the archipelago.`,
            x => `${x}\n-- as a desiring-machine's manifesto.`,
            // Weirdee persona: surreal, playful, visual, odd
            x => `${x}\n-- as Weirdee would: 🦑✨ "${scramble(x)}" 🦷🌀\n<marquee style='color:#ff69b4;font-size:1.2em;'>${reverseWords(x)}</marquee>`
        ];
        function scramble(str) {
            return str.split('').sort(() => Math.random() - 0.5).join('');
        }
        function reverseWords(str) {
            return str.split(' ').reverse().join(' ');
        }
        return styles[Math.floor(Math.random() * styles.length)](data);
    }
}

class GenerativeSystem {
    constructor() {
        this.logic = new LogicSet();
        this.cs = new CSPrinciples();
        this.innovations = new Innovations();
    }
    run(seed = null, depth = 1, maxDepth = 5) {
        let data = seed || this.logic.generateSeed();
        data = this.cs.applyPrinciples(data);
        const result = this.innovations.transform(data);
        if (depth < maxDepth) {
            return result + '\n' + this.run(result, depth + 1, maxDepth);
        }
        return result;
    }
}

// --- Translation logic ---
async function fetchAndTranslate(url, translator) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch content');
    let text = await response.text();
    text = text.replace(/<script[\s\S]*?<\/script>/gi, '')
               .replace(/<style[\s\S]*?<\/style>/gi, '')
               .replace(/<[^>]+>/g, '');
    return translator(text);
}

function rhizomaticTranslate(input) {
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
        line => `🌈 [Whimsical Rhizome] ${line.trim()} 🌀`,
        // More visual/diagrammatic/ASCII/Unicode/SVG/HTML motifs:
        line => `┏━━━┓\n┃ ${line.trim()} ┃\n┗━━━┛`,
        line => `⎡${line.trim()}⎤`,
        line => `<svg width='100' height='20'><text x='0' y='15' font-size='15'>${line.trim()}</text></svg>`,
        line => `<span style='color:#6a0dad;font-weight:bold;'>✧ ${line.trim()} ✧</span>`,
        line => `🟩🟨🟦🟥🟧🟪\n${line.trim()}\n🟪🟧🟥🟦🟨🟩`,
        line => `【${line.trim()}】`,
        line => `▛▀▀▀▀▀▀▀▀▀▜\n${line.trim()}\n▙▄▄▄▄▄▄▄▄▄▟`,
        line => `⧉ ${line.trim()} ⧉`,
        line => `✿ ${line.trim()} ✿`,
        line => `⟦${line.trim()}⟧`,
        line => `⧫⧫⧫ ${line.trim()} ⧫⧫⧫`,
        line => `🖼️ <b>${line.trim()}</b> 🖼️`,
        line => `<div style='border:2px dashed #bada55;padding:2px;'>${line.trim()}</div>`
    ];
    const lines = input.split(/\n|\./).filter(Boolean);
    return lines.map(line => {
        const motif = motifs[Math.floor(Math.random() * motifs.length)];
        return motif(line);
    }).join('\n');
}

// --- Export for browser/global and Node.js ---
if (typeof window !== 'undefined') {
    window.GenerativeSystem = GenerativeSystem;
    window.fetchAndTranslate = fetchAndTranslate;
    window.rhizomaticTranslate = rhizomaticTranslate;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GenerativeSystem, fetchAndTranslate, rhizomaticTranslate };
}

// --- CLI entry point for Node.js ---
if (typeof require !== 'undefined' && require.main === module) {
    const arg = process.argv[2];
    if (arg === ':' || arg === 'run' || arg === 'emoji') {
        const system = new GenerativeSystem();
        const output = system.run();
        console.log('\n=== Generative Output ===\n');
        console.log(output);
    } else {
        console.log('Usage: node js/recursive.js :\nRuns the recursive generative system.');
    }
}
