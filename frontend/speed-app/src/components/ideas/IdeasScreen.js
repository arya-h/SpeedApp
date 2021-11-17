import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addNewIdea } from "../../actions/idea";
import NavBar from "../ui/NavBar";
import { IdeaList } from "./IdeaList";

export const IdeasScreen = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <NavBar />
      <div className="container-fluid px-5">
        {/* TODO: Sidebar */}
        <div className="row">
          <div className="col-6">
            <h1 className="my-3">Ideas</h1>
          </div>
          <div className="col-6 text-end">
            <Link to="/add">
              <button
                className="btn btn-primary mt-3"
              >
                Add New Idea
              </button>
            </Link>
          </div>
        </div>
        <IdeaList />
      </div>
    </div>
  );
};
