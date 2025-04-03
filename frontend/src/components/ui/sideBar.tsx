import { BrainIcon } from "../../icons/Brain";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinksIcon } from "../../icons/LinksIcon";
import { TagsIcon } from "../../icons/TagsIcon";
import { TweetIcon } from "../../icons/TweetIcon";
import { VideoIcon } from "../../icons/videos";
import { SidebarItem } from "./sidebarItem";

export const SideBar = () => {
  return (
    <div className="w-85 h-dvh shadow-[1px_2px_10px_rgba(0,0,0,0.3)] p-4 bg-white">
      <div className="flex items-center gap-2 text-3xl font-semibold">
        <BrainIcon size={"lg"} />
        Second Brain
      </div>
      <div>
      <SidebarItem text ="Tweets" icon ={<TweetIcon size="md"/>} size="md" onclick={()=>{}}></SidebarItem>
      <SidebarItem text ="Videos" icon ={<VideoIcon size="md"/>} size="md" onclick={()=>{}}></SidebarItem>
      <SidebarItem text ="Documents" icon ={<DocumentIcon size="md"/>} size="md" onclick={()=>{}}></SidebarItem>
      <SidebarItem text ="Links" icon ={<LinksIcon size="md"/>} size="md" onclick={()=>{}}></SidebarItem>
      <SidebarItem text ="Tags" icon ={<TagsIcon size="md"/>} size="md" onclick={()=>{}}></SidebarItem>
      </div>
    </div>
  );
};
