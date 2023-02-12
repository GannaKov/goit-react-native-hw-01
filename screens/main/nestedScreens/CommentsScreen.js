import React, { useState } from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { Feather } from "@expo/vector-icons";
//-----------------
export const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const { login } = useSelector((state) => state.auth);
  console.log("in Comments", postId, login);

  // const createComment = async () => {
  //   db.firestore()
  //     .collection("posts")
  //     .doc(postId)
  //     .collection("comments")
  //     .add({ comment, login });
  // };

  // oder addDoc????use setDoc to set a specific id
  const sendComment = async () => {
    try {
      const date = new Date();
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        comment: comment,
        login: login,
        date: date,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      const errorMessage = error.message;
      console.log("err", error.message);
      Alert.alert(errorMessage);
    }
  };

  //__________________________
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <TextInput
          style={styles.lastInput}
          placeholder="Make comment"
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={sendComment}>
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ position: "absolute", right: 8, bottom: 30 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
    // alignItems: "center",
    //justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  lastInput: {
    marginBottom: 16,
    position: "relative",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: " #BDBDBD",
    borderWidth: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
});
