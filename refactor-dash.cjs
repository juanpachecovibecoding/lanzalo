const fs = require('fs');

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace standard variables
dash = dash.replace(/DNI/g, 'Teléfono');
dash = dash.replace(/dni:/g, 'phone:');
dash = dash.replace(/patient\.dni/g, 'patient.phone');

// We have activeTab === 'agenda'
// Let's replace 'agenda' with 'articulos' globally where it makes sense
dash = dash.replace(/activeTab === 'agenda'/g, "activeTab === 'articulos'");
dash = dash.replace(/setActiveTab\('agenda'\)/g, "setActiveTab('articulos')");
dash = dash.replace(/Agenda/g, 'Artículos');

fs.writeFileSync('src/components/Dashboard.tsx', dash);
