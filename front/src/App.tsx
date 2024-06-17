import React, { useState } from "react";
import HLSVideo from "./components/HLSVideo/HLSVideo";
import { Header } from "./components/header/Header";
import { useEffect } from "react";
import { Cam } from "./components/cam/Cam";
import { CamData } from "./types/common";
import { SendActiveCameraResponse } from "./types/api/send-active-camera";
import { Button, Spin, notification } from "antd";
import styles from "./index.module.scss";

enum NotificationType {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

function App() {
  const [cams, setCams] = useState<CamData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const [checkedCam, setCheckedCam] = useState<string[]>([]);
  const [streamUrl, setStreamUrl] = useState<string>("");
  const isShownVideo = Boolean(streamUrl) && !isLoadingStream;

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

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

      setStreamUrl(data.streamUrl);
      openNotification(
        NotificationType.success,
        "Выполненно",
        "Данные о камерах успешно получены"
      );
    } catch (error) {
      openNotification(
        NotificationType.error,
        "Ошибка",
        "Не удалось получить данные о камерах"
      );
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
    return <Spin className={styles.initialSpinner} size="large" />;
  }

  return (
    <>
      {contextHolder}

      <div className={styles.container}>
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2 className={styles.title}>Список камер</h2>
            {cams.map((cam) => (
              <Cam
                key={cam.name}
                rtsp={cam.rtsp}
                name={cam.name}
                onCheck={handleCheck}
              />
            ))}
            <Button
              className={styles.button}
              onClick={handleButtonClick}
              loading={isLoadingStream}
              size="middle"
              type="primary"
            >
              Построить квадатор
            </Button>
          </div>
          <div className={styles.videoSection}>
            {isLoadingStream && (
              <Spin className={styles.loadingSpinner} size="large" />
            )}
            {isShownVideo && <HLSVideo src={streamUrl} controls={true} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
