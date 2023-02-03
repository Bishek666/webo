import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../firebaseConfig";

const intialState = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.input) {
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

const SignIn = () => {
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

  const onSignIn = async () => {
    const { email, password } = state;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      toast(err.code, { type: "error" });
    }
  };

  return (
    <form className="flex flex-col justify-center items-center p-4 mt-4 sticky">
      <div className="flex flex-col bg-blue-300 w-2/6 p-5 rounded-lg">
        <h2 className="text-4xl text-gray-50 mb-5">SignIn</h2>
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
          onClick={onSignIn}
        >
          SignIn
        </button>
        <Link
          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          to="/register"
        >
          <span className="mr-2 text-sky-600"> Don't have an account? </span>
          <FontAwesomeIcon icon={faSignIn} />
          <span className="ml-2"> Register </span>
        </Link>
      </div>
    </form>
  );
};

export default SignIn;
