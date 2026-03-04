const IKEA_BLUE   = "#0058AB";
const IKEA_YELLOW = "#FFCC00";
const IKEA_SANS   = "'Noto Sans', 'Helvetica Neue', sans-serif";

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "inline", verticalAlign: "middle", marginLeft: 3 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ProductItem({ product, isActive, onSelect }) {
  const { name, category, price, description, imageUrl, productUrl } = product;

  return (
    <li
      onClick={() => onSelect(product.id)}
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 16px",
        cursor: "pointer",
        backgroundColor: isActive ? "#f0f5fb" : "transparent",
        borderLeft: `3px solid ${isActive ? IKEA_BLUE : "transparent"}`,
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          flexShrink: 0,
          width: 56,
          height: 56,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          border: "1px solid #eee",
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 2 }}>
          <p
            style={{
              fontFamily: IKEA_SANS,
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#111",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </p>
          <span
            style={{
              fontFamily: IKEA_SANS,
              fontSize: "0.88rem",
              fontWeight: 700,
              color: IKEA_BLUE,
              flexShrink: 0,
            }}
          >
            ${price}
          </span>
        </div>

        <p
          style={{
            fontFamily: IKEA_SANS,
            fontSize: "0.68rem",
            color: "#aaa",
            margin: "0 0 4px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {category}
        </p>

        <p
          style={{
            fontFamily: IKEA_SANS,
            fontSize: "0.73rem",
            color: "#777",
            margin: "0 0 6px",
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>

        <a
          href={productUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: IKEA_SANS,
            fontSize: "0.72rem",
            fontWeight: 600,
            color: IKEA_BLUE,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          View on IKEA <ExternalLinkIcon />
        </a>
      </div>
    </li>
  );
}

function ProductPanel({ products, activeId, onSelect, revealed = true }) {
  const total = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <aside
      className="design-product-panel"
      style={{
        flex: "0 0 30%",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #eeeeee",
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Panel header */}
      <div
        className={revealed ? "fade-in-up delay-0" : undefined}
        style={{
          padding: "16px 16px 12px",
          borderBottom: "1px solid #f0f0f0",
          flexShrink: 0,
          opacity: revealed ? undefined : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: IKEA_YELLOW,
            }}
          />
          <p
            style={{
              fontFamily: IKEA_SANS,
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#aaa",
              margin: 0,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Suggested Products
          </p>
        </div>
        <p
          style={{
            fontFamily: IKEA_SANS,
            fontSize: "0.72rem",
            color: "#bbb",
            margin: "4px 0 0",
            fontWeight: 400,
          }}
        >
          Click a tag or item to highlight it
        </p>
      </div>

      {/* Scrollable product list */}
      <ul
        style={{
          flex: 1,
          overflowY: "auto",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {products.map((product, i) => (
          <li
            key={product.id}
            className={revealed ? `fade-in-up delay-${Math.min(i + 1, 8)}` : undefined}
            style={{ padding: 0, opacity: revealed ? undefined : 0 }}
          >
            {i > 0 && (
              <div style={{ height: 1, backgroundColor: "#f4f4f4", margin: "0 16px" }} />
            )}
            <ProductItem
              product={product}
              isActive={activeId === product.id}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>

      {/* Total footer */}
      <div
        className={revealed ? `fade-in-up delay-${Math.min(products.length + 1, 8)}` : undefined}
        style={{
          borderTop: "1px solid #eeeeee",
          padding: "14px 16px",
          flexShrink: 0,
          backgroundColor: "#fafafa",
          opacity: revealed ? undefined : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: IKEA_SANS,
              fontSize: "0.8rem",
              color: "#555",
              fontWeight: 500,
            }}
          >
            Total ({products.length} items)
          </span>
          <span
            style={{
              fontFamily: IKEA_SANS,
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.01em",
            }}
          >
            ${total.toLocaleString()}
          </span>
        </div>

      </div>
    </aside>
  );
}

export default ProductPanel;
