import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);

    const onResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const N = 160;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      v: Math.random() * 0.4 + 0.2,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x += s.v * s.z;
        s.y -= s.v * 0.2;
        if (s.x > w || s.y < 0) {
          s.x = Math.random() * w * 0.1;
          s.y = h * (0.7 + Math.random() * 0.3);
        }
        ctx.fillStyle = "rgba(255,255,255,.85)";
        ctx.fillRect(s.x, s.y, 1.2 * s.z, 1.2 * s.z);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas className="galaxy-starfield" ref={ref} />;
}
