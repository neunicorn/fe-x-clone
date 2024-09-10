import { Link } from "react-router-dom";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import RightPanelSkeleton from "../Skeletons/RightPaneSkeleton";
import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "../LoadingSpinner";

const RightPanel = () => {
  // const isLoading = false;

  const {
    data: suggestedUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["suggestedUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/suggested");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "something went wrong");

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { followUnFollow, isSuccess, followStatus } = useFollow();

  if (suggestedUser?.data.length === 0)
    return <div className="md:w-64 w-0"></div>;

  return (
    <div className="hidden lg:block  mx-6 ">
      <div className="bg-black rounded-md sticky top-2 border border-gray-700">
        <p className="font-bold text-lg m-4">Who to follow</p>
        <div className="flex flex-col gap-4">
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            suggestedUser?.data.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4 py-3 px-7 hover:bg-gray-900"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                    id="follow"
                    onClick={(e) => {
                      e.preventDefault();
                      followUnFollow(user._id);
                      if (followStatus.message === "FOLLOWING USER SUCCESS") {
                        document.getElementById("follow").innerText =
                          "Unfollow";
                      } else {
                        document.getElementById("follow").innerText = "follow";
                      }
                    }}
                  >
                    follow
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
