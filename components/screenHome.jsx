// screenHome.jsx — Home / dashboard

function HomeScreen({ theme, lang, goto, setActiveService, setActiveEvent }) {
  const featuredEvent = EVENTS.find(e => e.featured);
  const crisis = [
    { label: 'Hope for Wellness', oj: 'Mino-Ayaawin Naadamaagewin', phone: '1-855-242-3310', color: theme.primary },
    { label: 'Talk4Healing', oj: 'Gaagiigidowin', phone: '1-855-554-4325', color: theme.purple },
    { label: 'Kids Help Phone', oj: 'Abinoojiyag', phone: '1-800-668-6868', color: theme.deep },
  ];

  return (
    <div>
      {/* Greeting block with moon + season */}
      <div style={{
        padding: '60px 20px 24px',
        background: `linear-gradient(180deg, ${theme.muted} 0%, ${theme.bg} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative floral corner */}
        <div style={{ position: 'absolute', top: 60, right: -10, opacity: 0.35, color: theme.primary }}>
          <MotifFloralCorner size={140} color={theme.primary} />
        </div>

        {/* KCA logo + wordmark */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          position: 'relative', zIndex: 2,
        }}>
          <img src="kca-logo.png" alt="KCA" style={{
            width: 44, height: 44, objectFit: 'contain',
            filter: theme.bg === '#12141A' ? 'drop-shadow(0 0 8px rgba(255,255,255,0.1))' : 'none',
          }} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700,
              letterSpacing: 1.2, textTransform: 'uppercase', color: theme.ink,
            }}>Kenora Chiefs Advisory</div>
            <div style={{
              fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 12,
              color: theme.inkSoft, marginTop: 2, fontWeight: 400,
            }}>Ogimaawabiitong</div>
          </div>
        </div>

        <div style={{
          fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 13,
          color: theme.primary, letterSpacing: 1.5, textTransform: 'uppercase',
          fontWeight: 600, marginBottom: 6,
        }}>
          Boozhoo, Kenora
        </div>
        <h1 style={{
          margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 400,
          fontSize: 34, lineHeight: 1.05, color: theme.ink, letterSpacing: -0.6,
          maxWidth: 280,
        }}>
          Walking in a <em style={{ color: theme.primary, fontStyle: 'italic' }}>good way</em> together.
        </h1>

        {/* Moon + season chip */}
        <div style={{
          marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10,
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 999, padding: '8px 14px 8px 8px',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${theme.gold}, ${theme.primary})`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: theme.ink, clipPath: `inset(0 ${CURRENT_MOON.phase * 100}% 0 0)`,
              opacity: 0.85,
            }} />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{
              fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
              color: theme.inkSoft, fontWeight: 600,
            }}>{CURRENT_MOON.name}</div>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 11, color: theme.ink, fontWeight: 600,
            }}>{CURRENT_MOON.en} · {CURRENT_MOON.seasonEn}</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{
        padding: '20px 20px 0', display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        <QuickAction theme={theme} lang={lang}
          en="Book support" oj="Ozhibii'igeng"
          sub="Talk to someone today"
          color={theme.primary} onClick={() => goto('book')}
          icon={<IconPhone size={18} color="#fff" />} />
        <QuickAction theme={theme} lang={lang}
          en="Find a program" oj="Nanda-mikan"
          sub="Services near you"
          color={theme.accent} onClick={() => goto('services')}
          icon={<IconSearch size={18} color="#fff" />} />
      </div>

      {/* Featured event */}
      {featuredEvent && (
        <div style={{ padding: '20px 20px 0' }}>
          <SectionLabel en="Coming up" oj="Biinaagwad" theme={theme} lang={lang}
            right={<button onClick={() => goto('events')} style={{
              background: 'none', border: 'none', color: theme.primary,
              fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>See all <IconArrow size={12} /></button>}
            />
        </div>
      )}
      {featuredEvent && (
        <div style={{ padding: '0 20px' }}>
          <Card theme={theme} padding={0} onClick={() => { setActiveEvent(featuredEvent); goto('eventDetail'); }}
            style={{ overflow: 'hidden' }}>
            <ImagePlaceholder
              label="Pow Wow · Anicinabe Park"
              tone="deep"
              theme={theme}
              height={150}
              corner={<MotifSunrays size={48} color={theme.gold} />}
            >
              <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{
                  background: theme.gold, color: theme.ink, fontFamily: FONT_BODY,
                  fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                  padding: '4px 8px', borderRadius: 4,
                }}>Featured</div>
                <div style={{
                  background: 'rgba(0,0,0,0.3)', color: '#F4EDE0', fontFamily: FONT_BODY,
                  fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
                  padding: '4px 8px', borderRadius: 4, backdropFilter: 'blur(4px)',
                }}>{featuredEvent.category}</div>
              </div>
            </ImagePlaceholder>
            <div style={{ padding: 16 }}>
              <div style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <div style={{
                  flexShrink: 0, textAlign: 'center',
                  background: theme.primarySoft, color: theme.primary,
                  borderRadius: 10, padding: '6px 10px', minWidth: 50,
                }}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
                    {featuredEvent.month}
                  </div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 500, lineHeight: 1 }}>
                    {featuredEvent.day}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {lang !== 'en' && (
                    <div style={{
                      fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
                      color: theme.primary, fontWeight: 600, marginBottom: 2,
                    }}>{featuredEvent.oj}</div>
                  )}
                  <div style={{
                    fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 500,
                    color: theme.ink, lineHeight: 1.2,
                  }}>{featuredEvent.title}</div>
                  <div style={{
                    fontFamily: FONT_BODY, fontSize: 12, color: theme.inkSoft,
                    marginTop: 6, display: 'flex', gap: 10, flexWrap: 'wrap',
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <IconClock size={11} /> {featuredEvent.time}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <IconPin size={11} /> {featuredEvent.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Pillars — service categories, horizontally scrollable */}
      <SectionLabel en="How can we help" oj="Aaniin ezhi-naadamaagoyan" theme={theme} lang={lang} />
      <div style={{
        display: 'flex', gap: 10, padding: '0 20px 4px',
        overflowX: 'auto', scrollSnapType: 'x mandatory',
      }}>
        {SERVICES.slice(0, 6).map(s => (
          <PillarCard key={s.id} service={s} theme={theme} lang={lang}
            onClick={() => { setActiveService(s); goto('serviceDetail'); }} />
        ))}
      </div>

      {/* Crisis — dedicated section */}
      <SectionLabel en="If you need help now" oj="Naadamawishin noongom" theme={theme} lang={lang} />
      <div style={{ padding: '0 20px' }}>
        <Card theme={theme} padding={0} style={{
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}dd 100%)`,
          border: 'none',
        }}>
          <div style={{ padding: '16px 16px 8px', color: '#fff' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
            }}>
              <MotifStar color="#fff" size={14} />
              <span style={{
                fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
                letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.85,
              }}>Mino-Ayaawin · Crisis lines</span>
            </div>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 500, lineHeight: 1.3,
              maxWidth: 280,
            }}>
              You're not alone. These lines answer day and night, in your language.
            </div>
          </div>
          <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {crisis.map((c, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                borderRadius: 12, padding: '12px 14px', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 12, opacity: 0.8 }}>{c.phone}</div>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 18,
                  background: '#fff', color: theme.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <IconPhone size={16} color={theme.primary} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* News snippet */}
      <SectionLabel en="From the community" oj="Dibaajimowinan" theme={theme} lang={lang}
        right={<button onClick={() => goto('news')} style={{
          background: 'none', border: 'none', color: theme.primary,
          fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>See all</button>} />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {NEWS.slice(0, 2).map(n => (
          <Card key={n.id} theme={theme} padding={12} onClick={() => goto('news')}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 10,
                background: n.color, flexShrink: 0, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 7px)',
                }} />
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
                  fontFamily: FONT_BODY, fontSize: 11, color: theme.inkFaint,
                  marginTop: 4,
                }}>{n.date} · {n.readTime} read</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer greeting */}
      <div style={{ padding: '28px 20px 130px', textAlign: 'center' }}>
        <MotifDivider color={theme.inkFaint} />
        <div style={{
          marginTop: 14, fontFamily: FONT_OJ, fontStyle: 'italic',
          fontSize: 13, color: theme.inkFaint,
        }}>Miigwech — thank you for visiting.</div>
      </div>
    </div>
  );
}

function QuickAction({ theme, lang, en, oj, sub, color, icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: color, color: '#fff', border: 'none', cursor: 'pointer',
      borderRadius: 16, padding: '14px 14px 16px', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 10,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -10, bottom: -10,
        opacity: 0.15, color: '#fff',
      }}>
        <MotifStar size={70} color="#fff" />
      </div>
      <div style={{
        width: 32, height: 32, borderRadius: 16,
        background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div>
        {lang !== 'en' && (
          <div style={{
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
            opacity: 0.85, fontWeight: 600,
          }}>{oj}</div>
        )}
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 500, lineHeight: 1.15 }}>{en}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, opacity: 0.8, marginTop: 2 }}>{sub}</div>
      </div>
    </button>
  );
}

function PillarCard({ service, theme, lang, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: '0 0 auto', scrollSnapAlign: 'start',
      width: 150, background: theme.surface, border: `1px solid ${theme.border}`,
      borderRadius: 16, padding: 14, textAlign: 'left', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: service.color, display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.25,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)',
        }} />
        <MotifStar size={22} color="#fff" />
      </div>
      <div>
        {lang !== 'en' && (
          <div style={{
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
            color: service.color, fontWeight: 600, lineHeight: 1.2,
          }}>{service.oj}</div>
        )}
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500,
          color: theme.ink, lineHeight: 1.2, marginTop: 2,
        }}>{service.en}</div>
      </div>
      <div style={{
        fontFamily: FONT_BODY, fontSize: 11, color: theme.inkSoft, lineHeight: 1.35,
      }}>{service.subtitle}</div>
    </button>
  );
}

Object.assign(window, { HomeScreen });
