import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDummyApiKeyForGoogleServices",
  authDomain: "electindia-dummy.firebaseapp.com",
  projectId: "electindia-dummy",
  storageBucket: "electindia-dummy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-DUMMYID123"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
export let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
