// screenMore.jsx — News, Resources, Map (communities), More menu

function NewsScreen({ theme, lang, goto }) {
  const pinned = NEWS.filter(n => n.pinned);
  const rest = NEWS.filter(n => !n.pinned);

  return (
    <div>
      <ScreenHeader
        title="News & stories"
        oj="Dibaajimowinan"
        subtitle="What's happening across our nine member communities."
        theme={theme} lang={lang}
      />

      {pinned.length > 0 && (
        <div style={{ padding: '0 20px 8px' }}>
          {pinned.map(n => (
            <NewsHero key={n.id} news={n} theme={theme} lang={lang} />
          ))}
        </div>
      )}

      <SectionLabel en="More stories" oj="Geyaabi" theme={theme} lang={lang} />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rest.map(n => (
          <Card key={n.id} theme={theme} padding={14}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 10, flexShrink: 0,
                background: n.color, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 7px)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <MotifStar size={26} color="#fff" />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
                  letterSpacing: 1.2, textTransform: 'uppercase', color: n.color,
                }}>{n.kicker}</div>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500,
                  color: theme.ink, lineHeight: 1.25, marginTop: 2,
                }}>{n.title}</div>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: 12, color: theme.inkSoft,
                  marginTop: 4, lineHeight: 1.4,
                }}>{n.excerpt}</div>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: 11, color: theme.inkFaint,
                  marginTop: 6,
                }}>{n.author} · {n.date} · {n.readTime} read</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ padding: '28px 20px 130px', textAlign: 'center' }}>
        <MotifDivider color={theme.inkFaint} />
      </div>
    </div>
  );
}

function NewsHero({ news, theme, lang }) {
  return (
    <Card theme={theme} padding={0} style={{ overflow: 'hidden', marginBottom: 10 }}>
      <ImagePlaceholder
        label={news.kicker}
        tone="purple"
        theme={theme}
        height={170}
        style={{ background: news.color, color: '#fff' }}
        corner={
          <div style={{
            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)',
            padding: '4px 10px', borderRadius: 6, color: '#fff',
            fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
            letterSpacing: 1, textTransform: 'uppercase',
          }}>Pinned</div>
        }
      >
        <MotifFloralCorner size={100} color="#fff" style={{ position: 'absolute', bottom: -10, right: -10, opacity: 0.18 }} />
      </ImagePlaceholder>
      <div style={{ padding: 16 }}>
        <div style={{
          fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
          letterSpacing: 1.2, textTransform: 'uppercase', color: news.color,
        }}>{news.kicker}</div>
        <h3 style={{
          margin: '4px 0 6px', fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 500,
          color: theme.ink, lineHeight: 1.2, letterSpacing: -0.2,
        }}>{news.title}</h3>
        <p style={{
          margin: 0, fontFamily: FONT_BODY, fontSize: 13, color: theme.inkSoft, lineHeight: 1.5,
        }}>{news.excerpt}</p>
        <div style={{
          fontFamily: FONT_BODY, fontSize: 11, color: theme.inkFaint,
          marginTop: 10,
        }}>{news.author} · {news.date} · {news.readTime} read</div>
      </div>
    </Card>
  );
}

// Resources — grouped by category, toggle between list + library
function ResourcesScreen({ theme, lang, goto }) {
  const [cat, setCat] = React.useState('All');
  const categories = ['All', ...Array.from(new Set(RESOURCES.map(r => r.cat)))];
  const filtered = cat === 'All' ? RESOURCES : RESOURCES.filter(r => r.cat === cat);

  return (
    <div>
      <ScreenHeader
        title="Resources"
        oj="Gikendaasowinan"
        subtitle="Forms, guides, and cultural teachings — downloadable or in-print."
        theme={theme} lang={lang}
        onBack={() => goto('more')}
      />

      <div style={{
        display: 'flex', gap: 8, padding: '0 20px 16px',
        overflowX: 'auto',
      }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            flex: '0 0 auto', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: cat === c ? theme.ink : theme.muted,
            color: cat === c ? theme.bg : theme.ink,
            fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600,
            padding: '8px 14px',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(r => (
          <div key={r.id} style={{
            background: theme.surface, border: `1px solid ${theme.border}`,
            borderRadius: 14, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 48, borderRadius: 4,
              background: theme.muted, color: theme.inkSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, position: 'relative',
              border: `1px solid ${theme.border}`,
            }}>
              <IconDoc size={18} color={theme.inkSoft} />
              <div style={{
                position: 'absolute', bottom: -6, right: -6,
                background: theme.primary, color: '#fff',
                fontFamily: FONT_BODY, fontSize: 8, fontWeight: 700,
                letterSpacing: 0.5, padding: '2px 4px', borderRadius: 3,
              }}>{r.type.split(' ')[0].toUpperCase()}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600,
                color: theme.ink, lineHeight: 1.3,
              }}>{r.title}</div>
              <div style={{
                fontFamily: FONT_BODY, fontSize: 11, color: theme.inkFaint, marginTop: 2,
              }}>{r.type} · {r.size}</div>
            </div>
            <button style={{
              border: 'none', background: theme.muted, color: theme.ink,
              borderRadius: 10, padding: '8px 10px', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 1v9M3 7l4 4 4-4M1 13h12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div style={{ padding: '28px 20px 130px', textAlign: 'center' }}>
        <MotifDivider color={theme.inkFaint} />
      </div>
    </div>
  );
}

// Map / communities
function MapScreen({ theme, lang, goto }) {
  const [selected, setSelected] = React.useState(0);
  // Approximate positions on a stylized Treaty 3 map — percentages
  const positions = [
    { x: 22, y: 28 }, { x: 38, y: 38 }, { x: 30, y: 52 }, { x: 52, y: 42 },
    { x: 48, y: 58 }, { x: 18, y: 62 }, { x: 64, y: 28 }, { x: 72, y: 48 },
    { x: 56, y: 66 },
  ];

  return (
    <div>
      <ScreenHeader
        title="Our communities"
        oj="Anishinaabe-izhitwaawinan"
        subtitle="Nine First Nations in Treaty #3 territory."
        theme={theme} lang={lang}
        onBack={() => goto('more')}
      />

      {/* Stylized map */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          position: 'relative', aspectRatio: '4/3',
          background: theme.deep, borderRadius: 16, overflow: 'hidden',
          border: `1px solid ${theme.border}`,
        }}>
          {/* water + land texture */}
          <svg viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.7" fill="rgba(244,237,224,0.15)" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill={theme.deep} />
            <rect width="400" height="300" fill="url(#dots)" />
            {/* lakes */}
            <path d="M40 40 Q 80 30, 120 45 T 200 60 Q 230 80, 210 110 T 160 140 Q 120 150, 90 130 T 40 90 Z"
              fill={theme.accent} fillOpacity="0.5" />
            <path d="M220 160 Q 280 150, 330 170 T 380 220 Q 350 260, 290 250 T 230 210 Z"
              fill={theme.accent} fillOpacity="0.5" />
            {/* rivers */}
            <path d="M200 60 Q 240 120, 220 160" stroke={theme.accent} strokeOpacity="0.6" strokeWidth="2" fill="none" />
            <path d="M90 130 Q 100 200, 160 240" stroke={theme.accent} strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
            {/* compass */}
            <g transform="translate(350, 40)">
              <circle r="18" fill={theme.ink} fillOpacity="0.4" />
              <path d="M0 -12 L3 0 L0 12 L-3 0 Z" fill={theme.gold} />
              <text y="-22" textAnchor="middle" fill={theme.gold} fontSize="9" fontFamily={FONT_BODY} fontWeight="700">N</text>
            </g>
          </svg>
          {/* community pins */}
          {KCA_COMMUNITIES.map((c, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{
                position: 'absolute', left: `${positions[i].x}%`, top: `${positions[i].y}%`,
                transform: 'translate(-50%, -100%)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0,
              }}>
              <div style={{
                width: selected === i ? 18 : 12, height: selected === i ? 18 : 12,
                borderRadius: '50%',
                background: selected === i ? theme.gold : theme.primary,
                border: `2px solid ${theme.surface}`,
                boxShadow: selected === i ? `0 0 0 6px ${theme.gold}40` : '0 1px 3px rgba(0,0,0,0.3)',
                transition: 'all 200ms ease',
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* Selected community card */}
      <div style={{ padding: '0 20px' }}>
        <Card theme={theme} padding={16}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: theme.primary, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MotifStar size={18} color="#fff" />
            </div>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
              letterSpacing: 1.2, textTransform: 'uppercase', color: theme.primary,
            }}>Member Nation · {selected + 1} of 9</div>
          </div>
          <h3 style={{
            margin: 0, fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 500,
            color: theme.ink, lineHeight: 1.15,
          }}>{KCA_COMMUNITIES[selected].name}</h3>
          <p style={{
            margin: '8px 0 0', fontFamily: FONT_BODY, fontSize: 13,
            color: theme.inkSoft, lineHeight: 1.5,
          }}>
            One of nine Anishinaabe First Nations served by the Kenora Chiefs Advisory. Local programs and on-reserve clinics coordinate with central services.
          </p>
          <div style={{
            display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap',
          }}>
            <Button theme={theme} variant="soft" small>
              <IconPhone size={12} /> Call band office
            </Button>
            <Button theme={theme} variant="soft" small>
              <IconPin size={12} /> Directions
            </Button>
          </div>
        </Card>
      </div>

      {/* Community list */}
      <SectionLabel en="All nine Nations" theme={theme} lang={lang} />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {KCA_COMMUNITIES.map((c, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? theme.muted : theme.surface,
            border: `1px solid ${theme.border}`, cursor: 'pointer',
            borderRadius: 12, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: selected === i ? theme.gold : theme.primary,
            }} />
            <span style={{
              fontFamily: FONT_BODY, fontSize: 13, color: theme.ink, fontWeight: 500,
            }}>{c.name}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '28px 20px 130px', textAlign: 'center' }}>
        <MotifDivider color={theme.inkFaint} />
      </div>
    </div>
  );
}

function MoreScreen({ theme, lang, goto }) {
  const items = [
    { en: 'Resources library', oj: 'Gikendaasowinan', sub: 'Forms, guides, cultural materials', color: theme.primary, to: 'resources', icon: IconDoc },
    { en: 'Our communities', oj: 'Anishinaabe-izhitwaawinan', sub: 'Nine Nations, Treaty #3', color: theme.accent, to: 'map', icon: IconPin },
    { en: 'About KCA', oj: 'KCA Dibaajimowin', sub: 'Who we are, how we work', color: theme.purple, to: 'home', icon: IconStar2 },
    { en: 'Give feedback', oj: 'Gaagiigidon', sub: 'Tell us how we\u2019re doing', color: theme.deep, to: 'home', icon: IconChat },
    { en: 'Settings', oj: 'Ozhitoowin', sub: 'Language, notifications', color: theme.inkSoft, to: 'home', icon: IconGear },
  ];

  return (
    <div>
      <ScreenHeader
        title="More"
        oj="Geyaabi"
        subtitle=""
        theme={theme} lang={lang}
      />

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <button key={i} onClick={() => goto(it.to)} style={{
              background: theme.surface, border: `1px solid ${theme.border}`,
              borderRadius: 14, padding: '14px', cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 11,
                background: it.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={20} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {lang !== 'en' && (
                  <div style={{
                    fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
                    color: it.color, fontWeight: 600,
                  }}>{it.oj}</div>
                )}
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 500,
                  color: theme.ink, lineHeight: 1.2,
                }}>{it.en}</div>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: 12, color: theme.inkSoft,
                  marginTop: 2,
                }}>{it.sub}</div>
              </div>
              <IconArrow size={14} color={theme.inkFaint} />
            </button>
          );
        })}
      </div>

      {/* Seven Grandfather Teachings reminder */}
      <div style={{ padding: '28px 20px 0' }}>
        <Card theme={theme} padding={18} style={{
          background: `linear-gradient(135deg, ${theme.muted}, ${theme.surface})`,
          position: 'relative', overflow: 'hidden',
        }}>
          <MotifFloralCorner size={90} color={theme.primary}
            style={{ position: 'absolute', bottom: -10, right: -10, opacity: 0.3 }} />
          <div style={{
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
            color: theme.primary, letterSpacing: 1.5, textTransform: 'uppercase',
            fontWeight: 600, marginBottom: 6,
          }}>Niizhwaaswi Gichi-Inaakonigewinan</div>
          <h3 style={{
            margin: 0, fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
            color: theme.ink, lineHeight: 1.25, maxWidth: 240,
          }}>Grounded in the Seven Grandfather Teachings.</h3>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12,
          }}>
            {['Love', 'Respect', 'Courage', 'Honesty', 'Wisdom', 'Humility', 'Truth'].map(t => (
              <span key={t} style={{
                fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600,
                padding: '4px 10px', borderRadius: 999,
                background: theme.surface, color: theme.ink,
                border: `1px solid ${theme.border}`,
              }}>{t}</span>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ padding: '28px 20px 130px', textAlign: 'center' }}>
        <MotifDivider color={theme.inkFaint} />
        <div style={{
          marginTop: 14, fontFamily: FONT_BODY, fontSize: 11, color: theme.inkFaint,
        }}>Kenora Chiefs Advisory · v2026.04</div>
      </div>
    </div>
  );
}

function IconStar2({ size = 20, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M12 2l2.5 7h7l-5.5 4.5L18 21l-6-4.5L6 21l2-7.5L2 9h7z" strokeLinejoin="round" />
  </svg>;
}
function IconChat({ size = 20, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M3 6a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-8l-5 4v-4H5a2 2 0 01-2-2V6z" strokeLinejoin="round" />
  </svg>;
}
function IconGear({ size = 20, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8l2.8-2.8M17 7l2.8-2.8" strokeLinecap="round" />
  </svg>;
}

Object.assign(window, { NewsScreen, ResourcesScreen, MapScreen, MoreScreen });
