import React, { useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import axios from "axios";
// import ChatNameAvatar from "./ChatNameAvatar/ChatNameAvatar";
import "./ChatName.css";
const ChatName = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchChats = async () => {
    // console.log(user.data.user.name);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/v1/chat",
        config
      );
      // console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <div>
      {/* {chats && chats.map((chat) => <div className="myChats">{chat.name}</div>)} */}
      {chats &&
        chats.map((chat) => (
          <div
            className="myChats"
            key={chat._id}
            onClick={() => {
              setSelectedChat(chat);
              console.log(chat._id);
            }}
            style={{
              cursor: "pointer",
              background: `${selectedChat === chat ? "#38B2AC" : "#E8E8E8"}`,
              color: `${selectedChat === chat ? "black" : "black"}`,
            }}
          >
            <p className="text">
              {chat.users[0].name === user.data.user.name
                ? chat.users[1].name
                : chat.users[0].name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ChatName;