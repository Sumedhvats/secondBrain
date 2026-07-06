import { useEffect, useRef, useState, useCallback } from "react";

interface TweetEmbedProps {
  tweetUrl: string;
  theme?: "light" | "dark";
}

export const TweetEmbed = ({ tweetUrl, theme = "light" }: TweetEmbedProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tweetContainerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  const tweetId = extractTweetId(tweetUrl);

  const loadTweet = useCallback(() => {
    if (!mountedRef.current || !wrapperRef.current || !tweetId) return;

    const twttr = (window as any).twttr;
    if (!twttr?.widgets) return;

    // Create a fresh container for Twitter to render into,
    // completely outside React's DOM management
    if (tweetContainerRef.current && wrapperRef.current.contains(tweetContainerRef.current)) {
      wrapperRef.current.removeChild(tweetContainerRef.current);
    }
    const container = document.createElement("div");
    tweetContainerRef.current = container;
    wrapperRef.current.appendChild(container);

    twttr.widgets
      .createTweet(tweetId, container, {
        theme,
        conversation: "none",
        align: "center",
      })
      .then((el: HTMLElement | undefined) => {
        if (!mountedRef.current) return;
        setLoading(false);
        if (!el) {
          setError(true);
        }
      })
      .catch(() => {
        if (!mountedRef.current) return;
        setLoading(false);
        setError(true);
      });
  }, [tweetId, theme]);

  useEffect(() => {
    mountedRef.current = true;

    if (!tweetId) {
      setError(true);
      setLoading(false);
      return;
    }

    setError(false);
    setLoading(true);

    // Check if Twitter widgets script is already loaded
    if ((window as any).twttr?.widgets) {
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
          if (!mountedRef.current) return;
          setLoading(false);
          setError(true);
        };
        document.body.appendChild(script);
      } else {
        // Script exists — wait for twttr to be ready
        const checkReady = setInterval(() => {
          if ((window as any).twttr?.widgets) {
            clearInterval(checkReady);
            loadTweet();
          }
        }, 100);

        // Timeout after 5s
        setTimeout(() => {
          clearInterval(checkReady);
          if (mountedRef.current && loading) {
            setLoading(false);
            setError(true);
          }
        }, 5000);
      }
    }

    return () => {
      mountedRef.current = false;
      // Clean up the tweet container we created outside React
      if (tweetContainerRef.current && wrapperRef.current?.contains(tweetContainerRef.current)) {
        wrapperRef.current.removeChild(tweetContainerRef.current);
        tweetContainerRef.current = null;
      }
    };
  }, [tweetUrl, theme, loadTweet]);

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
    <div>
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="w-5 h-5 border-2 border-[rgb(var(--color-primary))] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* 
        This wrapper is intentionally empty of React children.
        Twitter's widgets.js will inject DOM into it directly.
        Keeping React out of this subtree prevents removeChild conflicts.
      */}
      <div ref={wrapperRef} />
    </div>
  );
};

function extractTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}
