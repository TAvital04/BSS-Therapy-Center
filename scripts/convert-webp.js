import fs from "fs";
import path from "path";
import sharp from "sharp";

const imagesDir = path.resolve("assets/images");

async function convertDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".jpg") || entry.name.endsWith(".png"))) {
      const parsed = path.parse(fullPath);
      const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

      console.log(`Compressing & converting: ${entry.name} -> ${parsed.name}.webp`);
      await sharp(fullPath).webp({ quality: 82 }).toFile(webpPath);

      const oldStats = fs.statSync(fullPath);
      const newStats = fs.statSync(webpPath);
      console.log(
        `  Original: ${(oldStats.size / 1024).toFixed(1)} KB | WebP: ${(newStats.size / 1024).toFixed(1)} KB (-${(100 - (newStats.size / oldStats.size) * 100).toFixed(1)}%)`
      );
    }
  }
}

convertDir(imagesDir)
  .then(() => console.log("All images successfully converted to WebP!"))
  .catch((err) => console.error("Error converting images:", err));
