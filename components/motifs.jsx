// motifs.jsx — Anishinaabe-inspired decorative SVG motifs
// These are abstract, geometric interpretations — NOT replications of sacred designs.
// Woodland-style florals, beadwork repeats, medicine-wheel quadrants, star/morning-star.
// All use currentColor so they pick up whatever color context they're in.

function MotifBeadRow({ color = 'currentColor', count = 14, size = 8, gap = 4, style = {} }) {
  // Alternating dot + diamond — loom-beadwork cadence
  const items = [];
  for (let i = 0; i < count; i++) {
    const isDiamond = i % 2 === 1;
    items.push(
      <div key={i} style={{
        width: size, height: size,
        background: color,
        transform: isDiamond ? 'rotate(45deg)' : 'none',
        borderRadius: isDiamond ? 1 : '50%',
        opacity: i % 4 === 0 ? 1 : 0.55,
      }} />
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, ...style }}>{items}</div>
  );
}

function MotifFloralCorner({ color = 'currentColor', size = 72, style = {} }) {
  // Abstract woodland floral — bold outline style
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={style}>
      <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        {/* stem */}
        <path d="M8 64 C 20 50, 28 44, 36 36" />
        {/* leaf */}
        <path d="M18 52 C 24 46, 30 48, 28 54 C 24 56, 20 56, 18 52 Z" fill={color} fillOpacity="0.2" />
        {/* bud */}
        <circle cx="36" cy="36" r="6" fill={color} fillOpacity="0.3" />
        <circle cx="36" cy="36" r="10" />
        {/* petals */}
        <path d="M36 26 C 40 22, 46 22, 46 28 C 46 32, 42 34, 36 32" fill={color} fillOpacity="0.2" />
        <path d="M46 36 C 52 36, 56 40, 54 46 C 50 48, 44 46, 42 42" fill={color} fillOpacity="0.2" />
        <path d="M40 42 C 46 46, 48 52, 42 56 C 38 56, 36 50, 36 46" fill={color} fillOpacity="0.2" />
        {/* little berry */}
        <circle cx="52" cy="20" r="3" fill={color} fillOpacity="0.4" />
      </g>
    </svg>
  );
}

function MotifStar({ color = 'currentColor', size = 24, style = {} }) {
  // Eight-pointed morning star — simplified geometric
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <g fill={color}>
        <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" />
      </g>
    </svg>
  );
}

function MotifMedicineWheel({ size = 64, strokeW = 2, style = {}, colors }) {
  // Four quadrants — East (yellow/sun), South (red), West (black), North (white)
  // Direction symbolism is sacred; render abstractly with brand-friendly hues
  const c = colors || { e: '#E8B25C', s: '#B8463D', w: '#2B2825', n: '#E8DFD2' };
  const r = size / 2 - strokeW;
  const cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style}>
      {/* quadrants */}
      <path d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`} fill={c.e} />
      <path d={`M ${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`} fill={c.s} />
      <path d={`M ${cx} ${cy} L ${cx} ${cy + r} A ${r} ${r} 0 0 1 ${cx - r} ${cy} Z`} fill={c.w} />
      <path d={`M ${cx} ${cy} L ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r} Z`} fill={c.n} />
      {/* cross lines */}
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#1a1614" strokeWidth={strokeW * 0.7} />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#1a1614" strokeWidth={strokeW * 0.7} />
      {/* outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1614" strokeWidth={strokeW} />
      {/* center */}
      <circle cx={cx} cy={cy} r={size / 14} fill="#1a1614" />
    </svg>
  );
}

function MotifZigzag({ color = 'currentColor', width = 200, height = 12, style = {} }) {
  // Beadwork zigzag — mountain pattern
  const points = [];
  const step = 16;
  const peaks = Math.ceil(width / step);
  for (let i = 0; i <= peaks; i++) {
    const x = i * step;
    const y = i % 2 === 0 ? height - 2 : 2;
    points.push(`${x},${y}`);
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style} preserveAspectRatio="none">
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="miter" />
    </svg>
  );
}

function MotifDivider({ color = 'currentColor', style = {} }) {
  // Full-width beadwork-inspired divider with center ornament
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color, ...style }}>
      <div style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.3 }} />
      <MotifStar size={14} />
      <div style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.3 }} />
    </div>
  );
}

function MotifFeather({ color = 'currentColor', size = 40, style = {} }) {
  return (
    <svg width={size} height={size * 2.2} viewBox="0 0 40 88" style={style}>
      <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <path d="M20 4 C 10 24, 6 48, 14 78 L 20 84 L 26 78 C 34 48, 30 24, 20 4 Z" fill={color} fillOpacity="0.1" />
        <line x1="20" y1="20" x2="20" y2="80" />
        {/* barbs */}
        {Array.from({ length: 12 }, (_, i) => {
          const y = 24 + i * 4.5;
          const w = 3 + Math.sin(i / 3) * 4 + i * 0.3;
          return <g key={i}>
            <line x1="20" y1={y} x2={20 - w} y2={y + 2} />
            <line x1="20" y1={y} x2={20 + w} y2={y + 2} />
          </g>;
        })}
      </g>
    </svg>
  );
}

function MotifSunrays({ color = 'currentColor', size = 80, rays = 12, style = {} }) {
  const items = [];
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * 360;
    items.push(
      <line
        key={i}
        x1={size / 2} y1={8}
        x2={size / 2} y2={18}
        stroke={color} strokeWidth="2" strokeLinecap="round"
        transform={`rotate(${angle} ${size / 2} ${size / 2})`}
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style}>
      {items}
      <circle cx={size / 2} cy={size / 2} r={size / 5} fill={color} />
    </svg>
  );
}

// Full-bleed decorative header band (for section covers)
function MotifBand({ color = 'currentColor', bg = 'transparent', style = {} }) {
  return (
    <div style={{
      background: bg, padding: '10px 0',
      display: 'flex', alignItems: 'center', gap: 14,
      color, ...style,
    }}>
      <MotifZigzag color={color} width={80} height={10} />
      <MotifStar size={18} />
      <div style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.3 }} />
      <MotifStar size={18} />
      <MotifZigzag color={color} width={80} height={10} />
    </div>
  );
}

Object.assign(window, {
  MotifBeadRow, MotifFloralCorner, MotifStar, MotifMedicineWheel,
  MotifZigzag, MotifDivider, MotifFeather, MotifSunrays, MotifBand,
});
