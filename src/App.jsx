import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import Register from "./routes/Register";

import LayoutLoginRegister from "./components/layouts/LayoutLoginRegister";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p> Loading ... </p>;
  }
  return (
    <>
      <Navbar />
      <Routes> 
        <Route path="/" element={<LayoutRequireAuth/>}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<LayoutLoginRegister />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
};

export default App;
