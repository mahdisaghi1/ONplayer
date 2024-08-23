import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const scanlist = async (req, res) => {
  try {
    // reading Audio Files
    const files = await fs.promises.readdir("./audio");
    const musicData = [];
    for (const file of files) {
      const filePath = path.join("./audio", file);
      try {
        // using META-DATA for catching Music info
        const metadata = await parseFile(filePath);
        const { title, artist, picture } = metadata.common;
        let cover = "";
        if (picture && picture.length > 0) {
          const imageData = picture[0].data;
          cover = `data:${picture[0].format};base64,${Buffer.from(
            imageData
          ).toString("base64")}`;
        }
        musicData.push({
          Name: file,
          Title: title || "N/A",
          Artist: artist || "N/A",
          Cover: cover,
        });
      } catch (error) {
        console.error(`Error reading metadata for file ${file}:`, error);
        musicData.push({
          Name: file,
          Title: "N/A",
          Artist: "N/A",
          Cover: "",
        });
      }
    }
    // adding music info to JSON File
    const jsonFilePath = path.join(__dirname, "public/json/list.json");
    await fs.promises.writeFile(
      jsonFilePath,
      JSON.stringify(musicData, null, 2)
    );
    if (!res.headersSent) {
      res.json({
        message: "Scan completed successfully, data saved to list.json",
      });
    }
  } catch (error) {
    console.error("Error reading audio directory:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to scan audio directory" });
    }
  }
};