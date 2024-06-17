import React, { FC } from "react";
import styles from "./Cam.module.scss";
import { Checkbox } from "antd";

type CamProps = {
  name: string;
  rtsp: string;
  onCheck: (rtsp: string) => void;
};

export const Cam: FC<CamProps> = ({ name, rtsp, onCheck }) => {
  return (
    <div className={styles.container}>
      <Checkbox onChange={() => onCheck(rtsp)}>{name}</Checkbox>
    </div>
  );
};
