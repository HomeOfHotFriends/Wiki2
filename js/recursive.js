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
            x => `${x}\n-- as a desiring-machine's manifesto.`
        ];
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
        line => `🌈 [Whimsical Rhizome] ${line.trim()} 🌀`
    ];
    const lines = input.split(/\n|\./).filter(Boolean);
    return lines.map(line => {
        const motif = motifs[Math.floor(Math.random() * motifs.length)];
        return motif(line);
    }).join('\n');
}

// --- Export for browser/global ---
window.GenerativeSystem = GenerativeSystem;
window.fetchAndTranslate = fetchAndTranslate;
window.rhizomaticTranslate = rhizomaticTranslate;
