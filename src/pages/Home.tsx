import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to="/setting">Setting</Link>
      <Link to="/test">Test</Link>
    </>
  );
};
export default Home;
