import React, { FC } from "react";
import styles from "./Cam.module.scss";

type CamProps = {
  name: string;
  rtsp: string;
  onCheck: (rtsp: string) => void;
};

export const Cam: FC<CamProps> = ({ name, rtsp, onCheck }) => {
  return (
    <div className={styles.container}>
      <input type="checkbox" onClick={() => onCheck(rtsp)} />
      <div>{name}</div>
    </div>
  );
};
