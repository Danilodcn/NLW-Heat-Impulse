import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Message } from "../Message";
import { styles } from "./styles";
import { MessageProps } from "../Message";
import api from "../../services/api";

type MessagesResponse = {
  data: MessageProps[];
};

export const MessageList: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState([] as MessageProps[]);

  useEffect(() => {
    async function fetchMessages() {
      const response = (await api.get("messages/last3")) as MessagesResponse;
      console.log(response.data);
      setCurrentMessages(response.data);
    }
    console.log("foi");
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
