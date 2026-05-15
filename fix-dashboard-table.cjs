const fs = require('fs');
let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dash = dash.replace(
`<th className="px-6 py-4 border-b border-slate-100">DNI</th>`,
`<th className="px-6 py-4 border-b border-slate-100">Etiquetas</th>`
);

dash = dash.replace(
`<th className="px-6 py-4 border-b border-slate-100">Obra Social</th>`,
``
);

dash = dash.replace(
`<td className="px-6 py-4 text-sm text-slate-600">{p.dni}</td>`,
`<td className="px-6 py-4 text-sm text-slate-600">
  <div className="flex flex-wrap gap-1">
     {p.tags?.map((t: string) => (
        <span key={t} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{t}</span>
     ))}
  </div>
</td>`
);

dash = dash.replace(
`<td className="px-6 py-4 text-sm text-slate-600">{p.healthInsurance || '-'}</td>`,
``
);

fs.writeFileSync('src/components/Dashboard.tsx', dash);
