import { useState, useEffect, useRef } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./button";
import { InputElement } from "./Input";
import { useRecoilState } from "recoil";
import { modalState } from "../recoil/atom";
import axios from "axios";
import { BACKENDURL } from "../../config";

interface FormData {
  title: string;
  link: string;
  type: string;
  tags: string;
}

export const CreateContent = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useRecoilState(modalState);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    link: "",
    type: "article",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);

  const detectContentType = (url: string) => {
    if (!url) return "article";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "video";
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      return "tweet";
    } else if (/\.(jpeg|jpg|gif|png)$/i.test(url)) {
      return "image";
    } else if (/\.(mp3|wav|ogg)$/i.test(url)) {
      return "audio";
    }

    return "article";
  };

  const handleLinkChange = () => {
    const link = linkRef.current?.value || "";
    const detectedType = detectContentType(link);
    setFormData((prev) => ({ ...prev, type: detectedType }));
  };

  const getAutomaticTags = (link: string, type: string, userTags: string) => {
    const tags = userTags ? userTags.split(",").map((tag) => tag.trim()) : [];

    if (
      type === "video" &&
      (link.includes("youtube.com") || link.includes("youtu.be"))
    ) {
      if (!tags.includes("youtube")) {
        tags.push("youtube");
      }
    } else if (
      type === "tweet" &&
      (link.includes("twitter.com") || link.includes("x.com"))
    ) {
      if (!tags.includes("twitter")) {
        tags.push("twitter");
      }
    }

    return tags.join(",");
  };

  const addContent = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    const title = titleRef.current?.value || "";
    const link = linkRef.current?.value || "";
    const userTags = tagsRef.current?.value || "";

    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    if (!link.trim()) {
      setError("Link is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to add content");
        setIsSubmitting(false);
        return;
      }

      const tags = getAutomaticTags(link, formData.type, userTags);

      const payload = {
        title,
        link,
        type: formData.type,
        tags,
      };

      console.log("Sending payload:", payload);
      console.log("Auth token:", token);
      //@ts-ignore
      const response = await axios.post(
        `${BACKENDURL}/api/v1/content`,
        payload,
        {
          headers: {
            authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);

      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      if (tagsRef.current) tagsRef.current.value = "";
      setFormData((prev) => ({ ...prev, type: "article" }));

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Error adding content:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Failed to add content");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpen, open]);

  useEffect(() => {
    if (!open) {
      setError("");
      setSuccess(false);
      setFormData({
        title: "",
        link: "",
        type: "article",
        tags: "",
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-end items-start  bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-96 mt-20 mr-6"
        ref={modalRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Content</h2>
          <button
            className="cursor-pointer hover:bg-gray-100 p-1 rounded-full"
            onClick={() => setOpen(false)}
          >
            <CrossIcon />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
            Content added successfully!
          </div>
        )}

        <div className="space-y-4">
          <InputElement placeholder="Title" reference={titleRef} />

          <InputElement
            placeholder="Link (URL)"
            reference={linkRef}
            type="url"
            onBlur={handleLinkChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="article">Article</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="tweet">Tweet</option>
              <option value="memory">Memory</option>
            </select>
          </div>

          <InputElement
            placeholder="Tags (comma separated)"
            reference={tagsRef}
          />

          {formData.type === "video" && (
            <div className="text-xs text-gray-500 italic">
              YouTube links will automatically be tagged with "youtube"
            </div>
          )}

          {formData.type === "tweet" && (
            <div className="text-xs text-gray-500 italic">
              Twitter links will automatically be tagged with "twitter"
            </div>
          )}
        </div>

        <div className="flex justify-center pt-5">
          <Button
            type="primary"
            text={isSubmitting ? "Adding..." : "Add Content"}
            onclick={addContent}
          />
        </div>
      </div>
    </div>
  );
};
