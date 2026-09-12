import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { experience, projects } from "~/data/content";

export default component$(() => {
  return (
    <>
      <SiteHeader />
      <main>
        <div class="container">
          <section class="hero">
            <h1 class="hero-title">Haitam Haouari</h1>
            <p class="hero-sub">
              Software engineer, web developer, and a tinkerer.
            </p>
            <div class="lead">
              <p>
                I'm a full-stack software engineer who likes building useful
                things and shipping them fast: web apps, developer tools,
                browser extensions, and the occasional Linux tuning script.
              </p>
              <p>
                I work mostly with TypeScript, React, Next.js and Rust, and I
                contribute to open source when I can. Recently I worked on{" "}
                <a href="https://zoubda.com" target="_blank" rel="noreferrer">
                  Zoubda
                </a>
                , a multilingual book-summary platform.
              </p>
            </div>
          </section>

          <section class="section" id="work">
            <h2 class="section-label">Selected work</h2>
            <ul class="project-list">
              {projects.map((p) => (
                <li key={p.title} class="project">
                  <h3 class="project-title">
                    {p.links.length > 0 ? (
                      <a href={p.links[0].href} target="_blank" rel="noreferrer">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p class="project-desc">{p.description}</p>
                  {p.links.length > 1 && (
                    <p class="project-extra">
                      {p.links.slice(1).map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </p>
                  )}
                  <div class="project-tags">
                    {p.tags.map((t) => (
                      <span key={t} class="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section class="section" id="experience">
            <h2 class="section-label">Experience</h2>
            <ul class="experience-list">
              {experience.map((e) => (
                <li key={`${e.company}-${e.period}`} class="experience-item">
                  <div class="experience-head">
                    <span class="experience-role">{e.role}</span>
                    <span class="experience-period">{e.period}</span>
                  </div>
                  <div class="experience-company">
                    {e.companyHref ? (
                      <a href={e.companyHref} target="_blank" rel="noreferrer">
                        {e.company}
                      </a>
                    ) : (
                      e.company
                    )}
                  </div>
                  {e.description && (
                    <p class="experience-desc">{e.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
});

export const head: DocumentHead = {
  title: "Haitam Haouari | Software Engineer & Web Developer",
  meta: [
    {
      name: "description",
      content:
        "Haitam Haouari is a software engineer, web developer and tinkerer building web apps, developer tools and open-source projects.",
    },
    {
      property: "og:title",
      content: "Haitam Haouari, Software Engineer & Web Developer",
    },
    {
      property: "og:description",
      content:
        "Full-stack software engineer building web apps, developer tools and open-source projects.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
};
