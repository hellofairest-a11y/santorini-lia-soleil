import { useState, useEffect, useRef, useCallback } from "react";

const C = { navy: "#1e3a5f", nl: "#2a4f7a", nd: "#152c4a", w: "#ffffff", off: "#f7f8fa", gold: "#c4a265", tx: "#5a6577", ln: "#e4e6eb" };

const SUITES = [
  { id: 1, name: "Rhodes", label: "Studio Deluxe", guests: 2, beds: 1, baths: 1, size: "16.5 sqm", pw: "\u20B12,300", pe: "\u20B12,600", tag: "Warm wood tones, woven wall accents, and navy drapery give Rhodes its layered, lived-in character", note: "Includes breakfast and pool access for 2", images: ["/images/rhodes.jpg", "/images/rhodes-2.jpg", "/images/rhodes-3.jpg", "/images/rhodes-4.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-studio" },
  { id: 2, name: "Hydra", label: "Studio Premium", guests: 2, beds: 1, baths: 1, size: "16.5 sqm", pw: "\u20B12,700", pe: "\u20B13,000", tag: "Named after the island known for its understated elegance, Hydra pairs sculptural furniture with clean white surfaces and bold blue curtains", note: "Includes breakfast and pool access for 2", images: ["/images/hydra.jpg", "/images/hydra-2.jpg", "/images/hydra-3.jpg", "/images/hydra-4.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-premium" },
  { id: 3, name: "Asteria", label: "1-Bedroom Suite", guests: 2, beds: 1, baths: 1, size: "27 sqm", pw: "\u20B13,200", pe: "\u20B13,500", tag: "Greek for the starry one, Asteria takes its cues from Van Gogh\u2019s night sky, with a separate living and dining area to spread out in", note: "Includes breakfast and pool access for 2", images: ["/images/asteria.jpg", "/images/asteria-2.jpg", "/images/asteria-3.jpg", "/images/asteria-4.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-suite" },
  { id: 4, name: "Mykonos", label: "2-Bedroom Suite", guests: 4, beds: 2, baths: 2, size: "34.8 sqm", pw: "\u20B15,200", pe: "\u20B15,500", tag: "Our largest suite shares its name with the most storied of the Cyclades, with two bedrooms, a balcony, and a full kitchen", note: "Includes breakfast and pool access for 4", images: ["/images/mykonos.jpg", "/images/mykonos-2.jpg", "/images/mykonos-3.jpg", "/images/mykonos-4.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-family" },
];

const GALLERY = ["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-3.jpg", "/images/gallery-4.jpg", "/images/gallery-5.jpg", "/images/gallery-6.jpg"];

function useVisible(ref, threshold) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: threshold || 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return vis;
}

function FadeIn({ children, delay = 0, y = 24, className }) {
  const ref = useRef(null);
  const vis = useVisible(ref);
  return (
    <div ref={ref} className={className || ""} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(" + y + "px)", transition: "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) " + delay + "s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) " + delay + "s" }}>
      {children}
    </div>
  );
}

function Carousel({ images, alt, className }) {
  const [idx, setIdx] = useState(0);
  const [touch, setTouch] = useState(null);
  const len = images.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + len) % len), [len]);

  const handleTouchStart = (e) => setTouch(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touch === null) return;
    const diff = touch - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    setTouch(null);
  };

  return (
    <div className={"carousel " + (className || "")} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ borderRadius: 3, overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", width: len * 100 + "%", transform: "translateX(-" + (idx * 100 / len) + "%)", transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1)", height: "100%" }}>
        {images.map((src, i) => (
          <div key={i} style={{ width: 100 / len + "%", flexShrink: 0, height: "100%", background: "linear-gradient(135deg, " + C.nd + ", " + C.nl + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={src} alt={alt + " " + (i + 1)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = '<span style="font-family:sans-serif;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;text-transform:uppercase">Photo ' + (i+1) + '</span>'; }} />
          </div>
        ))}
      </div>
      {len > 1 && <>
        <button onClick={prev} className="carousel-btn carousel-btn-l" aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button onClick={next} className="carousel-btn carousel-btn-r" aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={"Image " + (i + 1)} style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 3, background: i === idx ? C.w : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
      </>}
    </div>
  );
}

function SH({ sub, title, desc }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <div className="sh-sub">{sub}</div>
      <h2 className="sh-title">{title}</h2>
      {desc && <p className="sh-desc">{desc}</p>}
    </div>
  );
}

function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={"main-nav" + (sc ? " scrolled" : "")}>
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <img src="/images/logo.png" alt="Santorini Lia Soleil" className={"nav-logo" + (sc ? " scrolled" : "")} />
            <span className={"nav-name" + (sc ? " scrolled" : "")}>Santorini Lia Soleil</span>
          </a>
          <div className="nav-links">
            {[["Suites","#suites"],["Gallery","#gallery"],["Amenities","#amenities"]].map(([l,h]) => (
              <a key={h} href={h} className={"nav-link" + (sc ? " scrolled" : "")}>{l}</a>
            ))}
            <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer" className={"nav-cta" + (sc ? " scrolled" : "")}>Chat with us</a>
          </div>
          <button className={"hamburger" + (sc ? " scrolled" : "")} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <a href="#suites">Suites</a>
          <a href="#gallery">Gallery</a>
          <a href="#amenities">Amenities</a>
          <a href="#contact">Contact</a>
          <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer" className="mobile-cta">Chat with us</a>
        </div>
      )}
    </>
  );
}

function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const h = () => setOffset(window.scrollY * 0.25);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <section className="hero">
      <div className="hero-img" style={{ transform: "translateY(" + offset + "px)" }} />
      <div className="hero-overlay" />
      <div className="hero-gold" />
      <div className="hero-content">
        <FadeIn delay={0.2} y={30}><h1 className="hero-h1">A quiet corner of Tagaytay, styled after the Greek Isles</h1></FadeIn>
        <FadeIn delay={0.5} y={20}><p className="hero-p">Four Mediterranean-inspired suites at La Bella Residences. Clean lines, calming blues, and the cool Tagaytay air.</p></FadeIn>
        <FadeIn delay={0.7} y={16}>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-white">Reserve Your Stay</a>
            <a href="#suites" className="btn btn-ghost">View Our Suites</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SuiteRow({ suite, flipped, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className={"suite-row" + (flipped ? " flipped" : "")}>
        <div className="suite-img">
          <Carousel images={suite.images} alt={suite.name} className="suite-carousel" />
        </div>
        <div className="suite-details">
          <div className="suite-label">{suite.label}</div>
          <h3 className="suite-name">{suite.name}</h3>
          <p className="suite-tag">{suite.tag}</p>
          <div className="suite-specs">
            <span>{suite.guests} guests</span>
            <span>{suite.beds} bed{suite.beds > 1 ? "s" : ""}</span>
            <span>{suite.baths} bath{suite.baths > 1 ? "s" : ""}</span>
            <span>{suite.size}</span>
          </div>
          <div className="suite-prices">
            <div><span className="suite-price">{suite.pw}</span><span className="suite-per">weekday</span></div>
            <div><span className="suite-price">{suite.pe}</span><span className="suite-per">weekend</span></div>
          </div>
          <p className="suite-note">{suite.note}</p>
          <a href={suite.airbnb} target="_blank" rel="noopener noreferrer" className="btn btn-navy">Book on Airbnb</a>
        </div>
      </div>
    </FadeIn>
  );
}

function GallerySection() {
  const [idx, setIdx] = useState(0);
  const [touch, setTouch] = useState(null);
  const len = GALLERY.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + len) % len), [len]);
  const handleTouchStart = (e) => setTouch(e.touches[0].clientX);
  const handleTouchEnd = (e) => { if (touch === null) return; const d = touch - e.changedTouches[0].clientX; if (Math.abs(d) > 40) { d > 0 ? next() : prev(); } setTouch(null); };

  return (
    <div className="gallery-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="gallery-track">
        {GALLERY.map((src, i) => (
          <div key={i} className="gallery-slide" style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 1 : 0 }}>
            <img src={src} alt={"Gallery " + (i + 1)} onError={(e) => { e.target.style.display = "none"; e.target.parentElement.style.background = "linear-gradient(135deg, " + C.nd + ", " + C.nl + ")"; }} />
          </div>
        ))}
      </div>
      <button onClick={prev} className="carousel-btn carousel-btn-l" aria-label="Previous">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button onClick={next} className="carousel-btn carousel-btn-r" aria-label="Next">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
      <div className="carousel-dots">
        {GALLERY.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={"Image " + (i + 1)} className={"carousel-dot" + (i === idx ? " active" : "")} />
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  if (sent) return (
    <section id="contact" className="section"><FadeIn>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.off, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="sh-title">Thank you for your inquiry</h2>
        <p className="body-text" style={{ textAlign: "center" }}>We will get back to you within a few hours.</p>
      </div>
    </FadeIn></section>
  );

  return (
    <section id="contact" className="section">
      <div className="container-sm">
        <FadeIn><SH sub="Get in touch" title="Plan your stay" /></FadeIn>
        <FadeIn delay={0.04}>
          <p className="body-text" style={{ textAlign: "center", marginTop: -20, marginBottom: 28 }}>
            Let us know your dates and preferred suite and we will confirm availability. You can also <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer" className="text-link">chat with us on Messenger</a> for a faster response.
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="form-box">
            <div className="form-grid">
              <div className="form-field"><label className="form-label">Name</label><input placeholder="Your full name" className="form-input" /></div>
              <div className="form-field"><label className="form-label">Email</label><input type="email" placeholder="your@email.com" className="form-input" /></div>
              <div className="form-field"><label className="form-label">Phone</label><input type="tel" placeholder="+63 XXX XXX XXXX" className="form-input" /></div>
              <div className="form-field"><label className="form-label">Preferred suite</label><select className="form-input form-select"><option>Select a suite</option><option>Rhodes (Studio Deluxe)</option><option>Hydra (Studio Premium)</option><option>Asteria (1-Bedroom)</option><option>Mykonos (2-Bedroom)</option></select></div>
              <div className="form-field"><label className="form-label">Check-in</label><input type="date" className="form-input" /></div>
              <div className="form-field"><label className="form-label">Check-out</label><input type="date" className="form-input" /></div>
              <div className="form-field"><label className="form-label">Adults</label><input type="number" min="1" max="8" defaultValue="1" className="form-input" /></div>
              <div className="form-field"><label className="form-label">Children</label><input type="number" min="0" max="8" defaultValue="0" className="form-input" /></div>
              <div className="form-field form-full"><label className="form-label">Pets</label><input type="number" min="0" max="10" defaultValue="0" className="form-input" /></div>
              <div className="form-field form-full"><label className="form-label">Message (optional)</label><textarea rows={3} placeholder="Any special requests..." className="form-input form-textarea" /></div>
            </div>
            <button onClick={() => { const f = document.querySelectorAll('#contact input, #contact select, #contact textarea'); let b = ''; f.forEach(function(el) { if(el.value && el.value !== 'Select a suite' && el.value !== '0') b += (el.previousSibling ? el.previousSibling.textContent : '') + ': ' + el.value + '\n'; }); window.open('mailto:santoriniliasoleil@gmail.com?subject=Booking Inquiry — Santorini Lia Soleil&body=' + encodeURIComponent(b)); setSent(true); }} className="btn btn-navy btn-full">Send Inquiry</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">Santorini Lia Soleil</div>
            <div className="footer-sub">La Bella Residences, Tagaytay City</div>
          </div>
          <div className="footer-links">
            <a href="mailto:santoriniliasoleil@gmail.com">santoriniliasoleil@gmail.com</a><br />
            <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer">Chat on Messenger</a>
          </div>
        </div>
        <div className="footer-copy">{"\u00A9"} 2026 Santorini Lia Soleil</div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}
        img{image-rendering:auto;max-width:100%}
        ::selection{background:${C.navy};color:${C.w}}

        .container{max-width:1060px;margin:0 auto;padding:0 20px}
        .container-sm{max-width:560px;margin:0 auto;padding:0 20px}
        .section{padding:80px 20px}

        /* NAV */
        .main-nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:all .4s;padding:16px 0;background:transparent}
        .main-nav.scrolled{background:rgba(255,255,255,0.97);backdrop-filter:blur(10px);padding:8px 0;border-bottom:1px solid ${C.ln}}
        .nav-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between}
        .nav-brand{display:flex;align-items:center;gap:8px;text-decoration:none}
        .nav-logo{height:32px;width:auto;filter:brightness(0) invert(1);transition:filter .4s}
        .nav-logo.scrolled{filter:none}
        .nav-name{font-family:'IM Fell English',serif;font-size:16px;font-style:italic;color:${C.w};transition:color .4s}
        .nav-name.scrolled{color:${C.navy}}
        .nav-links{display:flex;align-items:center;gap:24px}
        .nav-link{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);text-decoration:none;transition:color .3s}
        .nav-link.scrolled{color:${C.tx}}
        .nav-cta{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;padding:9px 20px;color:${C.w};border-radius:2px;text-decoration:none;transition:all .3s;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25)}
        .nav-cta.scrolled{background:${C.navy};border-color:${C.navy}}
        .hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:5px}
        .hamburger span{display:block;width:22px;height:2px;background:${C.w};transition:background .3s}
        .hamburger.scrolled span{background:${C.navy}}

        /* MOBILE MENU */
        .mobile-menu{display:none;position:fixed;inset:0;z-index:999;background:rgba(255,255,255,0.98);flex-direction:column;align-items:center;justify-content:center;gap:28px}
        .mobile-menu a{font-family:'IM Fell English',serif;font-size:24px;color:${C.navy};text-decoration:none;font-style:italic}
        .mobile-cta{font-family:'DM Sans',sans-serif!important;font-size:13px!important;font-style:normal!important;padding:12px 28px;background:${C.navy};color:${C.w}!important;border-radius:2px}

        /* HERO */
        .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
        .hero-img{position:absolute;inset:-10%;background-image:url(/images/hero.jpg);background-size:cover;background-position:center 40%;animation:heroZoom 20s ease-in-out infinite alternate}
        @keyframes heroZoom{0%{transform:scale(1)}100%{transform:scale(1.08)}}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,20,30,0.3) 0%,rgba(15,20,30,0.5) 100%)}
        .hero-gold{position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,${C.gold},transparent)}
        .hero-content{position:relative;text-align:center;padding:0 24px;max-width:700px}
        .hero-h1{font-family:'IM Fell English',serif;font-size:clamp(32px,5.5vw,56px);font-style:italic;font-weight:400;color:${C.w};line-height:1.15;margin:0 0 20px}
        .hero-p{font-family:'DM Sans',sans-serif;font-size:16px;color:rgba(255,255,255,0.78);line-height:1.7;margin:0 auto 36px;max-width:460px}
        .hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

        /* BUTTONS */
        .btn{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;padding:14px 32px;border-radius:2px;text-decoration:none;display:inline-block;transition:transform .25s,box-shadow .25s,background .25s;cursor:pointer;border:none}
        .btn:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,0.12)}
        .btn:active{transform:translateY(0);box-shadow:none}
        .btn-white{background:${C.w};color:${C.navy}}
        .btn-ghost{background:transparent;color:${C.w};border:1.5px solid rgba(255,255,255,0.4)}
        .btn-ghost:hover{border-color:rgba(255,255,255,0.7)}
        .btn-navy{background:${C.navy};color:${C.w}}
        .btn-navy:hover{box-shadow:0 4px 16px rgba(30,58,95,0.3)}
        .btn-full{display:block;width:100%;text-align:center;margin-top:18px}

        /* SECTION HEADERS */
        .sh-sub{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:${C.gold};margin-bottom:10px}
        .sh-title{font-family:'IM Fell English',serif;font-size:clamp(28px,4vw,36px);font-style:italic;color:${C.navy};margin:0 0 12px}
        .sh-desc{font-family:'DM Sans',sans-serif;font-size:15px;color:${C.tx};max-width:540px;margin:0 auto;line-height:1.75}

        /* SUITES */
        .suite-row{display:flex;gap:0;margin-bottom:64px}
        .suite-row.flipped{flex-direction:row-reverse}
        .suite-img{flex:1;min-width:0}
        .suite-carousel{height:380px}
        .suite-details{flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 0 0 36px}
        .suite-row.flipped .suite-details{padding:0 36px 0 0}
        .suite-label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:${C.gold};margin-bottom:8px}
        .suite-name{font-family:'IM Fell English',serif;font-size:30px;font-style:italic;color:${C.navy};margin:0 0 6px}
        .suite-tag{font-family:'DM Sans',sans-serif;font-size:13px;color:${C.tx};margin:0 0 18px;line-height:1.65}
        .suite-specs{display:flex;gap:16px;flex-wrap:wrap;font-family:'DM Sans',sans-serif;font-size:12px;color:${C.tx};margin-bottom:18px}
        .suite-prices{display:flex;gap:20px;align-items:baseline;margin-bottom:6px}
        .suite-price{font-family:'IM Fell English',serif;font-size:24px;color:${C.navy}}
        .suite-per{font-family:'DM Sans',sans-serif;font-size:10px;color:${C.tx};margin-left:4px}
        .suite-note{font-family:'DM Sans',sans-serif;font-size:11px;color:${C.gold};margin:0 0 18px;font-style:italic}

        /* CAROUSEL SHARED */
        .carousel-btn{position:absolute;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.88);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;box-shadow:0 2px 8px rgba(0,0,0,0.12);transition:transform .2s,opacity .2s;opacity:0.8}
        .carousel-btn:hover{opacity:1;transform:translateY(-50%) scale(1.05)}
        .carousel-btn-l{left:10px}
        .carousel-btn-r{right:10px}
        .carousel-dots{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:5px}
        .carousel-dot{width:6px;height:6px;border-radius:3px;background:rgba(255,255,255,0.5);border:none;cursor:pointer;transition:all .3s;padding:0}
        .carousel-dot.active{width:18px;background:${C.w}}

        /* GALLERY */
        .gallery-carousel{position:relative;border-radius:4px;overflow:hidden;max-width:900px;margin:0 auto;aspect-ratio:16/9}
        .gallery-track{position:relative;width:100%;height:100%}
        .gallery-slide{position:absolute;inset:0;transition:opacity .6s ease}
        .gallery-slide img{width:100%;height:100%;object-fit:cover;display:block}

        /* AMENITIES */
        .amenities-wrap{display:flex;gap:24px;flex-wrap:wrap;align-items:stretch}
        .amenities-photo{flex:1 1 280px;max-width:340px;border-radius:3px;overflow:hidden}
        .amenities-photo img{width:100%;height:100%;object-fit:cover}
        .amenities-grid{flex:1 1 380px;display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:start}
        .amenity-card{display:flex;align-items:center;gap:10px;padding:13px 14px;background:${C.off};border-radius:3px;border:1px solid ${C.ln}}
        .amenity-card span{font-family:'DM Sans',sans-serif;font-size:13px;color:${C.navy};font-weight:500}

        /* BODY TEXT */
        .body-text{font-family:'DM Sans',sans-serif;font-size:15px;color:${C.tx};line-height:1.75;max-width:480px;margin:0 auto}
        .text-link{color:${C.navy};font-weight:500;text-decoration:underline}

        /* FORM */
        .form-box{background:${C.off};padding:28px 24px;border-radius:3px;border:1px solid ${C.ln}}
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .form-full{grid-column:1/-1}
        .form-label{font-family:'DM Sans',sans-serif;font-size:10.5px;font-weight:500;color:${C.tx};margin-bottom:4px;display:block}
        .form-input{font-family:'DM Sans',sans-serif;font-size:13px;color:${C.navy};padding:11px 13px;border:1px solid ${C.ln};border-radius:2px;background:${C.w};outline:none;width:100%;box-sizing:border-box;transition:border-color .2s}
        .form-input:focus{border-color:${C.navy}}
        .form-select{cursor:pointer}
        .form-textarea{resize:vertical}

        /* MAP */
        .map-wrap{border-radius:4px;overflow:hidden;height:320px}
        .map-wrap iframe{width:100%;height:100%;border:0}

        /* FOOTER */
        .footer{background:${C.nd};padding:44px 20px 24px}
        .footer-inner{display:flex;justify-content:space-between;flex-wrap:wrap;gap:28px;margin-bottom:24px}
        .footer-brand{font-family:'IM Fell English',serif;font-size:18px;font-style:italic;color:${C.w};margin-bottom:4px}
        .footer-sub{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.38)}
        .footer-links{font-family:'DM Sans',sans-serif;font-size:12px;line-height:2}
        .footer-links a{color:rgba(255,255,255,0.48);text-decoration:none}
        .footer-copy{border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;font-family:'DM Sans',sans-serif;font-size:10.5px;color:rgba(255,255,255,0.2);text-align:center}

        /* ===== MOBILE ===== */
        @media(max-width:768px){
          .nav-links{display:none}
          .hamburger{display:flex}
          .mobile-menu{display:flex}
          .section{padding:60px 16px}

          .hero-h1{font-size:32px}
          .hero-p{font-size:14px;margin-bottom:28px}
          .hero-btns{flex-direction:column;align-items:center;gap:10px}
          .hero-btns .btn{width:220px;text-align:center;padding:14px 0}

          .suite-row,.suite-row.flipped{flex-direction:column}
          .suite-details,.suite-row.flipped .suite-details{padding:24px 0 0 0}
          .suite-carousel{height:260px}
          .suite-name{font-size:26px}
          .suite-prices{flex-direction:column;gap:4px}

          .gallery-carousel{aspect-ratio:4/3}

          .amenities-wrap{flex-direction:column}
          .amenities-photo{max-width:100%;height:220px}
          .amenities-grid{grid-template-columns:1fr}

          .form-grid{grid-template-columns:1fr}
          .form-box{padding:22px 18px}

          .map-wrap{height:240px}

          .footer-inner{flex-direction:column;gap:20px}
        }

        @media(max-width:480px){
          .container,.container-sm{padding:0 14px}
          .suite-carousel{height:220px}
          .hero-h1{font-size:28px}
          .nav-name{font-size:14px}
        }
      `}</style>
      <Nav />
      <Hero />
      <section id="suites" className="section" style={{ background: C.w }}>
        <div className="container">
          <FadeIn><SH sub="Accommodations" title="Our suites" /></FadeIn>
          {SUITES.map((s, i) => <SuiteRow key={s.id} suite={s} flipped={i % 2 === 1} delay={i * 0.06} />)}
        </div>
      </section>
      <section id="gallery" className="section" style={{ background: C.off }}>
        <div className="container">
          <FadeIn><SH sub="La Bella Residences" title="The property" desc="Santorini Lia Soleil occupies four units at La Bella Residences, a low-rise building tucked into one of Tagaytay's quieter corners. The interiors draw from the Cycladic tradition: whitewashed surfaces, blue accents, and natural light doing the work." /></FadeIn>
          <FadeIn delay={0.1}><GallerySection /></FadeIn>
          <FadeIn delay={0.15}><p className="body-text" style={{ textAlign: "center", marginTop: 32 }}>This is a place to slow down. The pool is steps from your door, Tagaytay's restaurants and cafes are a short drive away, and the rest of the time is yours.</p></FadeIn>
        </div>
      </section>
      <section id="amenities" className="section" style={{ background: C.w }}>
        <div className="container">
          <FadeIn><SH sub="Included with every stay" title="Amenities" /></FadeIn>
          <FadeIn delay={0.08}>
            <div className="amenities-wrap">
              <div className="amenities-photo"><img src="/images/rhodes-living.jpg" alt="Living area" /></div>
              <div className="amenities-grid">
                {[
                  { label: "Pool access", d: "M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0M8 16V4m4 12V8" },
                  { label: "High-speed WiFi", d: "M5 12.55a11 11 0 0 1 14 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0" },
                  { label: "Air conditioning", d: "M12 2v10m0 0-4-3m4 3 4-3M4 14c2 2 5 3 8 3s6-1 8-3M6 18c1.5 1 3.5 2 6 2s4.5-1 6-2" },
                  { label: "Kitchenette", d: "M3 2h18a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 10h20" },
                  { label: "Smart TV + Netflix", d: "M2 4h20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 21h8M12 17v4" },
                  { label: "Pet-friendly", d: "M11 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4.5 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17.5 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 12c-3 0-5 2.5-5 5 0 1.5.5 2 2 3h6c1.5-1 2-1.5 2-3 0-2.5-2-5-5-5z" },
                  { label: "24/7 security", d: "M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4zM9 12l2 2 4-4" },
                  { label: "Secure pay parking", d: "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 17V7h4a3 3 0 0 1 0 6H9" },
                  { label: "Towels & linens", d: "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 9h20M12 9v12" },
                  { label: "La Bella grounds", d: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" },
                ].map((a) => (
                  <div key={a.label} className="amenity-card">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d={a.d} /></svg>
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      <section id="location" className="section" style={{ background: C.off }}>
        <div className="container">
          <FadeIn><SH sub="Find us" title="Location" desc="La Bella Residences, Tagaytay City" /></FadeIn>
          <FadeIn delay={0.08}>
            <div className="map-wrap">
              <iframe src="https://www.google.com/maps?q=La+Bella+Residences+Tagaytay&output=embed" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map" />
            </div>
          </FadeIn>
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
}
