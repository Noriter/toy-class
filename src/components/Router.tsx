import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import Character from "../pages/character";
import Friendpage from "../pages/friendpage";
import Menu from "../pages/Menu";
import Error from "../pages/error";

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
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="/character" element={<Character></Character>}></Route>
        <Route path="/friendpage" element={<Friendpage></Friendpage>}></Route>
        <Route path="friend1">friend1</Route>
        <Route path="friend2">friend2</Route>
        <Route path="friend3">friend3</Route>
        <Route path="friend4">friend4</Route>
        <Route path="friend4">friend5</Route>
        <Route path="/Menu" element={<Menu></Menu>}></Route>
        <Route path="*" element={<Error></Error>}></Route>

        <Link to="/character">HomeButton</Link>
        <Link to="/friendpage">friendpageButton</Link>
        <Link to="/Menu">MenuButton</Link>
        <Link to="/">HomeButton</Link>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
