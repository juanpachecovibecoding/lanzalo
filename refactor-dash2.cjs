const fs = require('fs');

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// 1. Add imports for ArticlesTab and LaunchesTab
dash = dash.replace("import BookingPortal from './BookingPortal';", "import BookingPortal from './BookingPortal';\nimport ArticlesTab from './ArticlesTab';\nimport LaunchesTab from './LaunchesTab';\nimport { ShoppingBag, Rocket as RocketIcon } from 'lucide-react';");

// 2. Change the 'agenda' nav button to 'articulos' -> Catálogo
const oldAgendaButton = `          <button 
            onClick={() => { setActiveTab('agenda'); setIsSidebarOpen(false); }}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all \${activeTab === 'agenda' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}\`}
          >
            <Calendar className="w-5 h-5" />
            Agenda
          </button>`;

const newArticlesNav = `          <button 
            onClick={() => { setActiveTab('articulos'); setIsSidebarOpen(false); }}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all \${activeTab === 'articulos' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}\`}
          >
            <ShoppingBag className="w-5 h-5" />
            Catálogo
          </button>
          <button 
            onClick={() => { setActiveTab('lanzamientos'); setIsSidebarOpen(false); }}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all \${activeTab === 'lanzamientos' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}\`}
          >
            <RocketIcon className="w-5 h-5" />
            Lanzamientos
          </button>`;

// A bit generic so it works even after our manual sed earlier
// Actually we replaced "Agenda" with "Difusiones", let's use exact find using substring or regex:
dash = dash.replace(/<button \n\s*onClick=\{\(\) => \{ setActiveTab\('agenda'\); setIsSidebarOpen\(false\); \}\}\n\s*className=\{\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all \$\{activeTab === 'agenda' \? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'\}\`\}\n\s*>\n\s*<Calendar className="w-5 h-5" \/>\n\s*.*?\n\s*<\/button>/s, newArticlesNav);

// Replace headers corresponding to activeTab
dash = dash.replace("{activeTab === 'agenda' && 'Agenda'}", "{activeTab === 'articulos' && 'Catálogo'}\n                 {activeTab === 'lanzamientos' && 'Lanzamientos'}");
// We had already replaced some stuff earlier! Oh, in `replace.js` the user replaced some things.
dash = dash.replace("{activeTab === 'agenda' && 'Difusión y Campañas'}", "{activeTab === 'articulos' && 'Catálogo'}\n                 {activeTab === 'lanzamientos' && 'Lanzamientos'}");

// Delete TAB: AGENDA
// Let's find index of "TAB: AGENDA" and "TAB: PACIENTES"
const idxAgenda = dash.indexOf("{/* TAB: AGENDA */}");
const idxPacientes = dash.indexOf("{/* TAB: PACIENTES */}");
if (idxAgenda !== -1 && idxPacientes !== -1) {
    const before = dash.substring(0, idxAgenda);
    const after = dash.substring(idxPacientes);
    dash = before + "{/* TAB: CATÁLOGO */}\n          {activeTab === 'articulos' && <ArticlesTab clinicId={clinic?.id} />}\n\n          {/* TAB: LANZAMIENTOS */}\n          {activeTab === 'lanzamientos' && <LaunchesTab clinicId={clinic?.id} />}\n\n          " + after;
}

// Rename Pacientes to Suscriptores in the header
dash = dash.replace(/>Pacientes</s, '>Suscriptores<');

fs.writeFileSync('src/components/Dashboard.tsx', dash);
