import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

const AppRouter = (props: { isLoggedIn: any }) => {
  return (
    <HashRouter>
      <Routes>
        {props.isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
