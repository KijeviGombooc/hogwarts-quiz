import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { app } from "./firebase-common.js";

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
});
const authForm = document.getElementById("authForm");
const secretContent = document.getElementById("secretContent");

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
    // addData();
    // return;
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
};
signOutButton.addEventListener("click", userSignOut);

var userId

onAuthStateChanged(auth, user => {
    if (user) {
        authForm.style.display = "none";
        secretContent.style.display = "block";
        userId = user.uid;
    } else {
        authForm.style.display = "block";
        secretContent.style.display = "none";
        userId = null;
    }
})

export { userId };