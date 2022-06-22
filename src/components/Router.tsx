import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Setting from "../pages/Setting";

const AppRouter = (props: {
  isLoggedIn: boolean;
  userObj: any;
  refreshUser: any;
}) => {
  return (

    <HashRouter>
      <Routes>
        {props.isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route
              path="/setting"
              element={
                <Setting
                  userObj={props.userObj}
                  refreshUser={props.refreshUser}
                />
                
              }
            />
            <Route path="/" />
            <Route path ="/character"></Route>
            <Route path ="/friendpage"></Route>
            <Route path ="/Menu"></Route>


          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
