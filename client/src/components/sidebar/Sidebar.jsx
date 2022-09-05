import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./sidebar.module.scss";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Messlist from "../messlist/Messlist";
import Search from "../search/Search";

const cx = classNames.bind(styles);

// const MESS_LIST = [
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
//   {
//     avatar: "",
//     username: "nguyen duc quoc",
//     mess: "afjoweiqufjasdhfsadafhafsdafsadfhkhakhfhdakfhakhfkahdkfhakhdfka",
//     send: "5 giờ",
//   },
// ];

const Sidebar = ({ contacts, changeChat }) => {
  //const [currentUserName, setCurrentUserName] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [currentSelected, setCurrentSelected] = useState();

  useEffect(() => {
    const handleCurrentUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      //setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    handleCurrentUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div className={cx("wrapper")}>
      <Header
        avatar={`data:image/svg+xml;base64,${currentUserImage}`}
        alt="avatar"
      />
      <Search />
      <Messlist
        data={contacts}
        currentSelected={currentSelected}
        changeCurrentChat={changeCurrentChat}
      />
      <Footer />
    </div>
  );
};

export default Sidebar;
