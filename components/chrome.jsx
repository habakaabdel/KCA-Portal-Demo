// chrome.jsx — Tab bar, headers, buttons, placeholder image blocks

// Tab bar (bottom) — glass + Ojibwe labels
function TabBar({ active, setActive, theme, lang }) {
  const tabs = [
    { id: 'home', en: 'Home', oj: 'Endaayaang', icon: IconHome },
    { id: 'services', en: 'Services', oj: 'Naadamaagewinan', icon: IconHands },
    { id: 'events', en: 'Events', oj: 'Izhichigewinan', icon: IconDrum },
    { id: 'news', en: 'News', oj: 'Dibaajimowinan', icon: IconFeather },
    { id: 'more', en: 'More', oj: 'Geyaabi', icon: IconDots },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40,
      paddingBottom: 30, paddingTop: 8,
      background: `linear-gradient(to top, ${theme.surface} 65%, ${theme.surface}00)`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        padding: '6px 8px',
      }}>
        {tabs.map(t => {
          const isActive = active === t.id;
          const Icon = t.icon;
          const label = lang === 'oj' ? t.oj : t.en;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 3, padding: '6px 2px',
                color: isActive ? theme.primary : theme.inkFaint,
                transition: 'color 180ms ease',
              }}
            >
              <div style={{
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 180ms ease',
              }}>
                <Icon size={22} filled={isActive} />
              </div>
              <span style={{
                fontFamily: FONT_BODY, fontSize: 10, fontWeight: isActive ? 600 : 500,
                letterSpacing: 0.2, whiteSpace: 'nowrap',
                fontStyle: lang === 'oj' ? 'italic' : 'normal',
              }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Screen header — replaces iOS nav bar for our screens
function ScreenHeader({ title, oj, subtitle, theme, lang, onBack, rightSlot, compact, motifColor }) {
  return (
    <div style={{ padding: compact ? '60px 20px 10px' : '58px 20px 18px', position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: compact ? 8 : 14,
      }}>
        {onBack ? (
          <button onClick={onBack} style={{
            width: 36, height: 36, borderRadius: 18, border: 'none',
            background: theme.muted, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: theme.ink,
          }}>
            <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
              <path d="M7 2L2 8l5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : <div style={{ width: 36 }} />}
        {rightSlot || <div style={{ width: 36 }} />}
      </div>

      {/* title block */}
      {(lang !== 'en' && oj) && (
        <div style={{
          fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 13,
          color: theme.primary, letterSpacing: 0.5, marginBottom: 4,
          textTransform: 'uppercase', fontWeight: 600,
        }}>{oj}</div>
      )}
      <h1 style={{
        margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 500,
        fontSize: compact ? 28 : 36, lineHeight: 1.05,
        color: theme.ink, letterSpacing: -0.5,
      }}>
        {title}
      </h1>
      {subtitle && (
        <div style={{
          fontFamily: FONT_BODY, fontSize: 14, color: theme.inkSoft,
          marginTop: 6, lineHeight: 1.4,
        }}>{subtitle}</div>
      )}
    </div>
  );
}

// Buttons
function Button({ children, onClick, variant = 'primary', theme, style = {}, small }) {
  const styles = {
    primary: { bg: theme.primary, fg: '#fff' },
    dark: { bg: theme.ink, fg: theme.bg },
    accent: { bg: theme.accent, fg: '#fff' },
    ghost: { bg: 'transparent', fg: theme.ink, border: `1px solid ${theme.border}` },
    soft: { bg: theme.muted, fg: theme.ink },
  }[variant];
  return (
    <button onClick={onClick} style={{
      background: styles.bg, color: styles.fg,
      border: styles.border || 'none',
      borderRadius: 999,
      padding: small ? '9px 16px' : '13px 22px',
      fontFamily: FONT_BODY, fontSize: small ? 13 : 15, fontWeight: 600,
      cursor: 'pointer', letterSpacing: 0.1,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      transition: 'transform 120ms ease, opacity 120ms ease',
      ...style,
    }}
    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {children}
    </button>
  );
}

// Labelled placeholder image — 'tasteful placeholder blocks with labels'
function ImagePlaceholder({ label, tone = 'warm', height = 140, theme, style = {}, corner, children }) {
  const tones = {
    warm: { bg: theme.primarySoft, fg: theme.primary },
    sage: { bg: theme.accentSoft, fg: theme.accent },
    stone: { bg: theme.muted, fg: theme.inkSoft },
    deep: { bg: theme.deep, fg: '#F4EDE0' },
    gold: { bg: theme.gold, fg: theme.ink },
    purple: { bg: theme.purple, fg: '#F4EDE0' },
  };
  const t = tones[tone] || tones.warm;
  return (
    <div style={{
      height, background: t.bg, color: t.fg,
      borderRadius: 14, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: 12, ...style,
    }}>
      {/* subtle diagonal texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 8px)',
      }} />
      {corner && <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>{corner}</div>}
      {children}
      {label && (
        <div style={{
          position: 'relative', zIndex: 1,
          fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: 1.2, opacity: 0.85,
        }}>{label}</div>
      )}
    </div>
  );
}

// Card chrome
function Card({ children, theme, style = {}, onClick, padding = 16 }) {
  return (
    <div onClick={onClick} style={{
      background: theme.surface, borderRadius: 18,
      padding, border: `1px solid ${theme.border}`,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 150ms ease, box-shadow 150ms ease',
      ...style,
    }}>{children}</div>
  );
}

// Section heading inside a screen
function SectionLabel({ en, oj, theme, lang, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '18px 20px 10px',
    }}>
      <div>
        {lang !== 'en' && oj && (
          <div style={{
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
            color: theme.primary, textTransform: 'uppercase',
            letterSpacing: 1, fontWeight: 600,
          }}>{oj}</div>
        )}
        <h2 style={{
          margin: 0, fontFamily: FONT_DISPLAY, fontSize: 22,
          fontWeight: 500, color: theme.ink, letterSpacing: -0.2,
          marginTop: lang !== 'en' && oj ? 2 : 0,
        }}>{en}</h2>
      </div>
      {right}
    </div>
  );
}

// Icons — simple, handled in one place
function IconHome({ size = 20, filled }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9.5z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
        fill={filled ? 'currentColor' : 'none'} fillOpacity="0.18" />
    </svg>
  );
}
function IconHands({ size = 20, filled }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3c-2 2-3 4-3 6.5 0 0-3-.5-4 1.5s0 4 2 5 5 3 5 5M12 3c2 2 3 4 3 6.5 0 0 3-.5 4 1.5s0 4-2 5-5 3-5 5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        fill={filled ? 'currentColor' : 'none'} fillOpacity="0.15" />
    </svg>
  );
}
function IconDrum({ size = 20, filled }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="8" rx="8" ry="3" stroke="currentColor" strokeWidth="1.8"
        fill={filled ? 'currentColor' : 'none'} fillOpacity="0.18" />
      <path d="M4 8v8c0 1.66 3.58 3 8 3s8-1.34 8-3V8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 4l-2 4M16 4l2 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconFeather({ size = 20, filled }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 4c0 10-6 16-12 16-2 0-3-1-3-1l3-3m12-12L5 19m15-15s-7-1-11 3-4 9-4 9"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill={filled ? 'currentColor' : 'none'} fillOpacity="0.15" />
    </svg>
  );
}
function IconDots({ size = 20, filled }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
      <circle cx="6" cy="12" r="1.8" fill={filled ? 'currentColor' : 'currentColor'} />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="18" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}
function IconPin({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2c-4 0-7 3-7 7 0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}
function IconCalendar({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}
function IconClock({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
function IconSearch({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
function IconArrow({ size = 14, color = 'currentColor', dir = 'right' }) {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
      style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPhone({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 17.5c-2 0-4-.4-5.8-1.2a1 1 0 00-1 .2l-2 2a15 15 0 01-7-7l2-2a1 1 0 00.2-1A17 17 0 016.2 3 1 1 0 005 2H3a1 1 0 00-1 1 17 17 0 0017 17 1 1 0 001-1v-2a1 1 0 00-.5-.5z" />
    </svg>
  );
}
function IconDoc({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M6 2h8l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
      <path d="M14 2v5h5M8 13h8M8 17h6" strokeLinecap="round" />
    </svg>
  );
}

Object.assign(window, {
  TabBar, ScreenHeader, Button, ImagePlaceholder, Card, SectionLabel,
  IconHome, IconHands, IconDrum, IconFeather, IconDots,
  IconPin, IconCalendar, IconClock, IconSearch, IconArrow, IconPhone, IconDoc,
});
