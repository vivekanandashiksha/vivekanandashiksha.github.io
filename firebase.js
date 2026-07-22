// ==========================================================================
// Firebase configuration — Vivekanand Shiksha Niketan Junior High School
// Uses the Firebase "compat" SDK, loaded via <script> tags in each HTML page
// (see teacher-dashboard.html for the required script order).
// ==========================================================================

const firebaseConfig = {
  apiKey: "AIzaSyCpDwXyOhlQyiUhHbcq4HFJgr9JE3Pqpq0",
  authDomain: "vivekananda-school-165cb.firebaseapp.com",
  databaseURL: "https://vivekananda-school-165cb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vivekananda-school-165cb",
  storageBucket: "vivekananda-school-165cb.firebasestorage.app",
  messagingSenderId: "1000569948725",
  appId: "1:1000569948725:web:8201b538cf6542c2bc3f7c",
  measurementId: "G-QMXER6R03E"
};

firebase.initializeApp(firebaseConfig);

// Realtime Database reference used across the dashboard
const db = firebase.database();
