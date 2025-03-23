import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Your Firebase configuration (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyD1mo1I8KEXOWrrbad_ITE0z-wM5fIueDY",
  authDomain: "iasdb-b56c8.firebaseapp.com",
  projectId: "iasdb-b56c8",
  storageBucket: "iasdb-b56c8.firebasestorage.app",
  messagingSenderId: "1035364535383",
  appId: "1:1035364535383:web:504911504c73d52fe86712",
  measurementId: "G-WY6WMMN571",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch data from a collection
async function fetchDataFromCollection(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() }); // Add document ID to data
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to add login history
async function addLoginHistory(uid) {
  try {
    await addDoc(collection(db, "History"), {
      UID: uid,
      LoginTime: serverTimestamp(),
      LogoutTime: null, // Set to null initially
    });
    console.log("Login history added for UID:", uid);
  } catch (error) {
    console.error("Error adding login history:", error);
  }
}

export { fetchDataFromCollection, addLoginHistory };
