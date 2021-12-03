import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewIdea } from "../../actions/idea";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const AddIdeaModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {show, handleClose} = props;

  const user = useSelector(state => state.auth)

  return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header  className="bg-primary text-white" closeButton>
      <Modal.Title>Add Idea</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form>
          <div className="form-group">
            <div className="row mb-4">
              <label htmlFor="ideaTitle">
                <h2>Title</h2>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                id="ideaTitle"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="ideaDescription">
                <h2>Description</h2>
              </label>
              <textarea
                type="text"
                className="form-control"
                id="ideaDescription"
                placeholder="Description"
                rows="3"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
            </div>
          </div>
        </form>
    </Modal.Body>
    <Modal.Footer className="justify-content-center">
      <Button variant="secondary" onClick={() => {setTitle(""); setContent(""); handleClose()}}>
        Close
      </Button>
      <button
        className="btn btn-primary"
        onClick={( e ) => {
            e.preventDefault();
            dispatch(addNewIdea({ title: title, content: content, comments: [], user }));
            history.push("/");
        }}
        >
        Add Idea
    </button>
    </Modal.Footer>
  </Modal>
);
}
    
      