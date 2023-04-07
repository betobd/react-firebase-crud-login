import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);

  const handleLogoutUser = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const classButtonBlue =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const classButtonGreen =
    "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Firebase React
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              <NavLink to="/" className={classButtonBlue}>
                Home
              </NavLink>
              <button onClick={handleLogoutUser}> Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={classButtonGreen}>
                {" "}
                Login{" "}
              </NavLink>

              <NavLink to="/register" className={classButtonBlue}>
                {" "}
                Register{" "}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
