import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import Toy from "../components/Toy";

const Test = (props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [attachment, setAttachment] = useState(null);
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
    let attachmentUrl = "";
    if (attachment !== null) {
      const attachmentRef = storageService
        .ref()
        .child(`${props.userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const postObj = {
      text: post,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("posts").add(postObj);
    setPost("");
    setAttachment(null);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Post" />
        {attachment && (
          <div>
            <img src={attachment} alt="preview" width="300px" height="300px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
