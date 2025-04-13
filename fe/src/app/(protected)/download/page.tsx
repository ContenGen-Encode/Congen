"use client";

import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import axios from "axios";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [mp3Key, setMp3Key] = useState("");
  const [srtKey, setSrtKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const loadFFmpeg = async () => {
    if (!ffmpegRef.current) {
      const ffmpeg = new FFmpeg();
      await ffmpeg.load({
        coreURL:
          "https://unpkg.com/@ffmpeg/core@0.12.7/dist/umd/ffmpeg-core.js",
        wasmURL:
          "https://unpkg.com/@ffmpeg/core@0.12.7/dist/umd/ffmpeg-core.wasm",
      });
      ffmpegRef.current = ffmpeg;
    }
    return ffmpegRef.current;
  };

  const handleCompile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const ffmpeg = await loadFFmpeg();

      // Fetch MP4 from URL
      const videoResponse = await axios.get(videoUrl, {
        responseType: "arraybuffer",
      });
      const videoData = new Uint8Array(videoResponse.data);
      await ffmpeg.writeFile("input.mp4", videoData);

      // Fetch MP3 from S3-like endpoint
      const mp3Response = await axios.get(
        `${process.env.NEXT_PUBLIC_STORAGE_ENDPOINT}/getFiles?key=${mp3Key}`,
        { responseType: "arraybuffer" },
      );
      const mp3Data = new Uint8Array(mp3Response.data);
      await ffmpeg.writeFile("input.mp3", mp3Data);

      // Fetch SRT from S3-like endpoint
      const srtResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_STORAGE_ENDPOINT}/getFiles?key=${srtKey}`,
        { responseType: "arraybuffer" },
      );
      const srtData = new Uint8Array(srtResponse.data);
      await ffmpeg.writeFile("input.srt", srtData);

      // Run FFmpeg to combine files
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-i",
        "input.mp3",
        "-i",
        "input.srt",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-c:s",
        "mov_text",
        "-metadata:s:s:0",
        "language=eng",
        "-map",
        "0:v:0",
        "-map",
        "1:a:0",
        "-map",
        "2:s:0",
        "output.mp4",
      ]);

      // Read the output file
      const outputData = (await ffmpeg.readFile("output.mp4")) as Uint8Array;
      const blob = new Blob([outputData], { type: "video/mp4" }); // Fixed: Use outputData directly
      const url = URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Clean up
      await Promise.all([
        ffmpeg.deleteFile("input.mp4"),
        ffmpeg.deleteFile("input.mp3"),
        ffmpeg.deleteFile("input.srt"),
        ffmpeg.deleteFile("output.mp4"),
      ]);
    } catch (err) {
      console.log(err);
      setError("Compilation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Video Compiler</h1>
      <form onSubmit={handleCompile}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Video URL (MP4):
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            MP3 File Key:
          </label>
          <input
            type="text"
            value={mp3Key}
            onChange={(e) => setMp3Key(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            SRT File Key:
          </label>
          <input
            type="text"
            value={srtKey}
            onChange={(e) => setSrtKey(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            background: isLoading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Processing..." : "Compile Video"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
