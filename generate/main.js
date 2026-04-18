// Entry point for the generative system
const { GenerativeSystem } = require('./core');

function main() {
    const system = new GenerativeSystem();
    system.run();
}

if (require.main === module) {
    main();
}