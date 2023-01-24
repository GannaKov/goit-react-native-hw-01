import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.addPhoto}></View>
      <Text style={styles.title}>Регистрация</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Логин"
          placeholderTextColor="#BDBDBD"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Адрес электронной почты"
          placeholderTextColor="#BDBDBD"
        ></TextInput>
        <View>
          <TextInput
            style={styles.inputLast}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={true}
          />
          <Text style={styles.passwordShow}>Показать</Text>
        </View>

        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnTitle}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
      </View>
    </View>
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
    paddingBottom: 78,
  },
  addPhoto: {
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

    //flex: 1,
    outlineColor: "#dc143c",
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
