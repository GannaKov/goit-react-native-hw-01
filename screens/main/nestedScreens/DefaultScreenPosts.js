import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            {/* style={styles.takenPictureContainer} */}
            <Image
              source={{ uri: item.picture }}
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
                    navigation.navigate("Map", { coords: item.coords })
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
