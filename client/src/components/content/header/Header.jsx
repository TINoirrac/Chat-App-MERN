import React from "react";
import classNames from "classnames/bind";

import styles from "./header.module.scss";
import Image from "../../image/Image";
import { OptionIcon, PhoneIcon, VideoIcon } from "../../icon/Icon";
import Button from "../../button/Button";

const cx = classNames.bind(styles);

const Header = ({ avatar, alt, username }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("account")}>
        <Image src={avatar} className={cx("avatar")} alt={alt} />
        <div className={cx("inner")}>
          <div className={cx("username")}>{username}</div>
          <div className={cx("status")}>Đang hoạt động</div>
        </div>
      </div>
      <div className={cx("buttons")}>
        <Button className={cx("button")}>
          <PhoneIcon />
        </Button>
        <Button className={cx("button")}>
          <VideoIcon />
        </Button>
        <Button className={cx("button")}>
          <OptionIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
