import { Types } from "mongoose";

export type CleanedPayload = {
  title: string;
  contentId: string;
  tagTitles: string[];
};

export const processContent = (data: {
  title: string;
  tags: { title: string }[];
  _id: Types.ObjectId | string;
}): CleanedPayload => {
  const { title, tags, _id } = data;

  const tagTitles = tags.map(tag => tag.title);

  return {
    title,
    contentId: _id.toString(),
    tagTitles,
  };
};
