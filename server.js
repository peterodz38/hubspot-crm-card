require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 Servidor en ejecución correctamente');
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});


app.get('/crm-card', (req, res) => {
    console.log("📩 Recibiendo solicitud de HubSpot...");
    
    // ID del contacto en HubSpot (si se recibe)
    const contactId = req.query.hs_object_id || "TEST_CONTACT";
    
    console.log(`📞 Generando CRM Card para contacto ID: ${contactId}`);

    // Estructura de la CRM Card
    const cardData = {
        "results": [
            { 
                "objectId": contactId,
                "title": "📄 Generación de Documentos",
                "primaryAction": {
                    "type": "ACTION_HOOK",
                    "httpMethod": "POST",
                    "uri": "https://hubspot-crm-card.onrender.com/generar-documento",
                    "label": "📄 Generar Documento"
                }
            }
        ]
    };

    console.log("✅ CRM Card generada correctamente:", JSON.stringify(cardData, null, 2));

    res.json(cardData);
});
