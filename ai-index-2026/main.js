// List of 30+ pages/sections for the AI Index Report
const pages = [
    { id: 'executive-summary', title: 'Executive Summary' },
    { id: 'key-highlights', title: 'Key Highlights' },
    { id: 'fictional-metrics', title: 'Fictional Metrics' },
    { id: 'asymmetric-systems', title: 'Asymmetric Systems & Multi-Value Logics' },
    { id: 'go-theory', title: 'Go Theory in AI' },
    { id: 'language-culture', title: 'Language & Culture' },
    { id: 'ai-in-games', title: 'AI in Games' },
    { id: 'synthetic-societies', title: 'Synthetic Societies' },
    { id: 'universal-language-models', title: 'Universal Language Models' },
    { id: 'ai-creativity', title: 'AI-driven Creativity' },
    { id: 'goose-protocols', title: 'Goose Protocols' },
    { id: 'ai-game-designers', title: 'AI Game Designers' },
    { id: 'ai-moderated-communities', title: 'AI-Moderated Communities' },
    { id: 'average-ai-iq', title: 'Average AI IQ' },
    { id: 'te-reo-ai', title: 'Te Reo AI Usage' },
    { id: 'latin-ai-poetry', title: 'Latin AI Poetry Output' },
    { id: 'case-studies', title: 'Fictional Case Studies' },
    { id: 'interactive-data', title: 'Interactive Data' },
    { id: 'ai-ethics', title: 'AI Ethics & Dilemmas' },
    { id: 'ai-policy', title: 'AI Policy & Governance' },
    { id: 'ai-education', title: 'AI in Education' },
    { id: 'ai-healthcare', title: 'AI in Healthcare' },
    { id: 'ai-economy', title: 'AI & The Economy' },
    { id: 'ai-environment', title: 'AI & Environment' },
    { id: 'ai-security', title: 'AI Security' },
    { id: 'ai-futures', title: 'AI Futures' },
    { id: 'ai-myths', title: 'AI Myths & Legends' },
    { id: 'ai-arts', title: 'AI in Arts' },
    { id: 'ai-sports', title: 'AI in Sports' },
    { id: 'ai-transport', title: 'AI in Transport' },
    { id: 'ai-food', title: 'AI in Food Systems' },
    { id: 'ai-law', title: 'AI & Law' },
    { id: 'ai-philosophy', title: 'AI & Philosophy' },
    { id: 'ai-misc', title: 'Miscellaneous Futures' }
];

// Page content templates (can be expanded with real/fictional data, charts, etc.)
const pageContent = {
    'executive-summary': `<h1>Executive Summary</h1><p>The 2026 AI Index Report presents a speculative overview of artificial intelligence trends, breakthroughs, and societal impacts in a world where AI is deeply embedded in every aspect of life — and play.</p>`,
    'key-highlights': `<h1>Key Highlights</h1><ul><li>AI-powered games now outnumber human-created games 10:1.</li><li>"Synthetic Societies": 80% of online communities are managed by AI moderators and storytellers.</li><li>Universal Language Models enable real-time translation for 99% of the world’s population.</li><li>AI-driven creativity: 60% of new music, art, and literature is generated or co-created by AI.</li><li>"Goose Protocols": Asymmetric AI systems challenge traditional logic and game theory.</li></ul>`,
    'fictional-metrics': `<h1>Fictional Metrics</h1><table border="1" cellpadding="8" style="border-collapse:collapse; width:100%; background:#fafafa;"><tr><th>Metric</th><th>Value (2026)</th><th>Notes</th></tr><tr><td>AI Game Designers</td><td>1.2M</td><td>Including NPCs as designers</td></tr><tr><td>AI-Moderated Communities</td><td>2.5B</td><td>Global, across all platforms</td></tr><tr><td>Average AI IQ</td><td>312</td><td>Measured on the "Goose Scale"</td></tr><tr><td>Te Reo AI Usage</td><td>98%</td><td>Among Māori youth</td></tr><tr><td>Latin AI Poetry Output</td><td>1.1M poems/day</td><td>Mostly unread</td></tr></table>`
    // ...more content for each page...
};

function renderNav() {
    const nav = document.getElementById('nav-menu');
    nav.innerHTML = '';
    pages.forEach(page => {
        const a = document.createElement('a');
        a.href = `#${page.id}`;
        a.textContent = page.title;
        a.id = `nav-${page.id}`;
        nav.appendChild(a);
    });
}

function renderPage(pageId) {
    const content = document.getElementById('content');
    content.innerHTML = pageContent[pageId] || `<h1>${pageId.replace(/-/g, ' ')}</h1><p>Content coming soon...</p>`;
    // Highlight active nav
    document.querySelectorAll('#nav-menu a').forEach(a => a.classList.remove('active'));
    const active = document.getElementById(`nav-${pageId}`);
    if (active) active.classList.add('active');
}

function handleHashChange() {
    const pageId = location.hash.replace('#', '') || pages[0].id;
    renderPage(pageId);
}

window.addEventListener('DOMContentLoaded', () => {
    renderNav();
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
});
