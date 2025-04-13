"use client";

import { useEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
}

interface Template {
  timeline: {
    background: string;
    tracks: any[];
    fonts?: { src: string }[];
  };
  output: {
    format: string;
    size: Size;
  };
}

interface ShotstackStudioProps {
  template: Template;
  onReady?: () => void;
  onError?: (error: Error) => void;
  onTimeUpdate?: (time: number) => void;
}

declare global {
  interface Window {
    shotstack: {
      create: (
        elementId: string,
        template: Template,
        options: {
          owner: string;
          interactive?: boolean;
          timeline?: boolean;
          sidebar?: boolean;
          settings?: boolean;
          controls?: boolean;
          style?: {
            logo?: {
              url: string;
            };
            stylesheet?: string;
          };
        },
      ) => void;
    };
  }
}

export default function ShotstackStudio({
  template,
  onReady,
  onError,
  onTimeUpdate,
}: ShotstackStudioProps) {
  const [isLoading, setIsLoading] = useState(true);
  const studioInstanceRef = useRef<any>(null);

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;
    let observer: MutationObserver | null = null;

    // Setup mutation observer to watch for duplicate iframes
    const setupIframeObserver = () => {
      const editorContainer = document.getElementById("shotstack-editor");
      if (!editorContainer) return;

      observer = new MutationObserver((mutations) => {
        const iframes = editorContainer.getElementsByTagName("iframe");
        if (iframes.length > 1) {
          // Keep only the first iframe
          for (let i = 1; i < iframes.length; i++) {
            iframes[i].remove();
          }
        }
      });

      observer.observe(editorContainer, {
        childList: true,
        subtree: true,
      });
    };

    const initializeStudio = () => {
      try {
        if (!window.shotstack) {
          throw new Error("Shotstack SDK not loaded");
        }

        // Cleanup any existing instance
        if (studioInstanceRef.current) {
          try {
            studioInstanceRef.current.destroy?.();
          } catch (e) {
            console.warn("Failed to destroy previous instance:", e);
          }
        }

        studioInstanceRef.current = window.shotstack.create(
          "shotstack-editor",
          template,
          {
            owner: process.env.NEXT_PUBLIC_SHOTSTACK_OWNER_ID || "",
            interactive: true,
            timeline: true,
            sidebar: true,
            settings: true,
            controls: true,
          },
        );

        // Setup observer after studio creation
        setupIframeObserver();

        setIsLoading(false);
        onReady?.();
      } catch (error) {
        console.error("Error initializing Shotstack Studio:", error);
        onError?.(error as Error);
      }
    };

    const script = document.createElement("script");
    script.src = "https://js.shotstack.io/studio/0.5.6/shotstack.min.js";
    script.async = true;
    script.onload = initializeStudio;
    script.onerror = (error) => onError?.(error as Error);
    document.body.appendChild(script);
    scriptElement = script;

    return () => {
      // Disconnect the observer
      if (observer) {
        observer.disconnect();
      }
      // Clean up the instance
      if (studioInstanceRef.current) {
        try {
          studioInstanceRef.current.destroy?.();
        } catch (e) {
          console.warn("Failed to destroy instance during cleanup:", e);
        }
      }
      // Remove the script if it exists
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [template, onReady, onError]);

  const studioControls = {
    play: () => studioInstanceRef.current?.play?.(),
    pause: () => studioInstanceRef.current?.pause?.(),
    stop: () => studioInstanceRef.current?.stop?.(),
    seek: (time: number) => studioInstanceRef.current?.seek?.(time),
  };

  return (
    <div className="shotstack-studio-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading editor...</div>
        </div>
      )}
      <div
        id="shotstack-editor"
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
}
export type StudioControls = typeof studioControls;
