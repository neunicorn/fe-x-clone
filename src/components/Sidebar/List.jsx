import { Link } from "react-router-dom";

const List = ({ to, name, icon }) => {
  return (
    <li className="flex justify-center md:justify-start">
      <Link
        to={to}
        className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duation-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
      >
        {icon}
        <span className="text-g hidden md:block">{name}</span>
      </Link>
    </li>
  );
};

export default List;
