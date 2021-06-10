import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Image } from "react-native-expo-image-cache";
import routes from "../../navigation/routes";
import colors from "../../config/colors";
import ContactSellerForm from "../../components/ContactSellerForm";
import ListItem from "../../components/lists/ListItem";
import Text from "../../components/Text";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import useAuth from "../../auth/useAuth";
import Icon from "../../components/Icon";
import BiddingForm from "../../components/BiddingForm";
import TopImage from "./listingDetails/TopImage";
import FeaturesBox from "./listingDetails/featuresBox";
import getTime from "../../utility/getTime";

function ListingDetailsScreen({ route, navigation }) {
  const { user } = useAuth();
  const { listing, data } = route.params;
  // console.log(route.params);
  const [modalOpen, setModalOpen] = useState(false);
  const [bidder, setBidder] = useState("owner");
  const [bid, setBid] = useState(listing.price);

  const update = (newBid, newBidder) => {
    setModalOpen(false);
    setBid(newBid);
    setBidder(newBidder);
  };

  return (
    <KeyboardAvoidingView
    // behavior="position"
    // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    // style={{ flex: 1 }}
    >
      <ScrollView>
        <TopImage navigation={navigation} listing={listing} />
        <FeaturesBox listing={listing} bid={bid} bidder={bidder} />

        {listing.bidding === "Yes" &&
          getTime(listing.days, listing.createdAt) > 0 && (
            <TouchableOpacity onPress={() => setModalOpen(true)}>
              <Text style={styles.btnBid}> Bid Now </Text>
            </TouchableOpacity>
          )}

        <View
          onStartShouldSetResponder={() => navigation.goBack()}
          style={styles.arrow}
        >
          <Icon
            name="arrow-left"
            backgroundColor={colors.primary}
            size={45}
            color="#fff"
          />
        </View>

        <Modal visible={modalOpen}>
          <View style={{ flex: 1, margin: 20 }}>
            <MaterialIcons
              name="close"
              size={30}
              style={styles.modalClose}
              onPress={() => setModalOpen(false)}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                paddingLeft: 30,
                marginTop: 40,
              }}
            >
              Add your Bid :
            </Text>
            <View style={{ paddingHorizontal: 20 }}>
              <BiddingForm
                listing={listing}
                update={update}
                btnName="Place Bid"
              />
            </View>
          </View>
        </Modal>

        <View style={{}}>
          {listing.added_by.images?.length !== 0 ? (
            <ListItem
              title={listing.added_by.name}
              subTitle={`${listing.added_by.listingCount} Listings`}
              imageUrl={listing.added_by.images[0]?.url}
              thumbnailUrl={listing.added_by.images[0]?.thumbnailUrl}
            />
          ) : (
            <ListItem
              title={listing.added_by.name}
              subTitle={`${listing.added_by.listingCount} Listings`}
              IconComponent={
                <Icon
                  name={"account-outline"}
                  size={60}
                  backgroundColor={colors.medium}
                />
              }
            />
          )}
        </View>

        {user.userId !== listing.added_by._id ? (
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
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontWeight: "bold",
    position: "absolute",
    top: 55,
    left: 25,
  },
  btnBid: {
    marginHorizontal: 30,
    backgroundColor: "blue",
    color: "white",
    textAlign: "center",
    borderRadius: 20,
    paddingVertical: 15,
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
  modalClose: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default ListingDetailsScreen;
