import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import Total from "../pages/Total";
import Create from "../pages/Create";
import Todo from "../pages/Todo";

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
            <Route path="/" element={<Home userObj={props.userObj} />} />
            <Route
              path="/setting"
              element={
                <Setting
                  userObj={props.userObj}
                  refreshUser={props.refreshUser}
                />
              }
            />
            <Route
              path="/create"
              element={<Create userObj={props.userObj} />}
            />
            <Route path="/todo" element={<Todo />} />
            <Route path="/total" element={<Total userObj={props.userObj} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
