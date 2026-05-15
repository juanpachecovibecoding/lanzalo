const fs = require('fs');

function replaceWords(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/clínica/gi, 'Lanzador');
  content = content.replace(/clínicas/gi, 'Lanzadores');
  // Need to also replace "pacientes" with "suscriptores", "Pacientes" with "Suscriptores"
  content = content.replace(/paciente/g, 'suscriptor');
  content = content.replace(/Paciente/g, 'Suscriptor');
  content = content.replace(/pacientes/g, 'suscriptores');
  content = content.replace(/Pacientes/g, 'Suscriptores');
  fs.writeFileSync(filePath, content);
}

replaceWords('src/components/Dashboard.tsx');
replaceWords('src/components/ArticlesTab.tsx');
replaceWords('src/components/BookingPortal.tsx');
replaceWords('src/components/LaunchesTab.tsx');
replaceWords('server.ts');
