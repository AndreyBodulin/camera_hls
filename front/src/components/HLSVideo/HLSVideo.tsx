import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import styles from "./index.module.scss";

interface HLSVideoProps {
  src: string;
  controls?: boolean;
}

const HLSVideo: React.FC<HLSVideoProps> = ({ src, controls = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    let hls: Hls | null = null;

    if (video) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video className={styles.video} ref={videoRef} controls={controls} autoPlay>
      Your browser does not support the video tag.
    </video>
  );
};

export default HLSVideo;
