import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockRooms from "../data/mockRooms";

const IKEA_BLUE = "#0058A3";
const ROOMS = mockRooms;

function UploadIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke={IKEA_BLUE}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function UploadCard({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Upload your own room"
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: 28,
        border: `2px dashed ${hovered ? IKEA_BLUE : "#dde4eb"}`,
        background: hovered ? "rgba(0,88,163,0.04)" : "#fff",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        transition: "border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hovered ? "0 8px 28px rgba(0,88,163,0.10)" : "none",
        outline: "none",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* "Main Feature" badge */}
      <span
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: IKEA_BLUE,
          color: "#fff",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: 100,
        }}
      >
        Coming Soon
      </span>

      <div
        style={{
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <UploadIcon />
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#1a1a1a",
              letterSpacing: "0.01em",
            }}
          >
            Upload Your Own Room
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "0.78rem",
              color: "#999",
              fontWeight: 400,
            }}
          >
            Coming Soon
          </p>
        </div>
      </div>
    </button>
  );
}

function RoomCard({ room, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(room)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        borderRadius: 28,
        overflow: "hidden",
        position: "relative",
        display: "block",
        width: "100%",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.12)"
          : "0 20px 60px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        outline: "none",
      }}
      aria-label={`Select ${room.label}`}
    >
      <img
        src={room.emptyImageUrl}
        alt={room.label}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.02) 45%, transparent 100%)",
          transition: "background 0.3s ease",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#fff",
          fontWeight: 600,
          fontSize: "0.95rem",
          letterSpacing: "0.01em",
          textShadow: "0 1px 4px rgba(0,0,0,0.35)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.3s ease",
          padding: "0 16px",
        }}
      >
        {room.label} Demo
      </span>
    </button>
  );
}

function ComingSoonModal({ onClose }) {
  return (
    <div
      onClick={onClose}
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
            background: "rgba(0,88,163,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={IKEA_BLUE}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <p
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: IKEA_BLUE,
            marginBottom: 10,
          }}
        >
          Coming Soon
        </p>

        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 12px",
          }}
        >
          We're working on it...
        </h3>

        <p
          style={{
            color: "#777",
            fontSize: "0.95rem",
            lineHeight: 1.65,
            margin: "0 0 28px",
          }}
        >
          Custom uploads will be available soon.
          <br />
          <strong style={{ color: "#1a1a1a" }}>Try one of our interactive demos.</strong>
        </p>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "14px 0",
            background: IKEA_BLUE,
            color: "#fff",
            border: "none",
            borderRadius: 100,
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
            marginBottom: 12,
            transition: "background 0.18s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#004a8c")}
          onMouseLeave={(e) => (e.currentTarget.style.background = IKEA_BLUE)}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function RoomSelection() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (room) => {
    navigate("/prompt", { state: { room } });
  };

  return (
    <>
      {showModal && (
        <ComingSoonModal
          onClose={() => setShowModal(false)}
        />
      )}

      <div
        className="fade-in-up delay-0"
        style={{
          minHeight: "calc(100vh - 120px)",
          backgroundColor: "#FAFAFA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "64px 24px 56px",
          boxSizing: "border-box",
        }}
      >
        {/* Page header */}
        <div className="fade-in-up delay-0" style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              color: IKEA_BLUE,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Step 1 of 3
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Choose a Space to Design
          </h2>
          <p
            style={{
              marginTop: 12,
              color: "#888",
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Select the room type you'd like to transform with AI.
          </p>
        </div>

        <div
          className="fade-in-up delay-1 room-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            width: "100%",
            maxWidth: 900,
            alignItems: "start",
          }}
        >
          {ROOMS.map((room, i) => (
            <div
              key={room.id}
              className={`fade-in-up delay-${Math.min(i + 1, 3)}`}
            >
              <RoomCard room={room} onClick={handleSelect} />
            </div>
          ))}

          {/* Upload card — always last */}
          <div className="fade-in-up delay-3">
            <UploadCard onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomSelection;
