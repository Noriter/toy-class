import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import Toy from "../components/Toy";

const Test = (props) => {
  const [post, setPost] = useState("");
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
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("posts").add({
      text: post,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
    });
    setPost("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          onChange={onChange}
          type="text"
          placeholder="Create"
          maxLength={120}
        />
        <input type="submit" value="Post" />
      </form>
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
