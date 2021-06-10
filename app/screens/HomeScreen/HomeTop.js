import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { Feather } from "@expo/vector-icons";

import SearchBox from "../../components/searchBox";
import routes from "../../navigation/routes";

function HomeTop({ name, searchQuery, onSearch, navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={{ width: "100%", height: 270 }}
      imageStyle={{ borderBottomRightRadius: 65 }}
    >
      <View style={styles.DarkOverlay}></View>
      <View style={styles.searchContainer}>
        <Text style={styles.UserGreet}>Hi {name.trim().split(" ")[0]}</Text>
        <Text style={styles.UserText}>What would you like to buy today?</Text>
      </View>
      <View>
        <SearchBox value={searchQuery} onChangeText={onSearch} />
        <Feather
          name="search"
          size={22}
          color="#666"
          style={styles.searchIcon}
        />
      </View>
      <Feather
        name="menu"
        size={22}
        color="#fff"
        style={styles.menuIcon}
        onPress={() => navigation.openDrawer()}
      />

      <Feather
        name="bell"
        size={22}
        color="#fff"
        style={styles.bellIcon}
        onPress={() => navigation.navigate(routes.MESSAGES)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  DarkOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 270,
    backgroundColor: "#000",
    opacity: 0.2,
    borderBottomRightRadius: 65,
  },
  searchContainer: { paddingTop: 100, paddingLeft: 16 },
  UserGreet: { fontSize: 38, fontWeight: "bold", color: "#fff" },
  UserText: { fontSize: 16, fontWeight: "normal", color: "#fff" },
  searchBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingLeft: 24,
    padding: 12,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: "90%",
  },
  bellIcon: { position: "absolute", top: 40, right: 30 },
  menuIcon: { position: "absolute", top: 40, left: 16 },
  searchIcon: { position: "absolute", top: 30, right: 60, opacity: 0.6 },
});

export default HomeTop;
