import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyARWO8_HF2geiFSH__xHPdwB7LaBBZ15aQ",
    authDomain: "hogwarts-quiz-a6974.firebaseapp.com",
    projectId: "hogwarts-quiz-a6974",
    storageBucket: "hogwarts-quiz-a6974.appspot.com",
    messagingSenderId: "646239438739",
    appId: "1:646239438739:web:d472cd1ae57d138534ca66",
    measurementId: "G-68Y7DPTV1R"
};

const app = initializeApp(firebaseConfig);
export { app };