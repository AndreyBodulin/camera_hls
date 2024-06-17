import React from "react";
import styles from "./index.module.scss";
import Logo from "../../assets/logo.svg";
import dayjs from "dayjs";
import { Button, Tooltip } from "antd";

export const Header = () => {
  return (
    <div className={styles.header}>
      <img src={Logo} />
      <div className={styles.textualInfo}>
        <div className={styles.title}>
          [Internal] Surveillance camera streaming service
        </div>
        <div className={styles.date}>{dayjs().format("MMMM D, YYYY")}</div>
      </div>
    </div>
  );
};
