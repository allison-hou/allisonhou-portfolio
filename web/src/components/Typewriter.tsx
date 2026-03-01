import { useEffect, useMemo, useState } from "react";

type Props = {
  words?: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  loop?: boolean;
  className?: string;
};

export default function Typewriter({
  words,
  typeMs = 55,
  deleteMs = 35,
  holdMs = 900,
  loop = true,
  className,
}: Props) {
  const list = useMemo(
    () =>
      words?.length
        ? words
        : ["Front-end Engineer", "App Developer", "Web Developer", "UI/UX Designer"],
    [words]
  );

  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [mode, setMode] = useState<"type" | "hold" | "delete">("type");

  useEffect(() => {
    const word = list[i] ?? "";
    let t: number | undefined;

    if (mode === "type") {
      if (txt.length < word.length) {
        t = window.setTimeout(() => setTxt(word.slice(0, txt.length + 1)), typeMs);
      } else {
        setMode("hold");
      }
    } else if (mode === "hold") {
      t = window.setTimeout(() => setMode("delete"), holdMs);
    } else {
      if (txt.length > 0) {
        t = window.setTimeout(() => setTxt(word.slice(0, txt.length - 1)), deleteMs);
      } else {
        const next = i + 1;
        const atEnd = next >= list.length;
        if (!loop && atEnd) return;
        setI(atEnd ? 0 : next);
        setMode("type");
      }
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [deleteMs, holdMs, i, list, loop, mode, txt, typeMs]);

  return (
    <span className={className} aria-label="Rotating roles">
      <span>{txt}</span>
      <span className="tw-caret" aria-hidden="true">
        |
      </span>
    </span>
  );
}