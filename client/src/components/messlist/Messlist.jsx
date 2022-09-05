import React from "react";
import classNames from "classnames/bind";

import styles from "./messlist.module.scss";
import Messitem from "./messitem/Messitem";

const cx = classNames.bind(styles);

const Messlist = ({ data, currentSelected, changeCurrentChat }) => {
  return (
    <div className={cx("wrapper")}>
      {data.map((item, index) => (
        <Messitem
          key={index}
          data={item}
          className={cx(`${index === currentSelected ? "selected" : ""}`)}
          changeCurrentChat={changeCurrentChat}
          index={index}
        />
      ))}
    </div>
  );
};

export default Messlist;
