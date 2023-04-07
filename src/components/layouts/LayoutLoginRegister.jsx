import { Outlet } from "react-router-dom";

const LayoutLoginRegister = () => {
  return (
    <div className="w-96 mx-auto mx-10">      
      <Outlet />
    </div>
  );
};

export default LayoutLoginRegister;
