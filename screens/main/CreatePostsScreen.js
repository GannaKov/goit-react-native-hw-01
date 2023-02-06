import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  Image,
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
export const CreatePostsScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null); //!!!!
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasCameraPermission, requestPermission] =
    Camera.useCameraPermissions(); // instead of all async permissions

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const picture = await cameraRef.takePictureAsync(options);
      setPicture(picture.uri);
      const place = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const adrText = `${place[0].country}  ${place[0].city} ${place[0].district}`;
      setAdress(adrText);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const sendPhoto = () => {
    navigation.navigate("Posts", { picture });
    setPicture("");
    setDescription("");
    setAdress("");
  };
  const deletePhoto = () => {
    setPicture("");
    setDescription("");
    setAdress("");
  };
  return (
    <View style={styles.container}>
      {picture ? (
        <View style={styles.takenPictureContainer}>
          <Image
            source={{ uri: picture }}
            style={{ width: "100%", height: 240, borderRadius: 8 }}
          />
        </View>
      ) : (
        <Camera
          onCameraReady={onCameraReady}
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref); // use cameraRef.current.takePhoto(): Promise<dataPhoto> */
          }}
        >
          <TouchableOpacity onPress={() => takePicture()} style={styles.button}>
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          {/* </View> */}
        </Camera>
      )}
      <Text style={styles.loadPhotoText}>
        {picture ? "Edit photo" : "Upload photo"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Image description"
        placeholderTextColor="#BDBDBD"
        value={description}
        onChangeText={setDescription}
      />
      <View style={{ marginBottom: 32 }}>
        <TextInput
          style={styles.lastInput}
          placeholder="Location"
          placeholderTextColor="#BDBDBD"
          value={adress ? adress : ""}
          onChangeText={setAdress}
        />
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={{ position: "absolute", bottom: 13 }}
        />
      </View>
      <TouchableOpacity
        style={
          picture ? { ...styles.btn, backgroundColor: "#FF6C00" } : styles.btn
        }
        activeOpacity={0.8}
        // onPress={onLogin}
        onPress={sendPhoto}
      >
        <Text
          style={
            picture ? { ...styles.btnTitle, color: "#fff" } : styles.btnTitle
          }
        >
          Send
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePhoto()} style={styles.trash}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
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
  trash: {
    alignSelf: "center",
    marginBottom: 22,
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FFFFFF",

    borderRadius: 20,
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
  takenPictureContainer: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    height: 240,
  },
});
