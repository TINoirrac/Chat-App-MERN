import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { io } from "socket.io-client";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";
import styles from "./home.module.scss";
import { host, allUsersRoute } from "../../api/apiRoutes";

const cx = classNames.bind(styles);

const Home = () => {
  const navigate = useNavigate();
  const socketRef = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const handleCurrentUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    handleCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser) {
      socketRef.current = io(host);
      socketRef.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleContacts = async () => {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
    };
    handleContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className={cx("wrapper")}>
      <Sidebar contacts={contacts} changeChat={handleChatChange} />
      {currentChat === undefined ? (
        <div className={cx("welcome")}>welcome</div>
      ) : (
        <Content socket={socketRef} currentChat={currentChat} />
      )}
    </div>
  );
};

export default Home;
