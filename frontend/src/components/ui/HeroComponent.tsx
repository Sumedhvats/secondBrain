import { useEffect, useState } from "react";
import { BACKENDURL } from "../../config";
import { CardComponent } from "./cardComponent";
import axios from "axios";
import { useRecoilState } from "recoil";
import { contentAtom } from "../recoil/content";

export interface CardProps {
  _id: string; 
  type: "image" | "video" | "article" | "audio" | "tweet" | "memory";
  title: string;
  tags: string[];
  createdAt: string; 
  link: string | undefined;
}

export const Hero = () => {
  const [contents, setContents] = useRecoilState<CardProps[]>(contentAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(`${BACKENDURL}/api/v1/content`, {
        headers: {
          authorization: `${token}`,
        },
      });

      
      setContents(response.data.content || []);

      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      setError("Failed to load content");
      setContents([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading your content...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No content found. Click "Add content" to get started.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
       <div>
              <div className="sr-only">.</div>
              <div className="absolute left-0 bottom-0 bold [font-size: clamp(1rem,6rem)]"></div>
            </div>
      {contents.map((content) => (
        <CardComponent
          key={content._id}
          title={content.title}
          type={content.type}
          tags={content.tags} 
          date={new Date(content.createdAt).toLocaleDateString("en-GB")}
          link={content.link}
        />
      ))}
    </div>
  );
};