import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import Toy from "../components/Toy";
import Create from "../components/Create";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService
      .collection("posts")
      .where("creatorId", "==", `${props.userObj.uid}`)
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const postArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postArray);
      });
  }, []);
  return (
    <>
      <div>Home</div>
      <div>
        {posts[0] ? (
          <Toy
            key={posts[0].id}
            postObj={posts[0]}
            isOwner={posts[0].creatorId === props.userObj.uid}
          />
        ) : (
          <Create userObj={props.userObj} />
        )}
      </div>
      <ul>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
        <li>
          <Link to="/test">전체</Link>
        </li>
      </ul>
    </>
  );
};
export default Home;
