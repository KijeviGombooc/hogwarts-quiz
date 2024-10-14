import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth = getAuth(app);
const authForm = document.getElementById("authForm");
const secretContent = document.getElementById("secretContent");
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
});
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const authError = document.getElementById("authError");

const userSignIn = async () => {
    try {
        const user = await signInWithPopup(auth, googleAuthProvider);
        console.log(user);
    } catch (error) {
        console.log(error);
        authError.textContent = error.message;
        signOut(auth);
    }
}
signInButton.addEventListener("click", userSignIn);

const userSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
};
signOutButton.addEventListener("click", userSignOut);

onAuthStateChanged(auth, user => {
    if (user) {
        authForm.style.display = "none";
        secretContent.style.display = "block";
    } else {
        authForm.style.display = "block";
        secretContent.style.display = "none";
    }
})