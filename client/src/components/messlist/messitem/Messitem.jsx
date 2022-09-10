import React from "react";
import classNames from "classnames/bind";

import styles from "./messitem.module.scss";
import Image from "../../image/Image";
import { DotsHorizontalIcon } from "../../icon/Icon";

const cx = classNames.bind(styles);

const Messitem = ({ data, changeCurrentChat, index, className }) => {
  return (
    <div className={cx("container",className)}>
      <div
        className={cx("wrapper")}
        onClick={() => {
          changeCurrentChat(index, data);
        }}
      >
        <Image
          src={`${data.avatarImage}`}
          className={cx("avatar")}
        />
        <div className={cx("inner")}>
          <span>{data.username}</span>
          <div className={cx("content")}>
            {/* <div className={cx("message")}>{data.mess}</div>
            <span aria-hidden="true"> · </span>
            <span>{data.send}</span> */}
          </div>
        </div>
      </div>
      <div className={cx("options")}>
        <DotsHorizontalIcon />
      </div>
    </div>
  );
};

export default Messitem;
