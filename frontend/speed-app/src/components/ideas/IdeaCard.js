import React from "react";

import Button from "react-bootstrap/Button";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import Swal from 'sweetalert2'

import { AddCommentInput } from "../comments/AddCommentInput";
import { CommentList } from "../comments/commentList";
//redux
import { Link } from "react-router-dom";


//icon
import { AiOutlineFieldTime } from "react-icons/ai";

//import delete items from firestore
import { doc, deleteDoc } from "firebase/firestore";
//firestore
import { db } from "../../firebase/firebase-config";

//stylesheet
import "../../style/ideas.css";

import { likeIdeaAction, startDeleting } from "../../actions/idea";
import { useDispatch, useSelector } from "react-redux";
import { likeIdea } from "../../helpers/likeIdea";

import { DotsButton } from "../ui/DotsButton";
import { DropDownButton } from "../ui/DropDownButton";
import { BsFillTrashFill, BsFillPencilFill, BsFillExclamationOctagonFill } from "react-icons/bs";
import { UserDateDisplay } from "../ui/UserDateDisplay";

export const IdeaCard = ({ idea }) => {

  const user = useSelector(state => state.auth)

  const [showPopover, setShowPopover] = useState(false); //delete popover state
  const [showErrorDelete, setShowErrorDelete] = useState(false); //show error in case delete has exceptions
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showComments, setShowComments] = useState("none");
  const [updatedLikes, setUpdatedLikes] = useState(idea.likes);
  const [disableLike, setDisableLike] = useState(false);
  // const [showComments, setShowComments] = useState('none')
  const history = useHistory();
  

  const dispatch = useDispatch();

  const onClickComments = () => {
    if (showComments === "none") {
      setShowComments("block");
    } else {
      setShowComments("none");
    }
  };

  // Handlers

  const handleDeleteConfirmation = async (id) => {
    setLoadingDelete(true);
    dispatch(await startDeleting(id))
      .then(() => {
        setTimeout((o) => setLoadingDelete(!o), 2000);
      })
      .catch((err) => {
        alert("There was an error while deleting your idea: ", err);
      });
  };

  const handleLikeIdea = async (idea)=>{
    
    if(disableLike){
      return
    }
    else{
      setUpdatedLikes(o => o+=1);
      idea.likes++;
      dispatch(await likeIdeaAction(idea));
      setDisableLike(true);
    }


  }

  //triggered when clicking on Yes button in popover
  const deleteIdea = async (id) => {
    setLoadingDelete(true);

    await deleteDoc(doc(db, "ideas", id))
      .then(() => {
        setTimeout((o) => setLoadingDelete(!o), 3000);
      })
      .then(() => {
        //success
        setShowPopover(false);
        //redux part not working
        // ideaReducer({action:{
        //     type: types.ideasDelete,
        //     payload : id,
        // }});
      })
      .catch((err) => {
        setShowPopover(false);
        setShowErrorDelete(true);
      });
  };

  const handleDelete = async ( { id } ) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch( startDeleting( id ) ); 

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  } 

  const handleUpdate = ( { path } ) => {
    history.push( path )
  } 

  const btn = { textDecoration: "none", cursor: "pointer" };

  const unixTimestamp = idea.timestamp;
  const dateObject = new Date(unixTimestamp);

  const ideaTitle = {
    marginLeft: "0.75rem", 
    fontFamily: "NunitoSans",
    fontWeight: "600"
  }

  const ideaContent = {
    fontFamily: "NunitoSans",
    marginTop: "0.25rem",
    fontSize: "1rem"
  }

  const icon = {
    fontSize: "1.5rem",
    color: "#77757F"
  }

  const numberOf = {
    fontFamily: "NunitoSans",
    marginLeft: "0.5rem",
    fontSize: "1.25rem",
    color: "#77757F"
  }

  const dateString =
    dateObject.getDate() +
    "/" +
    (dateObject.getMonth() + 1) +
    "/" +
    dateObject.getUTCFullYear();

  return (
    <div className="card standard-card">

      <UserDateDisplay 
        user = {idea.user}
        date = {idea.timestamp}
      />

      {/* Card body */}

      <div className="card-body">
        <Row>
          <Col xs={4}>
            <h6 style={ideaTitle}>{idea.title} </h6>
          </Col>
        </Row>

        <Container fluid>
          <p style={ideaContent}>{idea.content}</p>
          <Row>

            {/* likes button */}
            <Col xs={1} className="idea-button">
              <a className="card-link" style={btn} onClick={()=>{handleLikeIdea(idea)}} >
                <i className="fas fa-thumbs-up" style={icon}></i> <span style={numberOf}>{updatedLikes}</span>
                
              </a>
            </Col>

            {/* comment button */}
            <Col xs={1} className="idea-button">
              <a
                className="card-link"
                style={btn}
                onClick={onClickComments}
              >
                <i className="far fa-comments" style={icon}></i> <span style={numberOf}>{idea.comments?.length}</span>
              </a>
            </Col>
          </Row>

          

        {/* Comment section */}
          <Row style={{display: showComments}}>
              <AddCommentInput ideaObject={idea}></AddCommentInput>

          </Row>
          <Row style={{ display: showComments }}>
            <CommentList idea={idea}></CommentList>
          </Row>

        </Container>

        </div> {/*  //Card body */}

        { (user.uid === idea.user.uid) ?
        // Idea from the user
          <DotsButton  
                    items = { [
                        { 
                            id: 1,
                            action: DropDownButton( { icon:BsFillTrashFill(),  title:"Delete"} ), 
                            handler: handleDelete,
                            args: { id: idea.id  } 
                        },
                        {
                          id: 2,
                          action: DropDownButton( { icon:BsFillPencilFill(),  title:"Update"} ), 
                          handler: handleUpdate,
                          args: { path:`/ideas/edit/${idea.id}` } 
                        }
                    ]}
                />
          :
          // Idea from other user
          <DotsButton  
                    items = { [
                        { 
                            id: 1,
                            action: DropDownButton( { icon:BsFillExclamationOctagonFill(),  title:"Report"} ), 
                            handler: () => {},
                            args: {  } 
                        }
                    ]}
                />
        }
          

    </div> 
  );
};
