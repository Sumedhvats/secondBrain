import { useEffect, useState } from "react";
import { BACKENDURL } from "../../config";
import { CardComponent } from "./cardComponent";
import axios from "axios";
import { useRecoilState } from "recoil";
import { contentAtom } from "../recoil/content";
import { searchQueryAtom } from "../recoil/searchQuery";

export interface CardProps {
  _id: string;
  type: "image" | "video" | "article" | "audio" | "tweet" | "memory";
  title: string;
  tags: string[];
  createdAt: string;
  link: string | undefined;
  description?: string;
}

export const Hero = () => {
  const [contents, setContents] = useRecoilState<CardProps[]>(contentAtom);
  const [searchQuery] = useRecoilState(searchQueryAtom);
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

  // Filter contents based on search query
  const filteredContents = contents.filter(content => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // Show all if no search

    // Search in title
    if (content.title.toLowerCase().includes(query)) return true;

    // Search in tags
    if (content.tags.some(tag => tag.toLowerCase().includes(query))) return true;

    // Search in type
    if (content.type.toLowerCase().includes(query)) return true;

    // Search in link/URL
    if (content.link && content.link.toLowerCase().includes(query)) return true;

    // Search in description/content
    if (content.description && content.description.toLowerCase().includes(query)) return true;

    return false;
  });

  if (!contents || contents.length === 0) {
    return (
      <div className="text-center py-10 text-[rgb(var(--color-text-tertiary))]">
        No content found. Click "Add content" to get started.
      </div>
    );
  }

  if (filteredContents.length === 0) {
    return (
      <div className="text-center py-10 text-[rgb(var(--color-text-tertiary))]">
        No results found for "{searchQuery}". Try a different search term.
      </div>
    );
  }

  return (
    <div className="pl-4 pr-4 columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {filteredContents.map((content) => (
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