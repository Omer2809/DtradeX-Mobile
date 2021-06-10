import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../../../config/colors";
import Icon from "../../../components/Icon";
import getTime from "../../../utility/getTime";

function FeaturesBox({ listing, bid, bidder }) {
  return (
    <View style={styles.container}>
      <View style={[styles.flex, { marginBottom: 5 }]}>
        <View style={styles.box}>
          <Icon
            name={listing.categoryId.icon}
            backgroundColor={listing.categoryId.backgroundColor}
            size={28}
            color="#fff"
          />
          {console.log(listing.categoryId)}
          <Text style={styles.value}>{listing.categoryId.label}</Text>
        </View>

        {listing.bidding === "Yes" &&
        getTime(listing.days, listing.createdAt) <= 0 ? (
          <>
            <View
              style={[
                styles.box,
                {
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  paddingHorizontal: 20,
                },
              ]}
            >
              <Text style={styles.titleUp}>Status </Text>
              <Text style={styles.value}>
                SOLD (
                {listing.bidder === "none" || bidder !== listing.bidder
                  ? bidder
                  : listing.bidder}
                )
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.titleDown}>Highest Bid</Text>
              <Text style={styles.value}>Rs.{bid}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.box, { borderLeftWidth: 1, paddingLeft: 10 }]}>
              <Text style={styles.titleUp}>Price</Text>
              <Text style={styles.value}>&#8377;{listing.price}</Text>
            </View>
            <View
              style={[
                styles.box,
                {
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  paddingHorizontal: 20,
                },
              ]}
            >
              <Text style={styles.titleUp}>Bidding</Text>
              <Text style={styles.value}>
                {listing.bidding === "Yes" ? "available" : "not available"}
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.titleUp}>Status</Text>
              <Text style={styles.value}>In Stock</Text>
            </View>
          </>
        )}
      </View>

      {listing.bidding === "Yes" &&
        getTime(listing.days, listing.createdAt) > 0 && (
          <View style={[styles.flex, { borderTopWidth: 1, paddingTop: 5 }]}>
            <View style={styles.box}>
              <Text style={styles.titleDown}>Highest Bid</Text>
              <Text style={styles.value}>Rs.{bid}</Text>
            </View>
            <View
              style={[
                styles.box,
                {
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  paddingHorizontal: 10,
                },
              ]}
            >
              <Text style={styles.titleDown}> Highest Bidder</Text>
              <Text style={styles.value}>
                {console.log(listing.bidder, bidder)}
                {listing.bidder === "none" || bidder !== listing.bidder
                  ? bidder
                  : listing.bidder}
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.titleDown}> Time Left</Text>
              <Text style={styles.value}>
                {getTime(listing.days, listing.createdAt)} days
              </Text>
            </View>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  value: { fontSize: 14, fontWeight: "bold" },
  titleDown: { fontSize: 15 },
  titleUp: { fontSize: 16 },
  container: {
    backgroundColor: "#eef",
    color: "#222",
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 10,
    borderRadius: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  box: { display: "flex", justifyContent: "center", alignItems: "center" },
});

export default FeaturesBox;
