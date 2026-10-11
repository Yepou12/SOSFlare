import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SOS Flare. Line up S-O-S. Clear the board. Beat the stage.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.png")),
    readFile(join(process.cwd(), "src/fonts/LilitaOne-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#06161f",
          padding: "64px",
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={460}
          height={460}
          alt=""
          style={{ borderRadius: 48 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 48,
            maxWidth: 560,
          }}
        >
          <div
            style={{
              fontSize: 84,
              color: "#e6f0f4",
              fontFamily: "Lilita One",
              lineHeight: 1,
            }}
          >
            SOS Flare
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#ffcb2e",
              marginTop: 28,
              fontFamily: "Lilita One",
              lineHeight: 1.3,
            }}
          >
            Line up S-O-S. Clear the board. Beat the stage.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Lilita One",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
