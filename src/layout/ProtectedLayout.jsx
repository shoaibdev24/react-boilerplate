import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
    const [token,setToken] = useState("");

    // Consume Token from Local Storage and then forward to protected page  
    useEffect(() =>{
        setToken(localStorage.getItem("token"))
    },[])
    
  return (
    <React.Fragment>
      <div>Any Other Component can be called here</div>
      <Outlet />
    </React.Fragment>
  );
};
