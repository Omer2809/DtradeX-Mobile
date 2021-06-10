import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-expo-image-cache";
import usersApi from "../api/users";
import messagesApi from "../api/messages";
import myApi from "../api/my";

import routes from "../navigation/routes";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import Text from "../components/Text";
import Icon from "../components/Icon";
import useApi from "../hooks/useApi";

function getUrl(entity) {
  return entity?.images && entity.images.length !== 0 && entity.images[0].url;
}
function getThumbnailUrl(entity) {
  return (
    entity?.images &&
    entity.images.length !== 0 &&
    entity.images[0].thumbnailUrl
  );
}

function MessageDetailsScreen({ route, navigation }) {
  const message = route.params;
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [listing, setListing] = useState({});
  const [fromUser, setFromUser] = useState({});

  useEffect(() => {
    console.log("mesg clicked:", message);
    async function fetchData() {
      const { data } = await messagesApi.getChat(
        message.toUser._id,
        message.fromUser._id,
        message.listing._id
      );

      const messages = data.filter(
        (c) => c.participants.filter((u) => u.name === user.name).length != 0
      );

      console.log("mesg clicked:", messages);

      setFromUser(message.fromUser);
      setListing(message.listing);
      setMessages(messages);
    }

    fetchData();
  }, []);

  const handleMessageDelete = async (message, yours) => {
    console.log("in delete yours", yours);

    const originalMessages = messages;
    const newMessages = originalMessages.filter((m) => m._id !== message._id);

    setMessages(newMessages);

    const result = yours
      ? await messagesApi.deleteForAll(message._id)
      : await messagesApi.deleteForMe(message._id);

    if (!result.ok) {
      setMessages(originalMessages);
      return alert("Could not delete the Message");
    }
  };

  const handlePress = (msg) => {
    Alert.alert("Delete", "Are you sure you want to delete this message?", [
      {
        text: "Yes",
        onPress: () =>
          handleMessageDelete(msg, msg.fromUser._id === user.userId),
      },
      { text: "No" },
    ]);
  };

  const handleUpdateMessages = (msg) => {
    const originalMessages = messages;
    const newMessages = [...originalMessages, msg];

    console.log("in update mee:", originalMessages, newMessages);
    setMessages(newMessages);
  };

  return (
    <KeyboardAvoidingView
    // behavior="position"
    // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    // keyboardVerticalOffset={100}
    // style={{ flex: 1 }}
    >
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.IMAGE_VIEW_MESSAGE, message.listing)
          }
        >
          <Image
            style={styles.image}
            preview={{ uri: getThumbnailUrl(listing) }}
            tint="light"
            uri={getUrl(listing)}
          />
          <View style={styles.ImageOverlay}></View>
          <Text style={styles.ImageDescription} numberOfLines={4}>
            <Text style={styles.ImageText}>{listing.title}</Text>
            {`\n`}
            {listing.description}...
          </Text>
        </TouchableOpacity>

        <View style={styles.ImagePrice}>
          <Text style={{ color: colors.white, fontSize: 14 }}>
            Rs.{listing.price}
          </Text>
        </View>
        <Text style={styles.sender}>
          {fromUser.name}({fromUser.email})
        </Text>
        <View style={styles.messagesContainer}>
          {messages?.map((message, index) => (
            <TouchableOpacity onPress={() => handlePress(message)} key={index}>
              <Text
                style={[
                  styles.message,
                  message.fromUser._id === user.userId
                    ? styles.mine
                    : styles.not_mine,
                ]}
                // numberOfLines={4}
              >
                {message.content}
              </Text>
            </TouchableOpacity>
          ))}

          <ContactSellerForm
            listing={listing}
            toId={fromUser._id}
            btnName="Send Reply"
            setUpdateMessages={handleUpdateMessages}
          />
        </View>
      </ScrollView>
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
  profile: {
    width: 37,
    height: 37,
    borderRadius: 40,
    borderWidth: 3,
    // marginVertical: 0,
    // borderColor: "#fff",
  },
  messagesContainer: {
    margin: 20,
    flexDirection: "column",
  },
  message: {
    fontSize: 17,
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    lineHeight: 22,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  mine: {
    marginLeft: 40,
    paddingLeft: 20,
    backgroundColor: colors.secondary,
    alignSelf: "flex-end",
  },
  not_mine: {
    alignSelf: "flex-start",
    marginRight: 40,
    backgroundColor: colors.saved,
  },
  sender: {
    alignSelf: "center",
    marginTop: 20,
    fontStyle: "italic",

    // backgroundColor: colors.saved,
  },
});

export default MessageDetailsScreen;
