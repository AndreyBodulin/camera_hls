import React from "react";
import styles from "./index.module.scss";
import pngCam from "../../assets/video-camera.png";

export const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logoHead} src={pngCam} alt="no photo"></img>
      <span className={styles.spanHead}>6 Корпус</span>
      <span className={styles.spanHead}>3 Этаж</span>
    </div>
  );
};
