import React from "react";
import { View, StyleSheet, Text } from "react-native";

import routes from "../../../navigation/routes";
import { Image } from "react-native-expo-image-cache";
import { TouchableOpacity } from "react-native-gesture-handler";

function TopImage({ listing, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.IMAGE_VIEW, listing)}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.ImageOverlay}></View>
      <Text style={styles.ImageDescription} numberOfLines={4}>
        <Text style={styles.ImageText} numberOfLines={1}>
          {listing.title}
        </Text>
        {`\n`}
        {listing.description}
        ....
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  ImageOverlay: {
    width: "100%",
    height: 280,
    position: "absolute",
    backgroundColor: "#333",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.3,
  },
  ImageText: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },

  ImageDescription: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontWeight: "600",
    fontSize: 18,
    paddingRight: 40,
    left: 30,
    bottom: 10,
  },
});

export default TopImage;
