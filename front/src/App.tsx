import React, { useState } from "react";
import HLSVideo from "./components/HLSVideo/HLSVideo";
import { Header } from "./components/header/Header";
import { useEffect } from "react";
import styles from "./index.module.scss";
import { Cam } from "./components/cam/Cam";
import { Spinner } from "./components/Spinner";
import { CamData } from "./types/common";
import { SendActiveCameraResponse } from "./types/api/send-active-camera";

function App() {
  const [cams, setCams] = useState<CamData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const [checkedCam, setCheckedCam] = useState<string[]>([]);
  const [streamUrl, setStreamUrl] = useState<string>("");
  const isShownVideo = Boolean(streamUrl) && !isLoadingStream;

  const handleCheck = (rtsp: string) => {
    if (checkedCam.includes(rtsp)) {
      setCheckedCam(checkedCam.filter((cam) => cam !== rtsp));
    } else {
      setCheckedCam([...checkedCam, rtsp]);
    }
  };

  const handleButtonClick = async () => {
    try {
      setIsLoadingStream(true);

      const response = await fetch("http://localhost:3010/quad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cams: checkedCam }),
      });

      const { data, message }: SendActiveCameraResponse = await response.json();
      if (message) {
        alert(message);
      }
      setStreamUrl(data.streamUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingStream(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const req = await fetch("http://localhost:3010/");
        const data = await req.json();

        setCams(Object.values(data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  console.log(checkedCam);

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {cams.map((cam) => (
            <Cam
              key={cam.name}
              rtsp={cam.rtsp}
              name={cam.name}
              onCheck={handleCheck}
            />
          ))}
          <button onClick={handleButtonClick}>Построить квадатор</button>
        </div>
        {isLoadingStream && <Spinner />}
        {isShownVideo && (
          <HLSVideo src={streamUrl} controls={true} width={"480px"} />
        )}
      </div>
    </div>
  );
}

export default App;
