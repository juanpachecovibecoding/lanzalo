const fs = require('fs');

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dash = dash.replace(/dni: patient\.dni \|\| '',/g, "tags: patient.tags || [],");
dash = dash.replace(/healthInsurance: patient\.healthInsurance \|\| ''/g, "");

// In the empty initialization:
dash = dash.replace(/dni: '',/g, "tags: [],");
dash = dash.replace(/healthInsurance: ''/g, "");

// Fix the UI table to show Tags instead of DNI column
// 1083         <th className="text-left font-bold text-slate-500 uppercase tracking-wider text-xs pb-4">Teléfono</th>
// wait, wait! I will just replace the specific JSX line if I find it by regex string.

fs.writeFileSync('src/components/Dashboard.tsx', dash);
