import React, { useState, useEffect, useRef } from "react";
import "./landing.css";

// landing.jsx — single-file landing page for ChatGPT Folder Organizer
//const { useState, useEffect, useRef } = React;

const CTA_URL = "https://chromewebstore.google.com/detail/chatgpt-folder-organizer/fhknocgllkkfbnpjplemmkdcnmiecjpj?hl=ko";

/* ============================================================
   Icon set — thin-stroke for light surfaces
   ============================================================ */
function SvgIcon({ children, sw = 1.6, size = 16, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
         stroke="currentColor" strokeWidth={sw}
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {children}
    </svg>
  );
}

function SearchIc(p) { return <SvgIcon {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-3.6-3.6" /></SvgIcon>; }
function FolderIc(p) { return <SvgIcon {...p}><path d="M3.5 6.5a2 2 0 0 1 2-2h3.2l2 2H18.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11z" /></SvgIcon>; }
function FolderOpenIc(p) { return <SvgIcon {...p}><path d="M3.5 6.5a2 2 0 0 1 2-2h3.2l2 2H18.5a2 2 0 0 1 2 2v1.5" /><path d="M3.5 9.5h18l-2.4 8.2a2 2 0 0 1-1.9 1.3H5.4a2 2 0 0 1-1.9-1.5L3.5 9.5z" /></SvgIcon>; }
function ChatIc(p) { return <SvgIcon {...p}><path d="M4 5.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7.5L6 19v-3.5h-0a2 2 0 0 1-2-2v-8z" /></SvgIcon>; }
function CaretIc(p) { return <SvgIcon {...p}><path d="M9 6l6 6-6 6" /></SvgIcon>; }
function PlusIc(p) { return <SvgIcon {...p}><path d="M12 5v14" /><path d="M5 12h14" /></SvgIcon>; }
function CheckIc(p) { return <SvgIcon sw={2} {...p}><path d="M5 12l4.5 4.5L19 7" /></SvgIcon>; }
function LockIc(p) { return <SvgIcon {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></SvgIcon>; }
function ShieldIc(p) { return <SvgIcon {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /></SvgIcon>; }
function ZapIc(p) { return <SvgIcon {...p}><path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" /></SvgIcon>; }
function KeyboardIc(p) { return <SvgIcon {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10" /></SvgIcon>; }
function MoveIc(p) { return <SvgIcon sw={1.3} {...p}><path d="M12 3v18" /><path d="M3 12h18" /><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /><path d="M7 8l5-5 5 5" /><path d="M7 16l5 5 5-5" /></SvgIcon>; }
function StarIc(p) { return <SvgIcon {...p}><path d="M12 4l2.5 5.2 5.7.8-4.1 4 .9 5.8L12 17l-5 2.8.9-5.8L3.8 10l5.7-.8L12 4z" /></SvgIcon>; }
function ChromeIc(p) { return <SvgIcon {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.2" /><path d="M12 8.8h8" /><path d="M9.6 13.6l-4 6.9" /><path d="M14.4 13.6l4 6.9" /></SvgIcon>; }
function ArrowIc(p) { return <SvgIcon {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></SvgIcon>; }
function SparkleIc(p) { return <SvgIcon {...p}><path d="M12 3l1.5 5L18 9.5 13.5 11 12 16l-1.5-5L6 9.5 10.5 8 12 3z" /></SvgIcon>; }
function ServerIc(p) { return <SvgIcon {...p}><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><circle cx="8" cy="7" r="0.8" fill="currentColor" /><circle cx="8" cy="17" r="0.8" fill="currentColor" /></SvgIcon>; }
function NoCloudIc(p) { return <SvgIcon {...p}><path d="M5 16a4 4 0 0 1 0-8 5 5 0 0 1 10 0.5" /><path d="M14 13a3 3 0 0 1 5 2" /><path d="M3 3l18 18" /></SvgIcon>; }
function SettingsIc(p) { return <SvgIcon {...p}><circle cx="12" cy="12" r="2.5" /><path d="M19.4 13.5a7.5 7.5 0 0 0 0-3l1.6-1.2-1.5-2.6-1.9.6a7.5 7.5 0 0 0-2.6-1.5l-.4-2H9.4l-.4 2A7.5 7.5 0 0 0 6.4 7.3l-1.9-.6L3 9.3l1.6 1.2a7.5 7.5 0 0 0 0 3L3 14.7l1.5 2.6 1.9-.6a7.5 7.5 0 0 0 2.6 1.5l.4 2h5.2l.4-2a7.5 7.5 0 0 0 2.6-1.5l1.9.6 1.5-2.6-1.6-1.2z" /></SvgIcon>; }
function SendIc(p) { return <SvgIcon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></SvgIcon>; }
function HashIc(p) { return <SvgIcon {...p}><path d="M4.5 9h15" /><path d="M4.5 15h15" /><path d="M10 4l-2 16" /><path d="M16 4l-2 16" /></SvgIcon>; }

/* ============================================================
   Reveal-on-scroll
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    // Fallback: if the page is hidden (background tab / prerender) or the
    // user prefers reduced motion, reveal everything immediately so the
    // page never stays blank.
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.visibilityState !== "visible" || reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    // Reveal anything already in the viewport on mount.
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("in");
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function useScrolled() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const onScroll = () => setS(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return s;
}

/* ============================================================
   Brand mark
   ============================================================ */
function BrandMark({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="10" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 1.5h5l1.5 2H3z" fill="currentColor" />
    </svg>
  );
}

/* ============================================================
   Nav
   ============================================================ */
function Nav() {
  const scrolled = useScrolled();
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-inner">
        <a className="brand" href="#top">
          <span className="mark"><BrandMark size={14} /></span>
          Folder Organizer
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#privacy">Privacy</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-right">
          <span className="nav-stars">
            <span className="stars">★★★★★</span> 4.9 · 1.2k
          </span>
          <a className="btn btn-primary btn-sm" href={CTA_URL} target="_blank" rel="noopener">
            <ChromeIc size={14} />
            Add to Chrome
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg-grid" />
      <div className="container hero-inner">
        <span className="eyebrow reveal">
          <span className="dot" /> v1.4 · 100% local · Manifest V3
        </span>
        <h1 className="reveal" data-delay="1">
          Never lose a ChatGPT<br />
          conversation <em>again.</em>
        </h1>
        <p className="sub reveal" data-delay="2">
          A focused Chrome extension that turns months of chat history into a clean, searchable
          library — nested folders, instant search, right-click organization. All on your device.
        </p>
        <div className="hero-ctas reveal" data-delay="3">
          <a className="btn btn-primary btn-lg" href={CTA_URL} target="_blank" rel="noopener">
            <ChromeIc size={16} />
            Install Free Extension
          </a>
          <a className="btn btn-ghost btn-lg" href="#features">
            See how it works
            <ArrowIc size={14} />
          </a>
        </div>
        <div className="hero-meta reveal" data-delay="4">
          <span><span className="ok"><CheckIc size={10} /></span> Free forever</span>
          <span><span className="ok"><CheckIc size={10} /></span> No account required</span>
          <span><span className="ok"><CheckIc size={10} /></span> 1.2k+ installs</span>
        </div>

        <div className="hero-mockup-wrap reveal" data-delay="4">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Hero mockup — browser window + AI chat with organizer panel
   ============================================================ */
function HeroMockup() {
  return (
    <div className="window">
      <div className="win-chrome">
        <div className="win-dots"><i /><i /><i /></div>
        <div className="win-url">
          <LockIc size={11} className="lock" />
          <span className="domain">chat.example.ai</span>
          <span style={{ color: "var(--ink-3)" }}>/c/2f8a-resonance-mapping</span>
        </div>
        <div className="win-ext">
          <span className="pill-on" />
          Folder Organizer
        </div>
      </div>

      <div className="mock">
        <MockSide />
        <MockMain />
        <MockContextMenu />
        <div className="mock-badge">
          <span className="dot" />
          All data stored locally
        </div>
      </div>
    </div>
  );
}

function MockSide() {
  return (
    <aside className="mock-side">
      <div className="mock-side-head">
        <span className="mock-logo"><BrandMark size={12} /></span>
        <span className="name">Library</span>
        <span className="gear"><SettingsIc size={13} /></span>
      </div>
      <div className="mock-search">
        <SearchIc size={12} className="ico" />
        <span><span className="hl">resona</span>nce</span>
        <span className="kbd">⌘K</span>
      </div>

      <div className="mock-side-scroll">
        <div className="mock-sec"><span>Folders</span><span className="ct">7</span></div>

        <div className="mrow active" style={{ position: "relative" }}>
          <CaretIc size={10} className="caret open" />
          <FolderOpenIc size={13} className="ico" />
          <span className="label">Research</span>
          <span className="ct">42</span>
        </div>
        <div style={{ position: "relative" }}>
          <span className="indent-guide" />
          <div className="mrow child">
            <CaretIc size={10} className="caret open" />
            <FolderOpenIc size={13} className="ico" />
            <span className="label"><span className="hl">Resona</span>nce models</span>
            <span className="ct">11</span>
          </div>
          <div style={{ position: "relative" }}>
            <span className="indent-guide" style={{ left: 38 }} />
            <div className="mrow child-2">
              <ChatIc size={12} className="ico" />
              <span className="label">Spectral <span className="hl">resona</span>nce mapping</span>
            </div>
            <div className="mrow child-2">
              <ChatIc size={12} className="ico" />
              <span className="label">Frequency-domain cache</span>
            </div>
            <div className="mrow child-2">
              <ChatIc size={12} className="ico" />
              <span className="label">Centroid drift, long ctx</span>
            </div>
          </div>
          <div className="mrow child">
            <CaretIc size={10} className="caret" />
            <FolderIc size={13} className="ico" />
            <span className="label">Latent atlas</span>
            <span className="ct">08</span>
          </div>
          <div className="mrow child">
            <CaretIc size={10} className="caret" />
            <FolderIc size={13} className="ico" />
            <span className="label">Eval rigs</span>
            <span className="ct">06</span>
          </div>
        </div>

        <div className="mrow">
          <CaretIc size={10} className="caret" />
          <FolderIc size={13} className="ico" />
          <span className="label">Writing</span>
          <span className="ct">14</span>
        </div>
        <div className="mrow">
          <CaretIc size={10} className="caret" />
          <FolderIc size={13} className="ico" />
          <span className="label">Code review</span>
          <span className="ct">22</span>
        </div>
        <div className="mrow">
          <CaretIc size={10} className="caret" />
          <FolderIc size={13} className="ico" />
          <span className="label">Personal</span>
          <span className="ct">09</span>
        </div>
      </div>
    </aside>
  );
}

function MockMain() {
  return (
    <section className="mock-main">
      <div className="mock-main-head">
        <div>
          <div className="title">Spectral resonance mapping vs. cosine</div>
          <div className="meta">thread · 38 turns · in Research / Resonance models</div>
        </div>
        <div className="right">
          <span className="mock-pill">claude · 4.5</span>
          <span className="mock-pill">★ pinned</span>
        </div>
      </div>
      <div className="mock-body">
        <div className="bub me">
          <div className="av">JK</div>
          <div className="text">I want to map the resonance pattern between two adjacent prompt seeds — what's the cleanest way to score similarity without overfitting on token order?</div>
        </div>
        <div className="bub">
          <div className="av">◐</div>
          <div className="text">
            <div className="ln w-90" />
            <div className="ln w-70" />
            <div className="ln w-50" />
          </div>
        </div>
        <div className="bub me">
          <div className="av">JK</div>
          <div className="text">Use semantic centroids?</div>
        </div>
        <div className="bub">
          <div className="av">◐</div>
          <div className="text">
            Centroids work for the broad shape but flatten the local texture. Try a hybrid that pairs<span className="stream-caret" />
          </div>
        </div>
      </div>
      <div className="mock-input">
        <SparkleIc size={14} style={{ color: "var(--ink-3)" }} />
        <span>Reply to thread — ⌘↵ to send</span>
        <span className="send"><SendIc size={13} /></span>
      </div>
    </section>
  );
}

function MockContextMenu() {
  return (
    <div className="mock-ctx">
      <div className="item">
        <ChatIc size={13} className="ico" />
        Open in new tab
      </div>
      <div className="item">
        <StarIc size={13} className="ico" />
        Pin to top
      </div>
      <div className="sep" />
      <div className="item on">
        <FolderIc size={13} className="ico" />
        Move to folder
        <CaretIc size={11} className="arrow" />
      </div>
      <div className="item">
        <HashIc size={13} className="ico" />
        Add tag
      </div>
      <div className="item">
        <PlusIc size={13} className="ico" />
        New folder…
        <span className="kbd">⌘⇧N</span>
      </div>
      <div className="submenu-cue">
        <div className="item">
          <FolderOpenIc size={13} className="ico" />
          Research / Resonance models
        </div>
        <div className="item">
          <FolderIc size={13} className="ico" />
          Research / Latent atlas
        </div>
        <div className="item">
          <FolderIc size={13} className="ico" />
          Code review
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Problem section
   ============================================================ */
function Problem() {
  return (
    <section id="problem">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="dot" /> The problem</span>
          <h2>ChatGPT history gets <em>messy fast.</em></h2>
          <p>
            One endless scroll of "New chat", "New chat (2)", "untitled — please rename me".
            Important threads vanish after a week, and search only finds what you already remember.
          </p>
        </div>

        <div className="problem-vis">
          <div className="before reveal">
            <div className="ba-head">
              <span className="ba-tag">Default — chronological</span>
              <span className="ba-count">847 chats · unsorted</span>
            </div>
            <div className="ba-list">
              {[
                "untitled chat",
                "New chat",
                "Help with regex pattern",
                "untitled chat",
                "Quick question",
                "New chat",
                "Resonance idea — try again",
                "untitled chat",
                "Q4 retro thoughts (draft)",
                "New chat",
              ].map((label, i) => (
                <div className="mrow" key={i}>
                  <ChatIc size={12} className="ico" />
                  <span className="label">{label}</span>
                  {(label === "New chat" || label === "untitled chat") && (
                    <span className="badge-dup">duplicate</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="after reveal" data-delay="1">
            <div className="ba-head">
              <span className="ba-tag">With Folder Organizer</span>
              <span className="ba-count">847 chats · 7 folders · indexed</span>
            </div>
            <div className="ba-list">
              <div className="mrow"><CaretIc size={10} className="caret open" /><FolderOpenIc size={13} className="ico" /><span className="label">Research</span><span className="ct">42</span></div>
              <div style={{ position: "relative" }}>
                <span className="indent-guide" style={{ left: 22, top: 0, bottom: 0 }} />
                <div className="mrow child"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Resonance models</span><span className="ct">11</span></div>
                <div className="mrow child"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Latent atlas</span><span className="ct">08</span></div>
                <div className="mrow child"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Eval rigs</span><span className="ct">06</span></div>
              </div>
              <div className="mrow"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Writing</span><span className="ct">14</span></div>
              <div className="mrow"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Code review</span><span className="ct">22</span></div>
              <div className="mrow"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Personal</span><span className="ct">09</span></div>
              <div className="mrow"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Quarterly retros</span><span className="ct">12</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Solution splits
   ============================================================ */
function SolutionFolders() {
  return (
    <section id="folders">
      <div className="container">
        <div className="split">
          <div className="reveal">
            <span className="eyebrow"><FolderIc size={11} /> Nested folders</span>
            <h2>Organize like a real workspace.</h2>
            <p className="lead">
              Build folder trees as deep as you want. Drag conversations between them, rename
              anything inline, and keep your work-from-2-months-ago one click away.
            </p>
            <ul className="checks">
              <li><span className="chk"><CheckIc size={12} /></span> Unlimited nesting — folders inside folders inside folders.</li>
              <li><span className="chk"><CheckIc size={12} /></span> Drag-and-drop reorder, inline rename, bulk move.</li>
              <li><span className="chk"><CheckIc size={12} /></span> Per-folder counts so you can spot the bloat.</li>
            </ul>
            <a className="btn-link" href="#pricing">Get the Pro plan</a>
          </div>
          <div className="reveal" data-delay="1">
            <FolderVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function FolderVisual() {
  return (
    <div className="window" style={{ borderRadius: 14 }}>
      <div className="win-chrome">
        <div className="win-dots"><i /><i /><i /></div>
        <div className="win-url"><LockIc size={11} className="lock" /><span className="domain">chat.example.ai</span></div>
        <div className="win-ext"><span className="pill-on" />Folder Organizer</div>
      </div>
      <div style={{ padding: "18px 20px", background: "var(--bg-soft)" }}>
        <div className="mrow active"><CaretIc size={10} className="caret open" /><FolderOpenIc size={13} className="ico" /><span className="label">Research</span><span className="ct">42</span></div>
        <div style={{ position: "relative" }}>
          <span className="indent-guide" style={{ left: 22, top: 0, bottom: 0 }} />
          <div className="mrow child"><CaretIc size={10} className="caret open" /><FolderOpenIc size={13} className="ico" /><span className="label">Resonance models</span><span className="ct">11</span></div>
          <div style={{ position: "relative" }}>
            <span className="indent-guide" style={{ left: 38, top: 0, bottom: 0 }} />
            <div className="mrow child-2"><ChatIc size={12} className="ico" /><span className="label">Spectral mapping vs. cosine</span></div>
            <div className="mrow child-2"><ChatIc size={12} className="ico" /><span className="label">Frequency-domain prompt cache</span></div>
            <div className="mrow child-2"><ChatIc size={12} className="ico" /><span className="label">Centroid drift at 30k tokens</span></div>
          </div>
          <div className="mrow child"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Latent atlas</span><span className="ct">08</span></div>
          <div className="mrow child"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Eval rigs</span><span className="ct">06</span></div>
          <div className="mrow child"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Long-context behavior</span><span className="ct">12</span></div>
        </div>
        <div className="mrow"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Writing</span><span className="ct">14</span></div>
        <div className="mrow"><CaretIc size={10} className="caret" /><FolderIc size={13} className="ico" /><span className="label">Code review</span><span className="ct">22</span></div>
      </div>
    </div>
  );
}

function SolutionSearch() {
  return (
    <section>
      <div className="container">
        <div className="split reverse">
          <div className="reveal">
            <span className="eyebrow"><SearchIc size={11} /> Fast search</span>
            <h2>Find any conversation in milliseconds.</h2>
            <p className="lead">
              An on-device index searches across every message in every chat — titles, replies,
              code blocks, snippets — and highlights the exact phrase that matched.
            </p>
            <ul className="checks">
              <li><span className="chk"><CheckIc size={12} /></span> Fuzzy matching with phrase highlighting.</li>
              <li><span className="chk"><CheckIc size={12} /></span> Scope to a folder, tag, or time window.</li>
              <li><span className="chk"><CheckIc size={12} /></span> ⌘K from anywhere — keyboard-first.</li>
            </ul>
            <a className="btn-link" href="#features">Browse all features</a>
          </div>
          <div className="reveal" data-delay="1">
            <SearchVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchVisual() {
  return (
    <div className="window" style={{ borderRadius: 14 }}>
      <div className="win-chrome">
        <div className="win-dots"><i /><i /><i /></div>
        <div className="win-url"><LockIc size={11} className="lock" /><span className="domain">chat.example.ai</span></div>
        <div className="win-ext"><span className="pill-on" />Folder Organizer</div>
      </div>
      <div style={{ padding: "16px 18px 18px", background: "var(--bg-soft)" }}>
        <div className="mock-search" style={{ margin: 0, marginBottom: 14 }}>
          <SearchIc size={13} className="ico" />
          <span style={{ color: "var(--ink-0)", fontFamily: "var(--mono)" }}>resonance<span className="stream-caret" /></span>
          <span className="kbd">⌘K</span>
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 0.06, color: "var(--ink-3)", textTransform: "uppercase", padding: "0 4px 6px" }}>
          5 results · 8ms · across 847 chats
        </div>
        <SearchHit
          title={<>Spectral <span className="hl">resonance</span> mapping vs. cosine</>}
          preview={<>…the <span className="hl">resonance</span> pattern between two adjacent prompt seeds…</>}
          path="Research / Resonance models"
        />
        <SearchHit
          title={<><span className="hl">Resonance</span> models — overview & roadmap</>}
          preview={<>…centroid drift remains the open question for our <span className="hl">resonance</span> family of…</>}
          path="Research / Resonance models"
        />
        <SearchHit
          title={<>Phase-aware <span className="hl">resonance</span> notes v3</>}
          preview={<>…replace cosine with a band-limited <span className="hl">resonance</span> kernel; results are…</>}
          path="Research / Resonance models"
        />
        <SearchHit
          title={<>Walking the latent dog — <span className="hl">resonance</span> tangent</>}
          preview={<>…surprising <span className="hl">resonance</span> with the field guide rewrite — should I cross-link…</>}
          path="Personal"
          muted
        />
      </div>
    </div>
  );
}

function SearchHit({ title, preview, path, muted }) {
  return (
    <div className="mrow" style={{ alignItems: "flex-start", padding: "9px 12px", marginBottom: 2, background: "var(--bg)", borderRadius: 8, boxShadow: muted ? "none" : "inset 0 0 0 1px var(--line)" }}>
      <ChatIc size={13} className="ico" style={{ marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "var(--ink-0)", fontSize: 13, fontWeight: 500, letterSpacing: "-0.005em" }}>{title}</div>
        <div style={{ color: "var(--ink-2)", fontSize: 12, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{preview}</div>
        <div style={{ color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 0.04, marginTop: 5 }}>{path}</div>
      </div>
    </div>
  );
}

/* ============================================================
   Features grid
   ============================================================ */
function Features() {
  const items = [
    {
      ico: <FolderIc size={18} />,
      title: "Nested folders",
      body: "Build folder trees as deep as the project needs. Drag, drop, rename — it sticks.",
      mini: "Unlimited depth · drag-to-move",
    },
    {
      ico: <SearchIc size={18} />,
      title: "Fast search",
      body: "On-device fuzzy search across every message, with the exact phrase highlighted.",
      mini: "⌘K · phrase highlighting",
    },
    {
      ico: <MoveIc size={18} />,
      title: "Right-click organize",
      body: "Move chats into folders straight from the conversation list. No detours.",
      mini: "Native context menu",
    },
    {
      ico: <NoCloudIc size={18} />,
      title: "Local-only privacy",
      body: "Folders, tags, and indexes live in your browser. Nothing leaves the device.",
      mini: "No servers · no auth",
    },
    {
      ico: <ZapIc size={18} />,
      title: "Offline-first",
      body: "Works the same on a plane, in a tunnel, or behind a corporate firewall.",
      mini: "0 network calls",
    },
    {
      ico: <KeyboardIc size={18} />,
      title: "Simple interface",
      body: "A focused panel that slots into your existing chat flow — no new app to learn.",
      mini: "Keyboard-first · 12 shortcuts",
    },
  ];
  return (
    <section id="features">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="dot" /> Features</span>
          <h2>A serious tool for serious chat history.</h2>
          <p>Six small things, done carefully. Nothing more.</p>
        </div>
        <div className="features">
          {items.map((it, i) => (
            <div className="feature reveal" data-delay={String((i % 3) + 1)} key={i}>
              <div className="ico-wrap">{it.ico}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
              <div className="feat-mini">{it.mini}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Workflow
   ============================================================ */
function Workflow() {
  return (
    <section id="workflow" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="dot" /> Workflow</span>
          <h2>From install to organized in <em>under a minute.</em></h2>
          <p>No accounts. No imports. The extension reads what's already in your chat history.</p>
        </div>
        <div className="workflow">
          <Step n="01" t="Install extension" d="One click from the Chrome Web Store. No sign-up, no payment.">
            <StepInstall />
          </Step>
          <Step n="02" t="Create folders" d="Nest as deeply as you want. Rename inline, color-code optional.">
            <StepCreate />
          </Step>
          <Step n="03" t="Move conversations" d="Right-click any chat → choose a folder. Bulk-move with shift-select.">
            <StepMove />
          </Step>
          <Step n="04" t="Find anything instantly" d="⌘K to search. Phrase highlighting, fuzzy match, folder scoping.">
            <StepFind />
          </Step>
        </div>
      </div>
    </section>
  );
}
function Step({ n, t, d, children }) {
  return (
    <div className="step reveal">
      <div className="n">Step {n}</div>
      <h4>{t}</h4>
      <p>{d}</p>
      <div className="vis">{children}</div>
    </div>
  );
}
function StepInstall() {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-0)" }}>
        <ChromeIc size={22} />
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: 0.08 }}>chrome web store · 1.2k+</div>
    </div>
  );
}
function StepCreate() {
  return (
    <div style={{ width: "100%" }}>
      <div className="mrow" style={{ margin: 0, background: "var(--bg)", border: "1px solid var(--line)" }}>
        <CaretIc size={10} className="caret open" />
        <FolderOpenIc size={13} className="ico" />
        <span className="label">Research</span>
        <span className="ct">42</span>
      </div>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 22, top: 0, bottom: 0, width: 1, background: "var(--line-soft)" }} />
        <div className="mrow child" style={{ margin: 0, marginTop: 4, background: "var(--bg)", border: "1px solid var(--line)" }}>
          <FolderIc size={13} className="ico" />
          <span className="label">Resonance models</span>
          <span className="ct">11</span>
        </div>
      </div>
    </div>
  );
}
function StepMove() {
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className="mrow" style={{ margin: 0, background: "var(--bg)", border: "1px dashed var(--line-strong)", color: "var(--ink-2)" }}>
        <ChatIc size={13} className="ico" />
        <span className="label">Resonance idea — try again</span>
      </div>
      <div style={{ position: "absolute", right: -2, top: 28, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 6, padding: "4px 8px", fontSize: 11, color: "var(--ink-1)", boxShadow: "0 8px 18px oklch(0.16 0.008 250 / 0.10)" }}>
        → Research / Resonance models
      </div>
    </div>
  );
}
function StepFind() {
  return (
    <div style={{ width: "100%" }}>
      <div className="mock-search" style={{ margin: 0, marginBottom: 6 }}>
        <SearchIc size={12} className="ico" />
        <span style={{ color: "var(--ink-0)" }}><span className="hl">resona</span>nce</span>
        <span className="kbd">⌘K</span>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: 0.06 }}>5 results · 8ms</div>
    </div>
  );
}

/* ============================================================
   Pricing
   ============================================================ */
function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="dot" /> Pricing</span>
          <h2>Free forever. Pro is <em>one payment.</em></h2>
          <p>No subscriptions, no renewals, no surprise bills. Pay once, use it for life.</p>
        </div>
        <div className="pricing">
          <div className="plan reveal">
            <div className="plan-name">
              Free
              <span className="tag">forever</span>
            </div>
            <div className="price">
              $0
              <span className="unit">/ forever</span>
            </div>
            <div className="desc">Everything you need to try the workflow.</div>
            <ul>
              <li><span className="chk"><CheckIc size={11} /></span> 3 folders</li>
              <li><span className="chk"><CheckIc size={11} /></span> 20 searches per day</li>
              <li><span className="chk"><CheckIc size={11} /></span> Right-click move & rename</li>
              <li><span className="chk"><CheckIc size={11} /></span> Offline-first · local-only</li>
              <li><span className="chk"><CheckIc size={11} /></span> No account required</li>
            </ul>
            <a className="btn btn-free" href={CTA_URL} target="_blank" rel="noopener">
              <ChromeIc size={14} />
              Install Free Extension
            </a>
            <div className="small">no credit card · no sign-up</div>
          </div>

          <div className="plan pro reveal" data-delay="1">
            <div className="ribbon">most popular</div>
            <div className="plan-name">
              Pro
              <span className="tag">lifetime</span>
            </div>
            <div className="price">
              <span className="strike">$48</span>
              $19
              <span className="unit">one-time</span>
            </div>
            <div className="desc">Pay once. Yours forever. Updates included.</div>
            <ul>
              <li><span className="chk"><CheckIc size={11} /></span> Unlimited folders & nesting</li>
              <li><span className="chk"><CheckIc size={11} /></span> Unlimited searches</li>
              <li><span className="chk"><CheckIc size={11} /></span> Bulk move & tag manager</li>
              <li><span className="chk"><CheckIc size={11} /></span> Up to 5 devices</li>
              <li><span className="chk"><CheckIc size={11} /></span> Lifetime updates</li>
              <li><span className="chk"><CheckIc size={11} /></span> Priority email support</li>
            </ul>
            <a className="btn btn-pro" href={CTA_URL} target="_blank" rel="noopener">
              Upgrade to Pro · $19
              <ArrowIc size={14} />
            </a>
            <div className="small">30-day refund · no questions asked</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Privacy
   ============================================================ */
function Privacy() {
  return (
    <section id="privacy" className="privacy-section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><LockIc size={11} /> Privacy</span>
          <h2>Your conversations <em>never</em> leave your device.</h2>
          <p>
            No cloud, no analytics, no servers under our control. The extension is a closed loop —
            your browser, your data, full stop.
          </p>
          <div className="privacy-badge">
            <span className="sym"><LockIc size={12} /></span>
            local-storage · manifest v3 · no remote code
          </div>
        </div>
        <div className="privacy-grid">
          <div className="privacy-card reveal">
            <div className="ico-wrap"><NoCloudIc size={16} /></div>
            <h4>No cloud storage</h4>
            <p>Folders and indexes live in your browser's local storage. Nothing is uploaded anywhere — not to us, not to a third party.</p>
          </div>
          <div className="privacy-card reveal" data-delay="1">
            <div className="ico-wrap"><ServerIc size={16} /></div>
            <h4>No servers, no API calls</h4>
            <p>The extension performs zero network requests after install. Audit it yourself — open DevTools, watch the network tab.</p>
          </div>
          <div className="privacy-card reveal" data-delay="2">
            <div className="ico-wrap"><ShieldIc size={16} /></div>
            <h4>No tracking, no telemetry</h4>
            <p>No analytics SDKs, no user IDs, no usage pings. We don't know who installed it, and we like it that way.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    {
      q: "Does it work with the regular ChatGPT account?",
      a: "Yes — it works with chat.openai.com / chatgpt.com on Free, Plus, Team, and Enterprise accounts. The extension reads conversation lists already loaded in your browser; it does not log into your account.",
    },
    {
      q: "Are my conversations sent to your servers?",
      a: "No. Folder Organizer makes zero network calls after install. Everything — folders, tags, search indexes — lives in your browser's local storage. We have no servers that receive your data because we don't have a backend.",
    },
    {
      q: "Will I lose my folders if I uninstall the extension?",
      a: "Yes, because folder metadata lives in your browser's storage. Before uninstalling, use Settings → Export to download a JSON file you can re-import later.",
    },
    {
      q: "Can I use Pro on more than one computer?",
      a: "Yes — one Pro license covers up to 5 devices. Activate by entering the license key in the extension settings on each browser.",
    },
    {
      q: "Why a one-time payment instead of a subscription?",
      a: "Because the extension does not need ongoing server costs. We charge once, and we keep it that way as long as the model holds. Updates are included for life.",
    },
    {
      q: "What permissions does the extension request?",
      a: "Only the host permission for the chat domain you use, plus storage. No tabs, no clipboard, no identity. The manifest is published — anyone can audit it.",
    },
  ];
  return (
    <section id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="dot" /> Common questions</span>
          <h2>Things people ask before installing.</h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div className={"faq-item reveal" + (open === i ? " open" : "")} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {it.q}
                <span className="toggle" />
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Final CTA + footer
   ============================================================ */
function FinalCTA() {
  return (
    <section style={{ padding: "60px 0 80px" }}>
      <div className="final reveal">
        <div className="final-inner">
          <h2>Take back your chat history — in under a minute.</h2>
          <p>Free forever. No account. No tracking. Add it to Chrome and get organized today.</p>
          <a className="btn btn-primary btn-lg" href={CTA_URL} target="_blank" rel="noopener">
            <ChromeIc size={16} />
            Install Free Extension
          </a>
          <div style={{ marginTop: 18, color: "oklch(0.72 0.005 250)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 0.04 }}>
            ★ 4.9 · 1.2k installs · works on Chrome, Edge, Brave
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-inner">
        <a className="brand" href="#top">
          <span className="mark"><BrandMark size={14} /></span>
          Folder Organizer
        </a>
        <div className="foot-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#privacy">Privacy</a>
          <a href="#faq">FAQ</a>
          <a href={CTA_URL} target="_blank" rel="noopener">Web Store</a>
        </div>
        <div className="meta">© 2026 · made for power users · no servers, no kidding</div>
      </div>
    </footer>
  );
}

/* ============================================================
   App
   ============================================================ */
function App() {
  useReveal();
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <SolutionFolders />
        <SolutionSearch />
        <Features />
        <Workflow />
        <Pricing />
        <Privacy />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
