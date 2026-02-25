import { useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    return () => {};
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <MeshGradient
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
        speed={0.3}
      />
      <MeshGradient
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.6,
        }}
        colors={["#000000", "#ffffff", "#8b5cf6", "#000000"]}
        speed={0.2}
      />
    </div>
  );
}