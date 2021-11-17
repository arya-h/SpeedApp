import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewIdea } from "../../actions/idea";
import NavBar from "../ui/NavBar";
import { IdeaList } from "./IdeaList";

export const AddIdeaScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <NavBar />
      <div className="container-fluid px-5">
        {/* TODO: Sidebar */}
        <div className="row">
          <div className="col">
            <h1 className="my-3">Add Idea</h1>
          </div>
        </div>
        <form>
          <div class="form-group">
            <div className="row mb-4">
              <label for="ideaTitle">
                <h2>Title</h2>
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Title"
                id="ideaTitle"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </div>
            <div className="row">
              <label for="ideaDescription">
                <h2>Description</h2>
              </label>
              <textarea
                type="text"
                class="form-control"
                id="ideaDescription"
                placeholder="Description"
                rows="3"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
            </div>
            <div className="row"></div>
            <div className="col-6 text-end">
              <button
                className="btn btn-primary mt-3"
                //   onClick={() => dispatch(addNewIdea({ title: "test" }))}
                onClick={() => {
                  dispatch(addNewIdea({ title: title, content: content }));
                  history.push("/");
                }}
              >
                Add Idea
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
