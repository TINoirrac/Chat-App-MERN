import React from "react";
import classNames from "classnames/bind";

import styles from "./wrapperitem.module.scss";

const cx = classNames.bind(styles);

const WrapperItem = ({ children, className }) => {
  return <div className={cx("wrapper", className)}>{children}</div>;
};

export default WrapperItem;
