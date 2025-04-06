import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BrainIcon } from "../../icons/Brain";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinksIcon } from "../../icons/LinksIcon";
import { TweetIcon } from "../../icons/TweetIcon";
import { VideoIcon } from "../../icons/videos";

import { SidebarItem } from "./sidebarItem";
import { CardProps } from "./HeroComponent";
import { useEffect, useRef } from "react";

import { contentAtom } from "../recoil/content";
import { topTitle } from "../recoil/Titlebar";
import { BACKENDURL } from "../../config";
import { isSmallScreen } from "../recoil/isSmallScreen";
import { isNavVisible } from "../recoil/hamburger";

export const SideBar = () => {
  const navigate = useNavigate();

  const [topBarTitle, setTopBarTitle] = useRecoilState(topTitle);
  const [content, setContent] = useRecoilState<CardProps[]>(contentAtom);
  const isSmall = useRecoilValue(isSmallScreen);
  const [navVisible, setNavVisible] = useRecoilState(isNavVisible);

  const shouldShowSidebar = !isSmall || navVisible;
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSmall &&
        navVisible
      ) {
        setNavVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSmall, navVisible, setNavVisible]);

  const getItemsByType = async (type: string, title: string) => {
    setTopBarTitle(title);
    const token = localStorage.getItem("token");
    if (!token) return;

    setContent([]);
    try {
      const response = await axios.get(
        `${BACKENDURL}/api/v1/content?type=${type}`,
        {
          headers: { authorization: `${token}` },
        }
      );
      setContent(response.data.content || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    }

    if (isSmall) setNavVisible(false);
  };

  return (
    <>
      {isSmall && navVisible && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setNavVisible(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`
      fixed top-0 left-0 z-50 h-dvh w-80 bg-white p-4 
      transform transition-transform duration-300
      ${isSmall ? (navVisible ? "translate-x-0" : "-translate-x-full") : ""}
      ${!isSmall ? "static transform-none" : ""}
    `}
      >
        <div
          className="flex items-center gap-2 text-3xl font-semibold mb-6 cursor-pointer"
          onClick={() => {
            navigate("/home");
            if (isSmall) setNavVisible(false);
          }}
        >
          <BrainIcon size="lg" />
          Second Brain
        </div>

        <div className="flex flex-col gap-2">
          <SidebarItem
            text="All Notes"
            icon={<DocumentIcon size="md" />}
            size="md"
            onclick={() => getItemsByType("", "All Notes")}
          />
          <SidebarItem
            text="Tweets"
            icon={<TweetIcon size="md" />}
            size="md"
            onclick={() => getItemsByType("tweet", "Tweets")}
          />
          <SidebarItem
            text="Videos"
            icon={<VideoIcon size="md" />}
            size="md"
            onclick={() => getItemsByType("video", "Videos")}
          />
          <SidebarItem
            text="Links"
            icon={<LinksIcon size="md" />}
            size="md"
            onclick={() => getItemsByType("article", "Links")}
          />
        </div>
      </div>
    </>
  );
};
