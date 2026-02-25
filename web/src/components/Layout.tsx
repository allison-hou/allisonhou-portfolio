import { Outlet } from "react-router-dom";
import Background from "./Background";

export default function Layout() {
  return (
    <div className="app-root">
      <Background />

      <header className="topbar">
        <nav className="navwrap" aria-label="Primary">
          <ul className="navlist">
            <li>
              <a className="navlink" href="/" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a className="navlink" href="/projects">
                Selected Work
              </a>
            </li>
            <li>
              <a className="navlink" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <a className="navlink cta" href="/assets/resume.pdf">
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