# CYBERREELS SOCIAL — AI Image Generator real

## Requisitos
- Node.js 18+ (recomendado Node 20)
- API key de OpenAI con acceso a generación de imágenes y facturación habilitada

## Ejecutar local
1. En la carpeta del proyecto configura `OPENAI_API_KEY` como variable de entorno. Nunca la pongas en `index.html` ni la subas a GitHub.
2. PowerShell:
   ```powershell
   $env:OPENAI_API_KEY="tu_api_key"
   npm start
   ```
   macOS/Linux:
   ```bash
   export OPENAI_API_KEY="tu_api_key"
   npm start
   ```
3. Abre `http://localhost:3000`.
4. Prueba `http://localhost:3000/api/health`. Debe responder `{"ok":true,"configured":true}` si la variable está configurada.

## Despliegue en Render
1. Sube la carpeta `CYBERREELS_SOCIAL` a un repositorio GitHub propio.
2. En Render crea un **Blueprint** desde ese repositorio; detectará `render.yaml`.
3. En Environment agrega el secreto `OPENAI_API_KEY` (pega tu clave directamente en Render, nunca en el repositorio).
4. Despliega el servicio Node. Render asignará una URL HTTPS.
5. Abre la URL del servicio y usa el generador. El frontend y `/api/generate-image` quedan en el mismo servicio.
6. Comprueba `/api/health`; `configured` debe ser `true`.

## Seguridad / costos
- No publiques la API key ni la incluyas en HTML, JavaScript o commits.
- La generación real usa la API de OpenAI y puede generar costos. Revisa límites y uso en tu cuenta.
- Si se publica para otros usuarios, agrega autenticación, límites de uso y protección contra abuso antes de compartirlo.
- GitHub Pages solo sirve archivos estáticos; no ejecuta `server.js`. Para el generador real usa este backend Node.

## Publicar fotos como Reels

Abre `index.html`, pulsa **PUBLICAR FOTO / REEL**, selecciona imágenes, agrega título/descripción y publica. La demo guarda posts en localStorage del navegador; son locales a ese navegador/dispositivo y no se sincronizan entre usuarios.
