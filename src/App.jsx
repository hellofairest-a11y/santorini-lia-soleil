import { useState, useEffect, useRef } from "react";

const C = { navy: "#1e3a5f", nl: "#2a4f7a", nd: "#152c4a", w: "#ffffff", off: "#f7f8fa", gold: "#c4a265", tx: "#5a6577", ln: "#e4e6eb" };

const SUITES = [
  { id: 1, name: "Rhodes", label: "Studio Deluxe", guests: 2, beds: 1, baths: 1, size: "16.5 sqm", pw: "\u20B12,300", pe: "\u20B12,600", tag: "Warm wood tones, woven wall accents, and navy drapery give Rhodes its layered, lived-in character", features: ["Queen bed", "Kitchenette", "Smart TV + Netflix", "AC", "Fast WiFi"], note: "Includes breakfast and pool access for 2", img: "/images/rhodes.jpg", airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-studio" },
  { id: 2, name: "Hydra", label: "Studio Premium", guests: 2, beds: 1, baths: 1, size: "16.5 sqm", pw: "\u20B12,700", pe: "\u20B13,000", tag: "Named after the island known for its understated elegance, Hydra pairs sculptural furniture with clean white surfaces and bold blue curtains", features: ["Queen bed", "Kitchenette", "Smart TV + Netflix", "AC", "Fast WiFi"], note: "Includes breakfast and pool access for 2", img: "/images/hydra.jpg", airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-premium" },
  { id: 3, name: "Asteria", label: "1-Bedroom Suite", guests: 2, beds: 1, baths: 1, size: "27 sqm", pw: "\u20B13,200", pe: "\u20B13,500", tag: "Greek for the starry one, Asteria takes its cues from Van Gogh's night sky, with a separate living and dining area to spread out in", features: ["Queen bed", "Living area", "Dining area", "Smart TV + Netflix", "AC"], note: "Includes breakfast and pool access for 2", img: "/images/asteria.jpg", airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-suite" },
  { id: 4, name: "Mykonos", label: "2-Bedroom Suite", guests: 4, beds: 2, baths: 2, size: "34.8 sqm", pw: "\u20B15,200", pe: "\u20B15,500", tag: "Our largest suite shares its name with the most storied of the Cyclades, with two bedrooms, a balcony, and a full kitchen", features: ["Balcony", "Living area", "Full kitchen", "Smart TV + Netflix", "AC"], note: "Includes breakfast and pool access for 4", img: "/images/mykonos.jpg", airbnb: "https://www.airbnb.com/h/santorini-lia-soleil-family" },
];

function useVisible(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const vis = useVisible(ref);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease " + delay + "s, transform 0.7s ease " + delay + "s" }}>
      {children}
    </div>
  );
}

function PH({ h, text }) {
  return <div style={{ height: h || 300, background: "linear-gradient(135deg, " + C.nd + ", " + C.nl + ")", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{text || "Photo"}</span></div>;
}

function SH({ sub, title, desc }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>{sub}</div>
      <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: 36, fontStyle: "italic", color: C.navy, margin: "0 0 12px" }}>{title}</h2>
      {desc && <p style={{ fontFamily: "sans-serif", fontSize: 15, color: C.tx, maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>{desc}</p>}
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
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: sc ? "rgba(255,255,255,0.97)" : "transparent", transition: "all 0.4s", padding: sc ? "10px 0" : "18px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}><img src="/images/logo.png" alt="" style={{ height: 36, width: "auto", filter: sc ? "none" : "brightness(0) invert(1)", transition: "filter 0.4s" }} /></div>
          <span style={{ fontFamily: "'IM Fell English', serif", fontSize: 17, fontStyle: "italic", color: nc, transition: "color 0.4s" }}>Santorini Lia Soleil</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {[["Suites","#suites"],["Gallery","#gallery"],["Amenities","#amenities"]].map(([l,h]) => (
            <a key={h} href={h} style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: sc ? C.tx : "rgba(255,255,255,0.7)", textDecoration: "none" }}>{l}</a>
          ))}
          <a href="https://m.me/santorini.lia.soleil" target="_blank" style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 500, padding: "10px 22px", background: sc ? C.navy : "rgba(255,255,255,0.12)", color: C.w, borderRadius: 2, textDecoration: "none", border: sc ? "none" : "1px solid rgba(255,255,255,0.25)" }}>Chat with us</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,20,30,0.25) 0%, rgba(15,20,30,0.45) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, " + C.gold + ", transparent)" }} />
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: 700 }}>
        <h1 style={{ fontFamily: "'IM Fell English', serif", fontSize: 56, fontStyle: "italic", fontWeight: 400, color: C.w, lineHeight: 1.15, margin: "0 0 22px" }}>A quiet corner of Tagaytay, styled after the Greek Isles</h1>
        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: "0 auto 38px", maxWidth: 460 }}>Four Mediterranean-inspired suites at La Bella Residences. Clean lines, calming blues, and the cool Tagaytay air.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "15px 36px", background: C.w, color: C.navy, borderRadius: 2, textDecoration: "none" }}>Reserve Your Stay</a>
          <a href="#suites" style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "15px 36px", color: C.w, border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 2, textDecoration: "none" }}>View Our Suites</a>
        </div>
      </div>
    </section>
  );
}

function SuiteRow({ suite, flipped }) {
  return (
    <FadeIn>
      <div style={{ display: "flex", gap: 0, marginBottom: 72, flexDirection: flipped ? "row-reverse" : "row" }}>
        <div style={{ flex: 1 }}>
          {suite.img
            ? <div style={{ height: 380, borderRadius: 3, overflow: "hidden" }}><img src={suite.img} alt={suite.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
            : <PH h={380} text={suite.name + " — photo coming soon"} />
          }
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: flipped ? "0 40px 0 0" : "0 0 0 40px" }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: 10 }}>{suite.label}</div>
          <h3 style={{ fontFamily: "'IM Fell English', serif", fontSize: 32, fontStyle: "italic", color: C.navy, margin: "0 0 6px" }}>{suite.name}</h3>
          <p style={{ fontFamily: "sans-serif", fontSize: 13, color: C.tx, margin: "0 0 20px" }}>{suite.tag}</p>
          <div style={{ display: "flex", gap: 18, marginBottom: 16, flexWrap: "wrap", fontFamily: "sans-serif", fontSize: 12, color: C.tx }}><span>{suite.guests} guests</span><span>{suite.beds} bed{suite.beds > 1 ? "s" : ""}</span><span>{suite.baths} bath</span><span>{suite.size}</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>{suite.features.map((f) => <span key={f} style={{ fontFamily: "sans-serif", fontSize: 10.5, color: C.nl, padding: "4px 11px", background: C.off, borderRadius: 2, border: "1px solid " + C.ln }}>{f}</span>)}</div>
          <div style={{ display: "flex", gap: 20, alignItems: "baseline", marginBottom: 6 }}>
            <div><span style={{ fontFamily: "'IM Fell English', serif", fontSize: 24, color: C.navy }}>{suite.pw}</span><span style={{ fontFamily: "sans-serif", fontSize: 10, color: C.tx, marginLeft: 5 }}>weekday</span></div>
            <div><span style={{ fontFamily: "'IM Fell English', serif", fontSize: 24, color: C.navy }}>{suite.pe}</span><span style={{ fontFamily: "sans-serif", fontSize: 10, color: C.tx, marginLeft: 5 }}>weekend</span></div>
          </div>
          <p style={{ fontFamily: "sans-serif", fontSize: 11, color: C.gold, margin: "0 0 20px", fontStyle: "italic" }}>{suite.note}</p>
          <a href={suite.airbnb} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", alignSelf: "flex-start", fontFamily: "sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "11px 26px", background: C.navy, color: C.w, borderRadius: 2, textDecoration: "none" }}>Book on Airbnb</a>
        </div>
      </div>
    </FadeIn>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const inp = { fontFamily: "sans-serif", fontSize: 13, color: C.navy, padding: "12px 14px", border: "1px solid " + C.ln, borderRadius: 2, background: C.w, outline: "none", width: "100%", boxSizing: "border-box" };
  const lbl = { fontFamily: "sans-serif", fontSize: 10.5, fontWeight: 500, color: C.tx, marginBottom: 5, display: "block" };

  if (sent) return (
    <section id="contact" style={{ padding: "90px 24px", background: C.w }}>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: 28, fontStyle: "italic", color: C.navy }}>Thank you for your inquiry</h2>
        <p style={{ fontFamily: "sans-serif", fontSize: 14, color: C.tx }}>We will get back to you within a few hours.</p>
      </div>
    </section>
  );

  return (
    <section id="contact" style={{ padding: "90px 24px", background: C.w }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <FadeIn><SH sub="Get in touch" title="Plan your stay" /></FadeIn>
        <FadeIn delay={0.04}>
          <p style={{ fontFamily: "sans-serif", fontSize: 15, color: C.tx, maxWidth: 480, margin: "-28px auto 32px", lineHeight: 1.75, textAlign: "center" }}>
            Let us know your dates and preferred suite and we will confirm availability. You can also <a href="https://m.me/santorini.lia.soleil" target="_blank" rel="noopener noreferrer" style={{ color: C.navy, fontWeight: 500, textDecoration: "underline" }}>chat with us on Messenger</a> for a faster response.
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{ background: C.off, padding: "30px 26px", borderRadius: 3, border: "1px solid " + C.ln }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div><label style={lbl}>Name</label><input placeholder="Your full name" style={inp} /></div>
              <div><label style={lbl}>Email</label><input type="email" placeholder="your@email.com" style={inp} /></div>
              <div><label style={lbl}>Phone</label><input type="tel" placeholder="+63 XXX XXX XXXX" style={inp} /></div>
              <div><label style={lbl}>Preferred suite</label><select style={{...inp, cursor: "pointer"}}><option>Select a suite</option><option>Rhodes (Studio Deluxe)</option><option>Hydra (Studio Premium)</option><option>Asteria (1-Bedroom)</option><option>Mykonos (2-Bedroom)</option></select></div>
              <div><label style={lbl}>Check-in</label><input type="date" style={inp} /></div>
              <div><label style={lbl}>Check-out</label><input type="date" style={inp} /></div>
              <div><label style={lbl}>Adults</label><input type="number" min="1" max="8" defaultValue="1" style={inp} /></div>
              <div><label style={lbl}>Children</label><input type="number" min="0" max="8" defaultValue="0" style={inp} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={lbl}>Pets?</label><select style={{...inp, cursor: "pointer"}}><option>No pets</option><option>1 pet</option><option>2 pets</option><option>3+ pets</option></select></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={lbl}>Message (optional)</label><textarea rows={3} placeholder="Any special requests..." style={{...inp, resize: "vertical"}} /></div>
            </div>
            <button onClick={() => setSent(true)} style={{ display: "block", width: "100%", marginTop: 18, fontFamily: "sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "14px 0", background: C.navy, color: C.w, border: "none", borderRadius: 2, cursor: "pointer" }}>Send Inquiry</button>
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
            <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.38)" }}>La Bella Residences, Tagaytay City</div>
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 2 }}>
            <a href="mailto:santoriniliasoleil@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>santoriniliasoleil@gmail.com</a><br />
	<a href="https://m.me/santorini.lia.soleil" target="_blank" style={{ color: "inherit", textDecoration: "none" }}>Chat on Messenger</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, fontFamily: "sans-serif", fontSize: 10.5, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
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
        input:focus, textarea:focus, select:focus { outline: none; }
      `}</style>
      <Nav />
      <Hero />
      <section id="suites" style={{ padding: "100px 24px 40px", background: C.w }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn><SH sub="Accommodations" title="Our suites" /></FadeIn>
          {SUITES.map((s, i) => <SuiteRow key={s.id} suite={s} flipped={i % 2 === 1} />)}
        </div>
      </section>
      <section id="gallery" style={{ padding: "90px 24px", background: C.off }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn><SH sub="La Bella Residences" title="The property" desc="Santorini Lia Soleil occupies four units at La Bella Residences, a low-rise building tucked into one of Tagaytay's quieter corners. The interiors draw from the Cycladic tradition: whitewashed surfaces, blue accents, and natural light doing the work." /></FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "220px 220px", gap: 10 }}>
              <div style={{ gridRow: "1 / 3", borderRadius: 3, overflow: "hidden" }}><img src="/images/curtains.jpg" alt="Curtains" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ gridColumn: "2 / 4", borderRadius: 3, overflow: "hidden" }}><img src="/images/balcony.jpg" alt="Balcony" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} /></div>
              <div style={{ borderRadius: 3, overflow: "hidden" }}><img src="/images/pool.jpg" alt="Pool" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ borderRadius: 3, overflow: "hidden" }}><img src="/images/exterior.jpg" alt="Exterior" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}><p style={{ fontFamily: "sans-serif", fontSize: 15, color: C.tx, maxWidth: 540, margin: "36px auto 0", lineHeight: 1.75, textAlign: "center" }}>This is a place to slow down. The pool is steps from your door, Tagaytay's restaurants and cafes are a short drive away, and the rest of the time is yours.</p></FadeIn>
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
                    <span style={{ fontFamily: "sans-serif", fontSize: 13, color: C.navy, fontWeight: 500 }}>{a.label}</span>
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
          <FadeIn delay={0.08}><div style={{ borderRadius: 4, height: 300, background: C.ln, display: "flex", alignItems: "center", justifyContent: "center" }}><a href="https://maps.app.goo.gl/Ry3jFpfpoeCCGnuw6" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "sans-serif", fontSize: 13, color: C.navy, textDecoration: "none" }}>Open in Google Maps</a></div></FadeIn>
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
}
