import React from "react";
import { authService } from "../fbase";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <span>Setting</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Setting;
