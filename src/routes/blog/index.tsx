import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getPosts } from "~/lib/blog";

export default component$(() => {
  const posts = getPosts();

  return (
    <main class="container blog-main">
      <a href="/" class="back">
        ← home
      </a>
      <h1 class="page-title">Writing</h1>
      <p class="page-sub">
        Notes on how things work, and what I've learned while building them.
      </p>
      {posts.length === 0 ? (
        <p class="empty">Nothing here yet. It's on the way.</p>
      ) : (
        <ul class="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <a href={`/blog/${p.slug}`} class="post-link">
                <span class="post-link-title">{p.title}</span>
                <time>{p.date}</time>
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
});

export const head: DocumentHead = {
  title: "Writing | Haitam Haouari",
};
