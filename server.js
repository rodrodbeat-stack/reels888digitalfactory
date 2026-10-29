// Secure backend for real OpenAI image generation. Node.js 18+; no client-side API key.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.OPENAI_API_KEY;
const ROOT = __dirname;
const styles = {
  architecture: 'technical CI/CD architecture diagram, readable connected nodes, deployment workflow',
  devsecops: 'DevSecOps security architecture, SAST, SCA, secrets scan, image scan, policy gate',
  kubernetes: 'Kubernetes deployment architecture, cluster, namespaces, pods, rollout and readiness',
  cloud: 'AWS and Azure cloud architecture, network zones, WAF, load balancer, private services',
  poster: 'cinematic cyberpunk technology poster'
};
function send(res, status, obj) { res.writeHead(status, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Cache-Control':'no-store'}); res.end(JSON.stringify(obj)); }
const server = http.createServer(async (req,res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, {'Access-Control-Allow-Methods':'POST,GET,OPTIONS','Access-Control-Allow-Headers':'Content-Type'}); return res.end(); }
  if (req.method === 'GET' && req.url === '/api/health') return send(res,200,{ok:true,configured:Boolean(API_KEY)});
  if (req.method === 'POST' && req.url === '/api/generate-image') {
    if (!API_KEY) return send(res,503,{error:'Backend sin configurar: agrega OPENAI_API_KEY en el entorno del servidor.'});
    let body=''; req.on('data',chunk=>{body+=chunk;if(body.length>20000){req.destroy();}});
    req.on('end',async()=>{try{
      const input=JSON.parse(body||'{}'); const prompt=String(input.prompt||'').trim().slice(0,4000); const style=styles[input.style]||styles.architecture;
      if(!prompt) return send(res,400,{error:'Prompt vacío.'});
      const apiRes=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{'Authorization':`Bearer ${API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-image-1',prompt:`Create a high-quality image. Style: ${style}. Visual direction: cyberpunk dark interface, cyan and green accents, clear professional implementation flow. User request: ${prompt}`,size:'1024x1024',quality:'medium',output_format:'png',n:1})});
      const payload=await apiRes.json(); if(!apiRes.ok) return send(res,apiRes.status,{error:payload.error?.message||'OpenAI image generation failed'});
      const image=payload.data?.[0]?.b64_json; if(!image) return send(res,502,{error:'La API no devolvió una imagen en base64.'}); send(res,200,{image});
    }catch(e){send(res,500,{error:e.message||'Error interno'});}}); return;
  }
  const requested=req.url==='/'?'/index.html':req.url.split('?')[0]; const file=path.join(ROOT,path.normalize(requested).replace(/^([/\\])+/,''));
  if(!file.startsWith(ROOT)){res.writeHead(403);return res.end('Forbidden');}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}const ext=path.extname(file);res.writeHead(200,{'Content-Type':ext==='.html'?'text/html; charset=utf-8':ext==='.js'?'text/javascript':'application/octet-stream'});res.end(data);});
});
server.listen(PORT,()=>console.log(`CYBERREELS server running at http://localhost:${PORT}`));
