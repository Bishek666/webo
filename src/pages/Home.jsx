import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AddPost, Posts } from "../features/posts";
import { auth } from "../firebaseConfig";


const Home = () => {
  const [user] = useAuthState(auth);
  
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className={user ? "col-span-7" : "col-span-12"}>
        <Posts />
      </div>
      {user && (
        <div className="col-start-9 col-span-4">
          <AddPost />
        </div>
      )}
    </div>
  );
};

export default Home;
