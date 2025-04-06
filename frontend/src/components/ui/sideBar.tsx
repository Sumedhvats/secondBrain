import { useRecoilState } from "recoil";
import { BrainIcon } from "../../icons/Brain";
 import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinksIcon } from "../../icons/LinksIcon";
// import { TagsIcon } from "../../icons/TagsIcon";
import { TweetIcon } from "../../icons/TweetIcon";
import { VideoIcon } from "../../icons/videos";
import { SidebarItem } from "./sidebarItem";
import { contentAtom } from "../recoil/content";
import { CardProps } from "./HeroComponent";
import axios from "axios";
import { BACKENDURL } from "../../config";

export const SideBar = () => {
  const [content, setContent] = useRecoilState<CardProps[]>(contentAtom);

  const getItemsByType = async (type: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setContent([]); 

    try {
      const response = await axios.get(
        `${BACKENDURL}/api/v1/content?type=${type}`, 
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setContent(response.data.content || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <div className="w-85 h-dvh shadow-[1px_2px_10px_rgba(0,0,0,0.3)] p-4 bg-white">
      <div className="flex items-center gap-2 text-3xl font-semibold">
        <BrainIcon size={"lg"} />
        Second Brain
      </div>
     
      <div>
      <SidebarItem
          text="All items"
          icon={<DocumentIcon size="md" />}
          size="md"
          onclick={() => getItemsByType("")}
        />
        <SidebarItem
          text="Tweets"
          icon={<TweetIcon size="md" />}
          size="md"
          onclick={() => getItemsByType("tweet")}
        />
        <SidebarItem
          text="Videos"
          icon={<VideoIcon size="md" />}
          size="md"
          onclick={() => getItemsByType("video")}
        />
        <SidebarItem
          text="Links"
          icon={<LinksIcon size="md" />}
          size="md"
          onclick={() => getItemsByType("article")}
        />
        {/* Future SidebarItems:
        <SidebarItem
          text="Documents"
          icon={<DocumentIcon size="md" />}
          size="md"
          onclick={() => getItemsByType("document")}
        />
        <SidebarItem
          text="Tags"
          icon={<TagsIcon size="md" />}
          size="md"
          onclick={() => getItemsByType("tag")}
        />
        */}
      </div>
    </div>
  );
};
