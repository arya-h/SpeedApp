import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewIdea } from "../../actions/idea";
import { Link } from "react-router-dom";

export const CreateIdeaModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const user = useSelector(state => state.auth)

  return (
<div class="modal fade" id="createIdeaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Create Idea</h5>
        <Link to="/ideas/feed" className="card-link text-white" data-toggle="modal" data-target="#createIdeaModal">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
            </Link>
        
      </div>
      <div class="modal-body">
      <div className="container-fluid px-5">
        {/* TODO: Sidebar */}
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
          </div>
        </form>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button
                className="btn btn-primary "
                onClick={( e ) => {
                  e.preventDefault();
                  dispatch(addNewIdea({ title: title, content: content, comments: [], user }));
                  history.push("/");
                }}
              >
                Create Idea
              </button>
      </div>
    </div>
  </div>
</div>
  );
};
