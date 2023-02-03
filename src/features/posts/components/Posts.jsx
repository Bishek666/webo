import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import Post from "./Post";

const Posts = () => {
  const [postList, setPostList] = useState([]);

  const [user] = useAuthState(auth);

  const onHandleDelete = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "Post", id));
      toast("Post has been deleted successfully");
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (err) {
      toast(err, { type: "error" });
    }
  };

  useEffect(() => {
    const postListCollectiobn = collection(db, "Post");
    const postQuery = query(postListCollectiobn, orderBy("createdAt", "desc"));

    onSnapshot(postQuery, (snapshot) => {
      const postListFetchedData = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      postListFetchedData?.length > 0 && setPostList(postListFetchedData);
    });
  }, []);

  return (
    <div>
      {postList.length > 0 ? (
        postList.map((postItem) => (
          <Post
            postItem={postItem}
            user={user}
            onHandleDelete={onHandleDelete}
          />
        ))
      ) : (
        <h1 className="text-5xl text-gray-600"> Posts not found </h1>
      )}
    </div>
  );
};

export default Posts;
