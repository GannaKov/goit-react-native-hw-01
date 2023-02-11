import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import {
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

  // const getAllPost = async () => {
  //   await db
  //     .firestore()
  //     .collection("posts")
  //     .onSnapshot((data) =>
  //       setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //     );
  // };
  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(newData);
      }
    );
    // console.log("querySnapshot", querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   const post = { doc: doc.data(), id: doc.id };
    //   console.log("post", post);
    //   setPosts([...posts, post]);
  };
  // querySnapshot.forEach((doc) => {{ ...doc.data(), id: doc.id }
  //   console.log("id++data", doc.id, doc.data());
  //   console.log("id+data", `${doc.id} => ${doc.data()}`);
  // });

  // const fetchPost = async () => {

  //         await getDocs(collection(db, "todos"))
  //             .then((querySnapshot)=>{
  //                 const newData = querySnapshot.docs
  //                     .map((doc) => ({...doc.data(), id:doc.id }));
  //                 setTodos(newData);
  //                 console.log(todos, newData);
  //             })
  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [route.params, ...prevState]);
  //   }
  // }, [route.params]);

  useEffect(() => {
    console.log("in effect");
    getAllPost();
  }, []);
  console.log("posts", posts);
  // useEffect(() => {}, [posts]);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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
                  onPress={() =>
                    navigation.navigate("Map", {
                      coords: item.coords,
                      picture: item.picture,
                    })
                  }
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#212121",
                    fontFamily: "Roboto-Regular",
                    textDecorationLine: "underline",
                  }}
                >
                  {item.adress}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
