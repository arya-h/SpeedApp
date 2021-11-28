import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startLoadingIdeas } from "../../actions/idea";
import { IdeaList } from "./IdeaList";

export const IdeasScreen = () => {

  const dispatch = useDispatch();
  const { ideas } = useSelector(state => state.ideas)

  useEffect(() => {
        
    
    // Load ideas first time
    if ( ideas.length === 0){

      Swal.fire({
        title: 'Loading ideas',
        html: 'Please, wait!',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
          dispatch( startLoadingIdeas() );
        },
        timer: 2000,
        timerProgressBar: true
      })
    }
    

}, [ dispatch ])

  return (
    <div>
      <div className="container-fluid px-5">
        {/* TODO: Sidebar */}
        <div className="row">
          <div className="col-6">
            <h1 className="my-3">Ideas feed</h1>
          </div>
          <div className="col-6 text-end">
            {/*<Link to="/add">
              <button
                className="btn btn-primary mt-3"
              >
                Add New Idea
              </button>
            </Link>*/}
          </div>
        </div>
        <IdeaList />
      </div>
    </div>
  );
};
