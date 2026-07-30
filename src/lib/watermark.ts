import sharp from "sharp";

export async function createPreview(
  imageBuffer: Buffer
): Promise<Buffer> {
  const image = sharp(imageBuffer);

  const metadata = await image.metadata();

  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new Error(
      "Impossible de déterminer les dimensions de l’image."
    );
  }

  const shortestSide = Math.min(width, height);

  const fontSize = Math.max(
    32,
    Math.round(shortestSide * 0.075)
  );

  const centerX = width / 2;
  const centerY = height / 2;

  const watermark = Buffer.from(`
    <svg
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        .text {
          fill: rgba(255, 255, 255, 0.2);
          font-size: ${fontSize}px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 700;
          letter-spacing: ${Math.max(
            2,
            Math.round(fontSize * 0.08)
          )}px;
        }
      </style>

      <g transform="rotate(-35 ${centerX} ${centerY})">
        <text
          x="${centerX}"
          y="${centerY}"
          text-anchor="middle"
          dominant-baseline="middle"
          class="text"
        >
          LUMORA • PREVIEW • LUMORA
        </text>
      </g>
    </svg>
  `);

  return sharp(imageBuffer)
    .blur(8)
    .composite([
      {
        input: watermark,
        top: 0,
        left: 0,
      },
    ])
    .jpeg({
      quality: 55,
      progressive: true,
    })
    .toBuffer();
}