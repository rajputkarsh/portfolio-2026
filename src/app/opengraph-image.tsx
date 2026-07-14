import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = "Utkarsh — Full-Stack Developer & Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#090d19",
        color: "#e7eaf3",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: "#818cf8" }}>
        const utkarsh
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -2 }}>
          I design &amp; ship products,
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: -2,
            backgroundImage: "linear-gradient(120deg,#60a5fa,#818cf8,#a78bfa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          end to end.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 32, color: "#97a0b8" }}>
        {profile.role}
      </div>
    </div>,
    { ...size }
  );
}
