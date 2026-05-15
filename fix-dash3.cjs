const fs = require('fs');

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// 1. Fix types constraint
dash = dash.replace(/useState<'agenda' \| 'suscriptores' \| 'flujos' \| 'configuracion' \| 'soporte' \| 'perfil' \| 'admin'>\('agenda'\)/, "useState<string>('articulos')");
// wait, the default was `agenda` right after login.
// `useState<'agenda' ...` -> I should just replace `useState<'agenda'` with `useState<string>('articulos'` or carefully match it.
dash = dash.replace(/useState<'[^>]+'>\('agenda'\)/, "useState<string>('articulos')");

// 2. Fix the imports
dash = dash.replace("import { LATAM_COUNTRIES } from '../constants';", "import { LATAM_COUNTRIES } from '../constants';\nimport ArticlesTab from './ArticlesTab';\nimport LaunchesTab from './LaunchesTab';\nimport { ShoppingBag, Rocket as RocketIcon } from 'lucide-react';");

// 3. Fix the duplicated phone: ''
dash = dash.replace(/phone: '',\n\s*phonePrefix:/, "phonePrefix:");

fs.writeFileSync('src/components/Dashboard.tsx', dash);
