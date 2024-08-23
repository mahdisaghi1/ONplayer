import express from "express";
import path from "path";
import { scanlist } from "./scan.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
app.use(
  "/audio",
  express.static(path.join(__dirname, "audio"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".mp3")) {
        res.set("Content-Type", "audio/mpeg");
      } else if (filePath.endsWith(".ogg")) {
        res.set("Content-Type", "audio/ogg");
      } else if (filePath.endsWith(".wav")) {
        res.set("Content-Type", "audio/wav");
      }
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.post("/scanlist", async (req, res) => {
  try {
    await scanlist(req, res);
    if (!res.headersSent) {
      res.status(201).json({ message: "Scan completed successfully" });
    }
  } catch (err) {
    console.error("Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
