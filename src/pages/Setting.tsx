import React, { useState } from "react";
import { authService } from "../fbase";
import { useNavigate } from "react-router-dom";

const Setting = (props: { userObj: any; refreshUser: any }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const [newDisplayName, setNewDisplayName] = useState(
    props.userObj.displayName
  );
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (props.userObj.displayName !== newDisplayName) {
      await props.userObj.updateProfile({
        displayName: newDisplayName,
      });
      props.refreshUser();
    }
  };
  return (
    <>
      <span>Setting</span>
      <div>현재 닉네임: {props.userObj.displayName}</div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Setting;
