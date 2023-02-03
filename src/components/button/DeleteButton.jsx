import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function DeleteButton({ onClick }) {
  return (
    <button
      className="text-red-600 font-bold p-3 h-12 w-12 uppercase text-lg rounded-full shadow-neuMorphismShadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
      type="button"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
}

export default DeleteButton;
