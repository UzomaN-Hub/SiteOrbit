import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111214",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="#ECEAE4" strokeWidth="1.5" />
          <circle cx="18.01" cy="5.99" r="3.1" fill="#D9A520" />
        </svg>
      </div>
    ),
    size
  );
}
