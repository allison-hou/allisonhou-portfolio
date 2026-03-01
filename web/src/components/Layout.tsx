import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Background from "./Background";
import { asset } from "../utils/asset";

type ActiveKey = "home" | "projects" | "contact";

export default function Layout() {
  const location = useLocation();
  const [active, setActive] = useState<ActiveKey>("home");
  const base = useMemo(() => asset(""), []);

  const lockRef = useRef(false);
  const lock = () => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 350);
  };

  useEffect(() => {
    const h = (location.hash || "").replace("#", "");
    if (h === "projects" || h === "contact") setActive(h);
    else setActive("home");
  }, [location.hash]);

  useEffect(() => {
    const sections: Array<{ key: ActiveKey; id: string }> = [
      { key: "home", id: "home" },
      { key: "projects", id: "projects" },
      { key: "contact", id: "contact" },
    ];

    const nodes = sections
      .map((s) => ({ ...s, el: document.getElementById(s.id) }))
      .filter((x): x is { key: ActiveKey; id: string; el: HTMLElement } => !!x.el);

    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({ id: (e.target as HTMLElement).id, ratio: e.intersectionRatio }))
          .sort((a, b) => b.ratio - a.ratio)[0];

        if (!visible) {
          setActive("home");
          return;
        }

        if (visible.id === "projects") setActive("projects");
        else if (visible.id === "contact") setActive("contact");
        else setActive("home");
      },
      {
        root: null,
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.7],
      }
    );

    nodes.forEach((n) => io.observe(n.el));
    return () => io.disconnect();
  }, []);

  const isCurrent = (k: ActiveKey) => (active === k ? "page" : undefined);

  return (
    <div className="app-root">
      <Background />

      <header className="topbar">
        <nav className="navwrap" aria-label="Primary">
          <ul className="navlist">
            <li>
              <a className="navlink" href={`${base}#home`} aria-current={isCurrent("home")} onClick={lock}>
                Home
              </a>
            </li>
            <li>
              <a className="navlink" href={`${base}#projects`} aria-current={isCurrent("projects")} onClick={lock}>
                Projects
              </a>
            </li>
            <li>
              <a className="navlink" href={`${base}#contact`} aria-current={isCurrent("contact")} onClick={lock}>
                Contact
              </a>
            </li>
          </ul>

          <a className="navlink cta navlink--action" href={asset("assets/resume.pdf")} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="footer">
        <small>© 2026 Allison Hou</small>
      </footer>
    </div>
  );
}