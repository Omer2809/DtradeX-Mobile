import React from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./forms";
import listingsApi from "../api/listings";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

function BiddingForm({ listing, btnName, navigation, update }) {
  const { user } = useAuth();

  const handleSubmit = async ({ bid }, { resetForm }) => {
    if (bid <= listing.price)
      return alert("Bid should be greater than the Highest Bid...!!");

    Keyboard.dismiss();

    const result = await listingsApi.updateListingPrice(
      listing._id,
      user.userId,
      bid
    );

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert(
        "Error",
        "Sorry!! Could not add your bid something went wrong..."
      );
    }

    resetForm();
    update(bid, user.name);

    Notifications.presentLocalNotificationAsync({
      title: "Awesome!",
      body: "Thanks for participating!!!....",
    });

    // navigation.goBack();
    // navigation.navigate(routes.LISTINGS, { listing });
  };

  return (
    <Form
      initialValues={{ bid: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        keyboardType="numeric"
        maxLength={8}
        name="bid"
        placeholder="Your Bidding Price..."
        // width={150}
      />
      <SubmitButton title={btnName} />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  bid: Yup.number().required().label("Bid"),
});

export default BiddingForm;
