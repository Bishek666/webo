import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../../firebaseConfig";

const Likes = (likeProp) => {
  const { id, likes, className } = likeProp;
  const [user] = useAuthState(auth);
  const likesRef = doc(db, "Post", id);

  const likeIncluded = likes?.includes(user?.uid);
  const totalLikes = likes?.length;

  const onClickLike = async () => {
    if (likeIncluded) {
      try {
        await updateDoc(likesRef, {
          likes: arrayRemove(user?.uid),
        });
      } catch (err) {
        toast(err.code, { type: "error" });
      }
    } else {
      try {
        await updateDoc(likesRef, {
          likes: arrayUnion(user?.uid),
        });
      } catch (err) {
        if (!user?.uid) {
          return toast("SignIn to like posts", { type: "error" });
        }
        toast(err.code, { type: "error" });
      }
    }
  };

  return (
    <div className={`${className}`}>
      <FontAwesomeIcon
        icon={faThumbsUp}
        beat={!likeIncluded}
        className={`${
          likeIncluded ? "text-blue-500" : "text-gray-600"
        } font-semibold mr-2`}
        onClick={onClickLike}
      />
      <span className="text-teal-500 shadow-neuMorphismShadow rounded-lg px-4 py-8 cursor-auto">
        {totalLikes}
      </span>
    </div>
  );
};

export default Likes;
