import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateIdeaAction } from "../../actions/idea";

export const IdeaEditScreen = ({match}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ideaId } = match.params;
  let ideaObject = useSelector(state => state.ideas.ideas.find(idea => idea.id === ideaId));
  const [title, setTitle] = useState(ideaObject.title)
  const [content, setContent] = useState(ideaObject.content)
  
  return (
    <div className={"ideas__container"}>
      <div className="container-fluid px-5">
        {/* TODO: Sidebar */}
        <div className="row">
          <div className="col">
            <h1 className="my-3">Edit Idea</h1>
          </div>
        </div>
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
            <div className="row"></div>
            <div className="col-6 text-end">
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  ideaObject.title = title;
                  ideaObject.content = content;
                  dispatch(updateIdeaAction(ideaObject));
                  history.push("/");
                }}
              >
                Update Idea
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}