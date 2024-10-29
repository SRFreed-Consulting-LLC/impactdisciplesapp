// This sample application is using 9.22, make sure you are importing the same version

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
// import { getMessaging, isSupported, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-sw.js';

// isSupported().then(isSupported => {
//   if (isSupported) {
//     const app = initializeApp(environment.firebaseConfig);

//     const messaging = getMessaging(app);

//     onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
//       var notificationTitle = title;
//       var notificationOptions = {
//         body: body,
//         icon: image || '/assets/icons/icon-72x72.png',
//         vibrate: [200, 100, 200, 100, 200, 100, 200],
//         tag: "bg"
//       };
//       console.log('about to show notification ' + body)
//       self.registration.showNotification(notificationTitle, notificationOptions);
//     });
//   }
// });

