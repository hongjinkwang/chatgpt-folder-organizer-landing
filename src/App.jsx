import React, { useState, useEffect, useRef } from "react";
import "./landing.css";

// landing.jsx — single-file landing page for ChatGPT Folder Organizer
// Product mockups faithful to the real extension UI (see content.css / content.js).
//const { useState, useEffect, useRef } = React;

const CTA_URL = "https://chromewebstore.google.com/detail/chatgpt-folder-organizer/fhknocgllkkfbnpjplemmkdcnmiecjpj?hl=ko";

/* ============================================================
   Icon set — discrete components (Inter-friendly stroke weights)
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

function SearchIc(p) { return <SvgIcon sw={2.2} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></SvgIcon>; }
function FolderIc(p) { return <SvgIcon {...p}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></SvgIcon>; }
function FolderPlusIc(p) { return <SvgIcon {...p}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><path d="M12 11v6" /><path d="M9 14h6" /></SvgIcon>; }
function ChatIc(p) { return <SvgIcon {...p}><path d="M4 5.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7.5L6 19v-3.5h-0a2 2 0 0 1-2-2v-8z" /></SvgIcon>; }
function CaretRightIc(p) { return <SvgIcon sw={2} {...p}><path d="M9 6l6 6-6 6" /></SvgIcon>; }
function PlusIc(p) { return <SvgIcon sw={2.5} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></SvgIcon>; }
function XIc(p) { return <SvgIcon sw={2.5} {...p}><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></SvgIcon>; }
function CheckIc(p) { return <SvgIcon sw={2} {...p}><path d="M5 12l4.5 4.5L19 7" /></SvgIcon>; }
function LockIc(p) { return <SvgIcon {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></SvgIcon>; }
function ShieldIc(p) { return <SvgIcon {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /></SvgIcon>; }
function ZapIc(p) { return <SvgIcon {...p}><path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" /></SvgIcon>; }
function KeyboardIc(p) { return <SvgIcon {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10" /></SvgIcon>; }
function MoveIc(p) { return <SvgIcon sw={1.3} {...p}><path d="M12 3v18" /><path d="M3 12h18" /><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /><path d="M7 8l5-5 5 5" /><path d="M7 16l5 5 5-5" /></SvgIcon>; }
function StarIc(p) { return <SvgIcon {...p}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></SvgIcon>; }
function ChromeIc(p) { return <SvgIcon {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.2" /><path d="M12 8.8h8" /><path d="M9.6 13.6l-4 6.9" /><path d="M14.4 13.6l4 6.9" /></SvgIcon>; }
function ArrowIc(p) { return <SvgIcon {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></SvgIcon>; }
function SparkleIc(p) { return <SvgIcon {...p}><path d="M12 3l1.5 5L18 9.5 13.5 11 12 16l-1.5-5L6 9.5 10.5 8 12 3z" /></SvgIcon>; }
function ServerIc(p) { return <SvgIcon {...p}><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><circle cx="8" cy="7" r="0.8" fill="currentColor" /><circle cx="8" cy="17" r="0.8" fill="currentColor" /></SvgIcon>; }
function NoCloudIc(p) { return <SvgIcon {...p}><path d="M5 16a4 4 0 0 1 0-8 5 5 0 0 1 10 0.5" /><path d="M14 13a3 3 0 0 1 5 2" /><path d="M3 3l18 18" /></SvgIcon>; }
function EditIc(p) { return <SvgIcon {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></SvgIcon>; }
function TrashIc(p) { return <SvgIcon {...p}><path d="M4 7h16" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M5.5 7l1 13a1.5 1.5 0 0 0 1.5 1.4h8a1.5 1.5 0 0 0 1.5-1.4l1-13" /></SvgIcon>; }
function NewChatIc(p) { return <SvgIcon {...p}><path d="M16 3l5 5-11 11H5v-5l11-11z" /><path d="M14 5l5 5" /></SvgIcon>; }
function MoreIc(p) { return <SvgIcon {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" /></SvgIcon>; }
function CodexIc(p) { return <SvgIcon {...p}><circle cx="12" cy="12" r="8" /><path d="M9 9l-3 3 3 3" /><path d="M15 9l3 3-3 3" /></SvgIcon>; }
function ChevronDownIc(p) { return <SvgIcon sw={2} {...p}><path d="M6 9l6 6 6-6" /></SvgIcon>; }
function PinIc(p) { return <SvgIcon {...p}><path d="M9 3l6 6-2 2 1 6-4-3-5 5 5-5-3-4 2-2 6-6z" /></SvgIcon>; }
function MicIc(p) { return <SvgIcon {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></SvgIcon>; }
function VoiceIc(p) { return <SvgIcon {...p}><path d="M4 12h2M8 8v8M12 6v12M16 9v6M20 12h-2" /></SvgIcon>; }
function ImageIc(p) { return <SvgIcon {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M20.5 16l-5-5-9 8.5" /></SvgIcon>; }
function GlobeIc(p) { return <SvgIcon {...p}><circle cx="12" cy="12" r="8" /><path d="M3.5 12h17" /><path d="M12 3.5a14 14 0 0 1 0 17" /><path d="M12 3.5a14 14 0 0 0 0 17" /></SvgIcon>; }

/* ============================================================
   Reveal-on-scroll (with hidden-tab + reduced-motion fallback)
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.visibilityState !== "visible" || reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
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
            <span>Add to Chrome</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   Real extension panel (faithful)
   ============================================================ */
function CgfPanel({ state = "populated", showFab = true, narrow = false }) {
  // state: 'empty' | 'populated' | 'searching' | 'create' | 'menu' | 'modal'
  return (
    <div className="cgf-panel" style={narrow ? { width: 272 } : null}>
      <div className="cgf-panel-header">
        <span className="cgf-panel-title">Folders</span>
        <div className="cgf-header-actions">
          <button className="cgf-icon-btn" title="New folder"><PlusIc size={14} /></button>
          <button className="cgf-icon-btn" title="Close"><XIc size={13} /></button>
        </div>
      </div>

      {(state === "populated" || state === "searching" || state === "create" || state === "menu" || state === "modal") && (
        <div className="cgf-upgrade-banner">
          <span>Free plan · 3 folders · 20 searches/day</span>
          <button className="cgf-upgrade-pill">Upgrade</button>
        </div>
      )}

      <div className="cgf-search-wrap">
        <div className="cgf-search-inner">
          <SearchIc className="cgf-search-icon" size={12} />
          {state === "searching" ? (
            <input className="cgf-search-input focused" defaultValue="resona" readOnly />
          ) : (
            <input className="cgf-search-input" placeholder="Search folders…" readOnly />
          )}
        </div>
      </div>

      <div className="cgf-folder-list">
        {state === "empty" ? (
          <div className="cgf-empty">
            <FolderIc size={28} className="cgf-empty-icon" />
            <div>No folders yet</div>
            <div className="cgf-empty-sub">Click + to create one</div>
          </div>
        ) : state === "searching" ? (
          <CgfFolderTree query="resona" />
        ) : (
          <CgfFolderTree />
        )}
      </div>

      <div className="cgf-panel-footer">
        <button className="cgf-footer-btn">
          <StarIc size={12} />
          Upgrade to Pro
        </button>
      </div>

      {state === "create" && <CgfCreatePopover />}
      {state === "menu" && <CgfContextMenu />}
      {state === "modal" && <CgfAddChatsModal />}

      {showFab && (
        <div className="cgf-fab" title="ChatGPT Folder Organizer">
          <FolderIc size={18} sw={2} />
        </div>
      )}
    </div>
  );
}

/* highlight helper — accent-bg pill on matches */
function hi(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return (
    <>{text.slice(0, idx)}<span className="cgf-highlight">{text.slice(idx, idx + q.length)}</span>{text.slice(idx + q.length)}</>
  );
}

function CgfFolderTree({ query }) {
  // Two folders, one with expanded children (matches screenshot 5 / 6)
  const folder1Chats = query
    ? [
      { id: "c1", title: "AI 의심 채널 재심 전략 [pinned]" },
    ]
    : [
      { id: "c1", title: "AI 의심 채널 재심 전략 [pinned]" },
      { id: "c2", title: "썸네일제작_꿀잠라디오 [pinned]" },
      { id: "c3", title: "Claude 디자인 자동화 시스템" },
      { id: "c4", title: "내레이션 개선 근거" },
    ];

  return (
    <>
      <div className="cgf-folder-wrap">
        <div className="cgf-folder-row" style={{ paddingLeft: 4 }}>
          <span className="cgf-toggle open"><CaretRightIc size={10} /></span>
          <FolderIc className="cgf-folder-icon" size={13} />
          <span className="cgf-folder-name">{query ? hi("Folder_1", query) : "Folder_1"}</span>
          <span className="cgf-folder-count">{folder1Chats.length}</span>
        </div>
        {folder1Chats.map((c) => (
          <div className="cgf-chat-item" key={c.id} style={{ paddingLeft: 32 }}>
            <span className="lbl">{query ? hi(c.title, query) : c.title}</span>
          </div>
        ))}
      </div>
      <div className="cgf-folder-wrap">
        <div className="cgf-folder-row" style={{ paddingLeft: 4 }}>
          <span className="cgf-toggle"><CaretRightIc size={10} /></span>
          <FolderIc className="cgf-folder-icon" size={13} />
          <span className="cgf-folder-name">Folder_2</span>
          <span className="cgf-folder-count">2</span>
        </div>
      </div>
      {!query && (
        <div className="cgf-folder-wrap">
          <div className="cgf-folder-row" style={{ paddingLeft: 4 }}>
            <span className="cgf-toggle"><CaretRightIc size={10} /></span>
            <FolderIc className="cgf-folder-icon" size={13} />
            <span className="cgf-folder-name">Folder_3</span>
            <span className="cgf-folder-count">5</span>
          </div>
        </div>
      )}
    </>
  );
}

function CgfCreatePopover() {
  return (
    <div className="cgf-create-panel" style={{ top: 38, right: 44 }}>
      <div className="cgf-create-label">New folder</div>
      <input className="cgf-create-input" defaultValue="Folder_1" readOnly />
      <button className="cgf-create-submit">Create folder</button>
    </div>
  );
}

function CgfContextMenu() {
  return (
    <div className="cgf-context-menu" style={{ top: 96, right: 24 }}>
      <div className="cgf-menu-item">
        <PlusIc size={13} sw={2} />
        Add chats
      </div>
      <div className="cgf-menu-item">
        <FolderPlusIc size={13} />
        Add subfolder
      </div>
      <div className="cgf-menu-item">
        <EditIc size={13} />
        Rename
      </div>
      <div className="cgf-menu-divider" />
      <div className="cgf-menu-item danger">
        <TrashIc size={13} />
        Delete
      </div>
    </div>
  );
}

function CgfAddChatsModal() {
  const chats = [
    { title: "AI 의심 채널 재심 전략", on: true },
    { title: "썸네일제작_꿀잠라디오", on: true },
    { title: "Claude 디자인 자동화 시스템", on: true },
    { title: "내레이션 개선 근거", on: true },
    { title: "우주는 왜 존재할까", on: false },
    { title: "우주 콘텐츠 분석", on: false },
    { title: "오피스 시즌7 이후 변화", on: false },
    { title: "에펙 자동 애니메이션 템플릿", on: false },
    { title: "Sora 서비스 종료와 영상 생성 변화", on: false },
  ];
  return (
    <div className="cgf-modal-scrim">
      <div className="cgf-modal-box">
        <div className="cgf-modal-head">
          <span>Add chats to <strong>Folder_1</strong></span>
          <button className="cgf-icon-btn" title="Close"><XIc size={13} /></button>
        </div>
        <div className="cgf-modal-body">
          <div className="cgf-search-wrap">
            <div className="cgf-search-inner">
              <SearchIc className="cgf-search-icon" size={12} />
              <input className="cgf-search-input" placeholder="Filter chats…" readOnly />
            </div>
          </div>
          {chats.map((c, i) => (
            <label className="cgf-chat-label" key={i}>
              <input type="checkbox" defaultChecked={c.on} readOnly />
              <span>{c.title}</span>
            </label>
          ))}
        </div>
        <div className="cgf-modal-foot">
          <button className="cgf-btn-cancel">Cancel</button>
          <button className="cgf-btn-save">Save</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ChatGPT-like host (abstract — generic AI-chat sidebar + main)
   We deliberately keep this generic to avoid recreating ChatGPT's
   distinctive UI patterns; the focus is the right-side panel which
   IS the product.
   ============================================================ */
function HostSidebar({ messy }) {
  const recent = messy
    ? [
      { label: "New chat" },
      { label: "Untitled chat" },
      { label: "Help with regex pattern" },
      { label: "New chat", dup: true },
      { label: "Quick question" },
      { label: "New chat", dup: true },
      { label: "Resonance idea — try again" },
      { label: "Untitled chat", dup: true },
      { label: "Quarterly retro (draft)" },
      { label: "New chat", dup: true },
    ]
    : [
      { label: "AI 의심 채널 재심 전략", pin: true },
      { label: "썸네일제작_꿀잠라디오", pin: true },
      { label: "Claude 디자인 자동화 시스템" },
      { label: "내레이션 개선 근거" },
      { label: "우주는 왜 존재할까" },
      { label: "우주 콘텐츠 분석" },
      { label: "오피스 시즌7 이후 변화" },
    ];

  const projects = [
    { label: "T2I 프롬프트 생성_유화버전" },
    { label: "T2I 프롬프트 생성" },
    { label: "라이프해킹" },
    { label: "ComfyUI_프롬프트생성_꿀" },
  ];

  return (
    <aside className={"demo-host-sb" + (messy ? " messy" : "")}>
      <div className="demo-host-sb-head">
        <span>ChatGPT</span>
        <span className="ic"><ChevronDownIc size={14} /></span>
      </div>
      <div className="demo-host-sb-row active">
        <span className="ic"><NewChatIc size={15} /></span>
        <span className="lbl">New chat</span>
      </div>
      <div className="demo-host-sb-row">
        <span className="ic"><SearchIc size={14} /></span>
        <span className="lbl">Search chats</span>
      </div>
      <div className="demo-host-sb-row">
        <span className="ic"><CodexIc size={14} /></span>
        <span className="lbl">Codex</span>
      </div>

      {!messy && (
        <>
          <div className="demo-host-sb-section">Projects</div>
          {projects.map((p, i) => (
            <div className="demo-host-sb-row" key={i}>
              <span className="ic"><FolderIc size={14} /></span>
              <span className="lbl">{p.label}</span>
            </div>
          ))}
        </>
      )}

      <div className="demo-host-sb-section">Recent</div>
      <div className="demo-host-sb-scroll">
        {recent.map((r, i) => (
          <div className="demo-host-sb-row" key={i}>
            <span className={"lbl" + (r.dup ? " dup" : "")}>{r.label}</span>
            {r.pin && <span className="pin"><PinIc size={12} /></span>}
            {r.dup && <span className="dup-badge">dup</span>}
          </div>
        ))}
      </div>

      <div className="demo-host-sb-foot">
        <div className="av">JH</div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15, flex: 1, minWidth: 0 }}>
          <span className="name">Jinkwang Hong</span>
          <span className="plan">Plus</span>
        </div>
      </div>
    </aside>
  );
}

function HostMain() {
  return (
    <section className="demo-host-main">
      <div className="empty-line">Ready when you are.</div>
      <div className="composer">
        <span className="plus"><PlusIc size={14} /></span>
        <span className="ph">Ask anything</span>
        <span className="mode">Instant <ChevronDownIc size={11} /></span>
        <span className="mic"><MicIc size={14} /></span>
        <span className="voice"><VoiceIc size={14} /></span>
      </div>
      <div className="chip-row">
        <span className="chip"><ImageIc size={13} className="ic" /> Create image</span>
        <span className="chip"><EditIc size={13} className="ic" /> Write or edit</span>
        <span className="chip"><GlobeIc size={13} className="ic" /> Find what I need</span>
      </div>
    </section>
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
          A focused Chrome extension that adds a folder panel to ChatGPT — nested folders, instant
          search, right-click organize. Everything stays on your device.
        </p>
        <div className="hero-ctas reveal" data-delay="3">
          <a className="btn btn-primary btn-lg" href={CTA_URL} target="_blank" rel="noopener">
            <ChromeIc size={16} />
            <span>Install Free Extension</span>
          </a>
          <a className="btn btn-ghost btn-lg" href="#features">
            <span>See how it works</span>
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

function HeroMockup() {
  return (
    <div className="window dark">
      <div className="win-chrome">
        <div className="win-dots"><i /><i /><i /></div>
        <div className="win-url">
          <LockIc size={11} className="lock" />
          <span className="domain">chatgpt.com</span>
          <span style={{ color: "#585858" }}>/c/2f8a-claude-design</span>
        </div>
        <div className="win-ext">
          <span className="pill-on" />
          Folder Organizer
        </div>
      </div>
      <div className="demo">
        <HostSidebar />
        <HostMain />
        <CgfPanel state="populated" />
      </div>
    </div>
  );
}

/* ============================================================
   Problem section — before / after
   ============================================================ */
function Problem() {
  return (
    <section id="problem">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="dot" /> The problem</span>
          <h2>ChatGPT history gets <em>messy fast.</em></h2>
          <p>
            One endless scroll of "New chat", "New chat (2)", "Untitled". Important threads vanish
            after a week, and the built-in search only finds what you already remember.
          </p>
        </div>

        <div className="problem-vis">
          <div className="before reveal">
            <div className="ba-head">
              <span className="ba-tag">Default — chronological</span>
              <span className="ba-count">847 chats · unsorted</span>
            </div>
            <div className="ba-list" style={{ height: 360, padding: 0 }}>
              <div className="window dark" style={{ height: "100%", borderRadius: 0, border: 0, boxShadow: "none" }}>
                <div className="demo" style={{ gridTemplateColumns: "1fr", height: "100%" }}>
                  <HostSidebar messy />
                </div>
              </div>
            </div>
          </div>

          <div className="after reveal" data-delay="1">
            <div className="ba-head">
              <span className="ba-tag">With Folder Organizer</span>
              <span className="ba-count">847 chats · 3 folders · indexed</span>
            </div>
            <div className="ba-list" style={{ height: 360, padding: 0 }}>
              <div className="window dark" style={{ height: "100%", borderRadius: 0, border: 0, boxShadow: "none" }}>
                <div className="demo" style={{ gridTemplateColumns: "1fr", height: "100%" }}>
                  <CgfPanel state="populated" showFab={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Solution / split sections
   ============================================================ */
function SolutionFolders() {
  return (
    <section id="folders">
      <div className="container">
        <div className="split">
          <div className="reveal">
            <span className="eyebrow"><FolderIc size={11} /> Folders, right where you need them</span>
            <h2>A folder panel that lives <em>inside ChatGPT.</em></h2>
            <p className="lead">
              The extension adds a 272-pixel panel to the right side of ChatGPT. Create folders,
              nest subfolders, and assign any chat from your real ChatGPT history with one click.
            </p>
            <ul className="checks">
              <li><span className="chk"><CheckIc size={12} /></span> Unlimited nesting — subfolder inside subfolder.</li>
              <li><span className="chk"><CheckIc size={12} /></span> Right-click any folder to add chats, rename, or delete.</li>
              <li><span className="chk"><CheckIc size={12} /></span> Counts on every folder so you can spot the bloat.</li>
            </ul>
            <a className="btn-link" href="#pricing">Get the Pro plan</a>
          </div>
          <div className="reveal" data-delay="1">
            <PanelOnlyDemo state="populated" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionSearch() {
  return (
    <section>
      <div className="container">
        <div className="split reverse">
          <div className="reveal">
            <span className="eyebrow"><SearchIc size={11} sw={2} /> On-device search</span>
            <h2>Find any conversation in <em>milliseconds.</em></h2>
            <p className="lead">
              Type into the panel's search and folder names + chat titles light up in green, live
              as you type. Everything runs locally — no API calls, no waiting.
            </p>
            <ul className="checks">
              <li><span className="chk"><CheckIc size={12} /></span> Phrase highlighting in folder + chat titles.</li>
              <li><span className="chk"><CheckIc size={12} /></span> Matches across folders and nested subfolders.</li>
              <li><span className="chk"><CheckIc size={12} /></span> Free: 20 searches / day. Pro: unlimited.</li>
            </ul>
            <a className="btn-link" href="#features">Browse all features</a>
          </div>
          <div className="reveal" data-delay="1">
            <PanelOnlyDemo state="searching" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelOnlyDemo({ state }) {
  return (
    <div className="window dark" style={{ borderRadius: 14 }}>
      <div className="win-chrome">
        <div className="win-dots"><i /><i /><i /></div>
        <div className="win-url"><LockIc size={11} className="lock" /><span className="domain">chatgpt.com</span></div>
        <div className="win-ext"><span className="pill-on" />Folder Organizer</div>
      </div>
      <div style={{ background: "#0e0e0e", padding: 24, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 296 }}>
          <div className="cgf-panel" style={{ height: 408, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            {/* re-render the panel inside a fixed-size frame */}
            <PanelInner state={state} showFab={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Inner panel body — same as CgfPanel but without its own wrapper,
   so we can drop it inside a constrained box. */
function PanelInner({ state, showFab }) {
  return (
    <>
      <div className="cgf-panel-header">
        <span className="cgf-panel-title">Folders</span>
        <div className="cgf-header-actions">
          <button className="cgf-icon-btn"><PlusIc size={14} /></button>
          <button className="cgf-icon-btn"><XIc size={13} /></button>
        </div>
      </div>
      <div className="cgf-upgrade-banner">
        <span>Free plan · 3 folders · 20 searches/day</span>
        <button className="cgf-upgrade-pill">Upgrade</button>
      </div>
      <div className="cgf-search-wrap">
        <div className="cgf-search-inner">
          <SearchIc className="cgf-search-icon" size={12} />
          {state === "searching" ? (
            <input className="cgf-search-input focused" defaultValue="의심 채널" readOnly />
          ) : (
            <input className="cgf-search-input" placeholder="Search folders…" readOnly />
          )}
        </div>
      </div>
      <div className="cgf-folder-list">
        {state === "searching" ? <CgfFolderTree query="의심 채널" /> : <CgfFolderTree />}
      </div>
      <div className="cgf-panel-footer">
        <button className="cgf-footer-btn">
          <StarIc size={12} />
          Upgrade to Pro
        </button>
      </div>
    </>
  );
}

/* ============================================================
   Features grid
   ============================================================ */
function Features() {
  const items = [
    { ico: <FolderIc size={18} />, title: "Nested folders", body: "Build folder trees as deep as the project needs. Add subfolders from the right-click menu.", mini: "Unlimited depth" },
    { ico: <SearchIc size={18} sw={2} />, title: "Fast search", body: "On-device search across folder names and chat titles, with phrase highlighting in accent green.", mini: "Live as you type" },
    { ico: <MoveIc size={18} />, title: "Add chats in bulk", body: "Open the 'Add chats' modal, check the conversations you want, and save. Filter the list inline.", mini: "Multi-select · filter" },
    { ico: <NoCloudIc size={18} />, title: "Local-only privacy", body: "Folders, mappings, and indexes live in your browser's storage. No server, no account, no auth.", mini: "0 network calls" },
    { ico: <ZapIc size={18} />, title: "Offline-first", body: "Works the same on a plane, in a tunnel, or behind a corporate firewall. The panel is just CSS + JS.", mini: "Manifest V3" },
    { ico: <KeyboardIc size={18} />, title: "Simple, themed UI", body: "Auto-matches ChatGPT's light and dark themes. 272px panel, 38px floating button, nothing else.", mini: "Light + dark" },
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
   Workflow — 4 steps with mini visuals of the real product
   ============================================================ */
function Workflow() {
  return (
    <section id="workflow" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="dot" /> Workflow</span>
          <h2>From install to organized in <em>under a minute.</em></h2>
          <p>No accounts. No imports. The extension reads what's already in your ChatGPT sidebar.</p>
        </div>
        <div className="workflow">
          <Step n="01" t="Install extension" d="One click from the Chrome Web Store. No sign-up, no payment.">
            <StepInstall />
          </Step>
          <Step n="02" t="Create a folder" d="Click the + in the FOLDERS header — name it, hit Create.">
            <StepCreate />
          </Step>
          <Step n="03" t="Add chats" d='Right-click the folder → "Add chats" → check the ones you want.'>
            <StepAddChats />
          </Step>
          <Step n="04" t="Find anything" d="Search the folder list — folder names and chat titles light up in green.">
            <StepSearch />
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
    <div className="vis-dark" style={{ alignItems: "center", justifyContent: "center", gap: 10 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(28,192,138,0.10)", border: "1px solid rgba(28,192,138,0.30)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1cc08a" }}>
        <ChromeIc size={22} />
      </div>
      <div style={{ fontSize: 11, color: "#909090", letterSpacing: 0.04 }}>chrome web store · 1.2k+</div>
    </div>
  );
}

function StepCreate() {
  return (
    <div className="vis-dark" style={{ position: "relative", padding: 10 }}>
      <div className="cgf-panel-header" style={{ height: 28, borderBottom: "1px solid rgba(255,255,255,0.05)", padding: 0, marginBottom: 6 }}>
        <span className="cgf-panel-title">Folders</span>
        <div className="cgf-header-actions">
          <button className="cgf-icon-btn" style={{ width: 22, height: 22, background: "rgba(28,192,138,0.10)", color: "#1cc08a" }}><PlusIc size={12} /></button>
          <button className="cgf-icon-btn" style={{ width: 22, height: 22 }}><XIc size={11} /></button>
        </div>
      </div>
      <div style={{ position: "absolute", top: 32, left: 6, right: 6, background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: 10, display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: "#585858", textTransform: "uppercase", letterSpacing: 0.05 }}>New folder</div>
        <div style={{ padding: "5px 8px", border: "1px solid #1cc08a", borderRadius: 5, fontSize: 12, color: "#e8e8e8", background: "#1e1e1e" }}>Folder_1</div>
        <div style={{ padding: 5, background: "#1cc08a", color: "#fff", borderRadius: 5, fontSize: 11, fontWeight: 600, textAlign: "center" }}>Create folder</div>
      </div>
    </div>
  );
}

function StepAddChats() {
  return (
    <div className="vis-dark" style={{ padding: 4, position: "relative" }}>
      <div className="vrow" style={{ background: "#2a2a2a", color: "#e8e8e8" }}>
        <span style={{ width: 13 }}><CaretRightIc size={9} /></span>
        <FolderIc size={11} style={{ color: "#909090" }} />
        <span>Folder_1</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#585858", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 3, padding: "0 4px" }}>0</span>
      </div>
      <div style={{ position: "absolute", left: 18, top: 24, background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 7, padding: 3, fontSize: 11, color: "#e8e8e8", boxShadow: "0 8px 18px rgba(0,0,0,0.5)", width: 142 }}>
        <div className="vrow" style={{ padding: "5px 7px", color: "#1cc08a" }}>
          <PlusIc size={11} sw={2} />
          Add chats
        </div>
        <div className="vrow" style={{ padding: "5px 7px" }}>
          <FolderPlusIc size={11} />
          Add subfolder
        </div>
        <div className="vrow" style={{ padding: "5px 7px" }}>
          <EditIc size={11} />
          Rename
        </div>
        <div className="vrow danger" style={{ padding: "5px 7px" }}>
          <TrashIc size={11} />
          Delete
        </div>
      </div>
    </div>
  );
}

function StepSearch() {
  return (
    <div className="vis-dark" style={{ padding: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 7px 5px 25px", border: "1px solid #1cc08a", borderRadius: 5, background: "#1e1e1e", position: "relative", marginBottom: 8 }}>
        <SearchIc size={11} style={{ position: "absolute", left: 8, color: "#585858" }} />
        <span style={{ fontSize: 11, color: "#e8e8e8" }}>의심 채널</span>
      </div>
      <div className="vrow" style={{ padding: "3px 6px" }}>
        <span style={{ width: 13 }}><CaretRightIc size={9} style={{ transform: "rotate(90deg)" }} /></span>
        <FolderIc size={11} style={{ color: "#909090" }} />
        <span>Folder_1</span>
      </div>
      <div className="vrow" style={{ padding: "3px 6px 3px 26px", color: "#909090", fontSize: 11 }}>
        <span>AI <span className="cgf-highlight">의심 채널</span> 재심 전략</span>
      </div>
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
              <li><span className="chk"><CheckIc size={11} /></span> Up to 3 folders</li>
              <li><span className="chk"><CheckIc size={11} /></span> 20 searches per day</li>
              <li><span className="chk"><CheckIc size={11} /></span> Right-click rename · delete · add subfolder</li>
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
              <li><span className="chk"><CheckIc size={11} /></span> Bulk "Add chats" with filter</li>
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
            <p>Folders and mappings live in your browser's local storage. Nothing is uploaded anywhere — not to us, not to a third party.</p>
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
      q: "Does it work with my ChatGPT account?",
      a: "Yes — it works with chatgpt.com (Free, Plus, Team, Enterprise). The extension reads the conversation list that's already loaded in your browser; it does not log into your account.",
    },
    {
      q: "Are my conversations sent to your servers?",
      a: "No. The extension makes zero network calls after install. Folders, chat-to-folder mappings, and the local search index all live in your browser's storage. We have no servers that receive your data because we don't run a backend.",
    },
    {
      q: "Will I lose my folders if I uninstall?",
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
      a: "Only the host permission for chatgpt.com plus storage. No tabs, no clipboard, no identity. The manifest is published — anyone can audit it.",
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