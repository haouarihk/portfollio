import { component$ } from "@builder.io/qwik";

export const SiteHeader = component$(() => {
  return (
    <header class="site-header">
      <div class="site-header-inner">
        <a href="/" class="brand">
          Haitam Haouari
        </a>
        <nav class="nav-links">
          <a href="/#work" class="nav-link">
            Work
          </a>
          <a href="/#experience" class="nav-link">
            Experience
          </a>
        </nav>
      </div>
    </header>
  );
});
