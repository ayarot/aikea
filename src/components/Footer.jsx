function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "18px clamp(16px, 4vw, 40px)",
        borderTop: "1px solid #eeeeee",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.72rem",
          color: "#bbbbbb",
          letterSpacing: "0.04em",
          fontFamily: "'Noto Sans', 'Helvetica Neue', sans-serif",
        }}
      >
        © {new Date().getFullYear()} A.IKEA — AI-Powered Design Assistant
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "0.78rem",
          color: "#cccccc",
          letterSpacing: "0.02em",
          fontFamily: "'Noto Sans', 'Helvetica Neue', sans-serif",
        }}
      >
        Aya Rotbart &amp; Or Bar Zur for the Foundations of Business Management Course
      </p>
    </footer>
  );
}

export default Footer;
