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
    <View>
      <Text>Регистрация</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Логин"
          placeholderTextColor="#BDBDBD"
          textAlign={"center"}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Адрес электронной почты"
          placeholderTextColor="#BDBDBD"
          textAlign={"center"}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          textAlign={"center"}
        ></TextInput>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnTitle}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  //   container: {
  //     // flex: 1,
  //     backgroundColor: "#fff",
  //   },
  form: {
    marginHorizontal: 40,
  },
  input: {
    borderWidth: 1,

    height: 40,
    borderWidth: 1,
    //   solid #E8E8E8;
    borderRadius: 8,
    borderRadius: 6,
    color: "#E8E8E8",
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
    backGround: "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    color: "#f0f8ff",
    fontSize: 18,
    // fontFamily: "Roboto",
    // fontStyle: "normal",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.19,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
