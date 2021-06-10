import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import _ from "lodash/array";

import myApi from "../../api/my";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import listingsApi from "../../api/listings";
import routes from "../../navigation/routes";
import ListItemEditAction from "../../components/lists/ListItemEditAction";
import ActivityIndicator from "../../components/ActivityIndicator";
import getTrendingData from "../../utility/getTrendingData";
import AppText from "../../components/Text";

import Button from "../../components/Button";

function MyListingsScreen({ navigation }) {
  const getMyListingsApi = useApi(myApi.getMyListings);
  const getListingsApi = useApi(listingsApi.getListings);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyListingsApi.request();
    getListingsApi.request();
    setRefreshing(false);
    const unsubscribe = navigation.addListener("focus", () => {
      setRefreshing(true);
    });

    setRefreshing(false);
    return unsubscribe;
  }, [refreshing]);

  const handleDelete = async (listing) => {
    const originalData = getMyListingsApi.data;
    const listings = originalData.filter((l) => l._id !== listing._id);
    getMyListingsApi.setData(listings);

    const result = await listingsApi.deleteListing(listing._id);

    if (!result.ok) {
      getMyListingsApi.setData(originalData);
      return alert("Could not delete the listing");
    }
  };

  const handlePress = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this Listing?", [
      { text: "Yes", onPress: () => handleDelete(item) },
      { text: "No" },
    ]);
  };

  return (
    <>
      <ActivityIndicator visible={getMyListingsApi.loading} />
      <Screen>
        {getMyListingsApi.error && (
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <AppText>Couldn't retrieve your listings.</AppText>
            <Button title="Retry" onPress={getMyListingsApi.request} />
          </View>
        )}
        {getMyListingsApi.data?.length === 0 ? (
          <Text style={{ paddingLeft: 20 }}>
            You Don't have Any Listings Yet...
          </Text>
        ) : (
          <>
            <Text style={{ paddingLeft: 20, marginBottom: 10 }}>
              Showing {getMyListingsApi.data?.length} items in your listings...
            </Text>
            <FlatList
              data={getMyListingsApi.data}
              keyExtractor={(listing) => listing._id}
              renderItem={({ item }) => (
                <ListItem
                  title={item.title}
                  subTitle={"Rs." + item.price}
                  imageUrl={item.images[0] && item.images[0].url}
                  onPress={() =>
                    navigation.navigate(routes.LISTING_DETAILS, {
                      listing: item,
                      data: getTrendingData(getListingsApi.data),
                    })
                  }
                  thumbnailUrl={item.images[0]?.thumbnailUrl}
                  renderRightActions={() => (
                    <ListItemDeleteAction onPress={() => handlePress(item)} />
                  )}
                  renderLeftActions={() => (
                    <ListItemEditAction
                      onPress={() =>
                        navigation.navigate(routes.LISTING_EDIT, item)
                      }
                    />
                  )}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});

export default MyListingsScreen;
