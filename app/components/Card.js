import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import favoritesApi from "../api/favorites";

import Text from "./Text";
import colors from "../config/colors";

function getClasses(favorited) {
  let classes = "bookmark";
  if (!favorited) classes += "-outline";
  return classes;
}

function Card({
  itemId,
  userId,
  title,
  subTitle,
  imageUrl,
  onPress,
  thumbnailUrl,
  count,
}) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    checkfavorited(itemId, userId);
  }, [count, itemId, userId]);

  const checkfavorited = async (itemId, userId) => {
    const result = await favoritesApi.checkFavorite(itemId, userId);
    if (!result.ok) {
      return alert("error occured");
    }

    if (result.data.length !== 0) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  };

  const handleBookMark = async () => {
    setFavorited(!favorited);

    let result;
    if (favorited) {
      console.log("delte");
      result = await favoritesApi.deleteParticularFavorite(itemId, userId);
    } else {
      console.log("add");
      result = await favoritesApi.addFavorite(itemId, userId);
    }

    if (!result.ok) {
      setFavorited(!favorited);
      return alert("Could not save changes");
    }
  };

  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          <Image
            style={styles.image}
            tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
          <View style={styles.ImageOverlay}></View>
          <Feather
            name="external-link"
            size={16}
            color="#fff"
            style={styles.imageLocationIcon}
          />
          <Text style={styles.ImageText}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.detailsContainer}>
        <Text style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
        <TouchableWithoutFeedback onPress={handleBookMark}>
          <Icon
            name={getClasses(favorited)}
            size={30}
            color="#444"
            style={styles.bookmarkIcon}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  bookmarkIcon: {},
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    marginBottom: 7,
  },
  ImageOverlay: {
    width: "100%",
    height: 200,
    position: "absolute",
    backgroundColor: "#333",
    opacity: 0.2,
  },
  imageLocationIcon: {
    position: "absolute",
    marginTop: 4,
    paddingBottom: 3,
    left: 10,
    bottom: 10,
  },
  ImageText: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 16,
    left: 30,
    bottom: 10,
  },
});

export default Card;
