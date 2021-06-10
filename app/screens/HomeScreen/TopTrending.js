import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Image } from "react-native-expo-image-cache";
import getTrendingData from "../../utility/getTrendingData";
import routes from "../../navigation/routes";

function TopTrending({ data, navigation }) {
  return (
    <>
      <View style={{ paddingVertical: 15, paddingLeft: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Top Trending</Text>
      </View>
      <View>
        <FlatList
          horizontal
          data={getTrendingData(data)}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingLeft: 16 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(routes.LISTING_DETAILS, {
                      listing: item,
                      data: getTrendingData(data),
                    })
                  }
                >
                  <Image
                    tint="light"
                    // preview={{ uri: item.images[0].thumbnailUrl }}
                    uri={item.images[0].url}
                    style={styles.image}
                  />
                  <View style={styles.ImageOverlay}></View>
                  <Feather
                    name="external-link"
                    size={16}
                    color="#fff"
                    style={styles.imageLocationIcon}
                  />
                  <Text style={styles.ImageText}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ImageOverlay: {
    width: 150,
    height: 250,
    marginRight: 8,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#222",
    opacity: 0.2,
  },
  imageLocationIcon: {
    position: "absolute",
    marginTop: 4,
    left: 10,
    bottom: 10,
  },
  ImageText: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontSize: 14,
    left: 30,
    bottom: 8,
  },
  image: {
    width: 150,
    marginRight: 8,
    height: 250,
    borderRadius: 10,
  },
});

export default TopTrending;
