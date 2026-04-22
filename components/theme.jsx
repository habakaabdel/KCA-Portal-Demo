// theme.jsx — Palette, typography, shared chrome
// Earth-toned, Anishinaabe-grounded palette. Three swappable themes.

// KCA official tokens extracted from the deployed prototype's shadcn theme.
// Light:  --primary 1 73% 51% => #D9392E ; --accent 204 100% 34% => #00629E
// Dark:   --background 220 15% 8% => #12141A ; --primary 1 73% 55% => #DE463B
const THEMES = {
  kca: {
    // Matches the deployed portal exactly — clean, light shadcn surfaces
    name: 'KCA',
    bg: '#F7F7F8',           // --background 0 0% 98%
    surface: '#FFFFFF',      // --card 0 0% 100%
    ink: '#23262F',          // --foreground 220 15% 16%
    inkSoft: '#63687A',      // --muted-foreground 220 8% 42%
    inkFaint: '#9AA0AF',
    primary: '#D9392E',      // --primary 1 73% 51%  (KCA red)
    primarySoft: '#FADBD7',
    accent: '#00629E',       // --accent 204 100% 34% (deep blue)
    accentSoft: '#CFE2F0',
    gold: '#E6B83C',         // chart-4 46 77% 53%
    deep: '#1F3A54',
    purple: '#6B4A7A',
    border: '#DEE1E7',       // --border 220 8% 88%
    muted: '#EDEFF2',        // --secondary 220 8% 93%
  },
  kcaDark: {
    // Matches .dark tokens
    name: 'KCA Dark',
    bg: '#12141A',           // --background 220 15% 8%
    surface: '#181B22',      // --card 220 14% 10%
    ink: '#F0F0F0',          // --foreground 0 0% 94%
    inkSoft: '#9BA0AE',
    inkFaint: '#6E7385',
    primary: '#DE463B',      // --primary 1 73% 55%
    primarySoft: '#3A1E1C',
    accent: '#2F86C4',       // --accent 204 60% 42%
    accentSoft: '#1A2D3D',
    gold: '#E9C56A',
    deep: '#4A7BA0',
    purple: '#9580B0',
    border: '#282C37',       // --border 220 10% 18%
    muted: '#2A2E3A',        // --secondary 220 10% 18%
  },
  earth: {
    // Warm earth — sienna, sage, birchbark, charcoal
    name: 'Earth',
    bg: '#F4EDE0',           // birchbark cream
    surface: '#FAF6EC',      // lighter cream
    ink: '#2B2520',          // charcoal
    inkSoft: '#5C5047',      // muted
    inkFaint: '#8C7F72',     // hint
    primary: '#B8463D',      // ochre red (sacred trade-cloth)
    primarySoft: '#E8C6BF',
    accent: '#6B8E4E',       // sage / cedar
    accentSoft: '#CFE0B8',
    gold: '#E8B25C',         // sunrise
    deep: '#2B4A5C',         // deep lake blue
    purple: '#6B4A7A',
    border: '#E0D4BE',
    muted: '#EBE2CC',
  },
  twilight: {
    // Cooler — lake at dusk
    name: 'Twilight',
    bg: '#1E1F2B',
    surface: '#2A2C3B',
    ink: '#F4EDE0',
    inkSoft: '#C9C3B4',
    inkFaint: '#8E8879',
    primary: '#E8B25C',
    primarySoft: '#5C4A2E',
    accent: '#8FB06F',
    accentSoft: '#3E4B33',
    gold: '#F4D06F',
    deep: '#4A7BA0',
    purple: '#9580B0',
    border: '#3A3C4D',
    muted: '#32344A',
  },
  daybreak: {
    // Lighter, more modern
    name: 'Daybreak',
    bg: '#FBF8F2',
    surface: '#FFFFFF',
    ink: '#1A1614',
    inkSoft: '#544B44',
    inkFaint: '#A69A8C',
    primary: '#C4564C',
    primarySoft: '#F4DDD8',
    accent: '#7B9C5C',
    accentSoft: '#DCE8CB',
    gold: '#ECBB6C',
    deep: '#345E74',
    purple: '#7D5E8F',
    border: '#EDE4D3',
    muted: '#F3ECDC',
  },
};

// Typography — Lusitana (serif display) + Nunito Sans (body) match the
// deployed KCA portal's shadcn --font-serif / --font-sans tokens.
const FONT_DISPLAY = '"Lusitana", "Fraunces", Georgia, serif';
const FONT_BODY = '"Nunito Sans", -apple-system, system-ui, sans-serif';
const FONT_OJ = '"Lusitana", Georgia, serif';

function useTheme() {
  const [key, setKey] = React.useState(() => localStorage.getItem('kca_theme') || 'earth');
  React.useEffect(() => { localStorage.setItem('kca_theme', key); }, [key]);
  return [THEMES[key], key, setKey];
}

function useLanguage() {
  // 'en' | 'oj' | 'dual'
  const [lang, setLang] = React.useState(() => localStorage.getItem('kca_lang') || 'dual');
  React.useEffect(() => { localStorage.setItem('kca_lang', lang); }, [lang]);
  return [lang, setLang];
}

// Small helper to render bilingual labels
function Bilingual({ en, oj, lang, style = {}, ojStyle = {}, sep = ' · ' }) {
  if (lang === 'en' || !oj) return <span style={style}>{en}</span>;
  if (lang === 'oj') return <span style={{ ...style, fontStyle: 'italic' }}>{oj}</span>;
  // dual
  return (
    <span style={style}>
      <span style={{ fontStyle: 'italic', opacity: 0.78, ...ojStyle }}>{oj}</span>
      <span style={{ opacity: 0.5 }}>{sep}</span>
      {en}
    </span>
  );
}

// Tiny dot-separator helper
function Dot({ color = 'currentColor', size = 3, style = {} }) {
  return <span style={{
    display: 'inline-block', width: size, height: size,
    borderRadius: '50%', background: color, verticalAlign: 'middle',
    opacity: 0.5, margin: '0 6px', ...style,
  }} />;
}

Object.assign(window, {
  THEMES, FONT_DISPLAY, FONT_BODY, FONT_OJ,
  useTheme, useLanguage, Bilingual, Dot,
});
