import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Toy = (props) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(props.postObj.text);
  const [newCharacter, setNewCharacter] = useState(props.postObj.character);
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
    await dbService
      .doc(`posts/${props.postObj.id}`)
      .update({ character: newCharacter });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPost(value);
  };
  const onCheck = (event) => {
    const {
      target: { value },
    } = event;
    setNewCharacter(value);
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
            <div>
              <input
                type="radio"
                id="active"
                name="character"
                value="active"
                onChange={onCheck}
              />
              <label>활발하다</label>
            </div>
            <div>
              <input
                type="radio"
                id="friendly"
                name="character"
                value="friendly"
                onChange={onCheck}
              />
              <label>다정하다</label>
            </div>
            <div>
              <input
                type="radio"
                id="calm"
                name="character"
                value="calm"
                onChange={onCheck}
              />
              <label>차분하다</label>
            </div>
            <div>
              <input
                type="radio"
                id="cool"
                name="character"
                value="cool"
                onChange={onCheck}
              />
              <label>시원하다</label>
            </div>
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{props.postObj.text}</h4>
          <h4>성격: {props.postObj.character}</h4>
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
