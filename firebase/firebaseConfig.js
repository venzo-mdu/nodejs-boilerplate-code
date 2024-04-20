import { initializeApp } from "firebase/app";
import "firebase/database";

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGIN_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

const firebase = initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGIN_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
});
console.log("firebase connected");

export default firebase;
