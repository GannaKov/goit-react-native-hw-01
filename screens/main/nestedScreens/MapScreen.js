import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps"; //52.55177392916994, 13.438224515059725
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
//-----------------
export const MapScreen = ({ route }) => {
  const [coo, setCoo] = useState(null);
  useEffect(() => {
    if (route.params) {
      setCoo(route.params);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      {coo ? (
        <MapView
          style={{
            width: "100%",
            height: "100%",
            outlineWidth: 1,
            outlineColor: "# 7fff00",
            outlineStyle: "'solid',",
          }}
          region={{
            latitude: coo.location.latitude,
            longitude: coo.location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.006,
          }}
        >
          <Marker
            coordinate={{
              latitude: coo.location.latitude,
              longitude: coo.location.longitude,
            }}
          >
            <Image
              source={{ uri: coo.picture }}
              style={{ width: 40, height: 40, resizeMode: "contain" }}
            />
          </Marker>
        </MapView>
      ) : (
        <Text>Map is not avaiable. Try again</Text>
      )}
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
});
