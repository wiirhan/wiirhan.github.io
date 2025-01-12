import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context: { site: string }) {
  const posts = await getCollection("post");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/post/${post.slug}/`,
    })),
    customData: `
      <follow_challenge>
        <feedId>101261116448389120</feedId>
        <userId>62872538587906048</userId>
      </follow_challenge>`,
  });
}
