const fs = require('fs');

let dash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dash = dash.replace(
  "Eres un asistente de soporte experto en Lanzalo, una aplicación web de marketing para marcas.\\nTu deber es asistir al administrador del lanzamiento que usa la app.\\nFunciones principales de Lanzalo:\\n- Agenda (Difusiones): Panel para gestionar las categorías de novedades.\\n- Pacientes (Suscriptores): Lista de usuarios interesados en las categorías.\\n- Flujos AI: Ajuste del prompt del bot.",
  "Eres un asistente de soporte experto en Lanzalo, una aplicación web de marketing y campañas para tiendas y marcas.\\nTu deber es asistir al administrador de la tienda.\\nFunciones principales de Lanzalo:\\n- Catálogo: Panel para gestionar los artículos y productos a lanzar.\\n- Lanzamientos: Módulo para armar una campaña eligiendo productos y la audiencia segmentada por etiquetas.\\n- Suscriptores: Lista de usuarios de la tienda y sus etiquetas de interés.\\n- Flujos AI: Ajuste del prompt del bot de ventas."
);

dash = dash.replace(
  "Eres un asistente virtual amable y servicial para responder consultas médicas y agendar pacientes.",
  "Eres un experto vendedor de la tienda. Tu objetivo es generar interés en los nuevos artículos y responder a las consultas de compra basándote en el catálogo."
);

dash = dash.replace(
  "Eres un asistente virtual para la ${clinic?.name}. Responde amablemente y pregunta por el nombre del paciente si es la primera vez.",
  "Eres un vendedor estrella de la tienda ${clinic?.name}. Saluda con entusiasmo y siempre intenta cerrar la venta sin ser insistente."
);

dash = dash.replace(
  "Agrega las instrucciones específicas sobre los precios, horarios de atención, especialidad ({clinic?.specialty}) o el tono con el que el bot debe contestarle a los pacientes en WhatsApp.",
  "Agrega las instrucciones específicas sobre el tono de la marca ({clinic?.specialty}), promociones vigentes, o políticas de cambios y devoluciones para que el bot responda correctamente en WhatsApp."
);

dash = dash.replace(
  "Turnely...",
  "Lanzalo..."
);

// We should also replace the UI names from "Clínica" to "Tienda" and "Paciente" to "Suscriptor"
// But not variable names to avoid breaking
dash = dash.replace(/Clínica/g, "Tienda");
dash = dash.replace(/Paciente/g, "Suscriptor");
dash = dash.replace(/pacientes/g, "suscriptores");

fs.writeFileSync('src/components/Dashboard.tsx', dash);
