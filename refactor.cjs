const fs = require('fs');

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// 1. DNI -> Phone everywhere in strings
dash = dash.replace(/DNI/g, 'Teléfono / WhatsApp');
dash = dash.replace(/dni/g, 'phone');
// Fix cases where it says "Teléfono / WhatsApp" in variable names by only matching specific places
let b = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Instead of global replace which breaks code, let's use carefully crafted lines.

// Table headers
b = b.replace(/<th className="text-left font-bold text-slate-500 uppercase tracking-wider text-xs pb-4">DNI<\/th>/g, 
              '<th className="text-left font-bold text-slate-500 uppercase tracking-wider text-xs pb-4">Teléfono<\/th>');
b = b.replace(/<div className="font-medium text-slate-900">\{patient\.dni\}<\/div>/g, 
              '<div className="font-medium text-slate-900">{patient.phone}</div>');

// Forms
b = b.replace(/<label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1\.5">DNI<\/label>/g, 
              '<label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Teléfono</label>');

b = b.replace(/<input type="text" value=\{patientForm\.dni\} onChange=\{e => setPatientForm\(\{\.\.\.patientForm, dni: e\.target\.value\}\)\} className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white" required \/>/g, 
              '<input type="tel" value={patientForm.phone} onChange={e => setPatientForm({...patientForm, phone: e.target.value})} className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white" required />');

b = b.replace(/dni: ''/g, "phone: ''");
b = b.replace(/dni: p\.dni/g, "phone: p.phone");

// Delete calendar UI
// We will simply replace the whole Agenda UI with a Catalog UI

fs.writeFileSync('src/components/Dashboard.tsx', b);
