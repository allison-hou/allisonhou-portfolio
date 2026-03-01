import { useEffect, useMemo, useRef } from "react";
import { asset } from "../utils/asset";
import Typewriter from "../components/Typewriter";

type Project = {
  title: string;
  role: string;
  stack: string;
  period: string;
  bullets: string[];
};

const ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 23.5h3.98V7.98H.5V23.5ZM8.5 7.98h3.82v2.12h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.09v9.37h-3.98v-8.31c0-1.98-.04-4.52-2.75-4.52-2.76 0-3.18 2.15-3.18 4.38v8.45H8.5V7.98Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.62.75 12.1c0 5.2 3.44 9.61 8.2 11.17.6.11.82-.27.82-.6v-2.2c-3.34.75-4.04-1.45-4.04-1.45-.55-1.45-1.35-1.84-1.35-1.84-1.1-.78.08-.77.08-.77 1.22.09 1.86 1.3 1.86 1.3 1.08 1.92 2.84 1.37 3.53 1.05.11-.81.42-1.37.76-1.68-2.66-.31-5.46-1.37-5.46-6.09 0-1.34.46-2.43 1.22-3.29-.12-.31-.53-1.57.12-3.27 0 0 1-.33 3.3 1.26.96-.28 1.99-.42 3.01-.43 1.02.01 2.05.15 3.01.43 2.3-1.59 3.3-1.26 3.3-1.26.65 1.7.24 2.96.12 3.27.76.86 1.22 1.95 1.22 3.29 0 4.73-2.8 5.77-5.47 6.08.43.39.81 1.15.81 2.32v3.44c0 .33.22.72.82.6 4.76-1.56 8.2-5.97 8.2-11.17C23.25 5.62 18.27.5 12 .5Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4.2-8 5.2-8-5.2V6l8 5.2L20 6v2.2Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.07 1.5C6.52 1.5 3 5.1 3 9.85c0 3.13 1.76 4.92 2.81 4.92.44 0 .7-1.24.7-1.59 0-.42-1.12-1.38-1.12-3.21 0-3.9 2.93-6.64 6.8-6.64 3.31 0 5.76 1.89 5.76 5.36 0 2.6-1.04 7.48-4.43 7.48-1.23 0-2.28-1-1.97-2.25.37-1.5 1.1-3.12 1.1-4.7 0-1.09-.59-2-1.8-2-1.43 0-2.58 1.48-2.58 3.46 0 1.26.42 2.11.42 2.11l-1.7 7.2c-.5 2.12-.07 4.71-.03 4.97.02.16.23.2.33.08.14-.18 1.96-2.43 2.58-4.48.18-.58 1.02-3.74 1.02-3.74.53 1.02 2.09 1.92 3.74 1.92 4.92 0 7.4-4.58 7.4-9.87C22.93 5.45 18.37 1.5 12.07 1.5Z" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.82 15.12a.75.75 0 0 1-1.03.25c-2.83-1.73-6.4-2.12-10.6-1.16a.75.75 0 1 1-.33-1.47c4.6-1.05 8.55-.61 11.7 1.32.35.21.46.68.26 1.06Zm1.47-3.28a.9.9 0 0 1-1.24.3c-3.24-1.99-8.18-2.57-12.02-1.4a.9.9 0 1 1-.52-1.72c4.28-1.3 9.6-.65 13.25 1.6.42.26.55.82.3 1.22Zm.12-3.42c-3.88-2.3-10.3-2.51-14.01-1.38a1.05 1.05 0 1 1-.61-2.01c4.26-1.29 11.36-1.04 15.86 1.62a1.05 1.05 0 0 1-1.24 1.77Z" />
    </svg>
  ),
} as const;

type OnlineLink = {
  label: string;
  href: string;
  icon: keyof typeof ICONS;
};

// SVG Data URI helpers for skill icons
const svgDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const ANDROID_STUDIO_SVG = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3ddc84"/>
      <stop offset="1" stop-color="#1a8f5a"/>
    </linearGradient>
  </defs>
  <path fill="url(#g)" d="M12 2.6c-4.97 0-9 4.03-9 9 0 3.7 2.24 6.88 5.44 8.27.4.17.56.63.35 1.01l-.8 1.45c-.2.36.06.81.47.81h7.08c.41 0 .67-.45.47-.81l-.8-1.45a.78.78 0 0 1 .35-1.01A9.01 9.01 0 0 0 21 11.6c0-4.97-4.03-9-9-9Z"/>
  <path fill="#0b2b1c" opacity=".25" d="M7.1 9.3c1.2-2.2 3.6-3.7 5.9-3.7s4.7 1.5 5.9 3.7c.3.6 0 1.3-.7 1.5l-1.6.5a.9.9 0 0 1-1.1-.5c-.7-1.3-1.9-2.1-2.5-2.1s-1.8.8-2.5 2.1a.9.9 0 0 1-1.1.5l-1.6-.5c-.7-.2-1-.9-.7-1.5Z"/>
  <circle cx="9.2" cy="12" r="1.15" fill="#ffffff"/>
  <circle cx="14.8" cy="12" r="1.15" fill="#ffffff"/>
  <path fill="#ffffff" d="M9.1 6.2 7.3 4.4a.8.8 0 0 1 1.1-1.1l1.8 1.8a.8.8 0 1 1-1.1 1.1Zm5.8 0a.8.8 0 0 1 0-1.1l1.8-1.8a.8.8 0 0 1 1.1 1.1l-1.8 1.8a.8.8 0 0 1-1.1 0Z"/>
  <path fill="#ffffff" opacity=".95" d="M8.2 18.4h7.6a.9.9 0 0 1 .9.9v.1a2.8 2.8 0 0 1-2.8 2.8H10.1a2.8 2.8 0 0 1-2.8-2.8v-.1a.9.9 0 0 1 .9-.9Z"/>
</svg>
`);

const BOOTSTRAP_SVG = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7a3ff2"/>
      <stop offset="1" stop-color="#5a2bd6"/>
    </linearGradient>
  </defs>
  <path fill="url(#b)" d="M6.2 2.8h11.6c1.9 0 3.4 1.5 3.4 3.4v11.6c0 1.9-1.5 3.4-3.4 3.4H6.2c-1.9 0-3.4-1.5-3.4-3.4V6.2c0-1.9 1.5-3.4 3.4-3.4Z"/>
  <path fill="#ffffff" d="M8 7.3h4.9c2 0 3.4 1.1 3.4 2.9 0 1.2-.6 2.1-1.6 2.5v.1c1.3.3 2 1.3 2 2.8 0 2.1-1.6 3.3-3.9 3.3H8V7.3Zm4.6 5c1 0 1.6-.5 1.6-1.4 0-.9-.6-1.3-1.6-1.3H10v2.7h2.6Zm.3 6.3c1.2 0 1.9-.6 1.9-1.6 0-1-.7-1.6-1.9-1.6H10v3.2h2.9Z"/>
</svg>
`);

const onlineLinks: OnlineLink[] = [
  { label: "LinkedIn", href: "http://www.linkedin.com/in/shun-hsin-hou-9811092ab", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/allison-hou", icon: "github" },
  { label: "Email", href: "mailto:shunhsih@uci.edu", icon: "mail" },
  { label: "Instagram", href: "https://www.instagram.com/ethereal__alliephoto", icon: "instagram" },
  { label: "Pinterest", href: "https://pin.it/75JJ9DoY8", icon: "pinterest" },
  { label: "Spotify", href: "https://open.spotify.com/user/31ckjihzcgvpscjor36yngs53wdi?si=OhoajP4XSlmSLVy_FGOaKw", icon: "spotify" },
];

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
          "Led a cross-functional team as primary technical owner, driving end-to-end development and system integration of a cross-platform mobile app for health-aware senior travel",
          "Designed and implemented core app architecture, major features, and user interaction flows using Flutter",
          "Coordinated and integrated Firebase backend services, aligning frontend flows with authentication and user data management",
          "Led system-level integration of AI-driven itinerary generation via OpenAI API and real-time location-based services via Google Maps API",
          "Directed task planning, progress tracking, and technical decision-making to deliver a competition-ready product",
        ],
      },
      {
        title: "Ticket Booking System",
        role: "Full Stack Developer",
        stack: "Java · Spring Boot · MySQL · REST API",
        period: "Oct 2024 – Dec 2024",
        bullets: [
          "Developed a full-stack ticket booking system supporting event discovery, booking, and refund workflows",
          "Implemented frontend components and backend services using Spring Boot",
          "Utilized a database-driven approach to dynamically fetch, filter, and sort store listings based on user criteria",
          "Integrated RESTful APIs and used GitHub for version control and team collaboration",
        ],
      },
      {
        title: "Campus Food Finder",
        role: "Front-end Developer",
        stack: "Bootstrap · HTML · CSS · JavaScript · PHP",
        period: "Feb 2024 – Jun 2024",
        bullets: [
          "Implemented a full authentication system to manage user sessions and provided a personalized experience",
          "Built database-driven approach to dynamically fetch, filter, and sort store listings based on user criteria",
          "Designed a responsive, interactive layout using Bootstrap’s grid system and JavaScript DOM manipulation to ensure seamless usability across devices",
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
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ids = ["home", "projects", "contact"] as const;

    const getTargets = () =>
      ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

const NAV_IDS = ["home", "projects", "contact"] as const;
const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

const findTopbarRoot = () => {
  const all = Array.from(document.querySelectorAll<HTMLElement>("a, button"));
  const labeled = all.filter((el) => {
    const t = norm(el.textContent || "");
    return (NAV_IDS as readonly string[]).includes(t);
  });
  if (labeled.length === 0) return null;

  const ancestorsOf = (el: HTMLElement) => {
    const out: HTMLElement[] = [];
    let p = el.parentElement;
    while (p) {
      out.push(p);
      p = p.parentElement;
    }
    return out;
  };

  const seed = labeled[0];
  const chain = [seed, ...ancestorsOf(seed)];
  for (const root of chain) {
    const items = Array.from(root.querySelectorAll<HTMLElement>("a, button"));
    const labels = new Set(items.map((x) => norm(x.textContent || "")));
    const ok = NAV_IDS.every((id) => labels.has(id));
    if (ok) return root;
  }

  return seed.parentElement;
};

let cachedTopbarRoot: HTMLElement | null = null;
const getNavItems = () => {
  if (!cachedTopbarRoot) cachedTopbarRoot = findTopbarRoot();
  const root = cachedTopbarRoot;
  if (!root) return [] as HTMLElement[];
  return Array.from(root.querySelectorAll<HTMLElement>("a, button"));
};

    const pickScroller = () => {
      const root = rootRef.current;
      if (root) {
        const style = window.getComputedStyle(root);
        const overflowY = style.overflowY;
        const isScrollable = (overflowY === "auto" || overflowY === "scroll") && root.scrollHeight > root.clientHeight;
        if (isScrollable) return root;
      }
      return (document.scrollingElement as HTMLElement) || document.documentElement;
    };

    const matchNavItemTo = (el: HTMLElement, activeId: (typeof ids)[number]) => {
      const href = el.getAttribute("href") || "";
      const dt: any = (el as any).dataset || {};
      const target = dt.target || dt.scroll || dt.nav || dt.section || "";
      const text = (el.textContent || "").trim().toLowerCase();

      const matchesHref = href === `#${activeId}`;
      const matchesData = target === activeId || target === `#${activeId}`;
      const matchesText = text === activeId || text === activeId.replace(/^[a-z]/, (c) => c);

      const labelMap: Record<(typeof ids)[number], string> = {
        home: "home",
        projects: "projects",
        contact: "contact",
      };
      const matchesLabel = text === labelMap[activeId];

      return matchesHref || matchesData || matchesText || matchesLabel;
    };

    const setActive = (activeId: (typeof ids)[number]) => {
      const items = getNavItems();

      for (const el of items) {
        el.classList.remove("active", "is-active", "current");
        if (el.getAttribute("aria-current") === "page") el.removeAttribute("aria-current");

        if (matchNavItemTo(el, activeId)) {
          el.classList.add("active");
          el.setAttribute("aria-current", "page");
        }
      }
    };

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Initial sync
    setActive("home");

    const targets = getTargets();
    if (targets.length === 0) return;

    const scroller = pickScroller();

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.filter((e) => e.isIntersecting);
        if (inView.length === 0) return;

        inView.sort((a, b) => {
          const aTop = (a.target as HTMLElement).getBoundingClientRect().top;
          const bTop = (b.target as HTMLElement).getBoundingClientRect().top;
          const anchor = window.innerHeight * 0.35;
          return Math.abs(aTop - anchor) - Math.abs(bTop - anchor);
        });

        const id = (inView[0].target as HTMLElement).id as (typeof ids)[number];
        if (id) setActive(id);
      },
      {
        threshold: 0,
        root: scroller === document.documentElement ? null : scroller,
        rootMargin: "-45% 0px -55% 0px",
      }
    );

    targets.forEach((t) => io.observe(t));

    const onScroll = () => {
      const el = scroller;
      const scrollTop = el === document.documentElement ? window.scrollY : el.scrollTop;
      const clientH = el === document.documentElement ? window.innerHeight : el.clientHeight;
      const scrollH = el.scrollHeight;

      const atBottom = Math.ceil(scrollTop + clientH) >= scrollH - 2;
      if (atBottom) setActive("contact");
    };

    const scrollTarget: any = scroller === document.documentElement ? window : scroller;
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });

    if (prefersReduced) onScroll();

    return () => {
      io.disconnect();
      scrollTarget.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div id="main" className="page" ref={rootRef}>
      <section id="home" className="hero hero-v2">
        <div className="hero-card" data-reveal>
          <div className="hero-copy" data-reveal>
            <h1 className="title" data-reveal>
              Allison Hou
            </h1>
            <h2 className="type-line" data-reveal>
              <Typewriter />
            </h2>
            <p className="desc" data-reveal>
              Hi! I'm a Information Management senior student who loves building things from the ground up (and
              sometimes breaking them for science). I’m always tinkering with new web tech and side projects. Frontend
              is my playground! I'm obsessed with those little details that make users smile. I design UI that actually
              works (and yes, looks good too).
            </p>
          </div>

          <div className="hero-media" aria-label="Portrait" data-reveal>
            <img
              src={asset("assets/portrait.jpg")}
              alt="Portrait photo of Allison Hou"
              className="hero-photo"
              loading="eager"
            />
            <div className="hero-badge" data-reveal>
              Irvine, CA · Taipei, Taiwan
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-head" data-reveal>
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
                  { name: "Bootstrap", icon: BOOTSTRAP_SVG, alt: "Bootstrap icon" },
                  { name: "JavaScript", icon: asset("assets/javascript-logo.png"), alt: "JavaScript icon" },
                  { name: "Dart(Flutter)", icon: asset("assets/flutter-logo.jpg"), alt: "Dart and Flutter icon" },
                ],
              },
              {
                label: "BACKEND",
                dur: "20s",
                items: [
                  { name: "Java", icon: asset("assets/java-logo.png"), alt: "Java icon" },
                  { name: "Python", icon: asset("assets/python-logo.png"), alt: "Python icon" },
                  { name: "Spring Boot", icon: asset("assets/springboot.svg"), alt: "Spring Boot icon" },
                  { name: "C", icon: asset("assets/c.svg"), alt: "C icon" },
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
                  { name: "Figma", icon: asset("assets/figma.svg"), alt: "Figma icon" },
                  { name: "Android Studio", icon: ANDROID_STUDIO_SVG, alt: "Android Studio icon" },
                ],
              },
            ] as const
          ).map((row) => {
            const minChips = 14;
            const repeat = Math.max(6, Math.ceil(minChips / row.items.length));
            const loopItems = Array.from({ length: row.items.length * repeat }, (_, i) => row.items[i % row.items.length]);

            return (
              <div className="skills-row" key={row.label} data-reveal>
                <div className="skills-label" aria-hidden="true">
                  {row.label}
                </div>

                <div className="marquee" aria-label={`${row.label} skills scrolling list`} style={{ ["--dur" as any]: row.dur }}>
                  <div className="track">
                    {loopItems.map((it, idx) => (
                      <span className="chip" key={`${row.label}-${it.name}-${idx}`}>
                        <img className="chip-icon-skill" src={it.icon} alt={it.alt} />
                        <span className="chip-text">{it.name}</span>
                      </span>
                    ))}

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
        <div className="section-head" data-reveal>
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
                    <div className="t-meta" aria-label="Role">
                      <span>{p.role}</span>
                      <span className="t-sep" aria-hidden="true">
                        •
                      </span>
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
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="section-head" data-reveal>
          <h2 className="h2" data-reveal>
            Contact
          </h2>
        </div>

        <div className="contact-grid" data-reveal>
          <section className="contact-card" aria-label="Contact form" data-reveal>
            <header className="contact-card__head">
              <h3 className="h3 contact-card__title">Contact Me</h3>
            </header>

            <form className="contact-form" action="https://formspree.io/f/xgolqqvj" method="POST">
              <input type="hidden" name="_subject" value="Portfolio Contact Form" />

              <div className="contact-form__grid">
                <label className="field" htmlFor="contact-name">
                  <span className="label">Name</span>
                  <input id="contact-name" className="input input--glass" type="text" name="name" autoComplete="name" required />
                </label>

                <label className="field" htmlFor="contact-email">
                  <span className="label">Email</span>
                  <input id="contact-email" className="input input--glass" type="email" name="_replyto" autoComplete="email" required />
                </label>

                <label className="field field--full" htmlFor="contact-message">
                  <span className="label">Message</span>
                  <textarea id="contact-message" className="input input--glass area" name="message" rows={6} required />
                </label>
              </div>

              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <div className="contact-form__footer">
                <button className="btn1 contact-submit" type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </section>

          <aside className="online-card" aria-label="Social links" data-reveal>
            <header className="online-card__head">
              <h3 className="h3">Find me online</h3>
              <p className="p">Links to my profiles and contact methods.</p>
            </header>

            <div className="online-grid">
              {onlineLinks.map((x) => (
                <a key={x.label} className="online-chip" href={x.href} target="_blank" rel="noopener">
                  <span className="chip-icon" aria-hidden="true">
                    {ICONS[x.icon]}
                  </span>
                  <span className="chip-text">{x.label}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}