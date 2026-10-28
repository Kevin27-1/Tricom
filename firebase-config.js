// Tri-Com Recycling - Central Firebase Cloud Sync Configuration
(function() {
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAno_cYaooUWlAsjUpyScY2_Tr-Qk5qBmU",
    authDomain: "tricom-recycling.firebaseapp.com",
    projectId: "tricom-recycling",
    storageBucket: "tricom-recycling.firebasestorage.app",
    messagingSenderId: "914494493432",
    appId: "1:914494493432:web:bfc2b9806113defcdca10d"
  };

  const FIRESTORE_REST_BASE = 'https://firestore.googleapis.com/v1/projects/tricom-recycling/databases/(default)/documents';

  let tricomDb = null;

  function initTricomFirebase() {
    if (tricomDb) return tricomDb;
    try {
      if (window.firebase) {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        tricomDb = firebase.firestore();

        try {
          tricomDb.enablePersistence({ synchronizeTabs: true }).catch((err) => {
            if (err.code === 'failed-precondition') {
              console.info('Firestore tab sync active');
            } else if (err.code === 'unimplemented') {
              console.info('IndexedDB offline persistence not available');
            }
          });
        } catch (e) {}

        console.log('✓ Tri-Com Firebase Cloud Firestore initialized successfully.');
        return tricomDb;
      }
    } catch (err) {
      console.warn('Firebase SDK initialization notice:', err);
    }
    return null;
  }

  // Attempt immediate initialization
  if (window.firebase) {
    initTricomFirebase();
  }

  window.FIREBASE_CONFIG = FIREBASE_CONFIG;
  window.FIRESTORE_REST_BASE = FIRESTORE_REST_BASE;
  window.initTricomFirebase = initTricomFirebase;
  window.getTricomDb = function() {
    return tricomDb || initTricomFirebase();
  };
})();

