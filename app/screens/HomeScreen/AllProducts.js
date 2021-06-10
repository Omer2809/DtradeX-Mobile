import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Button from "../../components/Button";
import Card from "../../components/Card";
import routes from "../../navigation/routes";

import AppText from "../../components/Text";

import getSearchData from "../../utility/getSearchData";
import getTrendingData from "../../utility/getTrendingData";

function AllProducts({userId ,searchQuery, listingsApi,count, navigation }) {
  return (
    <View>
      <Text style={styles.heading}>
        {searchQuery
          ? getSearchData(searchQuery, listingsApi.data).length === 0
            ? "No Products Found..."
            : "Search Result..."
          : "Top Products"}
      </Text>
      {listingsApi.error && (
        <View style={styles.errorMsg}>
          <AppText>Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={listingsApi.request} />
        </View>
      )}
      <FlatList
        data={getSearchData(searchQuery, listingsApi.data)}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"Rs." + item.price}
            imageUrl={
              item.images[0]
                ? item.images[0].url
                : "https://res.cloudinary.com/deqjuoahl/image/upload/v1602501994/dev_setups/iwhu97c1fezqwfwf0nfk.png"
            }
            // onBookMark={handleBookMark}
            itemId={item._id}
            userId={userId}
            count={count}
            onPress={() =>
              navigation.navigate(routes.LISTING_DETAILS, {
                listing: item,
                data: getTrendingData(listingsApi.data),
              })
            }
            thumbnailUrl={item.images[0]?.thumbnailUrl}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { padding: 20, fontSize: 22, fontWeight: "bold" },
  errorMsg: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
});

export default AllProducts;
