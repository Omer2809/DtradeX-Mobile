import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Image } from "react-native-expo-image-cache";
import routes from "../navigation/routes";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";

function ListingDetailsScreen({ route, navigation }) {
  const { user } = useAuth();
  const { listing, data } = route.params;
  console.log(route.params);

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.IMAGE_VIEW, listing)}
      >
        <Image
          style={styles.image}
          preview={{ uri: listing.images[0].thumbnailUrl }}
          tint="light"
          uri={listing.images[0].url}
        />
        <View style={styles.ImageOverlay}></View>
        <Text style={styles.ImageDescription}>
          <Text style={styles.ImageText}>{listing.title}</Text>
          {`\n`}
          {listing.description.substring(0, 180)}
          ....
        </Text>
      </TouchableOpacity>
      <View style={styles.ImagePrice}>
        <Text style={{ color: colors.white, fontSize: 14 }}>
          Rs.{listing.price}
        </Text>
      </View>
      <View style={styles.ImageCategory}>
        <Icon
          name="tag"
          backgroundColor={colors.primary}
          size={20}
          color="#fff"
        />
        <Text style={{ color: colors.white, fontSize: 14 }}>
          {listing.categoryId.label}
        </Text>
      </View>
      <View
        onStartShouldSetResponder={() => navigation.goBack()}
        style={{ fontWeight: "bold", position: "absolute", top: 55, left: 25 }}
      >
        <Icon
          name="arrow-left"
          backgroundColor={colors.primary}
          size={45}
          color="#fff"
        />
      </View>
      <View style={{ paddingTop: 8 }}>
        <ListItem
          title={listing.added_by.name}
          subTitle={`${listing.added_by.listingCount} Listings`}
          imageUrl={
            listing.added_by.images[0] && listing.added_by.images[0].url
          }
          thumbnailUrl={
            listing.added_by.images[0] &&
            listing.added_by.images[0].thumbnailUrl
          }
        />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <ContactSellerForm listing={listing} btnName="Contact  Seller" />
      </View>
      {/* {user.userId !== listing.added_by._id ? (
        <View style={{ paddingHorizontal: 20 }}>
          <ContactSellerForm listing={listing} btnName="Contact  Seller" />
        </View>
      ) : (
        <View>
          <View style={{ paddingBottom: 7, paddingLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Top Trending
            </Text>
          </View>
          <FlatList
            horizontal
            data={data}
            keyExtractor={(listing) => listing._id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingLeft: 16 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routes.LISTING_DETAILS, {
                        listing: item,
                        data: data,
                      })
                    }
                  >
                    <Image
                      tint="light"
                      preview={{ uri: item.images[0].thumbnailUrl }}
                      uri={item.images[0].url}
                      style={{
                        width: 130,
                        marginRight: 5,
                        height: 190,
                        borderRadius: 10,
                      }}
                    />
                    <View style={styles.detailImageOverlay} />
                    <Text style={styles.detailImageText}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )} */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 440,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  ImageOverlay: {
    width: "100%",
    height: 440,
    position: "absolute",
    backgroundColor: "#333",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.3,
  },
  ImageText: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
  ImageCategory: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: colors.primary,
    // right: 18,
    right: 135,
    top: 419,
    paddingVertical: 10,
    paddingRight: 16,
    paddingLeft: 10,
    borderRadius: 40,
    zIndex: 50,
  },
  ImagePrice: {
    position: "absolute",
    backgroundColor: colors.primary,
    right: 30,
    top: 419,
    zIndex: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 40,
  },
  ImageDescription: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontWeight: "600",
    fontSize: 18,
    paddingRight: 40,
    left: 30,
    bottom: 25,
  },
  detailImageOverlay: {
    width: 130,
    height: 190,
    marginRight: 8,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#222",
    opacity: 0.2,
  },
  detailImageText: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontSize: 14,
    left: 10,
    bottom: 20,
  },
});

export default ListingDetailsScreen;
