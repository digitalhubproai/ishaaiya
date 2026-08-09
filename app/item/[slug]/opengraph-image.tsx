import { ImageResponse } from "next/og";
import { findItemBySlug } from "@/lib/data";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findItemBySlug(slug);
  const name = found
    ? found.type === "deal"
      ? found.deal.title
      : found.item.name
    : "Ishaaiya Restaurant";
  const price = found
    ? found.type === "deal"
      ? found.deal.price
      : found.item.price
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          backgroundColor: "#120f0d",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(249,115,22,0.4), transparent 55%)",
          color: "#fff7ed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, fontWeight: 800, letterSpacing: "0.3em", color: "#f97316" }}>
          ISHAIYA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08, color: "#ffffff" }}>
            {name}
          </span>
          <span style={{ fontSize: 34, fontWeight: 700, color: "#fdba74" }}>
            Rs. {price}
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
          Ishaaiya Restaurant & Catering — order on WhatsApp
        </div>
      </div>
    ),
    { ...size }
  );
}