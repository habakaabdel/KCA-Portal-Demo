// screenEvents.jsx — Events / cultural calendar + detail

function EventsScreen({ theme, lang, goto, setActiveEvent }) {
  const [view, setView] = React.useState('list'); // 'list' | 'month'

  const grouped = {};
  EVENTS.forEach(e => {
    const key = `${e.month} · ${e.monthOj}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  return (
    <div>
      <ScreenHeader
        title="Events & calendar"
        oj="Izhichigewinan"
        subtitle="Gatherings, ceremonies, and land-based teachings through the seasons."
        theme={theme} lang={lang}
      />

      {/* Season banner */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{
          borderRadius: 16, padding: 14,
          background: `linear-gradient(120deg, ${theme.accent}, ${theme.accent}dd)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -20, opacity: 0.2,
          }}>
            <MotifFloralCorner size={140} color="#fff" />
          </div>
          <div style={{
            flexShrink: 0, width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MotifSunrays size={38} color={theme.gold} />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
              fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase',
              opacity: 0.9,
            }}>Ziigwan · Spring</div>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 500, lineHeight: 1.2,
            }}>The sap is running. Sugar bush season begins.</div>
          </div>
        </div>
      </div>

      {/* Toggle */}
      <div style={{
        display: 'flex', gap: 6, padding: '0 20px 16px',
        background: theme.muted, margin: '0 20px', borderRadius: 10, padding: 4,
      }}>
        {[
          { id: 'list', label: 'List' },
          { id: 'month', label: 'Month' },
        ].map(t => (
          <button key={t.id} onClick={() => setView(t.id)} style={{
            flex: 1, border: 'none', cursor: 'pointer', borderRadius: 8,
            background: view === t.id ? theme.surface : 'transparent',
            color: view === t.id ? theme.ink : theme.inkSoft,
            fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600,
            padding: '8px 0',
            boxShadow: view === t.id ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ height: 12 }} />

      {view === 'list' && (
        <div style={{ padding: '0 20px' }}>
          {Object.entries(grouped).map(([month, evts]) => (
            <div key={month} style={{ marginBottom: 20 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
              }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500,
                  color: theme.ink, letterSpacing: 0.5,
                }}>{month.split(' · ')[0] === 'APR' ? 'April' : month.split(' · ')[0] === 'MAY' ? 'May' : 'June'}</div>
                {lang !== 'en' && (
                  <div style={{
                    fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
                    color: theme.inkFaint,
                  }}>{month.split(' · ')[1]}</div>
                )}
                <div style={{ flex: 1, height: 1, background: theme.border }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {evts.map(e => (
                  <EventRow key={e.id} event={e} theme={theme} lang={lang}
                    onClick={() => { setActiveEvent(e); goto('eventDetail'); }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'month' && (
        <div style={{ padding: '0 20px' }}>
          <MonthGrid theme={theme} events={EVENTS.filter(e => e.month === 'MAY')}
            onPick={e => { setActiveEvent(e); goto('eventDetail'); }} />
          <div style={{
            marginTop: 16, fontFamily: FONT_BODY, fontSize: 12,
            color: theme.inkFaint, textAlign: 'center',
          }}>May · Zaagibagaa-giizis (Budding Moon)</div>
        </div>
      )}

      <div style={{ padding: '28px 20px 130px', textAlign: 'center' }}>
        <MotifDivider color={theme.inkFaint} />
      </div>
    </div>
  );
}

function EventRow({ event, theme, lang, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: theme.surface, border: `1px solid ${theme.border}`,
      borderRadius: 14, padding: 0, cursor: 'pointer', textAlign: 'left',
      display: 'flex', gap: 12, overflow: 'hidden',
    }}>
      <div style={{
        flexShrink: 0, width: 68,
        background: event.color, color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '12px 8px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 6px)',
        }} />
        <div style={{
          position: 'relative', fontFamily: FONT_BODY, fontSize: 10,
          fontWeight: 700, letterSpacing: 1, opacity: 0.9,
        }}>{event.month}</div>
        <div style={{
          position: 'relative', fontFamily: FONT_DISPLAY, fontSize: 30,
          fontWeight: 500, lineHeight: 1,
        }}>{event.day}</div>
      </div>
      <div style={{ flex: 1, padding: '12px 14px 12px 0', minWidth: 0 }}>
        <div style={{
          fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
          letterSpacing: 1.2, textTransform: 'uppercase', color: event.color,
        }}>{event.category}</div>
        {lang !== 'en' && (
          <div style={{
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 11,
            color: theme.inkSoft, marginTop: 1,
          }}>{event.oj}</div>
        )}
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 500,
          color: theme.ink, lineHeight: 1.2, marginTop: 2,
        }}>{event.title}</div>
        <div style={{
          fontFamily: FONT_BODY, fontSize: 11, color: theme.inkSoft,
          marginTop: 6, display: 'flex', gap: 10,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <IconClock size={10} /> {event.time}
          </span>
        </div>
      </div>
    </button>
  );
}

function MonthGrid({ theme, events, onPick }) {
  // Simple month grid for May 2026
  const startDay = 5; // May 1 is a Friday (index 5, Sun=0)
  const days = 31;
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const evtMap = {};
  events.forEach(e => { evtMap[e.day] = e; });

  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4, marginBottom: 6,
      }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{
            textAlign: 'center', fontFamily: FONT_BODY, fontSize: 10,
            fontWeight: 700, letterSpacing: 1, color: theme.inkFaint,
          }}>{d}</div>
        ))}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
      }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const e = evtMap[d];
          return (
            <button key={i} onClick={() => e && onPick(e)}
              disabled={!e}
              style={{
                aspectRatio: '1', border: 'none',
                background: e ? e.color : theme.surface,
                color: e ? '#fff' : theme.ink,
                borderRadius: 10, cursor: e ? 'pointer' : 'default',
                fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500,
                position: 'relative', overflow: 'hidden',
                border: e ? 'none' : `1px solid ${theme.border}`,
              }}>
              {d}
              {e && (
                <div style={{
                  position: 'absolute', bottom: 3, left: 0, right: 0,
                  display: 'flex', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 4, height: 4, borderRadius: '50%', background: '#fff',
                  }} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EventDetailScreen({ event, theme, lang, goto }) {
  const [rsvped, setRsvped] = React.useState(false);
  if (!event) return null;
  return (
    <div>
      <ScreenHeader
        title=" "
        theme={theme} lang={lang}
        onBack={() => goto('events')}
        compact
      />
      <div style={{ padding: '0 20px' }}>
        <ImagePlaceholder
          label={event.category}
          tone="deep"
          height={200}
          theme={theme}
          style={{ background: event.color, color: '#fff' }}
          corner={<MotifStar size={28} color="#fff" />}
        >
          <div style={{
            position: 'relative', zIndex: 1,
            fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 12,
            fontWeight: 600, letterSpacing: 1, opacity: 0.9, marginBottom: 2,
          }}>{event.oj}</div>
        </ImagePlaceholder>

        <div style={{ marginTop: 16 }}>
          <div style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 6,
            background: event.color, color: '#fff',
            fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700,
            letterSpacing: 1.2, textTransform: 'uppercase',
          }}>{event.category}</div>
          <h1 style={{
            margin: '10px 0 0', fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 500,
            color: theme.ink, lineHeight: 1.15, letterSpacing: -0.3,
          }}>{event.title}</h1>
          {lang !== 'en' && (
            <div style={{
              fontFamily: FONT_OJ, fontStyle: 'italic', fontSize: 14,
              color: theme.inkSoft, marginTop: 4,
            }}>{event.oj}</div>
          )}
        </div>

        <div style={{
          marginTop: 16, display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          <InfoBadge theme={theme} label="When" value={`${event.month} ${event.day} · ${event.time}`} icon={<IconCalendar size={13} />} />
          <InfoBadge theme={theme} label="Where" value={event.location} icon={<IconPin size={13} />} />
        </div>

        <p style={{
          fontFamily: FONT_BODY, fontSize: 14, color: theme.inkSoft,
          lineHeight: 1.6, marginTop: 18,
        }}>
          Join us for this gathering hosted by {event.hostedBy}. All community members welcome. Bring teachings, questions, and an open heart. Tobacco offered to knowledge keepers at the opening.
        </p>

        <div style={{
          marginTop: 16, background: theme.muted,
          borderRadius: 12, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 6, height: 36, borderRadius: 3, background: event.color,
          }} />
          <div>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700,
              letterSpacing: 1, textTransform: 'uppercase', color: theme.inkFaint,
            }}>Hosted by</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: theme.ink }}>
              {event.hostedBy}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700,
              letterSpacing: 1, textTransform: 'uppercase', color: theme.inkFaint,
            }}>Spots</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500, color: theme.ink }}>
              {event.spots}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button theme={theme} variant={rsvped ? 'accent' : 'primary'}
            onClick={() => setRsvped(!rsvped)} style={{ justifyContent: 'center' }}>
            {rsvped ? (
              <><svg width="14" height="11" viewBox="0 0 14 11"><path d="M1 5.5L5 9.5L13 1.5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                You're in — Miigwech</>
            ) : 'Save my spot'}
          </Button>
          <Button theme={theme} variant="ghost" onClick={() => {}} style={{ justifyContent: 'center' }}>
            Share with family
          </Button>
        </div>
      </div>
      <div style={{ height: 130 }} />
    </div>
  );
}

Object.assign(window, { EventsScreen, EventDetailScreen });
