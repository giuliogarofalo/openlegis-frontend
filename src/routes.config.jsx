// Single declarative route list, rendered once per locale by App.jsx (Italian at
// the root `/`, English mirrored under `/en/*`). Paths are relative to the locale
// root (no leading slash, no `/en` prefix). `index` marks the home route; `enOnly`
// marks routes that exist only in English (no Italian twin) — currently just the
// `italian-law` explainer for non-Italian developers.
import Landing from './Landing.jsx'
import Tool from './Tool.jsx'
import Docs from './Docs.jsx'
import McpServer from './pages/McpServer.jsx'
import Progetti from './pages/Progetti.jsx'
import Metodo from './pages/Metodo.jsx'
import Manifesto from './pages/Manifesto.jsx'
import Costituzione from './pages/Costituzione.jsx'
import Glossario from './pages/Glossario.jsx'
import Guida from './pages/Guida.jsx'
import OpenData from './pages/OpenData.jsx'
import Codici from './pages/Codici.jsx'
import Parlamento from './pages/Parlamento.jsx'
import Pnrr from './pages/Pnrr.jsx'
import Politici from './pages/Politici.jsx'
import Ddl from './pages/Ddl.jsx'
import AiLeggeItaliana from './pages/AiLeggeItaliana.jsx'
import EnLaw from './pages/EnLaw.jsx'
import ApiDocs from './pages/ApiDocs.jsx'
import Sostieni from './pages/Sostieni.jsx'
import Login from './pages/Login.jsx'
import Registrati from './pages/Registrati.jsx'
import PasswordDimenticata from './pages/PasswordDimenticata.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Impostazioni from './pages/Impostazioni.jsx'
import Piani from './pages/Piani.jsx'
import Admin from './pages/Admin.jsx'
import RequireAuth from './auth/RequireAuth.jsx'

export const ROUTES = [
  { index: true, path: '', element: <Landing /> },
  { path: 'app', element: <Tool /> },
  { path: 'docs', element: <Docs /> },

  // Static SEO routes — React Router ranks these above the dynamic /docs/:section.
  // mcp-server/api keep their already-indexed flat EN slugs (/en/mcp-server, /en/api).
  { path: 'docs/mcp-server', enPath: 'mcp-server', element: <McpServer /> },
  { path: 'docs/api', enPath: 'api', element: <ApiDocs /> },
  { path: 'docs/glossario', element: <Glossario /> },
  { path: 'docs/guida/:slug', element: <Guida /> },
  { path: 'costituzione', element: <Costituzione /> },
  { path: 'open-data', element: <OpenData /> },
  { path: 'parlamento', element: <Parlamento /> },
  { path: 'pnrr', element: <Pnrr /> },
  { path: 'politici', element: <Politici /> },
  { path: 'ddl', element: <Ddl /> },
  // Pagina progetti/librerie e pagina "come funziona" — slug EN localizzati (vedi SLUG_ALIASES).
  { path: 'progetti', enPath: 'projects', element: <Progetti /> },
  { path: 'come-funziona', enPath: 'how-it-works', element: <Metodo /> },
  // Manifesto: stesso slug in IT ed EN (/manifesto ↔ /en/manifesto).
  { path: 'manifesto', element: <Manifesto /> },
  // Landing AI: slug EN localizzato (/en/ai-italian-law). Vedi SLUG_ALIASES in locale.js.
  { path: 'intelligenza-artificiale-legge-italiana', enPath: 'ai-italian-law', element: <AiLeggeItaliana /> },
  { path: 'codici', element: <Codici /> },
  { path: 'codici/:slug', element: <Codici /> },
  { path: 'sostieni', enPath: 'support', element: <Sostieni /> }, // localized EN slug
  { path: 'docs/:section', element: <Docs /> },

  // English-only (no Italian twin): explainer for non-Italian developers.
  { path: 'italian-law', element: <EnLaw />, enOnly: true },

  // Auth + account (client-only; available under both locales).
  { path: 'login', element: <Login /> },
  { path: 'registrati', element: <Registrati /> },
  { path: 'password-dimenticata', element: <PasswordDimenticata /> },
  { path: 'reset-password', element: <ResetPassword /> },
  { path: 'piani', element: <Piani /> },
  { path: 'impostazioni', element: <RequireAuth><Impostazioni /></RequireAuth> },
  { path: 'admin', element: <RequireAuth admin><Admin /></RequireAuth> },
]
