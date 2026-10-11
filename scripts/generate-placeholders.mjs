import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "screens");

const S = ["0111110", "1100000", "1100000", "0111110", "0000011", "0000011", "0111110"];
const O = ["0111110", "1100011", "1100011", "1100011", "1100011", "1100011", "0111110"];
const DIGITS = {
  1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  2: ["01110", "10001", "00001", "00110", "01000", "10000", "11111"],
  3: ["01110", "10001", "00001", "00110", "00001", "10001", "01110"],
  4: ["00100", "01100", "10100", "11111", "00100", "00100", "00100"],
};

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type), data]);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, pixels) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function createCanvas(width, height, color) {
  const pixels = Buffer.alloc(width * height * 4);
  fill(pixels, width, 0, 0, width, height, 0, color);
  return { width, height, pixels };
}

function setPixel(canvas, x, y, color) {
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
  const i = (y * canvas.width + x) * 4;
  canvas.pixels[i] = color[0];
  canvas.pixels[i + 1] = color[1];
  canvas.pixels[i + 2] = color[2];
  canvas.pixels[i + 3] = 255;
}

function fill(pixels, width, x, y, w, h, radius, color) {
  const rad2 = radius * radius;
  for (let yy = 0; yy < h; yy += 1) {
    let inset = 0;
    if (radius > 0 && yy < radius) {
      const dy = radius - yy;
      inset = radius - Math.floor(Math.sqrt(Math.max(0, rad2 - dy * dy)));
    } else if (radius > 0 && yy >= h - radius) {
      const dy = yy - (h - radius);
      inset = radius - Math.floor(Math.sqrt(Math.max(0, rad2 - dy * dy)));
    }
    const start = (y + yy) * width * 4 + (x + inset) * 4;
    const end = (y + yy) * width * 4 + (x + w - inset) * 4;
    for (let i = start; i < end; i += 4) {
      pixels[i] = color[0];
      pixels[i + 1] = color[1];
      pixels[i + 2] = color[2];
      pixels[i + 3] = 255;
    }
  }
}

function glyph(canvas, bitmap, x, y, scale, color) {
  bitmap.forEach((row, rowIndex) => {
    [...row].forEach((cell, colIndex) => {
      if (cell !== "1") return;
      fill(
        canvas.pixels,
        canvas.width,
        x + colIndex * scale,
        y + rowIndex * scale,
        scale,
        scale,
        0,
        color,
      );
    });
  });
}

function tile(canvas, x, y, size, letter) {
  const orange = letter === "S";
  const edge = orange ? [191, 63, 12] : [165, 185, 196];
  const face = orange ? [255, 106, 43] : [245, 248, 246];
  const ink = orange ? [255, 255, 255] : [14, 42, 60];
  const radius = Math.round(size * 0.22);
  const lip = Math.round(size * 0.1);
  fill(canvas.pixels, canvas.width, x, y + lip, size, size - lip, radius, edge);
  fill(canvas.pixels, canvas.width, x, y, size, size - lip, radius, face);
  const bitmap = letter === "S" ? S : O;
  const scale = Math.max(2, Math.round(size * 0.08));
  const gw = 7 * scale;
  const gh = 7 * scale;
  glyph(canvas, bitmap, x + Math.round((size - gw) / 2), y + Math.round((size - lip - gh) / 2), scale, ink);
}

function letterAt(screen, row, col) {
  if (screen === 1) return row === col ? "O" : "S";
  if (screen === 2) return col % 2 === 0 ? "S" : "O";
  if (screen === 3) return (row + col) % 2 === 0 ? "S" : "O";
  return row >= 2 && row <= 3 && col >= 2 && col <= 3 ? "O" : "S";
}

function screen(number) {
  const width = 780;
  const height = 1688;
  const canvas = createCanvas(width, height, [6, 22, 31]);
  const digit = DIGITS[number];
  const tileSize = 96;
  const gap = 14;
  const grid = tileSize * 6 + gap * 5;
  const pad = 36;
  const panel = grid + pad * 2;
  const panelX = Math.round((width - panel) / 2);
  const digitHeight = 7 * 22;
  const panelY = Math.round((height - (digitHeight + 48 + panel)) / 2) + digitHeight + 48;
  glyph(canvas, digit, 300, panelY - digitHeight - 48, 22, [255, 203, 46]);
  fill(canvas.pixels, canvas.width, panelX, panelY + 16, panel, panel, 48, [9, 30, 45]);
  fill(canvas.pixels, canvas.width, panelX, panelY, panel, panel, 48, [18, 50, 73]);

  for (let row = 0; row < 6; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      tile(
        canvas,
        panelX + pad + col * (tileSize + gap),
        panelY + pad + row * (tileSize + gap),
        tileSize,
        letterAt(number, row, col),
      );
    }
  }

  return encodePng(width, height, canvas.pixels);
}

mkdirSync(outDir, { recursive: true });
for (const number of [1, 2, 3, 4]) {
  writeFileSync(join(outDir, `${number}.png`), screen(number));
}
console.log("wrote screens");
