import { useEffect, useRef, useState } from "react";

interface TweetEmbedProps {
  tweetUrl: string;
  theme?: "light" | "dark";
}

export const TweetEmbed = ({ tweetUrl, theme = "light" }: TweetEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = "";
    setError(false);
    setLoading(true);

    const loadTweet = () => {
      const twttr = (window as any).twttr;
      if (twttr && twttr.widgets) {
        twttr.widgets
          .createTweet(extractTweetId(tweetUrl)!, containerRef.current!, {
            theme,
            conversation: "none",
            align: "center",
          })
          .then((el: HTMLElement | undefined) => {
            setLoading(false);
            if (!el) {
              setError(true);
            }
          })
          .catch(() => {
            setLoading(false);
            setError(true);
          });
      }
    };

    // Check if Twitter widgets script is already loaded
    if ((window as any).twttr && (window as any).twttr.widgets) {
      loadTweet();
    } else {
      // Load Twitter widgets.js
      const existingScript = document.getElementById("twitter-wjs");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "twitter-wjs";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => loadTweet();
        script.onerror = () => {
          setLoading(false);
          setError(true);
        };
        document.body.appendChild(script);
      } else {
        // Script tag exists but may still be loading
        existingScript.addEventListener("load", loadTweet);
        // If already loaded, twttr would exist
        if ((window as any).twttr && (window as any).twttr.widgets) {
          loadTweet();
        }
      }
    }
  }, [tweetUrl, theme]);

  if (error) {
    return (
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[rgb(var(--color-primary))] hover:underline break-words text-sm p-3 bg-[rgb(var(--color-bg-tertiary))] rounded-lg border border-[rgb(var(--color-border))] text-center"
      >
        View tweet on X/Twitter ↗
      </a>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="w-5 h-5 border-2 border-[rgb(var(--color-primary))] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

function extractTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}
