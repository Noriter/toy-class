import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";

const Create = (props) => {
  const [post, setPost] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [character, setCharacter] = useState("");
  const navigate = useNavigate();
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
      character: character,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("posts").add(postObj);
    setPost("");
    setAttachment(null);
    navigate("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  const onCheck = (event) => {
    const {
      target: { value },
    } = event;
    setCharacter(value);
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
    <>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          onChange={onChange}
          type="text"
          placeholder="토이 이름"
          maxLength={120}
        />
        <div>
          <input
            type="radio"
            id="active"
            name="character"
            value="active"
            onChange={onCheck}
          />
          <label for="active">활발하다</label>
        </div>
        <div>
          <input
            type="radio"
            id="friendly"
            name="character"
            value="friendly"
            onChange={onCheck}
          />
          <label for="friendly">다정하다</label>
        </div>
        <div>
          <input
            type="radio"
            id="calm"
            name="character"
            value="calm"
            onChange={onCheck}
          />
          <label for="calm">차분하다</label>
        </div>
        <div>
          <input
            type="radio"
            id="cool"
            name="character"
            value="cool"
            onChange={onCheck}
          />
          <label for="cool">시원하다</label>
        </div>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Post" />
        {attachment && (
          <div>
            <img src={attachment} alt="preview" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
    </>
  );
};

export default Create;
