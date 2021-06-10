import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl, ScrollView } from "react-native";
import _ from "lodash/array";

import ActivityIndicator from "../../components/ActivityIndicator";

import colors from "../../config/colors";
import listingsApi from "../../api/listings";

import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";

import useAuth from "../../auth/useAuth";
import HomeTop from "./HomeTop";
import TopTrending from "./TopTrending";
import AllProducts from "./AllProducts";

function HomeScreen({ route, navigation }) {
  const { user } = useAuth();
  const getListingsApi = useApi(listingsApi.getListings);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    getListingsApi.request();
    setRefreshing(false);
    setCount(count + 1);
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [refreshing, route.params]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        <ScrollView
          style={styles.ScrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        >
          <HomeTop
            name={user.name}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            navigation={navigation}
          />

          {!searchQuery && getListingsApi.data?.length !== 0 && (
            <TopTrending data={getListingsApi.data} navigation={navigation} />
          )}
          <AllProducts
            listingsApi={getListingsApi}
            searchQuery={searchQuery}
            navigation={navigation}
            userId={user.userId}
            count={count}
          />
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.light },
  ScrollView: { flexGrow: 1, height: "100%" },
});

export default HomeScreen;
