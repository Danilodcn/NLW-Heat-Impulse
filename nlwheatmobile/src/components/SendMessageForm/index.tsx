import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import api from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessage() {
    const messagesFormatted = message.trim();

    if (messagesFormatted.length > 0) {
      setSendingMessage(true);
      const response = await api.post("/message", { message });
      setMessage("");
      setSendingMessage(false);
    } else {
      Alert.alert(
        "Escreva a mensagem para enviar",
        "Não é possível enviar mensagens vazias"
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual a sua expectativa para o evento?"
        multiline
        maxLength={140}
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessage}
      />
    </View>
  );
};
