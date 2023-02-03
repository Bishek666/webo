import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../../firebaseConfig";

const AddPost = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHandleImageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const onHandleSubmit = () => {
    if (!formData.description) {
      alert("Please Add description to your post");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      undefined,
      (err) => {
        alert(err);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const postRef = collection(db, "Post");
          addDoc(postRef, {
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast("Post added successfully", { type: "success" });
            })
            .catch((err) => toast(err, { type: "error" }))
            .finally(() => {
              setFormData({
                description: "",
                image: "",
              });
            });
        });
      }
    );
  };
  return (
    <form className="flex flex-col bg-white p-4 mt-4 shadow-neuMorphismShadow rounded-xl sticky min-h-96">
      <h2 className="text-4xl text-gray-500 mb-5">Create Post</h2>
      <label htmlFor="description" className="text-lg text-gray-500 mb-3">
        Description
      </label>
      <textarea
        name="description"
        rows="6"
        className="mb-5 shadow-neuMorphismShadow rounded-md p-3 py-2"
        value={formData.description}
        onChange={(e) => onHandleChange(e)}
      />
      <label htmlFor="image" className="text-lg text-gray-500 mb-3">
        Add Image
      </label>
      <input
        type="file"
        name="image"
        accept="image/*"
        className="mb-5 px-2 py-3 shadow-neuMorphismShadow rounded-md"
        onChange={(e) => onHandleImageChange(e)}
      />
      <button
        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={onHandleSubmit}
      >
        Add post
      </button>
    </form>
  );
};

export default AddPost;
