import { Locale } from "@/i18n-config";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { PostBody } from "../../_components/post-body";
import { PostHeader } from "../../_components/post-header";

export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  const content = post.contents[params.lang];

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={content.title}
            coverUrl={content.coverUrl}
            date={content.publishedAt}
            author={content.author}
          />
          <PostBody content={content.bodyHtml} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
    lang: Locale;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const content = post.contents[params.lang];

  if (!post) {
    return notFound();
  }

  const title = `${content.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: content.coverUrl ? [content.coverUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
