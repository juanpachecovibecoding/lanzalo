const fs = require('fs');
let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dash = dash.replace(
  "systemInstruction: systemPrompt || clinic?.systemPrompt || defaultPrompt,",
  "systemInstruction: (systemPrompt || clinic?.systemPrompt || defaultPrompt) + `\\n\\nIMPORTANTE: Si el usuario quiere ver el catálogo completo o suscribirse para recibir novedades y ofertas, debes enviarle este enlace: ${window.location.origin}/catalogo/${clinic?.id}`,"
);

fs.writeFileSync('src/components/Dashboard.tsx', dash);
