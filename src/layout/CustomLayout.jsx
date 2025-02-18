import React from "react";
import { Outlet } from "react-router-dom";

export const CustomLayout = () => {
  return (
    <React.Fragment>
      <div>Any Other Component can be called here</div>
      <Outlet />
    </React.Fragment>
  );
};
