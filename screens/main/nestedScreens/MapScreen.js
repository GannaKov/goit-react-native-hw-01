import React from "react";
import MapView, { Marker } from "react-native-maps"; //52.55177392916994, 13.438224515059725
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
//-----------------
export const MapScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{
          width: "100%",
          height: "100%",
          outlineWidth: 1,
          outlineColor: "# 7fff00",
          outlineStyle: "'solid',",
        }}
        region={{
          latitude: 52.55177392916994,
          longitude: 13.438224515059725,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: 52.55177392916994,
            longitude: 13.438224515059725,
          }}
        />
      </MapView>
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
