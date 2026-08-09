import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ishaaiya Restaurant & Catering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGLINE = "BBQ • Desi • Fast Food • Chinese • Tandoor";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#120f0d",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(249,115,22,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(251,191,36,0.25), transparent 55%)",
          color: "#fff7ed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
<span
              style={{
                width: 34,
                height: 34,
                marginRight: 22,
                borderRadius: 8,
                background: "linear-gradient(135deg, #f97316, #ef4444)",
              }}
            />
          ISHAIYA
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 26,
            color: "#fdba74",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {TAGLINE}
        </div>
        <div
          style={{
            marginTop: 44,
            display: "flex",
            gap: 10,
            fontSize: 16,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(249,115,22,0.15)",
              border: "1px solid rgba(249,115,22,0.4)",
            }}
          >
            BBQ
          </span>
          <span style={{ padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.06)" }}>
            Desi
          </span>
          <span style={{ padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.06)" }}>
            Fast Food
          </span>
          <span style={{ padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.06)" }}>
            Chinese
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}