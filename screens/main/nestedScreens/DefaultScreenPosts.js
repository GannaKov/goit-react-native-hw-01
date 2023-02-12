import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
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
      const photoArr = [];
      querySnapshot.forEach((doc) => {
        photoArr.push({
          ...doc.data(),
          id: doc.id,
        });
        setPosts(photoArr);
      });
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

  //     old var
  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [route.params, ...prevState]);
  //   }
  // }, [route.params]);

  // const mapNav = (loc, pic) => {
  //   navigation.navigate("Map", {
  //     loc,
  //     pic,
  //   });
  // };
  useEffect(() => {
    console.log("in effect 1");
    getAllPost();
    console.log("posts 1", posts);
  }, []);

  useEffect(() => {
    console.log("in effect 2");
    console.log("posts2", posts);
  }, [posts]);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {/* style={styles.takenPictureContainer} */}
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
                  onPress={() => navigation.navigate("Comments")}
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
                  0
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
  location: { flexDirection: "row", alignItems: "center" },
});
