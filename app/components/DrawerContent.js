import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Image } from "react-native-expo-image-cache";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

import { SidebarData } from "../utility/SidebarData";
import ProfileImage from "./ProfileImage";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";

export function DrawerContent(props) {
  const { user, logOut } = useAuth();
  const getUsersApi = useApi(usersApi.getUser);

  useEffect(() => {
    getUsersApi.request(props.user.userId);
  }, [getUsersApi.data]);

  const handleRemove = async () => {
    const result = await usersApi.deleteImage(user.userId);
    if (!result.ok) {
      return alert("Could not delete the profile");
    }
  };

  const handlePress = () => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "Yes", onPress: () => handleRemove() },
      { text: "No" },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <ImageBackground
            source={require("../assets/cc.jpg")}
            style={{ padding: 16, paddingTop: 48 }}
          >
            {getUsersApi.data && getUsersApi.data.images && getUsersApi.data.images.length !== 0 ? (
              <TouchableWithoutFeedback onPress={handlePress}>
                <View>
                  <Image
                    style={styles.profile}
                    tint="light"
                    preview={{ uri: getUsersApi.data.images[0].thumbnailUrl }}
                    uri={getUsersApi.data.images[0].url}
                  />
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <ProfileImage userId={user.userId} styling={styles.profile} />
            )}
            <Text style={styles.name}>{user.name}</Text>
            <Text style={{ color: "#eee" }}>@{user.email}</Text>
          </ImageBackground>
          <View style={styles.drawerSection}>
            {SidebarData.map((item, index) => {
              return (
                <DrawerItem
                  key={index}
                  icon={({ color, size }) => (
                    <Icon name={item.icon} color={color} size={size} />
                  )}
                  label={item.title}
                  onPress={() => {
                    props.navigation.navigate(routes[item.path]);
                  }}
                />
              );
            })}
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => logOut()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    marginVertical: 0,
    borderColor: "#fff",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
