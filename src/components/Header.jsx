import { useNavigate } from "react-router-dom";

const IKEA_SANS = "'Noto Sans', 'Helvetica Neue', sans-serif";
const IKEA_BLUE = "#0058AB";

function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        width: "100%",
        padding: "16px clamp(16px, 4vw, 40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eeeeee",
        boxSizing: "border-box",
      }}
    >
      {/* Wordmark — click to go home */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
          fontFamily: IKEA_SANS,
          fontSize: "1rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: IKEA_BLUE,
          lineHeight: 1,
          fontWeight: 400,
        }}
        aria-label="Go to home page"
      >
        A.IKEA

      </button>

      <span
        style={{
          fontFamily: IKEA_SANS,
          fontSize: "0.72rem",
          color: "#bbbbbb",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        Prototype
      </span>
    </header>
  );
}

export default Header;
