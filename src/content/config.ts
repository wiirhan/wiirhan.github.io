import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
	}),
});

const cssWeeklyCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
		type: z.string().optional(),
	}),
});

const demoCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
	}),
});

export const collections = {
	post: postCollection,
	"css-weekly": cssWeeklyCollection,
	demo: demoCollection,
};
