import React from "react";
import classNames from "classnames/bind";

import styles from "./popperitem.module.scss";

const cx = classNames.bind(styles);

const PopperItem = ({ data, onClick }) => {
  return (
    <div className={cx("wrapper")} onClick={onClick}>
      {data.title}
    </div>
  );
};

export default PopperItem;
