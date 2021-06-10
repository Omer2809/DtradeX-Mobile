import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MessageDetailScreen from "../screens/MessageDetailScreen";
import MyListingsScreen from "../screens/account/MyListingsScreen";
import ListingEditScreen from "../screens/listingScreens/ListingEditScreen";
import ViewImageScreen from "../screens/ViewImageScreen";
import FavoritesScreen from "../screens/account/FavoritesScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="MyListings" component={MyListingsScreen} />
    <Stack.Screen name="Saved" component={FavoritesScreen} />
    <Stack.Screen name="MessageDetails" component={MessageDetailScreen} />
    <Stack.Screen name="ImageViewMessage" options={{ headerShown: false }} component={ViewImageScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
