import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBo-fkZ5Ha7cSJgGTfFwKYuYqoIvlWHY8g",
  authDomain: "odorwatch.firebaseapp.com",
  projectId: "odorwatch",
  storageBucket: "odorwatch.firebasestorage.app",
  messagingSenderId: "619247903268",
  appId: "1:619247903268:web:89760c33a6b1c7a03b6eb1",
  measurementId: "G-T1Y6BTKDPC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };