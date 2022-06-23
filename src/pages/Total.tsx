import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import Toy from "../components/Toy";

const Total = (props) => {
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
      <div>전체 토이</div>
      {posts.map((post) => (
        <Toy
          key={post.id}
          postObj={post}
          isOwner={post.creatorId === props.userObj.uid}
        />
      ))}
    </div>
  );
};

export default Total;
