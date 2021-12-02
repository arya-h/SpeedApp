import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startLoadingIdeas } from "../../actions/idea";
import { Sidebar } from "../ui/Sidebar";
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
      <div className="container-fluid px-5" style={{position: "absolute", marginLeft: "20rem", width: "calc(100vw - 20rem)", height:"100vh!important", overflowY: "scroll"}}>
        <div className="row d-flex flex-row justify-content-space-between" style={{margin: "2rem 0 1.25rem 0"}}>
          <div className="col-6">
            <h1 style={ideasFeedTitle}>Ideas</h1>
          </div>
          <div className="col-6 text-end" style={{padding: "0.5rem", fontFamily: "NunitoSans"}}>
              <button className="btn btn-primary">Popular</button>
              <button className="btn btn-light">Latest</button>
          </div>
        </div>
        <IdeaList />
      </div>
    </div>
  );
};

const ideasFeedTitle = {
  fontSize: "2rem",
  fontFamily: "NunitoSans",
  fontWeight: "600",
  padding: "0.5rem"
}