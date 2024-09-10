import { useState } from "react";

const FollowButton = ({ followUnFollow, userId }) => {
  const [followBtn, setFollowBtn] = useState("follow");

  const handleOnclick = (event, userId) => {
    event.preventDefault();
    followUnFollow(userId);
    setFollowBtn((prev) => (prev === "follow" ? "unfollow" : "follow"));
  };
  return (
    <button
      className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
      onClick={(e) => handleOnclick(e, userId)}
    >
      {followBtn}
    </button>
  );
};

export default FollowButton;
