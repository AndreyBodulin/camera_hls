import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

interface HLSVideoProps {
  src: string;
  controls?: boolean;
  width?: number | string;
}

const HLSVideo: React.FC<HLSVideoProps> = ({
  src,
  controls = false,
  width = "600px",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    console.log(video);
    let hls: Hls | null = null;

    if (video) {
      if (Hls.isSupported()) {
        hls = new Hls();
        console.log("create hls");
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
    <video ref={videoRef} controls={controls} width={width} autoPlay>
      Your browser does not support the video tag.
    </video>
  );
};

export default HLSVideo;
