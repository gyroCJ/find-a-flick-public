import NetflixLogo_PMS from "../assets/Netflix_Logo_PMS.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import FindAFlickLogo from "./FindAFlickLogo";
import SignOutIcon from "../assets/SignOutIcon.png";
import ChatGptIcon from "../assets/ChatGptIcon.png";
import BrowseIcon from "../assets/BrowseIcon.png";

const Header = () => {
  const navigate = useNavigate();
  const [pathName, setpathName] = useState(window.location.pathname);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleNavigation = () => {
    pathName === "/browse" ? navigate("/gptSearch") : navigate("/browse");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        dispatch(removeUser());
      })
      .catch((error) => {
        // Redirect to error page
        // navigate("/error");
      });
  };
  //This use effect utilises firebase package method to check if the user session
  //is going on and since Header will be present everywhere in our web app
  //the header component will check for the session in this useEffect and will route us accordingly.
  //This is another way of implementing Protected Routes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          })
        );
        pathName === "/gptSearch"
          ? navigate("/gptSearch")
          : navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe to onAuthStateChanges when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <header className="w-screen bg-black sm:bg-opacity-50 px-5 py-3 flex flex-row items-center justify-between">
      {/* <img src={NetflixLogo_PMS} alt="Find a Flick Logo" className="w-28"></img> */}
      <FindAFlickLogo />
      <div className="flex flex-row gap-6">
        {user && (
          <img
            title={pathName === "/browse" ? "GPT Search" : "Browse"}
            alt="GPT Search"
            src={pathName === "/browse" ? ChatGptIcon : BrowseIcon}
            className="cursor-pointer w-7 h-7 sm:w-8 sm:h-8 hover:animate-pulse"
            onClick={handleNavigation}
          ></img>
        )}
        {user && (
          <img
            title="Sign out"
            alt="Sign out"
            src={SignOutIcon}
            className="cursor-pointer w-7 h-7 sm:w-8 sm:h-8 hover:animate-pulse"
            onClick={handleSignOut}
          ></img>
        )}
      </div>
    </header>
  );
};
export default Header;
