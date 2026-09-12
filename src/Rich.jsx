import { Trans } from 'react-i18next'

// Renders a translation string that carries inline-emphasis tokens, keeping dense
// editorial prose whole instead of fragmenting it into many keys. Convention:
//   <0>bold</0>  <1>italic</1>  <2>mono</2>
// Usage: <Rich s={c.lead} />  where c.lead is a string from a per-locale content module
// (src/locales/<lng>/<ns>.js). The same index can repeat any number of times in a string.
const COMPONENTS = [<b key="b" />, <em key="i" />, <code key="m" className="mono" />]

export default function Rich({ s }) {
  if (s == null) return null
  return <Trans defaults={s} components={COMPONENTS} />
}
