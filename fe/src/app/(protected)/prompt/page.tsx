"use client";

import { Button } from "@/components/ui/button";
import { QualitySelector } from "@/components/QualitySelector";
import { useState } from "react";
import TemplateSelect from "@/components/TemplateSelect";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_FILE_URL, BACKEND_PROMPT_URL } from "@/config";

const videos = [
  {
    id: 1,
    name: "Video 1",
    videoUrl: "https://cdn.revid.ai/subway_surfers/LOW_RES/1.mp4",
    imageUrl: "https://cdn.revid.ai/subway_surfers/thumbnails/1.png",
  },
  {
    id: 2,
    name: "Video 2",
    videoUrl: "https://cdn.revid.ai/subway_surfers/LOW_RES/2.mp4",
    imageUrl: "https://cdn.revid.ai/subway_surfers/thumbnails/2.png",
  },
  {
    id: 3,
    name: "Video 3",
    videoUrl: "https://cdn.revid.ai/subway_surfers/LOW_RES/3.mp4",
    imageUrl: "https://cdn.revid.ai/subway_surfers/thumbnails/3.png",
  },
  {
    id: 4,
    name: "Video 4",
    videoUrl: "https://cdn.revid.ai/subway_surfers/LOW_RES/4.mp4",
    imageUrl: "https://cdn.revid.ai/subway_surfers/thumbnails/4.png",
  },
  {
    id: 5,
    name: "Video 5",
    videoUrl: "https://cdn.revid.ai/subway_surfers/LOW_RES/5.mp4",
    imageUrl: "https://cdn.revid.ai/subway_surfers/thumbnails/5.png",
  },
  {
    id: 6,
    name: "Video 6",
    videoUrl: "https://cdn.revid.ai/subway_surfers/LOW_RES/6.mp4",
    imageUrl: "https://cdn.revid.ai/subway_surfers/thumbnails/6.png",
  },
];

const audioFiles = [
  {
    id: 1,
    name: "Blade runer",
    url: "https://cdn.revid.ai/audio/_bladerunner-2049.mp3",
  },
  {
    id: 2,
    name: "Paris Elise",
    url: "https://cdn.revid.ai/audio/_paris-else.mp3",
  },
  {
    id: 3,
    name: "Observer",
    url: "https://cdn.revid.ai/audio/observer.mp3",
  },
  {
    id: 4,
    name: "Izzamusic",
    url: "https://cdn.revid.ai/audio/_izzamuzzic.mp3",
  },
];

const toneOptions = [
  {
    name: "Neutral",
    id: 0,
    description: "Emotionally balanced, with no strong feelings expressed.",
  },
  {
    name: "Happy",
    id: 1,
    description: "A positive, joyful, or content emotional state.",
  },
  {
    name: "Sad",
    id: 2,
    description: "A feeling of sorrow, disappointment, or unhappiness.",
  },
  {
    name: "Angry",
    id: 3,
    description:
      "Intense displeasure or hostility, often in response to frustration or injustice.",
  },
  {
    name: "Afraid",
    id: 4,
    description:
      "An emotional reaction to threat or danger, often resulting in fear or anxiety.",
  },
  {
    name: "Disgusted",
    id: 5,
    description:
      "A strong feeling of aversion or revulsion toward something unpleasant.",
  },
  {
    name: "Surprised",
    id: 6,
    description: "A reaction to something unexpected or astonishing.",
  },
  {
    name: "Excited",
    id: 7,
    description:
      "High energy and enthusiasm, often in anticipation of something positive.",
  },
  {
    name: "Horny",
    id: 8,
    description: "Experiencing sexual arousal or desire.",
  },
  {
    name: "Assertive",
    id: 9,
    description:
      "Confident and self-assured in expression without being aggressive.",
  },
  {
    name: "Submissive",
    id: 10,
    description:
      "Yielding to the will of others; compliant or passive in behavior.",
  },
  {
    name: "Skibidi",
    id: 11,
    description:
      "Chaotic or absurd emotional energy; meme-inspired nonsensical vibe.",
  },
];

export default function PromptPage() {
  const { getToken } = useAuth();
  const [selectedAudio, setSelectedAudio] = useState<number | null>(null);
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("standard");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [prompt, setPrompt] = useState("");
  const [scriptFile, setScriptFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptSource, setScriptSource] = useState<"prompt" | "file">("prompt");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const handlePlayAudio = (id: number, url: string) => {
    if (currentlyPlaying === id) {
      // If the same audio is playing, pause it
      if (audioPlayer) {
        audioPlayer.pause();
        setCurrentlyPlaying(null);
        setAudioPlayer(null);
      }
    } else {
      // If a different audio is playing, stop it first
      if (audioPlayer) {
        audioPlayer.pause();
      }

      // Play the new audio
      const newAudio = new Audio(url);
      newAudio.play();
      setAudioPlayer(newAudio);
      setCurrentlyPlaying(id);

      // Reset when audio ends
      newAudio.onended = () => {
        setCurrentlyPlaying(null);
        setAudioPlayer(null);
      };
    }
  };

  const handleScriptFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScriptFile(file);
    }
  };

  const handleAudioSelect = (id: number) => {
    setSelectedAudio(id);
  };

  const handleToneSelect = (id: number) => {
    setSelectedTone(id);
  };

  const handleGenerate = async () => {
    console.log(
      scriptSource,
      prompt,
      scriptFile,
      selectedTone,
      selectedAudio,
      selectedTemplate,
    );
    if (!prompt.trim() && !scriptFile) return;
    const token = await getToken();
    if (scriptSource === "prompt" && !scriptFile) {
      try {
        setIsGenerating(true);
        const body = {
          prompt,
          tone: selectedTone,
          audio: selectedAudio,
          video: selectedTemplate,
        };
        // Mock API call
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token || "",
          },
        };

        try {
          console.log("Request options:", requestOptions);
          const response = await fetch(BACKEND_PROMPT_URL, requestOptions);

          return response;
        } catch (error) {
          console.error("Error occurred:", error);
          throw error;
        }

        // Navigate to results page with the generated video data
      } catch (error) {
        console.error("Error generating content:", error);
        // Handle error (show toast, etc.)
      } finally {
        setIsGenerating(false);
      }
    } else if (scriptSource === "file" && scriptFile) {
      try {
        setIsGenerating(true);
        const form = new FormData();
        form.append("file", scriptFile);
        form.append("tone", selectedTone?.toString() || "0");
        if (selectedAudio) {
          form.append("audio", selectedAudio?.toString() || "0");
        }
        form.append("video", selectedTemplate?.toString() || "0");

        const response = await fetch(BACKEND_FILE_URL, {
          method: "POST",
          body: form,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to generate content");
        }
      } catch (error) {
        console.error("Error generating content:", error);
        // Handle error (show toast, etc.)
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-6 bg-gradient-to-b from-background to-background/95">
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Create Your Content
          </h1>
          <p className="text-muted-foreground">
            Generate amazing videos with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Prompt and Options */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-col space-y-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="text-primary">Script Source</span>
                </h2>
                <div className="flex border-b border-input">
                  <button
                    onClick={() => setScriptSource("prompt")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      scriptSource === "prompt"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Generate Script with Congen
                  </button>
                  <button
                    onClick={() => setScriptSource("file")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      scriptSource === "file"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Use Own Script
                  </button>
                </div>
              </div>

              {scriptSource === "file" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="script-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background/80"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-muted-foreground"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF or CSV (MAX. 10MB)
                        </p>
                      </div>
                    </label>
                    <input
                      id="script-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.csv"
                      onChange={handleScriptFileUpload}
                    />
                  </div>
                  {scriptFile && (
                    <div className="text-sm text-muted-foreground">
                      Selected file: {scriptFile.name}
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-[200px] p-3 rounded-md border border-input bg-background/50 backdrop-blur-sm text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Enter your content prompt here..."
                />
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Quality Level</span>
              </h2>
              <QualitySelector
                selectedQuality={selectedQuality}
                onSelect={setSelectedQuality}
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Template Format</span>
              </h2>
              <TemplateSelect
                templates={videos}
                onSelect={(id: number) => {
                  setSelectedTemplate(id);
                  console.log(id);
                }}
                selected={selectedTemplate}
              />
            </div>
          </div>

          {/* Right column - Audio and Preview */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Select Audio</span>
              </h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {audioFiles.map((audio) => (
                  <div
                    key={audio.id}
                    className={`flex items-center justify-between p-3 rounded-md border ${
                      selectedAudio === audio.id
                        ? "border-primary bg-primary/10"
                        : "border-input"
                    }`}
                  >
                    <span className="text-sm">{audio.name}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePlayAudio(audio.id, audio.url)}
                      >
                        {currentlyPlaying === audio.id ? "Pause" : "Play"}
                      </Button>
                      <Button
                        variant={
                          selectedAudio === audio.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleAudioSelect(audio.id)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Select Tone</span>
              </h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {toneOptions.map((tone) => (
                  <div
                    key={tone.id}
                    className={`p-3 rounded-md border ${
                      selectedTone === tone.id
                        ? "border-primary bg-primary/10"
                        : "border-input"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{tone.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {tone.description}
                        </div>
                      </div>
                      <Button
                        variant={
                          selectedTone === tone.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleToneSelect(tone.id)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
            size="lg"
            disabled={
              (!prompt.trim() && !scriptFile) ||
              !selectedTemplate ||
              selectedTone == null ||
              !selectedTemplate
            }
            onClick={handleGenerate}
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </Button>
        </div>
      </div>
    </div>
  );
}
