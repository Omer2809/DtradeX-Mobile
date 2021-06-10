import React, { useState, useEffect } from "react";
import { FlatList, View, Alert } from "react-native";

import myApi from "../api/my";
import Screen from "../components/Screen";
import Text from "../components/Text";
import Button from "../components/Button";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import routes from "../navigation/routes";
import messagesApi from "../api/messages";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";

import colors from "../config/colors";

function getChats(messages) {
  return messages.reduce((acc, curr) => {
    if (checkIfAlreadyExist(curr)) return acc;
    return [...acc, curr];

    function checkIfAlreadyExist(currentVal) {
      return acc.some((message) => {
        return (
          message.listing._id === currentVal.listing._id &&
          message.fromUser._id === currentVal.fromUser._id
        );
      });
    }
  }, []);
}

function MessagesScreen({ navigation }) {
  const { user } = useAuth();
  const getMyMessagesApi = useApi(messagesApi.getMyMessages);
  const [refreshing, setRefreshing] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getMyMessagesApi.request();

    setChats(
      getChats(
        getMyMessagesApi.data.filter(
          (c) => c.participants.filter((u) => u.name === user.name).length != 0
        )
      )
      // getChats(getMyMessagesApi.data)
    );

    setRefreshing(false);
    const unsubscribe = navigation.addListener("focus", () => {
      setRefreshing(true);
    });

    setRefreshing(false);
    return unsubscribe;
  }, [refreshing]);

  const handleChatDelete = async (chat) => {
    console.log(chat, chats);
    const originalChats = chats;
    const filteredChats = originalChats.filter((c) => c._id !== chat._id);
    console.log(chats, filteredChats);

    setChats(filteredChats);

    const result = await messagesApi.deleteChat(chat._id);

    if (!result.ok) {
      setChats(originalData);
      return alert("Could not delete the Chat");
    }
  };

  const handlePress = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this Chat?", [
      { text: "Yes", onPress: () => handleChatDelete(item) },
      { text: "No" },
    ]);
  };

  return (
    <>
      <ActivityIndicator visible={getMyMessagesApi.loading} />
      <Screen>
        {getMyMessagesApi.error && (
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <AppText>Couldn't retrieve the Messages.</AppText>
            <Button title="Retry" onPress={getMyMessagesApi.request} />
          </View>
        )}
        {getMyMessagesApi?.data?.length === 0 ? (
          <Text style={{ paddingLeft: 20 }}>
            You Don't have Any messages Yet...
          </Text>
        ) : (
          <>
            <Text
              style={{ paddingLeft: 20, color: "#669900", marginBottom: 10 }}
            >
              You got {chats.length} messages ...
            </Text>
            <FlatList
              data={chats}
              keyExtractor={(message) => message._id}
              renderItem={({ item }) => {
                return item.fromUser?.images?.length !== 0 ? (
                  <ListItem
                    title={item.fromUser?.name}
                    // subTitle={item.content}
                    imageUrl={item.fromUser.images[0]?.url}
                    thumbnailUrl={item.fromUser.images[0]?.thumbnailUrl}
                    onPress={() =>
                      navigation.navigate(routes.MESSAGE_DETAILS, item)
                    }
                    renderRightActions={() => (
                      <ListItemDeleteAction onPress={() => handlePress(item)} />
                    )}
                  />
                ) : (
                  <ListItem
                    title={item.fromUser?.name}
                    // subTitle={item.content}
                    onPress={() =>
                      navigation.navigate(routes.MESSAGE_DETAILS, item)
                    }
                    renderRightActions={() => (
                      <ListItemDeleteAction onPress={() => handlePress(item)} />
                    )}
                    IconComponent={
                      <Icon
                        name={"account-outline"}
                        size={60}
                        backgroundColor={colors.profile}
                      />
                    }
                  />
                );
              }}
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

export default MessagesScreen;
