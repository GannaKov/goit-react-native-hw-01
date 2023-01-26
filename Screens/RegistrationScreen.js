import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  console.log(login, email, password);
  return (
    <KeyboardAvoidingView // определяем ОС и настраиваем поведение клавиатуры
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.userPhoto}>
        <TouchableOpacity
          style={styles.btnAddPhoto}
          onPress={() => Alert.alert("Simple Button pressed")}
        >
          <Text style={styles.btnAddPhotoIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Регистрация</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Логин"
          placeholderTextColor="#BDBDBD"
          value={login}
          onChangeText={loginHandler}
        ></TextInput>
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

        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnTitle}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
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

    paddingTop: 92,
    // paddingBottom: 78,
  },

  userPhoto: {
    position: "absolute",

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
    alignSelf: "center",
    // left: 0,
    // right: 0,
    // justifyContent: "center",
    // alignItems: "center",

    marginHorizontal: "auto",
    width: 120,
    height: 120,
  },
  btnAddPhoto: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    bottom: 14,
    right: "-10%",
    //transform: [{ translateX: -50 }],
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddPhotoIcon: {
    //fontSize: 25,
    color: "#FF6C00",
    //width: "200%",
    // textAlignVertical: "center",
    textAlign: "center",
  },
  title: {
    marginBottom: 33,

    //     font- family: 'Roboto';
    // font-style: normal;
    // font-weight: 500;
    fontSize: 30,
    //line-height: 35px;
    textAlign: "center",
    //letter-spacing: 0.01em;

    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
    //marginBottom: 78,
    paddingBottom: 78,
    //flex: 1,

    //marginHorizontal: 40,
    outlineWidth: 1,
    outlineStyle: "solid",
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
    //marginHorizontal: 16,
  },

  inputLast: {
    position: "relative",
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: "#F6F6F6",
    //   solid #E8E8E8;
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 43,
    // marginHorizontal: 16,
  },
  passwordShow: {
    position: "absolute",
    right: 16,
    top: 10,
    //font- family: 'Roboto';
    //font-style: normal;
    //font-weight: 400;
    fontSize: 16,
    //line-height: 19px;
    /* identical to box height */

    //textAlign: "right",
    color: "#1B4371",
  },
  btn: {
    // backgroundColor: "#ffb6c1",
    // height: 40,
    // borderRadius: 6,
    // marginTop: 40,
    // justifyContent: "center",
    // alignItems: "center",
    //   marginHorizontal: 20,
    // flex: 1,
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

    // fontFamily: "Roboto",
    // fontStyle: "normal",
    // fontWeight: 400,
    fontSize: 16,
    // lineHeight: 1.19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  text: {
    //font- family: 'Roboto';
    // font-style: normal;
    // font-weight: 400;
    fontSize: 16,
    //line-height: 19px;
    /* identical to box height */

    textAlign: "center",

    color: "#1B4371",
  },
});
//
