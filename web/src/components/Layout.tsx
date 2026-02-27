import { Outlet, Link } from "react-router-dom";
import Background from "./Background";
import { asset } from "../utils/asset";

export default function Layout() {
  return (
    <div className="app-root">
      <Background />

      <header className="topbar">
        <nav className="navwrap" aria-label="Primary">
          <ul className="navlist">
            <li>
              <Link className="navlink" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="navlink" to="/projects">
                Selected Work
              </Link>
            </li>
            <li>
              <a className="navlink" href="#contact">
                Contact
              </a>
            </li>
          </ul>

          <a
            className="navlink cta"
            href={asset("assets/resume.pdf")}
            target="_blank"
            rel="noopener"
          >
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