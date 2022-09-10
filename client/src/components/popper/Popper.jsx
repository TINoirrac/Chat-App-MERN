import React from "react";
import TippyHeadless from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import styles from "./popper.module.scss";
import PopperItem from "./popperitem/PopperItem";
import Header from "./header/Header";
import { useState } from "react";
import WrapperItem from "./wrapperitems/WrapperItem";

const cx = classNames.bind(styles);

const defaultFn = () => {};

const Popper = ({
  children,
  items = [],
  onChange = defaultFn,
  hideOnClick = false,
  trigger,
}) => {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!items.children;
      return (
        <PopperItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onchange(item);
            }
          }}
        />
      );
    });
  };
  return (
    <TippyHeadless
      hideOnClick={hideOnClick}
      trigger={trigger}
      interactive={true}
      placement='right-end'
      appendTo={() => document.body}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <WrapperItem className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header
                title={current.title}
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            <div className={cx("menu-body")}>{renderItems()}</div>
          </WrapperItem>
        </div>
      )}
      onHide={() => {
        setHistory((prev) => prev.slice(0, 1));
      }}
    >
      {children}
    </TippyHeadless>
  );
};

export default Popper;
