import React, { useReducer } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const intialState = {
  name: "",
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.input) {
    case "name":
      action.value === " " && alert("Please enter your name");
      return { ...state, [action.input]: action.value };
    case "email":
      action.value === " " && alert("Please enter your email");
      return { ...state, [action.input]: action.value };
    case "password":
      action.value === " " && alert("Please enter your password");
      return { ...state, [action.input]: action.value };
    default:
      return { ...state };
  }
};

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const navigate = useNavigate();
  // console.log(state);
  const onChange = (e) => {
    const { name, value } = e.target;
    const action = {
      input: name,
      value: value,
    };
    dispatch(action);
  };

  const onHandleSignUp = async () => {
    const { name, email, password } = state;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
    } catch (err) {
      toast(err.code, { type: "error" });
    }
  };

  return (
    <form className="flex flex-col justify-center items-center  p-4 mt-4 rounded-lg sticky min-h-96 ">
      <div className="flex flex-col bg-blue-300 w-2/6 p-5">
      <h2 className="text-4xl text-gray-50 mb-5">SignUp</h2>
      <label htmlFor="name" className="text-lg text-gray-50 mb-3">
        Full Name
      </label>
      <input
        name="name"
        type="text"
        className="mb-5 px-2 py-3"
        placeholder="Enter full name please"
        // value={event.name}
        onChange={onChange}
      />
      <label htmlFor="email" className="text-lg text-gray-50 mb-3">
        Email
      </label>
      <input
        name="email"
        type="email"
        className="mb-5 px-2 py-3"
        placeholder="Enter email please"
        // value={event.email}
        onChange={onChange}
      />
      <label htmlFor="password" className="text-lg text-gray-50 mb-3">
        Password
      </label>
      <input
        name="password"
        type="password"
        className="mb-5 px-2 py-3"
        placeholder="Enter password please"
        // value={event.password}
        onChange={onChange}
      />
      <button
        className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={onHandleSignUp}
      >
        SignUp
      </button>
      </div>
    </form>
  );
};

export default SignUp;
