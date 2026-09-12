import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getPost, getPosts, renderMarkdown } from "~/lib/blog";

export const onStaticGenerate = () => {
  return { params: getPosts().map((post) => ({ slug: post.slug })) };
};

export const usePost = routeLoader$(({ params, status }) => {
  const post = getPost(params.slug);
  if (!post) {
    status(404);
    return null;
  }
  return {
    title: post.title,
    date: post.date,
    description: post.description,
    html: renderMarkdown(post.body),
  };
});

export default component$(() => {
  const post = usePost();

  if (!post.value) {
    return (
      <main class="container blog-main">
        <a href="/blog" class="back">
          ← all posts
        </a>
        <p class="empty">Post not found.</p>
      </main>
    );
  }

  return (
    <main class="container blog-main">
      <a href="/blog" class="back">
        ← all posts
      </a>
      <article>
        <h1 class="post-title">{post.value.title}</h1>
        <time class="post-date">{post.value.date}</time>
        <div class="post-body" dangerouslySetInnerHTML={post.value.html} />
      </article>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Post | Haitam Haouari",
};
