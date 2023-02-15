import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
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
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
//---------------------------------
export const ProfileScreen = () => {
  const { userId, login, avatar, email } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", userId)
      // orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //await!!
    const photoArr = [];
    querySnapshot.forEach((doc) => {
      console.log("doc", doc.data());
      photoArr.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    setPosts(photoArr);
    // });
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
              //fontWeight: 400,
              fontSize: 30,
              lineHeight: 35,

              textAlign: "center",

              color: "#212121",
            }}
          >
            {login}
          </Text>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "center ",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 100,

                      marginRight: 8,
                    }}
                  />
                  <Text
                    style={{
                      // marginBottom: 11,
                      fontFamily: "Roboto-Medium",
                      fontStyle: "normal",
                      fontSize: 13,
                      lineHeight: 19,
                      marginBottom: 33,
                    }}
                  >
                    {item.login}
                  </Text>
                </View>
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
                        color="#BDBDBD"
                        style={{ marginRight: 9 }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 18.75,
                        color: "#BDBDBD",
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      {item.commentsQuantity}
                    </Text>
                  </View>
                  <View style={styles.location}>
                    <Feather
                      name="map-pin"
                      size={24}
                      color="#BDBDBD"
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      // onPress={mapNav(item.location, item.photo)}
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
    // alignItems: "center",
    //justifyContent: "center",
    // justifyContent: "flex-end",
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
    marginTop: 147,
    height: "100%",
    backgroundColor: "#FFFFFF",

    paddingTop: 92,
    // paddingBottom: 78,
  },
  userPhoto: {
    position: "absolute",
    marginBottom: 32,
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
});
