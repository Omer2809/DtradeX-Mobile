import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ListingDetailsScreen from "../screens/listingScreens/ListingDetailsScreen";
import ViewImageScreen from "../screens/ViewImageScreen";
import ListingEditScreen from "../screens/listingScreens/ListingEditScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyListingsScreen from "../screens/account/MyListingsScreen";
import FavoritesScreen from "../screens/account/FavoritesScreen";
import MessageDetailsScreen from "../screens/MessageDetailScreen";
// import Home from "../components/home";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={HomeScreen} />
    {/* <Stack.Screen name="Home" component={Home} /> */}
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="ImageView" component={ViewImageScreen} />
    <Stack.Screen name="ListingEdit" component={ListingEditScreen} />
    <Stack.Screen
      name="MyListings"
      component={MyListingsScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="Saved"
      component={FavoritesScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen name="MessageDetails" component={MessageDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
