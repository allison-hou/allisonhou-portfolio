import { useEffect, useMemo, useRef } from "react";
import { asset } from "../utils/asset";

type Project = {
  title: string;
  role: string;
  stack: string;
  period: string;
  bullets: string[];
};

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const projects = useMemo<Project[]>(
    () => [
      {
        title: "CareGo — AI-powered Senior Travel Assistant",
        role: "Team Lead & Lead App Developer",
        stack: "Flutter · Firebase · OpenAI API · Google Maps API · OpenWeather API",
        period: "Feb 2025 – Dec 2025",
        bullets: [
          "Led cross-functional capstone team; drove end-to-end development and system integration of a cross-platform mobile app for health-aware senior travel.",
          "Implemented core app architecture and major features using Flutter; coordinated integration with Firebase backend services.",
          "Integrated AI itinerary generation (OpenAI API) and location-based services (Google Maps API).",
        ],
      },
      {
        title: "Ticket Booking System",
        role: "Full Stack Developer",
        stack: "Java · Spring Boot · MySQL · REST API",
        period: "Oct 2024 – Dec 2024",
        bullets: [
          "Built ticket booking workflows including event discovery, booking, and refund.",
          "Implemented backend services with Spring Boot and integrated RESTful APIs.",
        ],
      },
      {
        title: "Campus Food Finder",
        role: "Front-end Developer",
        stack: "Bootstrap · HTML · CSS · JavaScript · PHP",
        period: "Feb 2024 – Jun 2024",
        bullets: [
          "Implemented authentication and session-based personalized experience.",
          "Built DB-driven filtering/sorting of store listings; responsive UI with Bootstrap grid + JS DOM.",
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      targets.forEach((t) => t.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div id="main" className="page" ref={rootRef}>
      <section className="hero">
        <div className="hero-left">
          <p className="kicker">App Developer · Frontend Engineer · UI/UX</p>
          <h1 className="title">Allison Hou</h1>
          <p className="desc">
            Hi! I'm a Management Information Systems senior student who loves building things from the ground up (and sometimes breaking them for
            science). I’m always tinkering with new web tech and side projects. Frontend is my playground! I'm obsessed with those little details that
            make users smile. I design UI that actually works (and yes, looks good too).
          </p>

          <div className="cta">
            <a className="btn1" href="#projects">
              View Projects
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-right-wrap">
            <figure className="hero-right-tilt">
            <img className="avatar" src={asset("assets/portrait.jpg")} alt="Portrait photo of Allison Hou" />
              <figcaption className="caption">Irvine, CA · Taipei, Taiwan</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-head">
            <h2 className="h2">Skills</h2>
        </div>

        <div className="skills-rows" role="region" aria-label="Categorized skills scrolling lists">
            {(
            [
                {
                label: "FRONTEND",
                dur: "18s",
                items: [
                    { name: "HTML", icon: asset("assets/html-logo.png"), alt: "HTML icon" },
                    { name: "CSS", icon: asset("assets/css-logo.png"), alt: "CSS icon" },
                    { name: "JavaScript", icon: asset("/assets/javascript-logo.png"), alt: "JavaScript icon" },
                ],
                },
                {
                label: "BACKEND",
                dur: "20s",
                items: [
                    { name: "Java", icon: asset("assets/java-logo.png"), alt: "Java icon" },
                    { name: "Python", icon: asset("assets/python-logo.png"), alt: "Python icon" },
                    { name: "Dart(Flutter)", icon: asset("assets/flutter-logo.jpg"), alt: "Dart and Flutter icon" },
                ],
                },
                {
                label: "DATABASE",
                dur: "22s",
                items: [
                    { name: "MySQL", icon: asset("assets/mysql-logo.png"), alt: "MySQL icon" },
                    { name: "Firebase", icon: asset("assets/firebase-logo.svg"), alt: "Firebase icon" },
                ],
                },
                {
                label: "TOOLS",
                dur: "18s",
                items: [
                    { name: "Git", icon: asset("assets/git-logo.png"), alt: "Git icon" },
                    { name: "GitHub", icon: asset("assets/github-logohome.png"), alt: "GitHub icon" },
                ],
                },
            ] as const
            ).map((row) => {
            const minChips = 14;
            const repeat = Math.max(6, Math.ceil(minChips / row.items.length));
            const loopItems = Array.from(
                { length: row.items.length * repeat },
                (_, i) => row.items[i % row.items.length]
            );

            return (
                <div className="skills-row" key={row.label}>
                <div className="skills-label" aria-hidden="true">
                    {row.label}
                </div>

                <div
                    className="marquee"
                    aria-label={`${row.label} skills scrolling list`}
                    style={{ ["--dur" as any]: row.dur }}
                >
                    <div className="track">
                    {/* set A */}
                    {loopItems.map((it, idx) => (
                        <span className="chip" key={`${row.label}-${it.name}-${idx}`}>
                        <img className="chip-icon-skill" src={it.icon} alt={it.alt} />
                        <span className="chip-text">{it.name}</span>
                        </span>
                    ))}

                    {/* set B (aria-hidden) */}
                    {loopItems.map((it, idx) => (
                        <span className="chip" aria-hidden="true" key={`${row.label}-dup-${it.name}-${idx}`}>
                        <img className="chip-icon-skill" src={it.icon} alt="" />
                        <span className="chip-text">{it.name}</span>
                        </span>
                    ))}
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        </section>

      <section id="projects" className="section projects">
        <div className="section-head">
          <h2 className="h2">Projects</h2>
        </div>

        <div className="timeline">
          <div className="timeline-rail" aria-hidden="true" />

          {projects.map((p) => (
            <article className="t-item" data-reveal key={`${p.title}-${p.period}`}>
              <div className="t-dot" aria-hidden="true" />

              <div className="t-card">
                <header className="t-top">
                  <div className="t-head">
                    <h3 className="t-title">{p.title}</h3>
                    <div className="t-meta" aria-label="Role and stack">
                      <span>{p.role}</span>
                      <span className="t-sep" aria-hidden="true">•</span>
                      <span>{p.stack}</span>
                    </div>
                  </div>
                  <div className="t-period">{p.period}</div>
                </header>

                <div className="t-body">
                  <ul className="t-bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                <footer className="t-foot" aria-label="Project links and tags">
                  <div className="t-tags" aria-label="Tech stack tags">
                    {p.stack.split("·").map((s) => {
                      const tag = s.trim();
                      return (
                        <span className="t-tag" key={`${p.title}-${tag}`}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="section-head">
          <h2 className="h2">Contact</h2>
        </div>

        <div className="contact-grid">
          <form className="form" action="#sent" method="get">
            <label className="field" htmlFor="contact-name">
              <span className="label">Name</span>
              <input id="contact-name" className="input" type="text" name="name" autoComplete="name" required />
            </label>

            <label className="field" htmlFor="contact-email">
              <span className="label">Email</span>
              <input id="contact-email" className="input" type="email" name="email" autoComplete="email" required />
            </label>

            <label className="field" htmlFor="contact-message">
              <span className="label">Message</span>
              <textarea id="contact-message" className="input area" name="message" rows={5} required />
            </label>

            <button className="btn1" type="submit">Send</button>
          </form>

          <aside className="social-card" aria-label="Social links">
            <h3 className="h3 social-title">Find me online</h3>
            <p className="p social-sub">Links to my profiles and contact methods.</p>

            <div className="social-group">
              <p className="social-label">Primary</p>
              <div className="social-chips">
                <a className="social-chip" href="http://www.linkedin.com/in/shun-hsin-hou-9811092ab" target="_blank" rel="noopener">
                  <img className="chip-icon" src={asset("assets/linkedin-logo.png")} alt="LinkedIn" />
                  <span className="chip-text">LinkedIn</span>
                </a>

                <a className="social-chip" href="https://github.com/allison-hou" target="_blank" rel="noopener">
                  <img className="chip-icon" src={asset("assets/github-logo.png")} alt="GitHub" />
                  <span className="chip-text">GitHub</span>
                </a>

                <a className="social-chip" href="mailto:shunhsih@uci.edu">
                  <img className="chip-icon" src={asset("assets/gmail-logo.jpg")} alt="Gmail" />
                  <span className="chip-text">Email</span>
                </a>

                <a className="social-chip" href="https://www.instagram.com/ethereal__alliephoto" target="_blank" rel="noopener">
                  <img className="chip-icon" src={asset("assets/ig-logo.jpg")} alt="Instagram" />
                  <span className="chip-text">Instagram</span>
                </a>

                <a className="social-chip" href="https://pin.it/75JJ9DoY8" target="_blank" rel="noopener">
                  <img className="chip-icon" src={asset("assets/pinterest-logo.avif")} alt="Pinterest" />
                  <span className="chip-text">Pinterest</span>
                </a>
              </div>
            </div>

            <div className="social-group">
              <p className="social-label">Docs</p>
              <div className="social-chips">
              <a className="social-chip" href={asset("assets/resume.pdf")} target="_blank" rel="noopener">CV</a>
              </div>
            </div>
          </aside>
        </div>

        <section id="sent" className="overlay" aria-label="Message sent confirmation" role="dialog" aria-modal="true">
          <a className="overlay-backdrop" href="#contact" aria-label="Close confirmation" />

          <div className="overlay-card" role="document">
            <h3 className="h3 overlay-title">Message sent successfully!!!</h3>
            <p className="p overlay-text">
              Thank you for reaching out~
              <br />
              Will get back to you soon!
            </p>
            <div className="overlay-actions">
              <a className="btn1 overlay-btn" href="#contact">Close</a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}