import React, { startTransition, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";

import { authLogIn } from "../../redux/auth/authOperations";
//-----------------------------------
const initialLoginState = {
  email: "",
  password: "",
};
//------------------------------------
export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const emailHandler = (text) => setEmail(text);
  // const passwordHandler = (text) => setPassword(text);
  const [state, setState] = useState(initialLoginState);
  const dispatch = useDispatch();

  const onSubmitPress = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authLogIn(state));
    setState(initialLoginState);
  };

  // const [isAuth, auth] = useAuth(kuku);
  // const onLogin = () => {
  //   Alert.alert("Credentials", `${email} + ${password}`);
  // };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerMain}>
        <ImageBackground
          style={styles.imageBG}
          source={require("../../assets/photo-BG.jpg")}
        >
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
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={() => setIsShowKeyboard(true)}
              />

              <View>
                <TextInput
                  style={styles.inputLast}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={true}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <Text style={styles.passwordShow}>Показать</Text>
              </View>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                // onPress={onLogin}
                onPress={onSubmitPress}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>
              <Text style={styles.text}>
                Нет аккаунта?
                <Text onPress={() => navigation.navigate("Registr")}>
                  Зарегистрироваться
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    //justifyContent: "center",
    justifyContent: "flex-end",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    //justifyContent: "flex-end",
    // justifyContent: "center",
    // alignItems: "center",
  },
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
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    //fontWeight: 500, //Roboto-Medium
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
    //fontWeight: 400,
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
    //fontWeight: 400,
    fontSize: 16,
    // lineHeight: 1.19,
    textAlign: "center",
    color: "#FFFFFF",
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    //fontWeight: 400,
    fontSize: 16,
    //line-height: 19px;
    /* identical to box height */

    textAlign: "center",
    color: "#1B4371",
  },
});
//keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}
//includeFontPadding:false    textAlignVertical to center.
//<View style={{ ...styles.form, marginBottom: isShowKeyboard ? 50 : 144 }}
