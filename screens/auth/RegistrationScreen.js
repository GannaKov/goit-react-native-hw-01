import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { authRegistration } from "../../redux/auth/authOperations";
//-------------------------------------------
const initialRegistrationState = {
  login: "",
  email: "",
  password: "",
};
//------------------------------------------
export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(initialRegistrationState);
  const [avatar, setAvatar] = useState(null);
  const [statusImPic, requestPermissionImPic] =
    ImagePicker.useMediaLibraryPermissions();

  const dispatch = useDispatch();

  const onSubmitPress = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    // Alert.alert(`${state.login} ${state.email} ${state.password}`);
    dispatch(authRegistration(state));
    setState(initialRegistrationState);
  };
  const handleName = (value) => setName(value);
  const handleEmail = (value) => setEmail(value.trim());
  const handlePassword = (value) => setPassword(value.trim());
  //-----Avatar______
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };
  const storage = getStorage();
  const uploadPhotoToServer = async () => {
    const response = await fetch(picture);
    const file = await response.blob();

    const uniquePostId = uuid.v4();
    const storageRef = ref(storage, `avatar/${uniquePostId}`);
    const data = await uploadBytes(storageRef, file);

    const urlAvatar = await getDownloadURL(
      ref(storage, `avatar/${uniquePostId}`)
    );
    return urlAvatar;
  };

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
            <View style={styles.userPhoto}>
              <TouchableOpacity
                style={styles.btnAddPhoto}
                onPress={() => Alert.alert("Simple Button pressed")}
              >
                <Ionicons name="add" size={24} color="#FF6C00" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Регистрация</Text>
            <View style={styles.form}>
              {/* корректровать */}
              <TextInput
                style={styles.input}
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
                onFocus={() => setIsShowKeyboard(true)}
              ></TextInput>
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
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <Text style={styles.text}>
                Уже есть аккаунт?
                <Text onPress={() => navigation.navigate("Login")}>Войти</Text>
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
    // color: "#FF6C00",
    //width: "200%",
    // textAlignVertical: "center",
    // textAlign: "center",
  },
  title: {
    marginBottom: 33,

    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    //fontWeight: 400, //Roboto-Medium
    fontSize: 30,
    //line-height: 35px;
    textAlign: "center",
    //letter-spacing: 0.01em;

    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 78,
    //paddingBottom: 78,
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
//<View style={{ ...styles.form, marginBottom: isShowKeyboard ? 10 : 78 }}>
