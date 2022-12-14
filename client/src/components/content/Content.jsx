import React from "react";
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import styles from "./content.module.scss";
import Header from "./header/Header";
import { getMessageRoute, sendMessageRoute } from "../../api/apiRoutes";
import Footer from "./footer/Footer";
import Image from "../image/Image";

const cx = classNames.bind(styles);

const Content = ({ socket, currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    const changeCurrentChat = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const response = await axios.post(getMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });

      setMessages(response.data);
    };
    changeCurrentChat();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      from: data._id,
      to: currentChat._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   socket.current = socketIOClient.connect(host);

  //   socket.current.on("getId", (data) => {
  //     setId(data);
  //   }); // ph???n n??y ????n gi???n ????? g??n id cho m???i phi??n k???t n???i v??o page. M???c ????ch ch??nh l?? ????? ph??n bi???t ??o???n n??o l?? c???a m??nh ??ang chat.

  //   socket.current.on("sendDataServer", (dataGot) => {
  //     setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
  //   }); // m???i khi c?? tin nh???n th?? mess s??? ???????c render th??m

  //   return () => {
  //     socket.current.disconnect();
  //   };
  // }, []);

  // const sendMessage = () => {
  //   if (message !== null) {
  //     const msg = {
  //       content: message,
  //       id: id,
  //     };
  //     socket.current.emit("sendDataClient", msg);

  //     /*Khi emit('sendDataClient') b??n ph??a server s??? nh???n ???????c s??? ki???n c?? t??n 'sendDataClient' v?? handle nh?? c??u l???nh trong file index.js
  //          socket.on("sendDataClient", function(data) { // Handle khi c?? s??? ki???n t??n l?? sendDataClient t??? ph??a client
  //            socketIo.emit("sendDataServer", { data });// ph??t s??? ki???n  c?? t??n sendDataServer c??ng v???i d??? li???u tin nh???n t??? ph??a server
  //          })
  //    */
  //     setMessage("");
  //   }
  // };

  const renderMess = messages.map((message) => {
    return (
      <div ref={scrollRef} key={uuidv4()}>
        <div className={cx("message",`${message.fromSelf ? "sended" : "received"}`)}>
          {/* {(!message.fromSelf)&&<Image src={message.infoReceiver.avatarImage} className={cx('receiver-image')} />} */}
          <div className={cx("content")}>
            <p>{message.message}</p>
          </div>
          {/* {(message.fromSelf)&&<Image src={`${message.infoReceiver.avatarImage}`} className={cx('read-image')}/>} */}
        </div>
      </div>
    );
  });

  return (
    <div className={cx("wrapper")}>
      <Header
        avatar={`${currentChat.avatarImage}`}
        alt=""
        username={currentChat.username}
      />
      <div className={cx("box-chat_message")}>{renderMess}</div>
      <Footer handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default Content;
