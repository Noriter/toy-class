import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Toy = (props) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(props.postObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제할까요?");
    if (ok) {
      await dbService.doc(`posts/${props.postObj.id}`).delete();
      await storageService.refFromURL(props.postObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`posts/${props.postObj.id}`).update({ text: newPost });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPost(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newPost}
              onChange={onChange}
              type="text"
              placeholder="Edit"
              required
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{props.postObj.text}</h4>
          {props.postObj.attachmentUrl && (
            <img
              src={props.postObj.attachmentUrl}
              alt="postImage"
              width="200px"
              height="200px"
            />
          )}
          {props.isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Update</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Toy;
