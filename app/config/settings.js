import Constants from "expo-constants";

const settings = {
  dev: {
    //xiomi
    // apiUrl: "http://192.168.31.228:9000/api",
    //mobile
    // apiUrl: "http://192.168.43.61:9000/api",
    //virus
    // apiUrl: "http://192.168.0.104:9000/api",

    apiUrl: "https://dwt-backend.herokuapp.com/api",
    // apiUrl: "http://192.168.0.110:9000/api",
  },
  staging: {
    apiUrl: "https://dwt-backend.herokuapp.com/api",
    // apiUrl: "http://192.168.0.110:9000/api",
  },
  prod: {
    apiUrl: "https://dwt-backend.herokuapp.com/api",
    // apiUrl: "http://192.168.0.110:9000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
