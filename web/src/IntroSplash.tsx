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

function splitNameToTwoLines(raw: string) {
  const parts = (raw || "").trim().split(/\s+/).filter(Boolean);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ");
  return { first, last };
}

export default function IntroSplash({
  name = "ALLISON HOU",
  onDone,
}: IntroSplashProps) {
  const [out, setOut] = useState(false);

  const { first, last } = useMemo(() => splitNameToTwoLines(name), [name]);
  const firstChars = useMemo(() => first.split("").map((ch, i) => ({ ch, i })), [first]);
  const lastChars = useMemo(
    () => last.split("").map((ch, i) => ({ ch, i })),
    [last]
  );

  const totalChars = useMemo(() => firstChars.length + lastChars.length, [firstChars.length, lastChars.length]);

  const fx = useMemo<LetterFx[]>(
    () =>
      Array.from({ length: totalChars }).map((_, i) => {
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
    [totalChars]
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

  const renderRow = (items: Array<{ ch: string; i: number }>, globalOffset: number) => {
    return items.map(({ ch, i }) => {
      const isSpace = ch === " ";

      const globalIndex = globalOffset + i;
      const d = `${globalIndex * 35}ms`;
      const { sx, sy, rz } = fx[globalIndex] ?? { sx: 0, sy: 0, rz: 0 };

      const styleVars = {
        ["--d" as any]: d,
        ["--sx" as any]: `${sx}px`,
        ["--sy" as any]: `${sy}px`,
        ["--rz" as any]: `${rz}deg`,
      } as React.CSSProperties;

      return (
        <span
          key={`${ch}-${globalIndex}`}
          className={`intro-letter ${isSpace ? "is-space" : ""}`}
          style={styleVars}
        >
          {isSpace ? "\u00A0" : ch}
        </span>
      );
    });
  };

  const LAST_OFFSET = firstChars.length + 2;

  return (
    <div className={`intro ${out ? "is-out" : ""}`}>
      <div className="intro-stage">
        <div className="intro-name" aria-label={name}>
          <div className="intro-row intro-row--first">{renderRow(firstChars, 0)}</div>
          {last.trim().length > 0 ? (
            <div className="intro-row intro-row--last">{renderRow(lastChars, LAST_OFFSET)}</div>
          ) : null}
        </div>

        <div className="intro-sub">Loading portfolio…</div>
      </div>
    </div>
  );
}
