async function loadSection(name) {
  const target = document.getElementById("output");

  try {
    const response = await fetch(`sections/${name}.html`);
    const html = await response.text();
    target.innerHTML = html;
  } catch (error) {
    target.innerHTML = `<p>Could not load section: ${name}</p>`;
  }
}