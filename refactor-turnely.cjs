const fs = require('fs');

function replaceWords(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/Turnely/g, 'Lanzalo');
  content = content.replace(/turnely/g, 'lanzalo');
  fs.writeFileSync(filePath, content);
}

replaceWords('src/components/Dashboard.tsx');
replaceWords('server.ts');
