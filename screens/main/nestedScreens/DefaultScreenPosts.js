import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(null);
  const { userId, login, avatar, email } = useSelector((state) => state.auth);
  //var 1!!!

  // const getAllPost = async () => {
  //   const querySnapshot = await getDocs(collection(db, "posts")).then(
  //     (querySnapshot) => {
  //       const newData = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setPosts(newData);
  //     }
  //   );
  // };
  const getAllPost = async () => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //await!!
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

  //var 2
  // const getAllPost = async () => {
  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   const dataArr = [];
  //   querySnapshot.forEach((doc) => {
  //     dataArr.unshift({
  //       photo: doc.data().photo,
  //       location: doc.data().location,
  //       description: doc.data().description,
  //       id: doc.id,
  //       userId: doc.data().userId,
  //       login: doc.data().login,
  //     });
  //   });
  //   setPosts(dataArr);
  // };

  useEffect(() => {
    getAllPost();
  }, []);

  const updateLikes = async (likes, itemId) => {
    console.log("updateLike", itemId);
    const likeRef = doc(db, "posts", itemId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(likeRef, {
      likes: likes,
    });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 32,
          marginTop: 32,
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            marginRight: 8,
          }}
        />
        <View>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontStyle: "normal",
              fontSize: 13,
              lineHeight: 15,
            }}
          >
            {login}
          </Text>
          <Text
            style={{
              fontSize: 11,
              lineHeight: 12.89,
              color: "#212121",
              fontFamily: "Roboto-Regular",
            }}
          >
            {email}
          </Text>
        </View>
      </View>
      <FlatList
        style={{ marginBottom: 130 }}
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
                    color={item.commentsQuantity > 0 ? "#FF6C00" : "#BDBDBD"}
                    style={{
                      marginRight: 9,
                      fill: item.commentsQuantity > 0 ? "#FF6C00" : "#BDBDBD",
                    }}
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
                  {/* () => setLikes(likes + 1) */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    //justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  description: {
    paddingBottom: 34,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
  },
  likes: { flexDirection: "row", alignItems: "center" },
  location: { flexDirection: "row", alignItems: "center" },
});
