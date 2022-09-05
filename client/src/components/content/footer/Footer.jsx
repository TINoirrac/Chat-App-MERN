import React from "react";
import classNames from "classnames/bind";

import styles from "./footer.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

const Footer = ({ handleSendMsg }) => {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMsg(message);
      setMessage("");
    }
  };
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("type-mess")}>
        <input
          placeholder="Aa"
          onKeyDown={handleKeyDown}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Footer;
