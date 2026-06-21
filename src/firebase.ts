import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase web config. These values are NOT secret — they ship in the client
// bundle anyway; access is protected by Firebase Auth authorized domains and
// Security Rules. Copy them from:
// Firebase console -> Project settings (gear icon) -> General ->
// Your apps -> SDK setup and configuration.
//
// 👉 Replace each value below with the one from your Firebase project.
const firebaseConfig = {

  apiKey: "AIzaSyAjKX-4WHScRuw2YFhdMi19ZsvvquFR_YI",

  authDomain: "webapp-moddev.firebaseapp.com",

  projectId: "webapp-moddev",

  storageBucket: "webapp-moddev.firebasestorage.app",

  messagingSenderId: "353232318021",

  appId: "1:353232318021:web:6cb0e41e40d533641cfd2c",

  measurementId: "G-NTW001ZMFT"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
