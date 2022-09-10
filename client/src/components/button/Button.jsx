import React from "react";
import classNames from "classnames/bind";

import styles from "./button.module.scss";

const cx = classNames.bind(styles);

const Button = ({ href, onClick, children, className, ...passProps }) => {
  let Comp = "button";
  const _props = {
    onClick,
    ...passProps,
  };

  if (href) {
    _props.href = href;
    Comp = "a";
  }
  return (
    <Comp className={cx("wrapper", className)}>
      {children && <span className={cx("icon")}>{children}</span>}
    </Comp>
  );
};

export default Button;
