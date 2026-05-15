const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace('<Route path="/reservar/:clinicId" element={<BookingPortal />} />', '<Route path="/catalogo/:clinicId" element={<BookingPortal />} />');
fs.writeFileSync('src/App.tsx', app);

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
dash = dash.replace(/portal de reservas/g, 'catálogo web');
dash = dash.replace(/portal/g, 'catálogo');

// Add the link display for the admin
// Let's find "1134:                                       <p className="text-slate-500 text-sm">Los suscriptores aparecerán aquí cuando se registren a través de WhatsApp o el catálogo web.</p>"
// and add a button to visit their catalog
dash = dash.replace(
  '<p className="text-slate-500 text-sm">Los suscriptores aparecerán aquí cuando se registren a través de WhatsApp o el catálogo web.</p>',
  \`<p className="text-slate-500 text-sm">Los suscriptores aparecerán aquí cuando se registren a través de WhatsApp o tu catálogo web.</p>
                                       <div className="mt-4 flex gap-3 justify-center">
                                         <a href={\`/catalogo/\${user.uid}\`} target="_blank" className="text-indigo-600 hover:text-indigo-700 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-lg flex items-center gap-2">
                                           Ver Catálogo Público
                                         </a>
                                         <button onClick={() => { navigator.clipboard.writeText(window.location.origin + '/catalogo/' + user.uid); alert('Link copiado'); }} className="text-slate-600 hover:text-slate-700 font-bold text-sm bg-slate-100 px-4 py-2 rounded-lg flex items-center gap-2">
                                           Copiar Link
                                         </button>
                                       </div>\`
);

fs.writeFileSync('src/components/Dashboard.tsx', dash);
