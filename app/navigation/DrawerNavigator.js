import React from "react";
import { View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppNavigator from "./AppNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/listingScreens/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import { DrawerContent } from "../components/DrawerContent";
import useAuth from "../auth/useAuth";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { user } = useAuth();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} user={user} />}
    >
      <Drawer.Screen name="HomeDrawer" component={AppNavigator} />
      <Drawer.Screen name="Feed" component={FeedNavigator} />
      <Drawer.Screen name="ListingNew" component={ListingEditScreen} />
      <Drawer.Screen name="Account" component={AccountNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DrawerNavigator;
