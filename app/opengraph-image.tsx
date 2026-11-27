import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "SiteOrbit: Build and publish sites for every client from one workspace.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const carbon = "#111214";
const bone = "#ECEAE4";
const boneMuted = "#9D9C99";
const amber = "#D9A520";

export default async function OpengraphImage() {
  const [display, sans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Fraunces-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/HankenGrotesk-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: carbon,
          padding: "72px 80px",
          fontFamily: "Hanken Grotesk",
          color: bone,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5" fill="none" stroke={bone} strokeWidth="1.5" />
            <circle cx="18.01" cy="5.99" r="3.1" fill={amber} />
          </svg>
          <span style={{ fontFamily: "Fraunces", fontSize: 36 }}>SiteOrbit</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 72,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            Build and publish sites for every client from one workspace.
          </div>
          <div style={{ fontSize: 28, color: boneMuted }}>Website builder for teams</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: display, weight: 600, style: "normal" },
        { name: "Hanken Grotesk", data: sans, weight: 400, style: "normal" },
      ],
    }
  );
}
