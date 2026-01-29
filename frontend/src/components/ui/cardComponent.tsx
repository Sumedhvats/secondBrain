import { Tweet } from "react-tweet";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinksIcon } from "../../icons/LinksIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TweetIcon } from "../../icons/TweetIcon";
import { VideoIcon } from "../../icons/videos";
import axios from "axios";
import { BACKENDURL } from "../../config";
import { useEffect } from "react";
import { useToast } from "../../hooks/useToast";

interface CardProps {
  title: string;
  type: "image" | "video" | "article" | "audio" | "tweet" | "memory";
  tags: string[];
  date: string;
  link?: string;
}

const iconBasesOnType: Record<CardProps["type"], React.ElementType> = {
  image: DocumentIcon,
  video: VideoIcon,
  article: LinksIcon,
  audio: VideoIcon,
  tweet: TweetIcon,
  memory: DocumentIcon,
};

export const CardComponent = (props: CardProps) => {
  const IconComponent = iconBasesOnType[props.type] || DocumentIcon;
  const { addToast } = useToast();

  // Load Reddit embed script if needed
  useEffect(() => {
    if (props.type === "article" && props.link && props.link.includes("reddit.com")) {
      const script = document.createElement("script");
      script.src = "https://embed.reddit.com/widgets.js";
      script.async = true;
      script.charset = "UTF-8";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [props.type, props.link]);

  const getYouTubeEmbedUrl = (url?: string): string => {
    if (!url) return "";

    if (url.includes("youtube.com/watch?v=")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  };

  const isRedditLink = props.link?.includes("reddit.com");

  return (
    <div className="glass-subtle rounded-xl p-5 w-full mb-4 break-inside-avoid transition-all duration-300 hover:shadow-xl hover:shadow-[rgb(var(--color-primary))]/10 hover:-translate-y-1 hover:scale-[1.01] border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))]/30">
      <div className="flex justify-between items-center text-[rgb(var(--color-text-secondary))] mb-4">
        <div>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1 mx-3 text-center font-semibold truncate text-[rgb(var(--color-text-primary))]">
          {props.title}
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-lg transition-all duration-200 hover:bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] focus-ring"
            onClick={async () => {
              const toCopy = props.link || props.title;

              try {
                await navigator.clipboard.writeText(toCopy);
                addToast("Link copied to clipboard!", "success");
              } catch (err) {
                console.error("Failed to copy:", err);
                addToast("Copy failed. Please try again.", "error");
              }
            }}
            aria-label="Copy link"
          >
            <ShareIcon size={"md"} />
          </button>

          <button
            className="p-2 rounded-lg transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-error))] focus-ring"
            onClick={async () => {
              const token = localStorage.getItem("token");
              if (!token) {
                addToast("Not authenticated", "error");
                return;
              }

              try {
                await axios.delete(`${BACKENDURL}/api/v1/content`, {
                  headers: { authorization: token },
                  data: { title: props.title },
                });
                addToast("Content deleted successfully", "success");
                setTimeout(() => window.location.reload(), 500);
              } catch (e) {
                console.error("Failed to delete:", e);
                addToast("Delete failed. Please try again.", "error");
              }
            }}
            aria-label="Delete content"
          >
            <DeleteIcon size="md" />
          </button>
        </div>
      </div>

      {props.type === "video" && props.link && (
        <div className="w-full h-60 mt-2 mb-10">
          <iframe
            className="w-full h-full rounded"
            src={getYouTubeEmbedUrl(props.link)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}

      {props.type === "tweet" && props.link && (
        <div className="w-full mt-2 mb-2" data-theme="light">
          <Tweet
            id={extractTweetId(props.link) as string}
            //@ts-ignore*/
            theme="light"
            mode="default"
          />
        </div>
      )}

      {props.type === "article" && props.link && (
        <div className="w-full mt-2 mb-2">
          {isRedditLink ? (
            <div>
              <blockquote className="reddit-embed-bq" data-embed-height="300">
                <a href={props.link}>View on Reddit</a>
              </blockquote>
            </div>
          ) : (
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words"
            >
              {props.link}
            </a>
          )}
        </div>
      )}

      <div className="text-sm text-[rgb(var(--color-text-secondary))] mt-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {props.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-[rgb(var(--color-primary-light))] to-[rgb(var(--color-accent-light))] text-[rgb(var(--color-primary))] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-xs">Added on {props.date}</div>
      </div>
    </div>
  );
};

function extractTweetId(url: string) {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}
