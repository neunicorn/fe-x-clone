import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiRepost } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import {
  FaFlag,
  FaLink,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });

  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!data.status || !res.ok) throw new Error(data.message);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast("Post Deleted", {
        style: {
          borderRadius: "10px",
          background: "#198DDA",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const postOwner = post.user;
  const isLiked = false;

  const isMyPost = authUser.data._id === post.user._id;

  const handleDate = (date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 1000 / 60);

    if (minutes < 60) {
      return `${minutes}m`;
    } else if (minutes < 1440) {
      return `${Math.floor(minutes / 60)}h`;
    } else {
      return new Date(date).toLocaleDateString();
    }
  };

  const formattedDate = handleDate(post.createdAt);

  const isCommenting = false;

  const handleDeletePost = () => {
    deletePost();
  };

  const handlePostComment = (e) => {
    e.preventDefault();
  };

  const handleLikePost = () => {};

  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link
            to={`/profile/${postOwner.username}`}
            className="w-8 rounded-full overflow-hidden"
          >
            <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner.username}`} className="font-bold">
              {postOwner.fullName}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
            <div className="dropdown ml-auto group">
              <div
                tabIndex={0}
                role="button"
                className="group-hover:bg-gray-700 rounded-full p-2"
              >
                <BsThreeDots className="group-hover:text-blue-500" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100  w-56 border border-gray-700 rounded"
              >
                {isMyPost && (
                  <li>
                    <div
                      className="flex gap-4 items-center  flex-1 cursor-pointer hover:text-red-500"
                      onClick={handleDeletePost}
                    >
                      <FaTrash />
                      <p className="font-semibold">Delete Post</p>
                    </div>
                  </li>
                )}
                {!isMyPost && (
                  <li>
                    <div className="flex gap-4 items-center  flex-1 cursor-pointer">
                      <FaFlag />
                      <p className="font-semibold">Report</p>
                    </div>
                  </li>
                )}
                <li>
                  <div
                    className="flex gap-4 items-center flex-1 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:5000/`);
                      toast("Coppied to Clipboard", {
                        style: {
                          borderRadius: "10px",
                          background: "#198DDA",
                          color: "#fff",
                        },
                      });
                    }}
                  >
                    <FaLink />
                    <p className="font-semibold">Copy Url</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post.text}</span>
            {post.img && (
              <img
                src={post.img}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt=""
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-2/3 justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() =>
                  document
                    .getElementById("comments_modal" + post._id)
                    .showModal()
                }
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>
              {/* We're using Modal Component from DaisyUI */}
              <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-2 items-start">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={
                                comment.user.profileImg ||
                                "/avatar-placeholder.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              {comment.user.fullName}
                            </span>
                            <span className="text-gray-700 text-sm">
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className="text-sm">{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog>
              <div className="flex gap-1 items-center group cursor-pointer">
                <BiRepost className="w-6 h-6  text-slate-500 group-hover:text-green-500" />
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div>
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleLikePost}
              >
                {!isLiked && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                )}

                <span
                  className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : ""
                  }`}
                >
                  {post.likes.length}
                </span>
              </div>
            </div>
            <div className="flex w-1/3 justify-end gap-2 items-center">
              <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
