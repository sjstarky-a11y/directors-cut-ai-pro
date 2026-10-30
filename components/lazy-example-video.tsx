"use client";

import { useEffect, useRef, useState } from "react";

type LazyExampleVideoProps = {
  slug: string;
  title: string;
  width: number;
  height: number;
};

export default function LazyExampleVideo({ slug, title, width, height }: LazyExampleVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const videoPath = `/video-studio/${slug}.mp4`;
  const posterPath = `/video-studio/${slug}.webp`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ aspectRatio: `${width} / ${height}` }}>
      {isNearViewport ? (
        <video controls playsInline preload="none" poster={posterPath} width={width} height={height}
          aria-label={title} aria-describedby={`${slug}-description`} className="block h-auto w-full">
          <source src={videoPath} type="video/mp4" />
          Your browser does not support video playback. <a href={videoPath}>Open the video</a>.
        </video>
      ) : (
        // The poster reserves the same space while the player is outside the viewport.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={posterPath} alt="" aria-hidden="true" width={width} height={height}
          loading="lazy" decoding="async" className="block h-auto w-full" />
      )}
    </div>
  );
}
