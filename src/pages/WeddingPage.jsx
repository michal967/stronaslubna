// Wedding Page - Version 3.0
import React, { useState, useEffect, useRef } from 'react';
import './WeddingPage.css';
import {
  ArrowUp,
  Church,
  Wine,
  Calendar,
  Phone,
  Mail,
  Heart,
  Navigation,
  MapPin,
  Menu,
  X,
  PartyPopper,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import heroBg from '../images/hero-bg-alt.jpg';
import { wedding, venues, contacts, faqData, navLinks, tally } from '../data/wedding';

// --- Mały, dekoracyjny ozdobnik kwiatowy między sekcjami ---
const FloralDivider = () => (
  <div className="floral-divider" aria-hidden="true">
    <svg viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="12" x2="70" y2="12" stroke="#C6A769" strokeWidth="0.8" />
      <line x1="130" y1="12" x2="200" y2="12" stroke="#C6A769" strokeWidth="0.8" />
      <g transform="translate(100 12)" fill="none" stroke="#C6A769" strokeWidth="1" strokeLinecap="round">
        <path d="M-18 0 C -14 -6, -8 -8, 0 -8" />
        <path d="M-18 0 C -14 6, -8 8, 0 8" />
        <path d="M18 0 C 14 -6, 8 -8, 0 -8" />
        <path d="M18 0 C 14 6, 8 8, 0 8" />
        <circle cx="-18" cy="0" r="1.6" fill="#C6A769" />
        <circle cx="18" cy="0" r="1.6" fill="#C6A769" />
        <circle cx="0" cy="0" r="2.5" fill="#C6A769" />
      </g>
    </svg>
  </div>
);

// --- Lazy mapa Google: pokazuje placeholder, dopiero po kliknięciu ładuje iframe ---
const LazyMap = ({ embed, title, mapsLink }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="map-container">
      {loaded ? (
        <iframe
          src={embed}
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      ) : (
        <button
          type="button"
          className="map-placeholder"
          onClick={() => setLoaded(true)}
          aria-label={`Pokaż mapę: ${title}`}
        >
          <div className="map-placeholder-inner">
            <MapPin size={28} strokeWidth={1.5} />
            <span>Kliknij, aby pokazać mapę</span>
            <small>{title}</small>
          </div>
        </button>
      )}
    </div>
  );
};

// --- RSVP via Tally.so (darmowy embed, formularz zarządzany w panelu Tally) ---
const TallyRSVP = ({ formId }) => {
  useEffect(() => {
    if (!formId || formId === 'PASTE_TALLY_FORM_ID_HERE') return;
    const SRC = 'https://tally.so/widgets/embed.js';
    const loadEmbeds = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      } else {
        document
          .querySelectorAll('iframe[data-tally-src]:not([src])')
          .forEach((el) => {
            el.src = el.dataset.tallySrc;
          });
      }
    };
    if (document.querySelector(`script[src="${SRC}"]`)) {
      loadEmbeds();
      return;
    }
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    s.onload = loadEmbeds;
    s.onerror = loadEmbeds;
    document.body.appendChild(s);
  }, [formId]);

  if (!formId || formId === 'PASTE_TALLY_FORM_ID_HERE') {
    return (
      <div className="rsvp-placeholder" data-testid="rsvp-placeholder">
        <PartyPopper size={36} strokeWidth={1.5} />
        <p>
          <strong>Formularz RSVP nie jest jeszcze skonfigurowany.</strong>
          <br />
          Wklej swoje Tally <code>formId</code> w pliku{' '}
          <code>src/data/wedding.js</code>.
        </p>
      </div>
    );
  }

  const src = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
  return (
    <iframe
      data-tally-src={src}
      loading="lazy"
      width="100%"
      height="500"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="RSVP - Potwierdzenie obecności"
      data-testid="tally-iframe"
    />
  );
};

const WeddingPage = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [activeFaq, setActiveFaq] = useState(null);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  // 'before' | 'during' | 'after'
  const [eventPhase, setEventPhase] = useState('before');

  const heroRef = useRef(null);

  // --- Countdown + reverse phase detection ---
  useEffect(() => {
    const ceremony = new Date(wedding.ceremonyDateTime).getTime();
    const end = new Date(wedding.endDateTime).getTime();

    const update = () => {
      const now = Date.now();
      if (now < ceremony) {
        const diff = ceremony - now;
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
        setEventPhase('before');
      } else if (now < end) {
        setEventPhase('during');
      } else {
        setEventPhase('after');
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Scroll animations (fade in on view) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.wedding-section').forEach((section) => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // --- Sticky nav / back-to-top show on scroll past hero ---
  useEffect(() => {
    const onScroll = () => {
      const h = heroRef.current ? heroRef.current.offsetHeight : 600;
      const y = window.scrollY;
      setScrolled(y > h * 0.6);
      setShowTopBtn(y > h);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- Close calendar dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showCalendarOptions && !e.target.closest('.save-date-wrapper')) {
        setShowCalendarOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showCalendarOptions]);

  // --- Calendar integration (bez zmian funkcjonalnych) ---
  const eventDetails = {
    title: `Ślub ${wedding.bride} & ${wedding.groom}`,
    description: 'Zapraszamy na nasz ślub!',
    location: `${venues.ceremony.address1}, ${venues.ceremony.address2}`,
    startDate: '20270424T160000',
    endDate: '20270425T040000',
  };

  const handleCalendarClick = (type) => {
    if (type === 'google') {
      const url = new URL('https://calendar.google.com/calendar/render');
      url.searchParams.append('action', 'TEMPLATE');
      url.searchParams.append('text', eventDetails.title);
      url.searchParams.append('details', eventDetails.description);
      url.searchParams.append('location', eventDetails.location);
      url.searchParams.append('dates', `${eventDetails.startDate}/${eventDetails.endDate}`);
      window.open(url.toString(), '_blank');
    } else if (type === 'apple') {
      const blob = new Blob([generateICS(eventDetails)], {
        type: 'text/calendar;charset=utf-8',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'slub-kinga-michal.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowCalendarOptions(false);
  };

  const generateICS = (e) => {
    const ts = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Kinga & Michał//PL',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Ślub Kinga & Michał',
      'X-WR-TIMEZONE:Europe/Warsaw',
      'BEGIN:VTIMEZONE',
      'TZID:Europe/Warsaw',
      'BEGIN:STANDARD',
      'DTSTART:19701025T030000',
      'TZOFFSETFROM:+0200',
      'TZOFFSETTO:+0100',
      'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
      'END:STANDARD',
      'BEGIN:DAYLIGHT',
      'DTSTART:19700329T020000',
      'TZOFFSETFROM:+0100',
      'TZOFFSETTO:+0200',
      'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
      'END:DAYLIGHT',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      `UID:${ts}@wedding-kinga-michal`,
      `DTSTAMP:${ts}`,
      `DTSTART;TZID=Europe/Warsaw:${e.startDate}`,
      `DTEND;TZID=Europe/Warsaw:${e.endDate}`,
      `SUMMARY:${e.title}`,
      `DESCRIPTION:${e.description}`,
      `LOCATION:${e.location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'TRANSP:OPAQUE',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Przypomnienie: Jutro ślub Kingi i Michała!',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  };

  const toggleFaq = (i) => setActiveFaq(activeFaq === i ? null : i);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setNavOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="wedding-page" data-testid="wedding-page">
      {/* Sticky Navigation */}
      <nav
        className={`top-nav ${scrolled ? 'is-scrolled' : ''}`}
        data-testid="top-nav"
      >
        <button
          className="top-nav-brand"
          onClick={scrollToTop}
          aria-label="Powrót na górę"
        >
          K <Heart size={12} fill="currentColor" strokeWidth={0} /> M
        </button>
        <ul className="top-nav-links">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button onClick={() => scrollTo(l.id)}>{l.label}</button>
            </li>
          ))}
        </ul>
        <button
          className="top-nav-burger"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Menu"
          aria-expanded={navOpen}
        >
          {navOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`top-nav-mobile ${navOpen ? 'open' : ''}`}>
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" data-testid="hero-section" ref={heroRef}>
        <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow fade-in-up">— Zapraszamy —</p>
            <h1 className="hero-names fade-in-up fade-in-delay-1">
              {wedding.bride} <span className="amp">&</span> {wedding.groom}
            </h1>
            <div className="hero-date fade-in-up fade-in-delay-2">
              <span>24</span>
              <span className="dot">•</span>
              <span>04</span>
              <span className="dot">•</span>
              <span>{wedding.year}</span>
            </div>
            <p className="hero-location fade-in-up fade-in-delay-3">{wedding.city}</p>
          </div>
        </div>
        <div className="scroll-indicator">
          <button
            className="scroll-arrow-btn"
            onClick={() => scrollTo('welcome')}
            aria-label="Przewiń niżej"
          >
            <span className="scroll-arrow"></span>
          </button>
        </div>
      </section>

      {/* Welcome Text */}
      <section
        className="wedding-section welcome"
        data-testid="welcome-section"
        id="welcome"
      >
        <div className="container">
          <div className="content-wrapper">
            <FloralDivider />
            <p className="welcome-text">
              Z radością zapraszamy Was do wspólnego świętowania najważniejszego dnia w naszym życiu.
            </p>
            <FloralDivider />
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section
        className="wedding-section countdown"
        data-testid="countdown-section"
        id="countdown-section"
      >
        <div className="container">
          {eventPhase === 'before' && (
            <>
              <h2 className="section-title">Do naszego ślubu zostało</h2>
              <div className="countdown-wrapper" data-testid="countdown-active">
                {[
                  { val: countdown.days, label: 'dni' },
                  { val: countdown.hours, label: 'godziny' },
                  { val: countdown.minutes, label: 'minuty' },
                  { val: countdown.seconds, label: 'sekundy' },
                ].map((item, i) => (
                  <div className="countdown-item" key={i}>
                    <div className="countdown-number">
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div className="countdown-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {eventPhase === 'during' && (
            <div className="countdown-during" data-testid="countdown-during">
              <h2 className="section-title">Ten wyjątkowy dzień właśnie trwa ✨</h2>
              <p>Dziękujemy, że jesteście dziś z nami.</p>
            </div>
          )}

          {eventPhase === 'after' && (
            <div className="countdown-after" data-testid="countdown-after">
              <h2 className="section-title">Dziękujemy, że byliście z nami</h2>
              <p>To był najpiękniejszy dzień naszego życia — a Wasza obecność uczyniła go niezapomnianym.</p>
              <Heart size={40} strokeWidth={1.2} fill="currentColor" className="after-heart" />
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="wedding-section timeline" data-testid="timeline-section" id="timeline">
        <div className="container">
          <h2 className="section-title">Nasz dzień</h2>
          <div className="timeline-wrapper">
            <div className="timeline-item">
              <div className="timeline-time">{venues.ceremony.time}</div>
              <div className="timeline-content">
                <div className="timeline-icon">
                  <Church size={32} strokeWidth={1.5} />
                </div>
                <h3>Ceremonia Ślubna</h3>
                <p>
                  {venues.ceremony.name}
                  <br />
                  Warszawa Bielany
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">{venues.reception.time}</div>
              <div className="timeline-content">
                <div className="timeline-icon">
                  <Wine size={32} strokeWidth={1.5} />
                </div>
                <h3>Przyjęcie Weselne</h3>
                <p>
                  {venues.reception.name}
                  <br />
                  Warszawa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="wedding-section venues" data-testid="venues-section" id="venues">
        <div className="container">
          <h2 className="section-title">Jak do nas dojechać</h2>
          <div className="venues-grid">
            {[venues.ceremony, venues.reception].map((v, idx) => (
              <div className="venue-card" key={v.name}>
                <h3>{v.title}</h3>
                <div className="venue-info">
                  <h4>{v.name}</h4>
                  <p>{v.address1}</p>
                  <p>{v.address2}</p>
                </div>
                <LazyMap embed={v.embed} title={v.title} mapsLink={v.mapsLink} />
                <a
                  href={v.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline navigation-btn"
                  data-testid={idx === 0 ? 'ceremony-map-btn' : 'reception-map-btn'}
                >
                  <Navigation size={20} /> Nawiguj w Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Save the Date */}
      <section
        className="wedding-section save-date"
        data-testid="save-date-section"
        id="save-date"
      >
        <div className="container">
          <h2 className="section-title">Zapisz datę</h2>
          <div className="save-date-wrapper">
            <button
              className="btn btn-primary calendar-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowCalendarOptions(!showCalendarOptions);
              }}
              data-testid="calendar-btn"
            >
              <Calendar size={20} strokeWidth={2} />
              <span>Dodaj do kalendarza</span>
            </button>
            {showCalendarOptions && (
              <div className="calendar-options show" data-testid="calendar-options">
                <button
                  onClick={() => handleCalendarClick('google')}
                  className="calendar-option"
                  data-testid="google-calendar-btn"
                >
                  Google Calendar
                </button>
                <button
                  onClick={() => handleCalendarClick('apple')}
                  className="calendar-option"
                  data-testid="apple-calendar-btn"
                >
                  Apple Calendar
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section
        className="wedding-section rsvp"
        data-testid="rsvp-section"
        id="rsvp"
      >
        <div className="container">
          <h2 className="section-title">Potwierdź obecność</h2>
          <p className="rsvp-deadline">
            Prosimy o potwierdzenie do <strong>{wedding.rsvpDeadline}</strong>
          </p>
          <div className="rsvp-embed">
            <TallyRSVP formId={tally.formId} />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="wedding-section quote" data-testid="quote-section">
        <div className="container">
          <div className="quote-wrapper">
            <FloralDivider />
            <blockquote>
              „A więc trwają wiara, nadzieja i miłość – z nich zaś największa jest miłość.&rdquo;
            </blockquote>
            <FloralDivider />
            <div className="heart-decoration">
              <Heart size={32} strokeWidth={1.5} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wedding-section faq" data-testid="faq-section" id="faq">
        <div className="container">
          <h2 className="section-title">Często zadawane pytania</h2>
          <div className="faq-wrapper">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                data-testid={`faq-item-${index}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  data-testid={`faq-question-${index}`}
                >
                  {item.question}
                  <span className="faq-toggle">{activeFaq === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="wedding-section contact" data-testid="contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Kontakt</h2>
          <div className="contact-wrapper">
            <FloralDivider />
            <p>W celu potwierdzenia przybycia prosimy o kontakt lub wypełnienie formularza.</p>
            <div className="contact-grid">
              {contacts.map((c) => (
                <div className="contact-person" key={c.name}>
                  <h3>{c.name}</h3>
                  <div className="contact-info">
                    <div className="contact-item group">
                      <span className="contact-icon">
                        <Phone size={20} strokeWidth={1.5} />
                      </span>
                      <span className="contact-text">
                        <a href={c.phoneHref} data-testid={`${c.testIdPrefix}-phone`}>
                          {c.phoneDisplay}
                        </a>
                      </span>
                    </div>
                    <div className="contact-item group">
                      <span className="contact-icon">
                        <Mail size={20} strokeWidth={1.5} />
                      </span>
                      <span className="contact-text">
                        <a href={`mailto:${c.email}`} data-testid={`${c.testIdPrefix}-email`}>
                          {c.email}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <FloralDivider />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-testid="footer">
        <div className="container">
          <div className="footer-line"></div>
          <p
            className="footer-quote"
            onMouseEnter={() => confetti({ particleCount: 100, spread: 70 })}
            data-testid="footer-confetti"
          >
            Do zobaczenia!
          </p>
          <p className="footer-text">
            {wedding.bride}{' '}
            <Heart size={16} strokeWidth={2} fill="currentColor" className="footer-heart" />{' '}
            {wedding.groom} {wedding.year}
          </p>
        </div>
      </footer>

      {/* Back to top */}
      <button
        type="button"
        className={`back-to-top ${showTopBtn ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Powrót na górę"
        data-testid="back-to-top-btn"
      >
        <ArrowUp size={20} strokeWidth={2} />
      </button>

      {/* Floating RSVP CTA */}
      <button
        type="button"
        className={`floating-rsvp ${showTopBtn ? 'show' : ''}`}
        onClick={() => scrollTo('rsvp')}
        aria-label="Potwierdź obecność"
        data-testid="floating-rsvp-btn"
      >
        <PartyPopper size={18} strokeWidth={2} />
        <span>Potwierdź obecność</span>
      </button>
    </div>
  );
};

export default WeddingPage;
