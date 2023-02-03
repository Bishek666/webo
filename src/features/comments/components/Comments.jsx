import { async } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { v4 as uniqueCommentId } from "uuid";
import { auth, db } from "../../../firebaseConfig";
import DeleteButton from "../../../components/button/DeleteButton";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [currentlyLoggedinUser] = useAuthState(auth);
  const docRef = doc(db, "Post", id);

  const onHandleDeleteComment = async (comment) => {
    try {
      await updateDoc(docRef, {
        comments: arrayRemove(comment),
      });
    } catch (err) {
      toast(err.code, { type: "error" });
    }
  };

  const onHandleKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        await updateDoc(docRef, {
          comments: arrayUnion({
            user: currentlyLoggedinUser?.uid,
            userName: currentlyLoggedinUser?.displayName,
            comment,
            createdAt: new Date(),
            commentId: uniqueCommentId(),
          }),
        });
      } catch (err) {
        toast(err.code, { type: "error" });
      } finally {
        setComment("");
      }
    }
  };

  useEffect(() => {
    onSnapshot(docRef, (snapShot) => {
      setComments(snapShot.data().comments ?? []);
    });
  }, []);

  return (
    <div>
      {currentlyLoggedinUser && (
        <input
          name="comment"
          type="text"
          className="mb-4 px-4 py-6 bg-gray-200 w-full placeholder:text-gray-600 text-gray-600 font-medium text-sm rounded-lg shadow-2xl"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={(e) => onHandleKeyPress(e)}
          placeholder="Write a comment..."
        />
      )}
      {comments?.length > 0 &&
        comments.map((commentItem, index) => (
          <div key={`${commentItem?.id}-${index}`} className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <div
                className={`${
                  commentItem?.user === currentlyLoggedinUser?.uid
                    ? "bg-blue-500"
                    : "bg-teal-500"
                } p-2 rounded-lg text-gray-200 w-fit`}
              >
                {commentItem?.userName}
              </div>
              {commentItem?.user === currentlyLoggedinUser?.uid && (
                <DeleteButton
                  onClick={() => onHandleDeleteComment({ ...commentItem })}
                />
              )}
            </div>
            <div className="px-4 py-3 rounded-3xl text-gray-500 font-semibold w-full bg-gray-100 shadow-2xl relative ml-auto">
              {commentItem?.comment}
              <span className="bg-gray-100 w-full h-3 absolute -left-2/4 top-2/4 transform -translate-y-2/4 -z-10 shadow-2xl"></span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
