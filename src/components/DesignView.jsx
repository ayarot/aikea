import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import mockRooms from "../data/mockRooms";
import ProductPanel from "./ProductPanel";

const IKEA_BLUE      = "#0058A3";
const IKEA_BLUE_DARK = "#004691";
const IKEA_YELLOW    = "#FFCC00";
const IKEA_SANS      = "'Noto Sans', 'Helvetica Neue', sans-serif";

const THINKING_LINES = [
  "Choosing the perfect pieces…",
  "Balancing style and budget…",
  "Adding Scandinavian warmth…",
  "Almost there…",
];

const REVEAL_DURATION = 2800;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85&auto=format&fit=crop";

const FAKE_SHARE_LINK = "https://aieka.design/d/3k9mX2pQ";

const METRICS = [
  { label: "Average basket value",    value: "+32%", dir: "up"   },
  { label: "Cross-category purchases", value: "+18%", dir: "up"   },
  { label: "Time to decision",         value: "−25%", dir: "down" },
];

/* ─── Premium loading screen ─────────────────────────────────── */
function LoadingScreen({ thinkingLine }) {
  return (
    <div
      className="fade-in-up delay-0"
      style={{
        position: "absolute", inset: 0, zIndex: 50,
        backgroundColor: "#ffffff",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 20,
      }}
    >
      <h2 style={{
        fontFamily: IKEA_SANS, fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
        fontWeight: 700, color: "#1a1a1a",
        letterSpacing: "-0.02em", margin: 0,
      }}>
        Designing your space...
      </h2>

      <p
        key={thinkingLine}
        className="fade-in-up delay-0"
        style={{
          fontFamily: IKEA_SANS, fontSize: "0.92rem", fontWeight: 400,
          color: "#999", margin: 0, letterSpacing: "0.01em",
        }}
      >
        {THINKING_LINES[thinkingLine]}
      </p>

      {/* Thin animated progress bar */}
      <div style={{
        width: 120, height: 3, borderRadius: 2,
        backgroundColor: "#f0f0f0", overflow: "hidden",
        marginTop: 8,
      }}>
        <div style={{
          width: "40%", height: "100%", borderRadius: 2,
          backgroundColor: IKEA_BLUE,
          animation: "loadingSlide 1.4s ease-in-out infinite",
        }} />
      </div>
    </div>
  );
}

/* ─── Price tag ─────────────────────────────────────────────── */
function PriceTag({ product, isActive, onClick, animDelay = 0 }) {
  const { name, price, tagPosition } = product;
  return (
    <button
      onClick={onClick}
      aria-label={`${name} – $${price}`}
      className={`fade-in-up delay-${animDelay}`}
      style={{
        position: "absolute",
        left: `${tagPosition.x}%`,
        top:  `${tagPosition.y}%`,
        transform: "translate(-50%, -100%)",
        background: "none", border: "none", padding: 0,
        cursor: "pointer", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}
    >
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: 8,
        padding: "5px 10px 5px 8px",
        boxShadow: isActive ? "0 4px 18px rgba(0,88,171,0.3)" : "0 2px 10px rgba(0,0,0,0.16)",
        border: `1.5px solid ${isActive ? IKEA_BLUE : "transparent"}`,
        display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
        transition: "box-shadow 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
        transform: isActive ? "scale(1.07)" : "scale(1)",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: IKEA_YELLOW, flexShrink: 0 }} />
        <div style={{ lineHeight: 1.3 }}>
          <p style={{ margin: 0, fontFamily: IKEA_SANS, fontSize: "0.63rem", fontWeight: 600, color: "#333" }}>{name}</p>
          <p style={{ margin: 0, fontFamily: IKEA_SANS, fontSize: "0.7rem",  fontWeight: 700, color: IKEA_BLUE }}>${price}</p>
        </div>
      </div>
      <div style={{ width: 1.5, height: 12, backgroundColor: "rgba(255,255,255,0.85)", flexShrink: 0 }} />
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        backgroundColor: isActive ? IKEA_BLUE : "#ffffff",
        border: "2px solid rgba(255,255,255,0.9)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.22)", flexShrink: 0,
        transition: "background-color 0.18s ease",
      }} />
    </button>
  );
}

/* ─── Share modal ────────────────────────────────────────────── */
function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FAKE_SHARE_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.38)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-in-up delay-0"
        style={{
          background: "#fff", borderRadius: 24,
          padding: "40px 36px 32px", maxWidth: 420, width: "100%",
          textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.16)",
        }}
      >
        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(0,88,171,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke={IKEA_BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </div>

        <h3 style={{ fontFamily: IKEA_SANS, fontSize: "1.4rem", fontWeight: 800, color: "#111", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Share Your Design
        </h3>
        <p style={{ fontFamily: IKEA_SANS, fontSize: "0.88rem", color: "#888", margin: "0 0 24px", lineHeight: 1.6 }}>
          Anyone with this link can view your A.IKEA room design.
        </p>

        {/* Link field */}
        <div style={{
          display: "flex", alignItems: "center", gap: 0,
          border: "1.5px solid #e0e0e0", borderRadius: 12,
          overflow: "hidden", marginBottom: 16,
        }}>
          <span style={{
            flex: 1, padding: "11px 14px",
            fontFamily: IKEA_SANS, fontSize: "0.82rem", color: "#555",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            backgroundColor: "#f8f8f8",
          }}>
            {FAKE_SHARE_LINK}
          </span>
          <button
            onClick={handleCopy}
            style={{
              padding: "11px 18px", flexShrink: 0,
              backgroundColor: copied ? "#22c55e" : IKEA_BLUE,
              color: "#fff", border: "none", cursor: "pointer",
              fontFamily: IKEA_SANS, fontSize: "0.82rem", fontWeight: 600,
              transition: "background-color 0.22s ease",
              letterSpacing: "0.01em",
            }}
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", color: "#bbb",
            fontFamily: IKEA_SANS, fontSize: "0.85rem", cursor: "pointer", padding: "4px 8px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ─── Metrics overlay ────────────────────────────────────────── */
function MetricsOverlay({ onContinue, onClose }) {
  const [arrowUp, arrowDown] = ["▲", "▼"];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <div
        className="fade-in-up delay-0"
        style={{
          background: "#fff", borderRadius: 24,
          padding: "44px 40px 36px", maxWidth: 480, width: "100%",
          textAlign: "center", boxShadow: "0 28px 72px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Close button — top left */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 16, left: 16,
            width: 32, height: 32, borderRadius: "50%",
            border: "none", backgroundColor: "#f2f2f2",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background-color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6e6e6")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f2f2f2")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Yellow accent bar */}
        <div style={{ width: 48, height: 4, backgroundColor: IKEA_YELLOW, borderRadius: 2, margin: "0 auto 24px" }} />

        <p style={{ fontFamily: IKEA_SANS, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: IKEA_BLUE, marginBottom: 10 }}>
          AI Impact Report
        </p>
        <h3 style={{ fontFamily: IKEA_SANS, fontSize: "1.55rem", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 6px" }}>
          This design increased:
        </h3>
        <p style={{ fontFamily: IKEA_SANS, fontSize: "0.85rem", color: "#aaa", margin: "0 0 32px" }}>
          Based on simulated AI design sessions
        </p>

        {/* Metric cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`fade-in-up delay-${i + 1}`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px", borderRadius: 14,
                backgroundColor: "#f7f9fb",
                border: "1px solid #eef0f4",
              }}
            >
              <span style={{ fontFamily: IKEA_SANS, fontSize: "0.9rem", color: "#333", fontWeight: 400, textAlign: "left" }}>
                {m.label}
              </span>
              <span style={{
                fontFamily: IKEA_SANS, fontSize: "1.1rem", fontWeight: 800,
                color: "#16a34a",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ fontSize: "0.65rem" }}>{m.dir === "up" ? arrowUp : arrowDown}</span>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          style={{
            width: "100%", padding: "15px 0",
            backgroundColor: IKEA_BLUE, color: "#fff",
            border: "none", borderRadius: 100,
            fontFamily: IKEA_SANS, fontSize: "0.95rem", fontWeight: 600,
            cursor: "pointer", letterSpacing: "0.02em",
            transition: "background-color 0.18s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = IKEA_BLUE_DARK;
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = IKEA_BLUE;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Continue to IKEA →
        </button>
      </div>
    </div>
  );
}

/* ─── Room switcher chip ─────────────────────────────────────── */
function RoomSwitcher({ currentRoom, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Chip */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 7,
          backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
          border: `1.5px solid ${open ? IKEA_BLUE : "transparent"}`,
          borderRadius: 100, padding: "6px 12px 6px 10px",
          cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          transition: "border-color 0.18s ease",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke={IKEA_BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
        <span style={{ fontFamily: IKEA_SANS, fontSize: "0.72rem", fontWeight: 600, color: "#333", letterSpacing: "0.02em" }}>
          Designing for: <strong style={{ color: IKEA_BLUE }}>{currentRoom?.label ?? "Empty Living Room"}</strong>
        </span>
        {/* Chevron */}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="fade-in-up delay-0"
          style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0,
            backgroundColor: "#fff", borderRadius: 14,
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            border: "1px solid #eee", overflow: "hidden",
            minWidth: 220, zIndex: 20,
          }}
        >
          {mockRooms.map((room) => {
            const isActive = room.id === currentRoom?.id;
            return (
              <button
                key={room.id}
                onClick={() => { onSelect(room); setOpen(false); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 14px", border: "none", cursor: "pointer",
                  backgroundColor: isActive ? "#f0f5fb" : "#fff",
                  borderLeft: `3px solid ${isActive ? IKEA_BLUE : "transparent"}`,
                  transition: "background-color 0.15s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "#f8f8f8"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "#fff"; }}
              >
                <img
                  src={room.emptyImageUrl}
                  alt={room.label}
                  style={{ width: 36, height: 28, objectFit: "cover", borderRadius: 5, flexShrink: 0 }}
                />
                <span style={{ fontFamily: IKEA_SANS, fontSize: "0.8rem", fontWeight: isActive ? 600 : 400, color: isActive ? IKEA_BLUE : "#333" }}>
                  {room.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Main view ──────────────────────────────────────────────── */
function DesignView() {
  const location = useLocation();
  const prompt   = location.state?.prompt ?? null;

  const [activeRoom,    setActiveRoom]    = useState(location.state?.room ?? mockRooms[0]);
  const [activeId,      setActiveId]      = useState(null);
  const [showShare,     setShowShare]     = useState(false);
  const [showMetrics,   setShowMetrics]   = useState(false);
  const [showOriginal,  setShowOriginal]  = useState(false);
  const [revealing,     setRevealing]     = useState(!!location.state?.animateReveal);
  const [thinkingLine,  setThinkingLine]  = useState(0);
  const [revealed,      setRevealed]      = useState(!location.state?.animateReveal);

  const products   = activeRoom?.products ?? [];

  /* Cycle thinking status lines during reveal */
  useEffect(() => {
    if (!revealing) return;
    const id = setInterval(() => {
      setThinkingLine((l) => (l + 1) % THINKING_LINES.length);
    }, 700);
    return () => clearInterval(id);
  }, [revealing]);

  /* End reveal after duration — crossfade styled image, then stagger products */
  useEffect(() => {
    if (!revealing) return;
    const timer = setTimeout(() => {
      setRevealing(false);
      setTimeout(() => setRevealed(true), 500);
    }, REVEAL_DURATION);
    return () => clearTimeout(timer);
  }, [revealing]);

  const toggleTag = (id) => setActiveId((prev) => (prev === id ? null : id));

  const handleProceed = () => setShowMetrics(true);

  const handleContinueToIkea = () => {
    window.open("https://www.ikea.com", "_blank", "noopener");
    setShowMetrics(false);
  };

  return (
    <>
      <style>{`
        @keyframes loadingSlide {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {showShare   && <ShareModal   onClose={() => setShowShare(false)} />}
      {showMetrics && <MetricsOverlay onContinue={handleContinueToIkea} onClose={() => setShowMetrics(false)} />}

      {/* ── Outer wrapper — flex column so action bar is part of flow ── */}
      <div className="design-outer" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 112px)", backgroundColor: "#f7f7f7", position: "relative" }}>

        {revealing && <LoadingScreen thinkingLine={thinkingLine} />}

        {/* ── Main row ── */}
        <div className="design-main-row" style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* LEFT – room visual (70%) */}
          <div className="design-room-panel" style={{
            flex: "0 0 70%", position: "relative", overflow: "hidden",
            backgroundColor: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Styled (design) image — always mounted */}
            <img
              src={activeRoom?.styledImageUrl ?? DEFAULT_IMAGE}
              alt={activeRoom?.label ?? "Generated room"}
              style={{
                position: "absolute",
                maxWidth: "100%", maxHeight: "100%",
                objectFit: "contain", objectPosition: "center",
                display: "block",
                opacity: showOriginal ? 0 : 1,
                transition: "opacity 0.6s ease",
              }}
            />
            {/* Original (empty) image — always mounted, fades in/out on top */}
            <img
              src={activeRoom?.emptyImageUrl ?? DEFAULT_IMAGE}
              alt={`${activeRoom?.label ?? "Room"} – original`}
              style={{
                position: "absolute",
                maxWidth: "100%", maxHeight: "100%",
                objectFit: "contain", objectPosition: "center",
                display: "block",
                opacity: showOriginal ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.2) 100%)",
            }} />

            {/* AI badge + room switcher + original toggle — hidden during reveal */}
            <div className={`design-badges${revealed ? " fade-in-up delay-1" : ""}`} style={{
              position: "absolute", top: 16, left: 16,
              display: "flex", flexDirection: "column", gap: 8,
              opacity: revealed ? 1 : 0,
              pointerEvents: revealed ? "auto" : "none",
              transition: "opacity 0.4s ease",
            }}>
              {/* Status pill */}
              <div style={{
                backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
                borderRadius: 100, padding: "6px 14px",
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  backgroundColor: showOriginal ? "#f59e0b" : "#22c55e",
                  boxShadow: showOriginal
                    ? "0 0 0 3px rgba(245,158,11,0.25)"
                    : "0 0 0 3px rgba(34,197,94,0.25)",
                  transition: "background-color 0.2s ease",
                }} />
                <span style={{ fontFamily: IKEA_SANS, fontSize: "0.72rem", fontWeight: 600, color: "#333", letterSpacing: "0.04em" }}>
                  {showOriginal ? "Original Room" : "AI Generated Design"}
                </span>
              </div>

              {/* Room switcher */}
              <RoomSwitcher currentRoom={activeRoom} onSelect={(room) => { setActiveRoom(room); setShowOriginal(false); }} />

              {/* See original / See design toggle */}
              <button
                onClick={() => setShowOriginal((v) => !v)}
                style={{
                  backgroundColor: showOriginal ? IKEA_BLUE : "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(6px)",
                  border: `1.5px solid ${showOriginal ? IKEA_BLUE : "rgba(255,255,255,0.6)"}`,
                  borderRadius: 100,
                  padding: "6px 14px",
                  display: "flex", alignItems: "center", gap: 7,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!showOriginal) e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  if (!showOriginal) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.92)";
                }}
              >
                {/* Eye icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke={showOriginal ? "#fff" : "#555"} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                  {showOriginal && <line x1="4" y1="4" x2="20" y2="20"/>}
                </svg>
                <span style={{
                  fontFamily: IKEA_SANS, fontSize: "0.72rem", fontWeight: 600,
                  color: showOriginal ? "#fff" : "#555",
                  letterSpacing: "0.04em",
                }}>
                  {showOriginal ? "See design" : "See original"}
                </span>
              </button>
            </div>

            {/* Prompt badge — hidden during reveal */}
            {prompt && revealed && (
              <div className="fade-in-up delay-1 design-prompt-badge" style={{
                position: "absolute", top: 16, right: 16,
                backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)",
                borderRadius: 10, padding: "8px 14px", maxWidth: 240,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}>
                <p style={{ fontFamily: IKEA_SANS, fontSize: "0.6rem", color: "#999", margin: "0 0 2px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Your prompt</p>
                <p style={{ fontFamily: IKEA_SANS, fontSize: "0.75rem", color: "#222", margin: 0, fontStyle: "italic", lineHeight: 1.45 }}>"{prompt}"</p>
              </div>
            )}

            {/* Price tags — hidden during reveal and when viewing original */}
            {!showOriginal && revealed && products.map((product, i) => (
              <PriceTag
                key={product.id}
                product={product}
                isActive={activeId === product.id}
                onClick={() => toggleTag(product.id)}
                animDelay={i}
              />
            ))}
          </div>

          {/* RIGHT – product panel (30%) */}
          <ProductPanel
            products={products}
            activeId={activeId}
            onSelect={setActiveId}
            revealed={revealed}
          />
        </div>

        {/* ── Action bar (fixed-height footer within the view) ── */}
        <div
          className={`design-action-bar${revealed ? " fade-in-up delay-2" : ""}`}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 12,
            padding: "14px 24px",
            borderTop: "1px solid #f0f0f0",
            backgroundColor: "#ffffff",
            opacity: revealed ? undefined : 0,
            pointerEvents: revealed ? "auto" : "none",
            transition: "opacity 0.4s ease",
          }}
        >
          <span style={{ fontFamily: IKEA_SANS, fontSize: "0.78rem", color: "#bbb", marginRight: "auto", letterSpacing: "0.02em" }}>
            {activeRoom?.label} · {products.length} products · ${products.reduce((s, p) => s + p.price, 0).toLocaleString()} total
          </span>

          {/* Share — outline */}
          <button
            onClick={() => setShowShare(true)}
            style={{
              padding: "10px 24px",
              backgroundColor: "transparent",
              color: IKEA_BLUE,
              border: `1.5px solid ${IKEA_BLUE}`,
              borderRadius: 100,
              fontFamily: IKEA_SANS,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              transition: "background-color 0.18s ease, color 0.18s ease",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f5fb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share Design
          </button>

          {/* Proceed to Buy — solid */}
          <button
            onClick={handleProceed}
            style={{
              padding: "10px 28px",
              backgroundColor: IKEA_BLUE,
              color: "#ffffff",
              border: "none",
              borderRadius: 100,
              fontFamily: IKEA_SANS,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              transition: "background-color 0.18s ease, transform 0.15s ease",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = IKEA_BLUE_DARK;
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = IKEA_BLUE;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Proceed to Buy
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default DesignView;
