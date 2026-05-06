import { useState, useEffect, useRef, useCallback } from "react";

const C = { navy: "#1e3a5f", nl: "#2a4f7a", nd: "#152c4a", w: "#ffffff", off: "#f7f8fa", gold: "#c4a265", tx: "#5a6577", ln: "#e4e6eb" };

const SUITES = [
  { id: 1, name: "Rhodes", label: "Studio Deluxe", guests: 2, beds: 1, baths: 1, size: "16.5 sqm", pw: "\u20B12,300", pe: "\u20B12,600", tag: "Warm wood tones, woven wall accents, and navy drapery give Rhodes its layered, lived-in character", features: ["Queen bed", "Kitchenette", "Smart TV + Netflix", "AC", "Fast WiFi"], note: "Includes breakfast and pool access for 2", images: ["/images/rhodes.jpg", "/images/rhodes-living.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-studio" },
  { id: 2, name: "Hydra", label: "Studio Premium", guests: 2, beds: 1, baths: 1, size: "16.5 sqm", pw: "\u20B12,700", pe: "\u20B13,000", tag: "Named after the island known for its understated elegance, Hydra pairs sculptural furniture with clean white surfaces and bold blue curtains", features: ["Queen bed", "Kitchenette", "Smart TV + Netflix", "AC", "Fast WiFi"], note: "Includes breakfast and pool access for 2", images: ["/images/hydra.jpg", "/images/hydra-living.jpg", "/images/hydra-window.jpg", "/images/hydra-corner.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-premium" },
  { id: 3, name: "Asteria", label: "1-Bedroom Suite", guests: 2, beds: 1, baths: 1, size: "27 sqm", pw: "\u20B13,200", pe: "\u20B13,500", tag: "Greek for the starry one, Asteria takes its cues from Van Gogh\u2019s night sky, with a separate living and dining area to spread out in", features: ["Queen bed", "Living area", "Dining area", "Smart TV + Netflix", "AC"], note: "Includes breakfast and pool access for 2", images: ["/images/asteria.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-suite" },
  { id: 4, name: "Mykonos", label: "2-Bedroom Suite", guests: 4, beds: 2, baths: 2, size: "34.8 sqm", pw: "\u20B15,200", pe: "\u20B15,500", tag: "Our largest suite shares its name with the most storied of the Cyclades, with two bedrooms, a balcony, and a full kitchen", features: ["Balcony", "Living area", "Full kitchen", "Smart TV + Netflix", "AC"], note: "Includes breakfast and pool access for 4", images: ["/images/mykonos.jpg"], airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-family" },
];

const GALLERY = ["/images/curtains.jpg", "/images/balcony.jpg", "/images/pool.jpg", "/images/exterior.jpg", "/images/hero.jpg", "/images/rhodes-living.jpg"];

function useVisible(ref, threshold) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: threshold || 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return vis;
}

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const vis = useVisible(ref);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(" + y + "px)", transition: "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) " + delay + "s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) " + delay + "s" }}>
      {children}
    </div>
  );
}

function Carousel({ images, height, alt }) {
  const [idx, setIdx] = useState(0);
  const len = images.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + len) % len), [len]);

  if (len === 0) return null;
  if (len === 1) return (
    <div style={{ height: height, borderRadius: 3, overflow: "hidden" }}>
      <img src={images[0]} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );

  const btnStyle = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.navy, zIndex: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.15)", transition: "background 0.2s" };

  return (
    <div style={{ height: height, borderRadius: 3, overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", width: len * 100 + "%", transform: "translateX(-" + (idx * 100 / len) + "%)", transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1)", height: "100%" }}>
        {images.map((src, i) => (
          <div key={i} style={{ width: 100 / len + "%", flexShrink: 0, height: "100%" }}>
            <img src={src} alt={alt + " " + (i + 1)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>
      <button onClick={prev} style={{ ...btnStyle, left: 10 }} aria-label="Previous">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button onClick={next} style={{ ...btnStyle, right: 10 }} aria-label="Next">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
      <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={"Go to image " + (i + 1)} style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 3, background: i === idx ? C.w : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

function SH({ sub, title, desc }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>{sub}</div>
      <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: 36, fontStyle: "italic", color: C.navy, margin: "0 0 12px" }}>{title}</h2>
      {desc && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.tx, maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>{desc}</p>}
    </div>
  );
}

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const nc = sc ? C.navy : C.w;
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: sc ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: sc ? "blur(10px)" : "none", transition: "all 0.4s ease", padding: sc ? "10px 0" : "18px 0", borderBottom: sc ? "1px solid " + C.ln : "1px solid transparent" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}><img src="/images/logo.png" alt="" style={{ height: 36, width: "auto", filter: sc ? "none" : "brightness(0) invert(1)", transition: "filter 0.4s" }} /></div>
          <span style={{ fontFamily: "'IM Fell English', serif", fontSize: 17, fontStyle: "italic", color: nc, transition: "color 0.4s" }}>Santorini Lia Soleil</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {[["Suites","#suites"],["Gallery","#gallery"],["Amenities","#amenities"]].map(([l,h]) => (
            <a key={h} href={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: sc ? C.tx : "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s" }}>{l}</a>
          ))}
          <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, padding: "10px 22px", background: sc ? C.navy : "rgba(255,255,255,0.12)", color: C.w, borderRadius: 2, textDecoration: "none", border: sc ? "none" : "1px solid rgba(255,255,255,0.25)", transition: "all 0.3s" }}>Chat with us</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const h = () => setOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center 40%", transform: "translateY(" + offset + "px) scale(1.05)", willChange: "transform" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,20,30,0.25) 0%, rgba(15,20,30,0.45) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, " + C.gold + ", transparent)" }} />
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: 700 }}>
        <FadeIn delay={0.2} y={30}>
          <h1 style={{ fontFamily: "'IM Fell English', serif", fontSize: "clamp(36px, 5.5vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.w, lineHeight: 1.15, margin: "0 0 22px" }}>A quiet corner of Tagaytay, styled after the Greek Isles</h1>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: "0 auto 38px", maxWidth: 460 }}>Four Mediterranean-inspired suites at La Bella Residences. Clean lines, calming blues, and the cool Tagaytay air.</p>
        </FadeIn>
        <FadeIn delay={0.7} y={16}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "15px 36px", background: C.w, color: C.navy, borderRadius: 2, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Reserve Your Stay</a>
            <a href="#suites" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "15px 36px", color: C.w, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 2, textDecoration: "none", transition: "border-color 0.3s" }}>View Our Suites</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SuiteRow({ suite, flipped, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ display: "flex", gap: 0, marginBottom: 72, flexDirection: flipped ? "row-reverse" : "row" }}>
        <div style={{ flex: 1 }}>
          <Carousel images={suite.images} height={380} alt={suite.name} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: flipped ? "0 40px 0 0" : "0 0 0 40px" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>{suite.label}</div>
          <h3 style={{ fontFamily: "'IM Fell English', serif", fontSize: 32, fontStyle: "italic", color: C.navy, margin: "0 0 6px" }}>{suite.name}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.tx, margin: "0 0 20px", lineHeight: 1.6 }}>{suite.tag}</p>
          <div style={{ display: "flex", gap: 18, marginBottom: 16, flexWrap: "wrap", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.tx }}><span>{suite.guests} guests</span><span>{suite.beds} bed{suite.beds > 1 ? "s" : ""}</span><span>{suite.baths} bath{suite.baths > 1 ? "s" : ""}</span><span>{suite.size}</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>{suite.features.map((f) => <span key={f} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: C.nl, padding: "4px 11px", background: C.off, borderRadius: 2, border: "1px solid " + C.ln }}>{f}</span>)}</div>
          <div style={{ display: "flex", gap: 20, alignItems: "baseline", marginBottom: 6 }}>
            <div><span style={{ fontFamily: "'IM Fell English', serif", fontSize: 24, color: C.navy }}>{suite.pw}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.tx, marginLeft: 5 }}>weekday</span></div>
            <div><span style={{ fontFamily: "'IM Fell English', serif", fontSize: 24, color: C.navy }}>{suite.pe}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.tx, marginLeft: 5 }}>weekend</span></div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gold, margin: "0 0 20px", fontStyle: "italic" }}>{suite.note}</p>
          <a href={suite.airbnb} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", alignSelf: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "11px 26px", background: C.navy, color: C.w, borderRadius: 2, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 3px 12px rgba(30,58,95,0.3)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Book on Airbnb</a>
        </div>
      </div>
    </FadeIn>
  );
}

function GalleryCarousel() {
  const [idx, setIdx] = useState(0);
  const len = GALLERY.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + len) % len), [len]);

  const btnStyle = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.12)", transition: "transform 0.2s" };

  return (
    <div style={{ position: "relative", borderRadius: 4, overflow: "hidden", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ height: 420, overflow: "hidden", position: "relative" }}>
        {GALLERY.map((src, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === idx ? 1 : 0, transition: "opacity 0.6s ease", pointerEvents: i === idx ? "auto" : "none" }}>
            <img src={src} alt={"Gallery " + (i + 1)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>
      <button onClick={prev} style={{ ...btnStyle, left: 14 }} aria-label="Previous">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button onClick={next} style={{ ...btnStyle, right: 14 }} aria-label="Next">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
        {GALLERY.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={"Image " + (i + 1)} style={{ width: i === idx ? 20 : 7, height: 7, borderRadius: 4, background: i === idx ? C.w : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const inp = { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.navy, padding: "12px 14px", border: "1px solid " + C.ln, borderRadius: 2, background: C.w, outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" };
  const lbl = { fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, fontWeight: 500, color: C.tx, marginBottom: 5, display: "block" };

  if (sent) return (
    <section id="contact" style={{ padding: "90px 24px", background: C.w }}>
      <FadeIn>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.off, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: 28, fontStyle: "italic", color: C.navy, margin: "0 0 10px" }}>Thank you for your inquiry</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.tx }}>We will get back to you within a few hours.</p>
        </div>
      </FadeIn>
    </section>
  );

  return (
    <section id="contact" style={{ padding: "90px 24px", background: C.w }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <FadeIn><SH sub="Get in touch" title="Plan your stay" /></FadeIn>
        <FadeIn delay={0.04}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.tx, maxWidth: 480, margin: "-28px auto 32px", lineHeight: 1.75, textAlign: "center" }}>
            Let us know your dates and preferred suite and we will confirm availability. You can also <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer" style={{ color: C.navy, fontWeight: 500, textDecoration: "underline" }}>chat with us on Messenger</a> for a faster response.
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{ background: C.off, padding: "30px 26px", borderRadius: 3, border: "1px solid " + C.ln }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div><label style={lbl}>Name</label><input placeholder="Your full name" style={inp} onFocus={(e) => e.target.style.borderColor = C.navy} onBlur={(e) => e.target.style.borderColor = C.ln} /></div>
              <div><label style={lbl}>Email</label><input type="email" placeholder="your@email.com" style={inp} onFocus={(e) => e.target.style.borderColor = C.navy} onBlur={(e) => e.target.style.borderColor = C.ln} /></div>
              <div><label style={lbl}>Phone</label><input type="tel" placeholder="+63 XXX XXX XXXX" style={inp} onFocus={(e) => e.target.style.borderColor = C.navy} onBlur={(e) => e.target.style.borderColor = C.ln} /></div>
              <div><label style={lbl}>Preferred suite</label><select style={{...inp, cursor: "pointer"}}><option>Select a suite</option><option>Rhodes (Studio Deluxe)</option><option>Hydra (Studio Premium)</option><option>Asteria (1-Bedroom)</option><option>Mykonos (2-Bedroom)</option></select></div>
              <div><label style={lbl}>Check-in</label><input type="date" style={inp} /></div>
              <div><label style={lbl}>Check-out</label><input type="date" style={inp} /></div>
              <div><label style={lbl}>Adults</label><input type="number" min="1" max="8" defaultValue="1" style={inp} /></div>
              <div><label style={lbl}>Children</label><input type="number" min="0" max="8" defaultValue="0" style={inp} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={lbl}>Pets?</label><select style={{...inp, cursor: "pointer"}}><option>No pets</option><option>1 pet</option><option>2 pets</option><option>3+ pets</option></select></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={lbl}>Message (optional)</label><textarea rows={3} placeholder="Any special requests..." style={{...inp, resize: "vertical"}} /></div>
            </div>
            <button onClick={() => { const f = document.querySelectorAll('#contact input, #contact select, #contact textarea'); let b = ''; f.forEach(function(el) { if(el.value && el.value !== 'Select a suite' && el.value !== 'No pets') b += (el.previousSibling ? el.previousSibling.textContent : '') + ': ' + el.value + '\n'; }); window.open('mailto:santoriniliasoleil@gmail.com?subject=Booking Inquiry — Santorini Lia Soleil&body=' + encodeURIComponent(b)); setSent(true); }} style={{ display: "block", width: "100%", marginTop: 18, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "14px 0", background: C.navy, color: C.w, border: "none", borderRadius: 2, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 3px 12px rgba(30,58,95,0.3)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Send Inquiry</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.nd, padding: "48px 24px 28px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: "'IM Fell English', serif", fontSize: 19, fontStyle: "italic", color: C.w, marginBottom: 6 }}>Santorini Lia Soleil</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.38)" }}>La Bella Residences, Tagaytay City</div>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 2 }}>
            <a href="mailto:santoriniliasoleil@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>santoriniliasoleil@gmail.com</a><br />
            <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Chat on Messenger</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
          {"\u00A9"} 2026 Santorini Lia Soleil
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #1e3a5f !important; }
        img { image-rendering: auto; }
      `}</style>
      <Nav />
      <Hero />
      <section id="suites" style={{ padding: "100px 24px 40px", background: C.w }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn><SH sub="Accommodations" title="Our suites" /></FadeIn>
          {SUITES.map((s, i) => <SuiteRow key={s.id} suite={s} flipped={i % 2 === 1} delay={i * 0.08} />)}
        </div>
      </section>
      <section id="gallery" style={{ padding: "90px 24px", background: C.off }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn><SH sub="La Bella Residences" title="The property" desc="Santorini Lia Soleil occupies four units at La Bella Residences, a low-rise building tucked into one of Tagaytay's quieter corners. The interiors draw from the Cycladic tradition: whitewashed surfaces, blue accents, and natural light doing the work." /></FadeIn>
          <FadeIn delay={0.1}>
            <GalleryCarousel />
          </FadeIn>
          <FadeIn delay={0.15}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.tx, maxWidth: 540, margin: "36px auto 0", lineHeight: 1.75, textAlign: "center" }}>This is a place to slow down. The pool is steps from your door, Tagaytay's restaurants and cafes are a short drive away, and the rest of the time is yours.</p></FadeIn>
        </div>
      </section>
      <section id="amenities" style={{ padding: "90px 24px", background: C.w }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn><SH sub="Included with every stay" title="Amenities" /></FadeIn>
          <FadeIn delay={0.08}>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "stretch" }}>
              <div style={{ flex: "1 1 280px", maxWidth: 340, borderRadius: 3, overflow: "hidden" }}><img src="/images/rhodes-living.jpg" alt="Living area" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ flex: "1 1 380px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignContent: "start" }}>
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
                  <div key={a.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: C.off, borderRadius: 3, border: "1px solid " + C.ln }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d={a.d} /></svg>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.navy, fontWeight: 500 }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      <section id="location" style={{ padding: "90px 24px", background: C.off }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn><SH sub="Find us" title="Location" desc="La Bella Residences, Tagaytay City" /></FadeIn>
          <FadeIn delay={0.08}>
            <div style={{ borderRadius: 4, overflow: "hidden", height: 360 }}>
              <iframe src="https://www.google.com/maps?q=La+Bella+Residences+Tagaytay&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map" />
            </div>
          </FadeIn>
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
}
