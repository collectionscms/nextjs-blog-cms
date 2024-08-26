import { Post } from "@/interfaces/post";

const apiUrl = process.env.COLLECTIONS_API_URL;
const apiKey = process.env.COLLECTIONS_API_KEY;

export async function getPostBySlug(
  slug: string,
  revalidate: number
): Promise<Post> {
  const res = await fetch(`${apiUrl}/api/v1/posts/${slug}`, {
    next: { revalidate },
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const data = await res.json();
  return data.post;
}

export async function getAllPosts(revalidate: number): Promise<Post[]> {
  const res = await fetch(`${apiUrl}/api/v1/posts`, {
    next: { revalidate },
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const data = await res.json();
  return data.posts;
}
