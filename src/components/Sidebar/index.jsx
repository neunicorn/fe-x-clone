import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import XSvg from "../XSvg";
import List from "./List";

const Sidebar = () => {
  const data = {
    fullName: "Baehaki",
    username: "baehq12",
    profileImg: "/avatars/cool.png",
  };
  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <List
            to={"/"}
            name={"Home"}
            icon={<MdHomeFilled className="w-8 h-8" />}
          />
          <List
            to={"/notifications"}
            name={"Notification"}
            icon={<IoNotifications className="w-8 h-8" />}
          />
          <List
            to={`/profile/${data?.username}`}
            name={"Profile"}
            icon={<FaUser className="w-8 h-8" />}
          />
        </ul>
        {data && (
          <Link
            to={`/profile/${data.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-ful"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={data?.profileImg || "/avatar-placehoder.png"} />
              </div>
              <div className="flex justify-between flex-1">
                <div className="hidden md:block">
                  <p className="text-white font-bold text-sm w-20 truncate">
                    {data?.fullName}
                  </p>
                  <p className="text-slate-500 text-sm">@{data?.username}</p>
                </div>
                <BiLogOut className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
