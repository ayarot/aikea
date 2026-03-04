import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const IKEA_BLUE      = "#0058AB";
const IKEA_BLUE_DARK = "#004691";
const IKEA_YELLOW    = "#FFCC00";
const IKEA_SANS      = "'Noto Sans', 'Helvetica Neue', sans-serif";

const FALLBACK_PROMPTS = [
  "Create a warm Scandinavian living room under $800.",
  "Turn this space into a minimalist modern home office.",
  "Design a cozy small apartment for a young couple.",
  "Make this room family-friendly with smart storage.",
  "Add color and personality while keeping it affordable.",
];

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z" />
      <path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function PromptSelection() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const room       = location.state?.room ?? null;

  const [inputValue,     setInputValue]     = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSelect = (prompt) => {
    navigate("/design", { state: { room, prompt, animateReveal: true } });
  };

  /* Search bar is blocked — show coming-soon modal instead */
  const handleSend = () => {
    if (inputValue.trim()) setShowSearchModal(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Search-blocked modal ── */}
      {showSearchModal && (
        <div
          onClick={() => setShowSearchModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.38)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fade-in-up delay-0"
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "40px 36px 32px",
              maxWidth: 400,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(0,88,171,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke={IKEA_BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <p style={{
              fontFamily: IKEA_SANS, fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: IKEA_BLUE, marginBottom: 10,
            }}>
              Coming Soon
            </p>

            <h3 style={{
              fontFamily: IKEA_SANS, fontSize: "1.5rem", fontWeight: 800,
              color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1.2,
              margin: "0 0 12px",
            }}>
              We're working on it...
            </h3>

            <p style={{
              fontFamily: IKEA_SANS, color: "#777", fontSize: "0.95rem",
              lineHeight: 1.65, margin: "0 0 28px",
            }}>
              Free-text search isn't available just yet. In the meantime,{" "}
              <strong style={{ color: "#1a1a1a" }}>try one of the suggested prompts</strong>{" "}
              below — they work great!
            </p>

            <button
              onClick={() => setShowSearchModal(false)}
              style={{
                width: "100%",
                padding: "14px 0",
                background: IKEA_BLUE,
                color: "#fff",
                border: "none",
                borderRadius: 100,
                fontFamily: IKEA_SANS,
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                marginBottom: 12,
                transition: "background 0.18s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = IKEA_BLUE_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.background = IKEA_BLUE)}
            >
              Show me the suggestions
            </button>

            <button
              onClick={() => setShowSearchModal(false)}
              style={{
                background: "none", border: "none", color: "#aaa",
                fontFamily: IKEA_SANS, fontSize: "0.85rem", cursor: "pointer", padding: "4px 8px",
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── Page ── */}
      <div
        style={{
          minHeight: "calc(100vh - 112px)",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "56px 24px 48px",
          boxSizing: "border-box",
        }}
      >
        {/* Step label + heading */}
        <div className="fade-in-up delay-0" style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            style={{
              fontFamily: IKEA_SANS,
              color: IKEA_BLUE,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Step 2 of 3
          </p>
          <h2
            style={{
              fontFamily: IKEA_SANS,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#111111",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            What do you have in mind?
          </h2>
          {room && (
            <p style={{ marginTop: 10, fontFamily: IKEA_SANS, fontSize: "0.9rem", color: "#888", fontWeight: 400 }}>
              Designing for:{" "}
              <button
                onClick={() => navigate("/room")}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0 2px",
                  cursor: "pointer",
                  fontFamily: IKEA_SANS,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: IKEA_BLUE,
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: 3,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecorationStyle = "solid")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecorationStyle = "dotted")}
                title="Change room"
              >
                {room.label}
              </button>
              {" "}
              <span style={{ fontSize: "0.75rem", color: "#bbb" }}>↩ change</span>
            </p>
          )}
        </div>

        <div
          style={{ width: "100%", maxWidth: 680 }}
          className="fade-in-up delay-1"
        >
          {/* ── Chat-style input bar ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1.5px solid #e0e0e0",
              borderRadius: 100,
              padding: "10px 10px 10px 20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              marginBottom: 28,
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your dream room…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontFamily: IKEA_SANS,
                fontSize: "0.95rem",
                color: "#111",
                backgroundColor: "transparent",
                letterSpacing: "0.01em",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: inputValue.trim() ? IKEA_BLUE : "#e8e8e8",
                color: inputValue.trim() ? "#fff" : "#bbb",
                border: "none",
                cursor: inputValue.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background-color 0.18s ease",
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim())
                  e.currentTarget.style.backgroundColor = IKEA_BLUE_DARK;
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim())
                  e.currentTarget.style.backgroundColor = IKEA_BLUE;
              }}
              aria-label="Send prompt"
            >
              <SendIcon />
            </button>
          </div>

          {/* ── Suggestion label ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
              paddingLeft: 4,
            }}
          >
            <SparkleIcon />
            <span
              style={{
                fontFamily: IKEA_SANS,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#999",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Try a suggestion
            </span>
          </div>

          {/* ── Suggestion cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(room?.prompts ?? FALLBACK_PROMPTS).map((prompt, i) => (
              <PromptCard
                key={prompt}
                prompt={prompt}
                index={i}
                disabled={false}
                onClick={() => handleSelect(prompt)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function PromptCard({ prompt, index, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fade-in-up delay-${Math.min(index + 2, 3)}`}
      style={{
        width: "100%",
        textAlign: "left",
        background: hovered ? "#f5f8fc" : "#ffffff",
        border: `1.5px solid ${hovered ? IKEA_BLUE : "#e8e8e8"}`,
        borderRadius: 14,
        padding: "14px 20px",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        transition: "border-color 0.18s ease, background 0.18s ease, transform 0.15s ease",
        transform: hovered && !disabled ? "translateX(4px)" : "translateX(0)",
        outline: "none",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        style={{
          fontFamily: "'Noto Sans', 'Helvetica Neue', sans-serif",
          fontSize: "0.92rem",
          fontWeight: 400,
          color: hovered ? "#111" : "#444",
          lineHeight: 1.5,
          transition: "color 0.18s ease",
        }}
      >
        {prompt}
      </span>
      <span
        style={{
          flexShrink: 0,
          width: 26,
          height: 26,
          borderRadius: "50%",
          backgroundColor: hovered ? IKEA_YELLOW : "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.18s ease",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke={hovered ? "#333" : "#aaa"} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      </span>
    </button>
  );
}

export default PromptSelection;
