import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserData from "./components/UserData";
import Login from "./components/Login";


const BASE_URL = process.env.REACT_APP_SERVER_URL; 


const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div>
          <Navbar setToken={setToken} />
          <UserData />
        </div>
      )}
    </div>
  );
};

export default App;
