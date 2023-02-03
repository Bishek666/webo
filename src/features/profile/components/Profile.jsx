import { async } from "@firebase/util";
import { updateProfile } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../../firebaseConfig";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      ...formData,
      name: user?.displayName,
    });
  }, [user]);

  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHandleImageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const onHandleSubmit = async () => {
    if (!formData.name) {
      alert("Cannot have empty name");
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
          updateProfile(auth.currentUser, {
            displayName: formData.name,
            photoURL: url,
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
              navigate("/")
            });
        });
      }
    );
  };
  return (
    <form className="flex flex-col bg-white p-4 mt-4 shadow-neuMorphismShadow rounded-xl sticky min-h-96">
      <h2 className="text-4xl text-gray-500 mb-5">Profile</h2>
      <label htmlFor="name" className="text-lg text-gray-500 mb-3">
        Name
      </label>
      <input
        name="name"
        type="name"
        className="mb-5 px-2 py-3 shadow-neuMorphismShadow rounded-md"
        placeholder="Enter name please"
        value={formData.name}
        onChange={onHandleChange}
      />
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
        Update Porfile
      </button>
    </form>
  );
};

export default Profile;
