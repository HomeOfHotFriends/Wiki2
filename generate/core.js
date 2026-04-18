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

    run() {
        console.log('[GenerativeSystem] Starting generation...');
        let data = this.logic.generateSeed();
        data = this.cs.applyPrinciples(data);
        const result = this.innovations.transform(data);
        const outputDir = path.join(__dirname, 'output');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        fs.writeFileSync(path.join(outputDir, 'generated.txt'), String(result));
        console.log('[GenerativeSystem] Generation complete. Output in output/generated.txt');
    }
}

module.exports = { GenerativeSystem };