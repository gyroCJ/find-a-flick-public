import Header from "./Header";
import { useState, useRef } from "react";
import Homepage_Background from "../assets/Homepage_Background.jpg";
import { fullNameValidationBypassString } from "../utils/FormValidation";
import { validateForm } from "../utils/FormValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  //Variables
  const [isSignIn, setisSignIn] = useState(false);
  const [formErrorMessage, setformErrorMessage] = useState(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  //Functions
  const toggleSignInPage = () => {
    setformErrorMessage(null);
    setisSignIn((prev) => !prev);
  };

  const handleSignUp = () => {
    const formStatus = validateForm(
      fullName.current.value,
      email.current.value,
      password.current.value
    );
    setformErrorMessage(formStatus);
    //If there is a message in formStatus, stop the function execution and do no not
    //proceed with sign up
    if (formStatus) return;
    //If formStatus===null, proceed with sign up process
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: fullName.current.value,
        })
          .then(() => {
            // Profile updated
            dispatch(
              addUser({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
              })
            );
          })
          .catch((error) => {
            setformErrorMessage(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setformErrorMessage(errorCode + " - " + errorMessage);
        // ..
      });
  };

  const handleSignIn = () => {
    const formStatus = validateForm(
      fullNameValidationBypassString,
      email.current.value,
      password.current.value
    );
    setformErrorMessage(formStatus);
    //If there is a message in formStatus, stop the function execution and do no not
    //proceed with sign in
    if (formStatus) return;
    //If formStatus===null, proceed with sign in process
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(
          addUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setformErrorMessage(errorCode + " - " + errorMessage);
      });
  };

  return (
    <div id="login-page" className="h-screen w-screen relative flex flex-col">
      <div
        id="background-image"
        className="bg-cover block h-full min-h-screen overflow-hidden absolute w-full -z-10"
      >
        <img
          src={Homepage_Background}
          alt="Find a Flick background"
          className="min-h-full min-w-full overflow-clip"
        />
      </div>
      <div
        id="transparent-black-layer"
        className="absolute h-screen w-screen bg-black opacity-25 z-0"
      ></div>
      <header className="z-20">
        <Header />
      </header>
      <section className="z-10 bg-black text-white h-screen w-screen px-5 py-2 flex flex-col sm:w-96 sm:h-auto sm:absolute sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-12 sm:py-10 sm:rounded-lg sm:bg-opacity-80">
        <p className="text-3xl mb-7 font-semibold">
          {!isSignIn ? "Sign Up" : "Sign In"}
        </p>
        {!isSignIn && (
          <input
            ref={fullName}
            type="text"
            className="w-full bg-[#1b1b1a] text-white border border-[#61615e] px-3 py-3 rounded-md mb-5"
            placeholder="Full name"
          ></input>
        )}
        <input
          ref={email}
          type="email"
          className="w-full bg-[#1b1b1a] text-white border border-[#61615e] px-3 py-3 rounded-md mb-5"
          placeholder="Email address"
        ></input>
        <input
          ref={password}
          type="password"
          className="w-full bg-[#1b1b1a] text-white border border-[#61615e] px-3 py-3 rounded-md mb-5"
          placeholder="Password"
        ></input>
        {isSignIn && (
          <button
            onClick={handleSignIn}
            className="font-semibold w-full bg-[#339989] text-white rounded-md py-2 mb-5"
          >
            Sign In
          </button>
        )}
        {!isSignIn && (
          <button
            onClick={handleSignUp}
            className="font-semibold w-full bg-[#339989] text-white rounded-md py-2 mb-5"
          >
            Sign Up
          </button>
        )}
        {formErrorMessage !== null && (
          <p className="mb-5 text-[#ffb4c4]">{formErrorMessage} *</p>
        )}
        <div className="flex flex-row gap-3 items-center">
          <p>{!isSignIn ? "Already registered ?" : "New user ?"}</p>
          <button
            onClick={toggleSignInPage}
            className="hover:underline font-semibold"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </section>
    </div>
  );
};
export default Login;
