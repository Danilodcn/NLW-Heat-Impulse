import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Message } from "../Message";
import { styles } from "./styles";
import { MessageProps } from "../Message";
import api from "../../services/api";
import io from "socket.io-client";

type MessagesResponse = {
  data: MessageProps[];
};

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));


socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
  console.log(newMessage);
});

export const MessageList: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState([] as MessageProps[]);

  useEffect(() => {}, []);
  console.log("TOKEN: ", api.defaults.headers.common["Authorization"])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((preState) => [
          messagesQueue[0],
          preState[0],
          preState[1],
        ]);
        messagesQueue.shift()
      }
    });
    return () => clearInterval(timer)
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      const response = (await api.get("messages/last3")) as MessagesResponse;
      // console.log(response.data);
      setCurrentMessages(response.data);
    }

    fetchMessages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message, index) => {
        return <Message data={message} key={index} />;
      })}
    </ScrollView>
  );
};
