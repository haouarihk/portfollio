import { component$ } from "@builder.io/qwik";

export const SiteFooter = component$(() => {
  return (
    <footer class="site-footer">
      <div class="footer-inner">
        <span class="footer-note">
          © {new Date().getFullYear()} Haitam Haouari
        </span>
        <div class="footer-links">
          <a
            href="https://github.com/haouarihk"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:haouarihk@gmail.com">Email</a>
          <a
            href="https://haouarihk.com/cv.pdf"
            target="_blank"
            rel="noreferrer"
          >
            CV
          </a>
        </div>
      </div>
    </footer>
  );
});
