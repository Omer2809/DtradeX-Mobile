import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";

import * as Yup from "yup";

import categoriesApi from "../../api/categories";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../components/forms";
import CategoryPickerItem from "../../components/CategoryPickerItem";
import Screen from "../../components/Screen";
import FormImagePicker from "../../components/forms/FormImagePicker";
import listingsApi from "../../api/listings";
import useLocation from "../../hooks/useLocation";
import UploadScreen from "../UploadScreen";
import routes from "../../navigation/routes";
import useAuth from "../../auth/useAuth";
import ImageShow from "../../components/ImageShow";
import { setItemAsync } from "expo-secure-store";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(2).label("Title"),
  price: Yup.number().required().min(2).max(100000).label("Price"),
  // days: Yup.number().min(1).max(2).label("No of days"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  bidding: Yup.object().required().nullable().label("Bidding"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const boolArray = [
  {
    _id: 1,
    icon: "check",
    backgroundColor: "green",
    label: "Yes",
    value: "yes",
  },
  {
    _id: 2,
    icon: "close",
    backgroundColor: "red",
    label: "No",
    value: "No",
  },
];

function ListingNewAddScreen({ route, navigation }) {
  const getCategoriesApi = useApi(categoriesApi.getCategories);
  const { user } = useAuth();
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bid, setBid] = useState("");
  // const [shift, setShift] = useState(new Animated.Value(0));

  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await listingsApi.addListing(
      { ...listing, location, userId: user.userId },
      (progress) => setProgress(progress)
    );

    console.log("resutk:" + result);

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
    navigation.navigate(routes.LISTINGS, { listing });
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <UploadScreen
            onDone={() => setUploadVisible(false)}
            progress={progress}
            visible={uploadVisible}
          />
          <Form
            initialValues={{
              title: "",
              price: "",
              days: "",
              description: "",
              category: null,
              bidding: null,
              images: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="images" />
            <FormField maxLength={255} name="title" placeholder="Title" />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="price"
              placeholder="Price"
              width={120}
            />
            <Picker
              items={getCategoriesApi.data}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Category"
              width="50%"
            />
            <Picker
              items={boolArray}
              name="bidding"
              numberOfColumns={2}
              PickerItemComponent={CategoryPickerItem}
              onBid={setBid}
              placeholder="Bidding"
              width="50%"
            />
            {bid === "Yes" && (
              <FormField
                keyboardType="numeric"
                maxLength={2}
                name="days"
                placeholder="No. of Days"
                width={150}
              />
            )}
            <FormField
              // maxLength={255}
              multiline
              width={250}
              name="description"
              numberOfLines={3}
              placeholder="Description"
            />
            <SubmitButton title="Post" />
          </Form>
        </ScrollView>
        {/* </KeyboardAwareScrolView> */}
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingNewAddScreen;
