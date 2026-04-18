// Logic sets and rules for the generative system
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

module.exports = { LogicSet };