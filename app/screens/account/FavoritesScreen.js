import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import Screen from "../../components/Screen";
import Text from "../../components/Text";
import Button from "../../components/Button";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import routes from "../../navigation/routes";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/Text";
import myApi from "../../api/my";
import favoritesApi from "../../api/favorites";
import listingsApi from "../../api/listings";
import getTrendingData from "../../utility/getTrendingData";

function FavoritesScreen({ navigation }) {
  const getFavoritesApi = useApi(myApi.getFavorites);
  const getListingsApi = useApi(listingsApi.getListings);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getFavoritesApi.request();
    getListingsApi.request();
    setRefreshing(false);
    const unsubscribe = navigation.addListener("focus", () => {
      setRefreshing(true);
    });

    setRefreshing(false);
    return unsubscribe;
  }, [refreshing]);

  const handleDelete = async (favorite) => {
    const originalData = getFavoritesApi.data;
    const favorites = originalData.filter((l) => l._id !== favorite._id);
    getFavoritesApi.setData(favorites);

    const result = await favoritesApi.deleteFavorite(favorite._id);

    if (!result.ok) {
      getFavoritesApi.setData(originalData);
      return alert("Could not delete the favorite");
    }
  };

  const handleSelect = async (listingId) => {
    console.log("selected:", listingId);
    const result = await listingsApi.getListing(listingId);

    if (!result.ok) {
      return alert("Could not get the product details...");
    }

    navigation.navigate(routes.LISTING_DETAILS, {
      listing: result.data,
      data: getTrendingData(getListingsApi.data),
    });
  };

  return (
    <>
      <ActivityIndicator visible={getFavoritesApi.loading} />
      <Screen>
        {getFavoritesApi.error && (
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <AppText>Couldn't retrieve the saved products...</AppText>
            <Button title="Retry" onPress={getFavoritesApi.request} />
          </View>
        )}
        {getFavoritesApi.data.length === 0 ? (
          <Text style={{ paddingLeft: 20 }}>
            you haven't saved any product...
          </Text>
        ) : (
          <>
            <Text
              style={{ paddingLeft: 20, color: "#669966", marginBottom: 10 }}
            >
              {getFavoritesApi.data.length} products saved ...
            </Text>
            {/* {console.log(getFavoritesApi.data)} */}
            <FlatList
              data={getFavoritesApi.data}
              keyExtractor={(favorite) => favorite._id}
              renderItem={({ item }) => (
                <ListItem
                  title={item.listing?.title}
                  subTitle={item.listing?.description}
                  imageUrl={item.listing?.images[0]?.url}
                  // thumbnailUrl={
                  //   item.listing.images[0] &&
                  //   item.listing.images[0].thumbnailUrl
                  // }
                  onPress={() => handleSelect(item.listing?._id)}
                  renderRightActions={() => (
                    <ListItemDeleteAction onPress={() => handleDelete(item)} />
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

export default FavoritesScreen;
