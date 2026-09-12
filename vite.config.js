import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev proxy → LightRAG server + agent (avoids CORS during development).
// Targets are read from (in order of precedence): real shell/compose env, then webapp/.env.
// Switch backend with LR_TARGET, e.g.:  LR_TARGET=http://localhost:9623 npm run dev
//   :9622 = v2 (per-article + ELI, Italian legal entity schema) — DEFAULT/canonico
//   :9623 = v3 (whole-file, grafo più ricco) — esploratore secondario
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const LR_TARGET = env.LR_TARGET || 'http://localhost:9622'
  const AGENT_TARGET = env.AGENT_TARGET || 'http://localhost:8077'
  const GATEWAY_TARGET = env.GATEWAY_TARGET || 'http://localhost:8000'
  const PUBLIC_API_TARGET = env.PUBLIC_API_TARGET || 'http://localhost:8090'
  return {
    plugins: [react()],
    server: {
      port: 5180,
      host: true,
      proxy: {
        '/lr': {
          target: LR_TARGET,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/lr/, ''),
        },
        // agente legge+dati (Gemini tool-calling → LightRAG + connettori)
        '/agent': {
          target: AGENT_TARGET,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/agent/, ''),
        },
        // API pubblica read-only (grafo/PNRR/norme) — deve precedere '/api' generico, stesso
        // ordine di precedenza di webapp/nginx.conf (location /api/public/ prima di /api/).
        '/api/public': {
          target: PUBLIC_API_TARGET,
          changeOrigin: true,
        },
        // gateway freemium (auth/account/tier + chat proxy) — keeps the /api prefix
        '/api': {
          target: GATEWAY_TARGET,
          changeOrigin: true,
        },
      },
    },
  }
})
