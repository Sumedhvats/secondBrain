import { useEffect, useState } from "react";
import { BACKENDURL } from "../../config";
import { CardComponent } from "./cardComponent";
import axios from "axios";

interface CardProps {
  type: "image" | "video" | "article" | "audio" | "tweet" | "todo";
  title: string;
  tags: string[];
  date: string;
  link: string | undefined;
}

export const Hero = () => {
  const [contents, setContents] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const token = localStorage.getItem("token");
      

      try {
        const response = await axios.get(`${BACKENDURL}/api/v1/content`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        
        setContents(response.data.content || []);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContents([]);
      }
    };

    fetchContent();
  }, []);

  if (!contents || contents.length === 0) {
    return <div />; 
  }

  return (
    <div className="flex flex-wrap gap-4">
      {contents.map((content, index) => (
        <CardComponent
          key={index}
          title={content.title}
          type={content.type}
          tags={content.tags}
          date={content.date}
          link={content.link}
        />
      ))}
    </div>
  );
};
