import React from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";

function ContactSellerForm({ listing, btnName, toId,setUpdateMessages }) {
  const { user } = useAuth();

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    console.log("in msg from", message);

    if (message.trim().length === 0) Alert.alert("plz enter thr msg..");

    const toUserId = toId || listing.added_by._id;

    const result = await messagesApi.send(
      message,
      listing._id,
      toUserId,
      user.userId
    );

    console.log("in msg", user, result);

    if (toId) setUpdateMessages(result.data);

    // const result = reply
    //   ? await messagesApi.sendReply(message, listing._id, toId, user.userId)
    //   : await messagesApi.send(message, listing._id, user.userId);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert(
        "Error",
        "Could not send the message something went wrong..."
      );
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "Awesome!",
      body: "Your message was sent ...",
    });
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title={btnName} />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
