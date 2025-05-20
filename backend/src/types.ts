import { z } from "zod";

const contentTypes = ["video", "article", "image"] as const;

const contentSchema = z.object({
  link: z.string(),
  type: z.enum(contentTypes),
  title: z.string(),
  tags: z.array(z.string()),
  userId: z.string(),
});

const linkSchema = z.object({
  hash: z.string(),
  userId: z.string(),
});
const tagSchema = z.object({
  title: z.string(),
});
const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type ContentType = z.infer<typeof contentSchema>;
export type LinkType = z.infer<typeof linkSchema>;
export type TagType = z.infer<typeof tagSchema>;
export type UserType = z.infer<typeof userSchema>;
