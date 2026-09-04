import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Free Interview Practice - InterviewPrep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function toBase64(bytes: Uint8Array) {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

export default async function OpenGraphImage() {
  const logo = await fetch(new URL("../logo.png", import.meta.url)).then(
    (response) => response.arrayBuffer(),
  );
  const logoSource = `data:image/png;base64,${toBase64(new Uint8Array(logo))}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f7fbfb",
          color: "#073563",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px 86px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#073563",
            borderRadius: 32,
            bottom: 0,
            height: 260,
            position: "absolute",
            right: -60,
            transform: "rotate(-12deg)",
            width: 420,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img
            src={logoSource}
            alt="Instant Interview Prep logo"
            width="112"
            height="112"
            style={{ objectFit: "cover" }}
          />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            Instant Interview Prep
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, letterSpacing: 0, lineHeight: 1.05, marginTop: 54, maxWidth: 850 }}>
          Free Interview Practice
        </div>
        <div style={{ color: "#168c88", display: "flex", fontSize: 32, fontWeight: 600, marginTop: 26 }}>
          Prepare smarter. Interview with confidence.
        </div>
        <div style={{ background: "#32e0bd", height: 12, marginTop: 52, width: 180 }} />
      </div>
    ),
    { ...size },
  );
}