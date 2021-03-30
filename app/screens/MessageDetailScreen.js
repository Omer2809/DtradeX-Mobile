import React, { useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-expo-image-cache";
import usersApi from "../api/users";
import myApi from "../api/my";

import routes from "../navigation/routes";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import Text from "../components/Text";
import Icon from "../components/Icon";
import useApi from "../hooks/useApi";

function MessageDetailsScreen({ route, navigation }) {
  const message = route.params;
  const { user } = useAuth();
  const getUsersApi = useApi(usersApi.getUser);
  const getChatsApi = useApi(myApi.getChat);

  useEffect(() => {
    getUsersApi.request(user.userId);
    getChatsApi.request(message.fromUser._id, message.listing._id);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      // keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.IMAGE_VIEW_MESSAGE, message.listing)
        }
      >
        <Image
          style={styles.image}
          preview={{ uri: message.listing.images[0].thumbnailUrl }}
          tint="light"
          uri={message.listing.images[0].url}
        />
        <View style={styles.ImageOverlay}></View>
        <Text style={styles.ImageDescription} numberOfLines={4}>
          <Text style={styles.ImageText}>{message.listing.title}</Text>
          {`\n`}
          {message.listing.description}...
        </Text>
      </TouchableOpacity>
      <View style={styles.ImagePrice}>
        <Text style={{ color: colors.white, fontSize: 14 }}>
          Rs.{message.listing.price}
        </Text>
      </View>
      <View style={styles.userContainer}>
        <View style={{}}>
          <View style={[styles.displayflex]}>
            {message.fromUser.images && message.fromUser.images.length != 0 ? (
              <Image
                style={styles.profile}
                tint="light"
                preview={{ uri: message.fromUser.images[0].thumbnailUrl }}
                uri={message.fromUser.images[0].url}
              />
            ) : (
              <Icon
                name={"account-outline"}
                size={35}
                backgroundColor={colors.medium}
              />
            )}
            <Text
              style={{
                fontSize: 15,
                margin: 5,
                marginHorizontal: 5,
              }}
            >
              {message.fromUser.name} :
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: colors.light,
              marginLeft: 30,
              // paddingHorizontal: 10,
              // paddingTop: 10,
              fontSize: 15,
              padding: 12,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            numberOfLines={4}
          >
            " {message.content} ... "
          </Text>
          {/* {getChatsApi.data.length != 0 && (
            <>
            {console.log(getChatsApi.data)}
              <View style={[styles.displayflex]}>
                {getUsersApi.data && getUsersApi.data.image ? (
                  <Image
                    style={styles.profile}
                    tint="light"
                    preview={{ uri: getUsersApi.data.images[0].thumbnailUrl }}
                    uri={getUsersApi.data.images[0].url}
                  />
                ) : (
                  <Icon
                    name={"account-outline"}
                    size={35}
                    backgroundColor={colors.medium}
                  />
                )}
                <Text
                  style={{
                    fontSize: 15,
                    margin: 8,
                    marginHorizontal: 5,
                  }}
                >
                  {getUsersApi.data.name} :
                </Text>
              </View>
              <Text
                style={{
                  backgroundColor: colors.light,
                  marginLeft: 30,
                  // paddingHorizontal: 10,
                  padding: 12,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                }}
                numberOfLines={4}
              >
                {console.log(getChatsApi.data)}" {getChatsApi.data[0].content}{" "}
                ..."
              </Text>
            </>
          )} */}
        </View>
        <View style={[styles.displayflex]}>
          {getUsersApi.data && getUsersApi.data.image ? (
            <Image
              style={styles.profile}
              tint="light"
              preview={{ uri: getUsersApi.data.images[0].thumbnailUrl }}
              uri={getUsersApi.data.images[0].url}
            />
          ) : (
            <Icon
              name={"account-outline"}
              size={35}
              backgroundColor={colors.medium}
            />
          )}
          <Text
            style={{
              fontSize: 15,
              margin: 7,
            }}
          >
            {getUsersApi.data.name} :
          </Text>
        </View>
        <ContactSellerForm
          listing={message.listing}
          reply
          toId={message.fromUser && message.fromUser._id}
          btnName="Send Reply"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  displayflex: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  ImageOverlay: {
    width: "100%",
    height: 250,
    position: "absolute",
    backgroundColor: "#333",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.3,
  },

  ImageText: {
    position: "absolute",
    color: "#fff",
    // textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 22,
  },
  ImagePrice: {
    position: "absolute",
    backgroundColor: colors.primary,
    right: 20,
    // top: 50,
    // right: 135,
    top: 225,
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
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userContainer: {
    margin: 20,
  },
  profile: {
    width: 37,
    height: 37,
    borderRadius: 40,
    borderWidth: 3,
    // marginVertical: 0,
    // borderColor: "#fff",
  },
});

export default MessageDetailsScreen;
