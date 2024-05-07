
import { initializeApp } from "firebase/app";
import { getDatabase, ref as sref, set, onValue } from "firebase/database";
const { value: cookie_usr_info } = useCookie('usr_info');

const firebaseConfig = {
  databaseURL: "https://footballchamp-d2bec-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const get = sref(database, 'messages/' + cookie_usr_info.id);
var userMess= []; 

onValue(get, (snapshot) => {
  userMess = [];
  snapshot.forEach((value) => {
    userMess.push(value.val());
  });
});
export { database,sref, set,userMess };
