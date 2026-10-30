# CYBERREELS SOCIAL — AI Image Generator real

## Requisitos
- Node.js 18 o superior
- Una API key de OpenAI con acceso a generación de imágenes y facturación configurada

## Ejecutar local
1. Configura `OPENAI_API_KEY` como variable de entorno. No la pongas en `index.html` ni la subas a GitHub.
2. En la carpeta del proyecto ejecuta:
   - macOS/Linux: `export OPENAI_API_KEY="tu_api_key"`t
   - PowerShell: `$env:OPENAI_API_KEY="tu_api_key"`
3. `npm start`
4. Abre `http://localhost:3000`

El navegador solicita `POST /api/generate-image`; el servidor llama a OpenAI y devuelve PNG base64. La clave se mantiene solo en el backend.

## Publicación
GitHub Pages solo sirve archivos estáticos y no puede ejecutar `server.js`. Para generación real, despliega el proyecto completo en un hosting Node (Render, Railway, Fly.io, VPS u otro) y configura `OPENAI_API_KEY` como secret. Usa HTTPS, limita uso/rate y añade autenticación si lo expones públicamente.
