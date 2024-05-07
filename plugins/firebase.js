
import { initializeApp } from "firebase/app";
import { getDatabase, ref as sref, set } from "firebase/database";
  
const firebaseConfig = {
  databaseURL: "https://footballchamp-d2bec-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database, sref, set };
