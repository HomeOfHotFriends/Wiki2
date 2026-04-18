// Core logic and abstractions for the generative system
const { LogicSet } = require('./logic');
const { CSPrinciples } = require('./cs_principles');
const { Innovations } = require('./innovations');
const fs = require('fs');
const path = require('path');

class GenerativeSystem {
    constructor() {
        this.logic = new LogicSet();
        this.cs = new CSPrinciples();
        this.innovations = new Innovations();
    }

    run(seed = null, depth = 1, maxDepth = 5) {
        console.log(`[GenerativeSystem] Generation at depth ${depth}...`);
        let data = seed || this.logic.generateSeed();
        data = this.cs.applyPrinciples(data);
        const result = this.innovations.transform(data);
        const outputDir = path.join(__dirname, 'output');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        const outFile = path.join(outputDir, `generated_${depth}.txt`);
        fs.writeFileSync(outFile, String(result));
        console.log(`[GenerativeSystem] Generation complete. Output in ${outFile}`);
        // Recursive/agent-based generation
        if (depth < maxDepth) {
            // Each new agent uses the previous result as its seed
            this.run(result, depth + 1, maxDepth);
        }
    }
}

module.exports = { GenerativeSystem };