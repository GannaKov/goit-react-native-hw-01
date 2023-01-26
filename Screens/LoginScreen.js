import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  console.log(email, password);
  console.log("Pl", Platform.OS);

  const onLogin = () => {
    Alert.alert("Credentials", `${email} + ${password}`);
  };
  return (
    <KeyboardAvoidingView // определяем ОС и настраиваем поведение клавиатуры
      behavior={Platform.OS == "ios" ? "padding" : null} // "height" doesn't work properly
      style={styles.container}
    >
      <Text style={styles.title}>Войти</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Адрес электронной почты"
          placeholderTextColor="#BDBDBD"
          value={email}
          onChangeText={emailHandler}
        />

        <View>
          <TextInput
            style={styles.inputLast}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={true}
            value={password}
            onChangeText={passwordHandler}
          />
          <Text style={styles.passwordShow}>Показать</Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={onLogin}
        >
          <Text style={styles.btnTitle}>Войти</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Нет аккаунта? Зарегистрироваться</Text>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
    //height: "auto",
    backgroundColor: "#FFFFFF",

    paddingTop: 32,
  },

  title: {
    marginBottom: 33,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    //line-height: 35px;
    textAlign: "center",
    //letter-spacing: 0.01em;
    color: "#212121",
  },

  form: {
    marginHorizontal: 16,
    //flex: 1,
    //marginHorizontal: 40,
    outlineWidth: 1,
    outlineStyle: "solid",
    //paddingBottom: 144,
    marginBottom: 144,
  },

  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 40,
    borderWidth: 1,
    //   solid #E8E8E8;
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    marginBottom: 16,
  },

  inputLast: {
    position: "relative",
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 43,
  },

  passwordShow: {
    position: "absolute",
    right: 16,
    top: 10,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    //line-height: 19px;
    /* identical to box height */
    //textAlign: "right",
    color: "#1B4371",
  },

  btn: {
    alignItems: "center",
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },

  btnTitle: {
    color: "#f0f8ff",

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    // lineHeight: 1.19,
    textAlign: "center",
    color: "#FFFFFF",
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    //line-height: 19px;
    /* identical to box height */

    textAlign: "center",
    color: "#1B4371",
  },
});
//keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}
//includeFontPadding:false    textAlignVertical to center.
