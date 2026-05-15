const fs = require('fs');

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace DNI Block from 1159-1168 with Etiquetas Block
const dniBlock = `                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">DNI</label>
                      <input 
                        type="text"
                        required
                        value={patientForm.dni}
                        onChange={e => setPatientForm({...patientForm, dni: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                      />
                    </div>`;

const labelsBlock = `                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Etiquetas (separadas por coma)</label>
                      <input 
                        type="text"
                        placeholder="Ej: Ofertas, Verano, Vip"
                        value={patientForm.tags ? patientForm.tags.join(', ') : ''}
                        onChange={e => setPatientForm({...patientForm, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                      />
                    </div>`;

dash = dash.replace(dniBlock, labelsBlock);

// Replace "Nuevo Paciente" / "Editar Paciente" with "Suscriptor"
dash = dash.replace(/'Editar Paciente' : 'Nuevo Paciente'/g, "'Editar Suscriptor' : 'Nuevo Suscriptor'");

// Replace "Obra Social" with "Notas" or drop it. Let's just drop it.
const obraSocialBlock = `                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Obra Social</label>
                      <input 
                        type="text"
                        value={patientForm.healthInsurance}
                        onChange={e => setPatientForm({...patientForm, healthInsurance: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                      />
                    </div>`;
dash = dash.replace(obraSocialBlock, "");

// In handleSavePatient, we need to map tags to the database
// The code earlier had this: 
//         await updateDoc(doc(db, 'clinics', user.uid, 'patients', patientForm.id), {
//           name: patientForm.name || '',
//           dni: patientForm.dni || '',
//           email: patientForm.email || '',
// Wait, let's find the `updateDoc` and `addDoc` for patients and update it using regex
dash = dash.replace(/dni: patientForm\.dni \|\| '',/g, "tags: patientForm.tags || [],");
dash = dash.replace(/healthInsurance: patientForm\.healthInsurance \|\| '',/g, "");

fs.writeFileSync('src/components/Dashboard.tsx', dash);
