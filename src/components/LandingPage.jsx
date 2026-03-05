import { useNavigate } from "react-router-dom";

const IKEA_BLUE      = "#0058A3";
const IKEA_BLUE_DARK = "#004691";
const IKEA_YELLOW    = "#FFCC00";
const IKEA_SANS      = "'Noto Sans', 'Helvetica Neue', sans-serif";

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 10 }}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

/** "A.I" bold + "KEA" regular — rendered as one cohesive wordmark */
function Wordmark({ size = "2.2rem" }) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: IKEA_SANS,
        fontSize: size,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#ffffff",
        lineHeight: 1,
      }}
    >
      <span style={{ fontWeight: 400 }}>A.I</span>
      <span style={{ fontWeight: 400 }}>KEA</span>
    </p>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "calc(100vh - 112px)",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/video_landpage_aikea.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        zIndex: 1,
      }} />

      <div
        style={{
          maxWidth: 900,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ── Wordmark ── */}
        <div className="fade-in-up delay-0" style={{ marginBottom: 0 }}>
          <Wordmark size="2.6rem" />
          {/* Yellow accent underline */}
          <div
            style={{
              height: 4,
              width: 56,
              backgroundColor: IKEA_YELLOW,
              borderRadius: 2,
              margin: "10px auto 0",
            }}
          />
        </div>

        {/* ── H1 ── */}
        <h1
          className="fade-in-up delay-1"
          style={{
            fontFamily: IKEA_SANS,
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "32px 0 0",
          }}
        >
          Welcome to
          <br />
          Intelligent Living.
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="fade-in-up delay-2"
          style={{
            fontFamily: IKEA_SANS,
            fontSize: "1.2rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.8)",
            maxWidth: 560,
            lineHeight: 1.7,
            margin: "28px auto 0",
          }}
        >
          Design your space with AI-powered inspiration from IKEA.
        </p>

        {/* ── CTA ── */}
        <div className="fade-in-up delay-3" style={{ marginTop: 40 }}>
          <button
            onClick={() => navigate("/room")}
            className="cta-button"
            style={{
              backgroundColor: IKEA_BLUE,
              color: "#ffffff",
              border: "none",
              borderRadius: 40,
              padding: "16px 32px",
              fontSize: "1.1rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease",
              fontFamily: IKEA_SANS,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,88,171,0.25)";
              e.currentTarget.style.backgroundColor = IKEA_BLUE_DARK;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.backgroundColor = IKEA_BLUE;
            }}
          >
            Let's Start
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
