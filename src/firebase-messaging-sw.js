// This sample application is using 9.22, make sure you are importing the same version

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getMessaging, isSupported, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-sw.js';

const firebaseConfig = {
  apiKey: "AIzaSyDRfdv2XgpLQ-ll2oxpEEMyhtC75rzkP4c",
  authDomain: "impactdisciples-a82a8.firebaseapp.com",
  projectId: "impactdisciples-a82a8",
  storageBucket: "impactdisciples-a82a8.appspot.com",
  messagingSenderId: "562759240809",
  appId: "1:562759240809:web:7d6fa117db35b887b6a6f8",
  measurementId: "G-KJL13HB8DV"
};

isSupported().then(isSupported => {
  if (isSupported) {
    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
      self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
    });
  }
});

