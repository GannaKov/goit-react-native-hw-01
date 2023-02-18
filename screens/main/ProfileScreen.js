import React, { useEffect, useState } from "react";
import {
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
//---------------------------------
export const ProfileScreen = ({ navigation }) => {
  const { userId, login, avatar, email } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const photoArr = [];
      querySnapshot.forEach((doc) => {
        photoArr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPosts(photoArr);
    });
  };
  // const getAllPost = async () => {
  //   const q = query(
  //     collection(db, "posts"),
  //     where("userId", "==", userId)
  //     // orderBy("date", "desc")
  //   );
  //   const querySnapshot = await getDocs(q);

  //   // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   //await!!
  //   const photoArr = [];
  //   querySnapshot.forEach((doc) => {
  //     photoArr.push({
  //       ...doc.data(),
  //       id: doc.id,
  //     });
  //   });
  //   setPosts(photoArr);
  //   // });
  // };

  const updateLikes = async (likes, itemId) => {
    const likeRef = doc(db, "posts", itemId);
    await updateDoc(likeRef, {
      likes: likes,
    });
  };
  return (
    <View style={styles.containerMain}>
      <ImageBackground
        style={styles.imageBG}
        source={require("../../assets/images/photo-BG.jpg")}
      >
        <View style={styles.container}>
          <View style={styles.userPhoto}>
            <Image
              source={{ uri: avatar }}
              style={{ width: 120, height: 120, borderRadius: 16 }}
            />
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontStyle: "normal",
              fontSize: 30,
              lineHeight: 35,
              textAlign: "center",
              color: "#212121",
              marginBottom: 33,
            }}
          >
            {login}
          </Text>
          <FlatList
            style={{ marginBottom: 130 }}
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                />
                <Text
                  style={{
                    marginBottom: 11,
                    fontFamily: "Roboto-Medium",
                    fontStyle: "normal",
                    fontSize: 16,
                    lineHeight: 19,
                  }}
                >
                  {item.description}
                </Text>
                <View style={styles.description}>
                  <View style={styles.comments}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          postPhoto: item.photo,
                          autorPostId: item.userId,
                        })
                      }
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color={
                          item.commentsQuantity > 0 ? "#FF6C00" : "#BDBDBD"
                        }
                        style={{ marginRight: 9 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 18.75,
                        color: "#212121",
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      {item.commentsQuantity ? item.commentsQuantity : ""}
                    </Text>
                  </View>
                  <View style={styles.likes}>
                    <TouchableOpacity
                      onPress={() => {
                        updateLikes(item.likes + 1, item.id);
                      }}
                    >
                      <Feather
                        name="thumbs-up"
                        size={24}
                        color={item.likes > 0 ? "#FF6C00" : "#BDBDBD"}
                        style={{ marginRight: 9 }}
                      />
                    </TouchableOpacity>
                    <Text>{item.likes ? item.likes : ""}</Text>
                  </View>

                  <View style={styles.location}>
                    <Feather
                      name="map-pin"
                      size={24}
                      color="#BDBDBD"
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      onPress={() => {
                        if (item.location) {
                          navigation.navigate("Map", {
                            location: item.location,
                            picture: item.photo,
                          });
                        } else {
                          Alert.alert("There is no location");
                        }
                      }}
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        color: "#212121",
                        fontFamily: "Roboto-Regular",
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.adress ? item.adress : "Somewhere in the World"}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    paddingHorizontal: 16,
    position: "relative",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
    height: "100%",
    backgroundColor: "#FFFFFF",

    paddingTop: 92,
  },
  userPhoto: {
    position: "absolute",
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
    alignSelf: "center",
    marginHorizontal: "auto",
    width: 120,
    height: 120,
  },
  description: {
    paddingBottom: 34,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: { flexDirection: "row", alignItems: "center" },
  location: { flexDirection: "row", alignItems: "center" },
});
