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
    <div className="bg-white rounded-md shadow-md p-4 outline-slate-200 min-h-48 max-h-max md:w-90 w-full ">
      <div className="flex justify-between items-center text-slate-500 mb-3">
        <div>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1 mx-2 text-center font-medium truncate">
          {props.title}
        </div>
        <div className="flex gap-2">
          <div
            className="transition hover:scale-110 cursor-pointer hover:text-black"
            onClick={async () => {
              const toCopy = props.link || props.title;

              try {
                await navigator.clipboard.writeText(toCopy);
                alert("Link copied to clipboard!"); // Replace with toast if needed
              } catch (err) {
                console.error("Failed to copy:", err);
                alert("Copy failed. Please try again.");
              }
            }}
          >
            <ShareIcon size={"md"} />
          </div>

          <div
            className="transition hover:scale-110 cursor-pointer hover:text-black"
            onClick={async () => {
              const token = localStorage.getItem("token");
              if (!token) return alert("Not authenticated");

              try {
                await axios.delete(`${BACKENDURL}/api/v1/content`, {
                  headers: { authorization: token },
                  data: { title: props.title },
                });
                window.location.reload();
              } catch (e) {
                console.error("Failed to delete:", e);
                alert("Delete failed.");
              }
            }}
          >
            <DeleteIcon size="md" />
          </div>
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
      
      <div className="text-sm text-slate-500">
        {props.tags.map((tag, index) => (
          <span
            key={index}
            className="mr-2 bg-[#e0e7ff] text-[#7755c5]  px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
        <div className="mt-4">Added on {props.date}</div>
      </div>
    </div>
  );
};

function extractTweetId(url: string) {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}
