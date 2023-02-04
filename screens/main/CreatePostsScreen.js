import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
//---------------------------------------------
export const CreatePostsScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [cameraRef, setCameraRef] = useState(null);

  const [photo, setPhoto] = useState(null);
  // useEffect(() => {
  //   (async () => {
  //     console.log(Camera);
  //     //const { status } = await Camera.getCameraPermissionsAsync();
  //     const status = await Camera.getCameraPermissionsAsync();
  //     console.log(status);
  //     // await MediaLibrary.requestPermissionsAsync();
  //     // setHasPermission(status === "granted");
  //     if (status === "granted") {
  //       // start the camera
  //       setHasPermission(true);
  //     } else {
  //       Alert.alert("Access denied");
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (camera) {
      const picture = await camera.takePictureAsync(null);
      setImage(picture.uri);
      console.log(picture);
    }
  };
  //   const takePicture = async () => {!!!!!!
  //  if (cameraRef.current) {
  //  const options = { quality: 0.5, base64: true, skipProcessing: true };
  // const data = await cameraRef.current.takePictureAsync(options);
  //  const source = data.uri;
  //  if (source) {
  //  await cameraRef.current.pausePreview();
  //  setIsPreview(true);
  //  console.log("picture", source);
  //       }
  //     }
  //   };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // const onCameraReady = () => {
  //   setIsCameraReady(true);
  // };
  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  return (
    <View style={styles.container}>
      <Camera
        onCameraReady={onCameraReady}
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCamera(ref); // use cameraRef.current.takePhoto(): Promise<dataPhoto> */
        }}
      >
        {/* type={type} */}
        {/* <View style={styles.buttonContainer}> */}
        <TouchableOpacity onPress={() => takePicture()} style={styles.button}>
          <FontAwesome name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        {/* </View> */}
      </Camera>
      <Text style={styles.loadPhotoText}>Загрузите фото</Text>
      <TextInput
        style={styles.input}
        placeholder="Название..."
        placeholderTextColor="#BDBDBD"
        // value={state.email}
      />
      <View style={{ marginBottom: 32 }}>
        <TextInput
          style={styles.lastInput}
          placeholder="Местность..."
          placeholderTextColor="#BDBDBD"
          // value={state.email}
        />
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={{ position: "absolute", bottom: 13 }}
        />
      </View>

      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        // onPress={onLogin}
        // onPress={onSubmitPress}
      >
        <Text style={styles.btnTitle}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  camera: {
    height: 240,
    marginTop: 32,
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",

    borderRadius: 8,
    marginBottom: 8,
  },
  loadPhotoText: {
    marginBottom: 32,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    borderWidth: 1,
    // paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    //   solid #E8E8E8;
    borderColor: "transparent",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#E8E8E8",

    borderStyle: "solid",
    marginBottom: 16,
  },
  lastInput: {
    // position: "relative",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    borderWidth: 1,
    // paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    //   solid #E8E8E8;
    borderColor: "transparent",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#E8E8E8",

    borderStyle: "solid",
    paddingLeft: 28,
  },
  btn: {
    // alignItems: "center",
    justifyContent: "center",
    height: 51,
    // paddingLeft: 32,
    // paddingRight: 32,
    // paddingTop: 16,
    // paddingBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginBottom: 16,
  },

  btnTitle: {
    color: "#f0f8ff",

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    //fontWeight: 400,
    fontSize: 16,
    //lineHeight: 1.19,
    lineHeight: 19,
    textAlign: "center",
    color: "#BDBDBD",
  },
});
