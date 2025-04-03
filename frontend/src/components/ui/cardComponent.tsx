import { DeleteIcon } from "../../icons/DeleteIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinksIcon } from "../../icons/LinksIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TweetIcon } from "../../icons/TweetIcon";
import { VideoIcon } from "../../icons/videos";

interface CardProps {
  title: string;
  type: "image" | "video" | "article" | "audio" | "tweet" | "todo";
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
  todo: DocumentIcon,
};

export const CardComponent = (props: CardProps) => {
  const IconComponent = iconBasesOnType[props.type] || DocumentIcon;

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

  return (
    <div className="bg-white rounded-md shadow-md p-4 outline-slate-200 min-h-48 max-h-max w-90">
      <div className="flex justify-between items-center text-slate-500 mb-3">
        <div>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1 mx-2 text-center font-medium truncate">
          {props.title}
        </div>
        <div className="flex gap-2">
          <ShareIcon size={"md"} />
          <DeleteIcon size="md" />
        </div>
      </div>

      {props.type === "video" && props.link && (
        <div className="w-full h-60 mt-2">
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
        <div className="w-full h-60 mt-2">
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x", "twitter")}></a>
          </blockquote>
        </div>
      )}

      { 1&& (
        <div className="mt-35 text-sm text-slate-500">
          {props.tags.map((tag, index) => (
            <span key={index} className="mr-2 bg-[#e0e7ff] text-[#5046d1]  px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
          <div className="mt-4">Added on {props.date}</div>
        </div>
      )}
    </div>
  );
};
