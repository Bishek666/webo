import React, { useState } from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import Comments from "../../comments/components";
import Likes from "../../likes/components/Likes";

const Post = ({postItem, user, onHandleDelete}) => {
    const [openComment, setOpenComment] = useState(false);

  return (
    <div
      className="p-4 mt-4 mb-24 bg-gray-100 shadow-neuMorphismShadow rounded-lg min-h-96 overflow-hidden"
      key={postItem?.id}
    >
      <div className="flex">
        {postItem?.imageUrl && (
          <div className="w-2/4">
            <figure className="aspect-square">
              <img
                src={postItem?.imageUrl}
                alt="postImage"
                className="aspect-square"
              />
            </figure>
          </div>
        )}
        <div className="flex flex-col bg-white rounded-lg ml-4 p-4 w-2/4 min-h-96 z-20">
          <h2 className="text-base text-gray-500 font-medium shadow-neuMorphismShadow rounded-lg px-2 py-3 mb-5">
            {postItem?.createdBy}{" "}
            <span className="text-xs text-gray-400">posted</span>
          </h2>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xs text-gray-500 rounded-lg px-2 py-3">
              {postItem?.createdAt?.toDate().toDateString()}
            </h2>
            {user && user.uid === postItem.userId && (
              <DeleteButton
                onClick={() => onHandleDelete(postItem?.id, postItem?.imageUrl)}
              />
            )}
          </div>
          <p className="text-lg text-gray-600 shadow-neuMorphismShadow rounded-lg px-2 py-3 mb-8">
            {postItem?.description}
          </p>
          <div className="flex items-center mt-auto w-fit ml-auto text-base text-gray-400 mb-1 shadow-neuMorphismShadow rounded-lg px-4 py-2 ">
            <Likes
              id={postItem?.id}
              likes={postItem?.likes}
              className={`z-10 mr-4 ${
                user ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            />

            <span
              className="text-blue-400 text-sm font-medium cursor-pointer"
              onClick={() => setOpenComment((prev) => !prev)}
            >
              Comments ( {postItem?.comments?.length} )
            </span>
          </div>
        </div>
      </div>
      <div
        className={`relative z-10 mt-4 transition-all duration-1000 ease-in-out ${
          openComment ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col rounded-lg w-full h-96 relative transform animate-spin">
          <div className="backdrop-blur-3xl bg-gray-400/30 w-full h-full p-4 rounded-lg ">
            <Comments id={postItem?.id} />
          </div>

          <div className="absolute bottom-10 left-10 -z-10 rounded-full bg-sky-500 h-64 w-64 "></div>
          <div className="absolute bottom-44 left-72 -z-10 rounded-full bg-teal-600 h-44 w-44 "></div>
          <div className="absolute top-10  right-10  transform -z-10 rounded-full bg-orange-600 h-36 w-36 animate-moon-orbit"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
