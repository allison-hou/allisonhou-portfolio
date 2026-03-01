import { useEffect, useMemo, useState } from "react";

const ASSEMBLE_MS = 900;
const HOLD_MS = 900;
const FADE_MS = 520;

type IntroSplashProps = {
  name?: string;
  onDone: () => void;
};

type LetterFx = {
  sx: number;
  sy: number;
  rz: number;
};

export default function IntroSplash({
  name = "ALLISON HOU",
  onDone,
}: IntroSplashProps) {
  const [out, setOut] = useState(false);

  const letters = useMemo(
    () => name.split("").map((ch, i) => ({ ch, i })),
    [name]
  );

  const fx = useMemo<LetterFx[]>(
    () =>
      name.split("").map((_, i) => {
        const side = i % 4;

        const sx =
          side === 1
            ? 520
            : side === 3
            ? -520
            : Math.round(Math.random() * 320 - 160);

        const sy =
          side === 0
            ? -320
            : side === 2
            ? 320
            : Math.round(Math.random() * 200 - 100);

        const rz = Math.round(Math.random() * 24 - 12);

        return { sx, sy, rz };
      }),
    [name]
  );

  useEffect(() => {
    const t1 = window.setTimeout(() => setOut(true), ASSEMBLE_MS + HOLD_MS);
    const t2 = window.setTimeout(
      () => onDone(),
      ASSEMBLE_MS + HOLD_MS + FADE_MS
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className={`intro ${out ? "is-out" : ""}`}>
      <div className="intro-stage">
        <div className="intro-name" aria-label={name}>
          {letters.map(({ ch, i }) => {
            const isSpace = ch === " ";
            const d = `${i * 35}ms`;
            const { sx, sy, rz } = fx[i] ?? { sx: 0, sy: 0, rz: 0 };

            const styleVars = {
              ["--d" as any]: d,
              ["--sx" as any]: `${sx}px`,
              ["--sy" as any]: `${sy}px`,
              ["--rz" as any]: `${rz}deg`,
            } as React.CSSProperties;

            return (
              <span
                key={`${ch}-${i}`}
                className={`intro-letter ${isSpace ? "is-space" : ""}`}
                style={styleVars}
              >
                {isSpace ? "\u00A0" : ch}
              </span>
            );
          })}
        </div>

        <div className="intro-sub">Loading portfolio…</div>
      </div>
    </div>
  );
}
