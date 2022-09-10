import React from "react";
import { useState } from "react";
import { forwardRef } from "react";
import classNames from "classnames/bind";

import styles from "./image.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

const Image = forwardRef(
  ({ src, alt, className, fallback = images.noImage, ...props }, ref) => {
    const [_fallback, setFallback] = useState("");
    const handleError = () => {
      setFallback(fallback);
    };
    return (
      <img
        className={cx("wrapper",className)}
        ref={ref}
        src={src || _fallback}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
