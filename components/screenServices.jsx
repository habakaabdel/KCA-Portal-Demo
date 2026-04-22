// screenServices.jsx — Services directory + detail + booking flow

function ServicesScreen({ theme, lang, goto, setActiveService }) {
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');

  const pillars = ['all', ...Array.from(new Set(SERVICES.map(s => s.pillar)))];
  const filtered = SERVICES.filter(s =>
    (filter === 'all' || s.pillar === filter) &&
    (query === '' || s.en.toLowerCase().includes(query.toLowerCase()) || s.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div>
      <ScreenHeader
        title="Services & programs"
        oj="Naadamaagewinan"
        subtitle="Six pillars of care for our nine member communities."
        theme={theme} lang={lang}
      />

      {/* Search */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: 12, padding: '10px 14px',
        }}>
          <IconSearch size={16} color={theme.inkFaint} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search services…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: FONT_BODY, fontSize: 14, color: theme.ink,
            }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div style={{
        display: 'flex', gap: 8, padding: '0 20px 16px',
        overflowX: 'auto',
      }}>
        {pillars.map(p => (
          <button key={p} onClick={() => setFilter(p)} style={{
            flex: '0 0 auto', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: filter === p ? theme.ink : theme.muted,
            color: filter === p ? theme.bg : theme.ink,
            fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600,
            padding: '8px 14px', letterSpacing: 0.2,
            textTransform: p === 'all' ? 'uppercase' : 'none',
          }}>{p === 'all' ? 'All' : p}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(s => (
          <ServiceRow key={s.id} service={s} theme={theme} lang={lang}
            onClick={() => { setActiveService(s); goto('serviceDetail'); }} />
        ))}
        {filtered.length === 0 && (
          <div style={{
            padding: 32, textAlign: 'center', color: theme.inkFaint,
            fontFamily: FONT_BODY, fontSize: 14,
          }}>No services match.</div>
        )}
      </div>

      <div style={{ padding: '28px 20px 130px', textAlign: 'center' }}>
        <MotifDivider color={theme.inkFaint} />
      </div>
    </div>
  );
}

function ServiceRow({ service, theme, lang, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: theme.surface, border: `1px solid ${theme.border}`,
      borderRadius: 16, padding: 0, cursor: 'pointer', textAlign: 'left',
      display: 'flex', overflow: 'hidden',
    }}>
      <div style={{
        width: 6, flexShrink: 0, background: service.color,
      }} />
      <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
        }}>
          <div style={{
            fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
            letterSpacing: 1.2, textTransform: 'uppercase', color: service.color,
          }}>{service.pillar}</div>
        </div>
        {lang !== 'en' && (
          <div style={{
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 12,
            color: theme.inkSoft, fontWeight: 500,
          }}>{service.oj}</div>
        )}
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
          color: theme.ink, lineHeight: 1.2, marginTop: 2,
        }}>{service.en}</div>
        <div style={{
          fontFamily: FONT_BODY, fontSize: 12, color: theme.inkSoft,
          marginTop: 4, lineHeight: 1.4,
        }}>{service.subtitle}</div>
      </div>
      <div style={{
        padding: 16, display: 'flex', alignItems: 'center',
        color: theme.inkFaint,
      }}>
        <IconArrow size={14} />
      </div>
    </button>
  );
}

function ServiceDetailScreen({ service, theme, lang, goto }) {
  if (!service) return null;
  return (
    <div>
      <ScreenHeader
        title={service.en}
        oj={service.oj}
        theme={theme} lang={lang}
        onBack={() => goto('services')}
      />
      <div style={{ padding: '0 20px' }}>
        <ImagePlaceholder
          label={service.pillar}
          tone="warm"
          height={160}
          theme={theme}
          style={{ background: service.color, color: '#fff' }}
          corner={<MotifFloralCorner size={80} color="#fff" />}
        >
          <div style={{
            position: 'relative', zIndex: 1,
            fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
            color: '#fff', marginBottom: 4, lineHeight: 1.2,
          }}>{service.subtitle}</div>
        </ImagePlaceholder>

        <p style={{
          fontFamily: FONT_BODY, fontSize: 15, color: theme.inkSoft,
          lineHeight: 1.55, marginTop: 18,
        }}>{service.description}</p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16,
        }}>
          <InfoBadge theme={theme} label="Duration" value={service.duration} icon={<IconClock size={14} />} />
          <InfoBadge theme={theme} label="Available" value={service.location} icon={<IconPin size={14} />} />
        </div>

        <div style={{ marginTop: 20 }}>
          <h3 style={{
            fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 500,
            color: theme.ink, margin: 0, marginBottom: 10,
          }}>What to expect</h3>
          <div style={{
            background: theme.surface, border: `1px solid ${theme.border}`,
            borderRadius: 14, padding: 4,
          }}>
            {[
              { step: '1', en: 'Reach out — phone, online, or in person', oj: 'Gaagiigidon' },
              { step: '2', en: 'Intake conversation with a support worker', oj: 'Gikendaasowin' },
              { step: '3', en: 'Plan made with you, not for you', oj: 'Giizhiikamaw' },
              { step: '4', en: 'Ongoing support for as long as you need', oj: 'Naadamaagewin' },
            ].map((s, i, arr) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '12px 14px',
                borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: service.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 600, flexShrink: 0,
                }}>{s.step}</div>
                <div>
                  <div style={{
                    fontFamily: FONT_BODY, fontSize: 14, color: theme.ink,
                    lineHeight: 1.4,
                  }}>{s.en}</div>
                  {lang !== 'en' && (
                    <div style={{
                      fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
                      color: theme.inkFaint, marginTop: 2,
                    }}>{s.oj}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 24, display: 'flex', gap: 10, flexDirection: 'column',
        }}>
          <Button theme={theme} variant="primary" onClick={() => goto('book')} style={{ justifyContent: 'center' }}>
            Request support <IconArrow size={14} color="#fff" />
          </Button>
          <Button theme={theme} variant="ghost" onClick={() => goto('services')} style={{ justifyContent: 'center' }}>
            Back to all services
          </Button>
        </div>
      </div>
      <div style={{ height: 130 }} />
    </div>
  );
}

function InfoBadge({ theme, label, value, icon }) {
  return (
    <div style={{
      background: theme.muted, borderRadius: 12, padding: '10px 12px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
        letterSpacing: 1.2, textTransform: 'uppercase', color: theme.inkFaint,
      }}>{icon} {label}</div>
      <div style={{
        fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600,
        color: theme.ink, marginTop: 4,
      }}>{value}</div>
    </div>
  );
}

// Booking flow — 3 steps
function BookScreen({ theme, lang, goto }) {
  const [step, setStep] = React.useState(1);
  const [service, setService] = React.useState(null);
  const [contact, setContact] = React.useState('phone');
  const [slot, setSlot] = React.useState(null);
  const [name, setName] = React.useState('');
  const [done, setDone] = React.useState(false);

  const slots = [
    { day: 'Tomorrow', date: 'Apr 22', times: ['9:30', '11:00', '2:00'] },
    { day: 'Wednesday', date: 'Apr 23', times: ['10:00', '1:30', '3:30'] },
    { day: 'Thursday', date: 'Apr 24', times: ['9:00', '11:30'] },
  ];

  if (done) {
    return (
      <div>
        <ScreenHeader title=" " theme={theme} lang={lang} onBack={() => goto('home')} />
        <div style={{ padding: '20px 20px 140px', textAlign: 'center' }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: theme.accentSoft, color: theme.accent,
            margin: '20px auto', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <MotifStar size={50} color={theme.accent} />
          </div>
          <div style={{
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 13,
            color: theme.primary, letterSpacing: 1, textTransform: 'uppercase',
            fontWeight: 600, marginBottom: 8,
          }}>Miigwech</div>
          <h2 style={{
            fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 500,
            color: theme.ink, margin: 0, lineHeight: 1.2,
          }}>Your request is received.</h2>
          <p style={{
            fontFamily: FONT_BODY, fontSize: 14, color: theme.inkSoft,
            marginTop: 12, maxWidth: 280, margin: '12px auto 0', lineHeight: 1.5,
          }}>
            A support worker will reach out within one business day. You can walk in anytime during hours, too.
          </p>
          <div style={{ marginTop: 28 }}>
            <Button theme={theme} onClick={() => goto('home')}>Back to home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader
        title="Request support"
        oj="Ozhibii'igeng"
        theme={theme} lang={lang}
        onBack={() => step === 1 ? goto('home') : setStep(step - 1)}
      />
      {/* Step indicator */}
      <div style={{
        display: 'flex', gap: 6, padding: '0 20px 20px',
      }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: n <= step ? theme.primary : theme.border,
            transition: 'background 200ms ease',
          }} />
        ))}
      </div>

      {step === 1 && (
        <div style={{ padding: '0 20px' }}>
          <h3 style={{
            fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 500,
            color: theme.ink, margin: 0, marginBottom: 14,
          }}>What kind of support?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SERVICES.map(s => (
              <button key={s.id} onClick={() => setService(s)} style={{
                background: theme.surface, cursor: 'pointer', textAlign: 'left',
                border: service?.id === s.id ? `2px solid ${s.color}` : `1px solid ${theme.border}`,
                borderRadius: 14, padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 10, height: 40, borderRadius: 3, background: s.color,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: theme.ink }}>{s.en}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: theme.inkSoft }}>{s.subtitle}</div>
                </div>
                {service?.id === s.id && (
                  <div style={{
                    width: 22, height: 22, borderRadius: 11, background: s.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <Button theme={theme} onClick={() => service && setStep(2)}
              style={{ width: '100%', justifyContent: 'center', opacity: service ? 1 : 0.4 }}>
              Continue <IconArrow size={14} color="#fff" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: '0 20px' }}>
          <h3 style={{
            fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 500,
            color: theme.ink, margin: 0, marginBottom: 6,
          }}>Pick a time</h3>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: theme.inkSoft, marginBottom: 14 }}>
            These are first-touch slots. We'll confirm within a day.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {slots.map((d, di) => (
              <div key={di}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8,
                }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500, color: theme.ink }}>{d.day}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: theme.inkFaint }}>{d.date}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {d.times.map(t => {
                    const key = `${di}-${t}`;
                    const active = slot === key;
                    return (
                      <button key={t} onClick={() => setSlot(key)} style={{
                        borderRadius: 999, cursor: 'pointer',
                        background: active ? theme.ink : theme.surface,
                        border: active ? `1px solid ${theme.ink}` : `1px solid ${theme.border}`,
                        color: active ? theme.bg : theme.ink,
                        fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600,
                        padding: '8px 14px',
                      }}>{t}</button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <Button theme={theme} onClick={() => slot && setStep(3)}
              style={{ width: '100%', justifyContent: 'center', opacity: slot ? 1 : 0.4 }}>
              Continue <IconArrow size={14} color="#fff" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ padding: '0 20px' }}>
          <h3 style={{
            fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 500,
            color: theme.ink, margin: 0, marginBottom: 14,
          }}>Your details</h3>
          <div style={{
            fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700,
            letterSpacing: 1.2, textTransform: 'uppercase', color: theme.inkFaint, marginBottom: 6,
          }}>Your name</div>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="First name only is fine"
            style={{
              width: '100%', boxSizing: 'border-box',
              background: theme.surface, border: `1px solid ${theme.border}`,
              borderRadius: 12, padding: '12px 14px',
              fontFamily: FONT_BODY, fontSize: 14, color: theme.ink, outline: 'none',
            }}
          />
          <div style={{
            fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700,
            letterSpacing: 1.2, textTransform: 'uppercase', color: theme.inkFaint,
            marginTop: 18, marginBottom: 6,
          }}>How should we reach you?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { id: 'phone', label: 'Phone' },
              { id: 'text', label: 'Text' },
              { id: 'inperson', label: 'In person' },
            ].map(o => (
              <button key={o.id} onClick={() => setContact(o.id)} style={{
                borderRadius: 12, cursor: 'pointer',
                background: contact === o.id ? theme.ink : theme.surface,
                border: contact === o.id ? `1px solid ${theme.ink}` : `1px solid ${theme.border}`,
                color: contact === o.id ? theme.bg : theme.ink,
                fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600,
                padding: '12px 8px',
              }}>{o.label}</button>
            ))}
          </div>

          <div style={{
            marginTop: 18, padding: '12px 14px',
            background: theme.muted, borderRadius: 12,
            fontFamily: FONT_BODY, fontSize: 12, color: theme.inkSoft, lineHeight: 1.5,
          }}>
            <strong style={{ color: theme.ink }}>Your privacy:</strong> Requests go only to KCA support workers bound by confidentiality. Your information is never shared with outside agencies without consent.
          </div>

          <div style={{ marginTop: 22 }}>
            <Button theme={theme} onClick={() => setDone(true)}
              style={{ width: '100%', justifyContent: 'center', opacity: name.length ? 1 : 0.4 }}>
              Send request <IconArrow size={14} color="#fff" />
            </Button>
          </div>
        </div>
      )}

      <div style={{ height: 140 }} />
    </div>
  );
}

Object.assign(window, { ServicesScreen, ServiceDetailScreen, BookScreen });
