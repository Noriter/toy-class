import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import Toy from "../components/Toy";
import Create from "../components/Create";

const Test = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const postArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postArray);
      });
  }, []);
  return (
    <div>
      <Create userObj={props.userObj} />
      <div>
        {posts.map((post) => (
          <Toy
            key={post.id}
            postObj={post}
            isOwner={post.creatorId === props.userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Test;
