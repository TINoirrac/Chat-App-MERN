import React from "react";
import classNames from "classnames/bind";

import styles from "./header.module.scss";
import Image from "../../image/Image";
import { PlusIcon } from "../../icon/Icon";
import Button from "../../button/Button";
import Menu from "../../popper/Popper";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    title: "Tùy chọn",
  },
  {
    title: "Tùy chọn",
  },
  {
    title: "Tùy chọn",
  },
  {
    title: "Tùy chọn",
  },
  {
    title: "Tùy chọn",
  },
  {
    title: "Tùy chọn",
  },
];

const Header = () => {
  return (
    <div className={cx("wrapper")}>
      <Menu
        items={MENU_ITEMS}
        hideOnClick={true}
        trigger="click"
        className={cx("menu")}
      >
        <Image src="" />
      </Menu>
      <span>Chat</span>
      <div className={cx("button")}>
        <Button>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
