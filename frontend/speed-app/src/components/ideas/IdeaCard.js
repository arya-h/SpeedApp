import React from "react";

import Button from "react-bootstrap/Button";
import { Gradient } from "react-gradient";
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
import { useDispatch } from "react-redux";
import { likeIdea } from "../../helpers/likeIdea";

import { DotsButton } from "../ui/DotsButton";
import { DropDownButton } from "../ui/DropDownButton";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { UserDateDisplay } from "../ui/UserDateDisplay";

export const IdeaCard = ({ idea }) => {

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

  const gradients = [
    ["#f8cc9d", "#ffeb9e"],
    ["#fce5cd", "#25c668"],
  ];

  //popover to ask user if he's sure about deleting the idea
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Delete idea</Popover.Header>
      <Popover.Body>
        <Container fluid>
          {/* show spinner only if loading */}
          {loadingDelete ? (
            <Spinner
              animation="border"
              role="status"
              className="loading-delete-spinner"
            ></Spinner>
          ) : (
            <></>
          )}

          {/* text row */}
          <Row className="popover-row">
            <Col>Are you sure you want to delete this idea?</Col>
          </Row>
          {/* buttons row */}
          <Row className="popover-row">
            <Col>
              {/* button will be disabled while deleting */}
              <Button
                variant="danger"
                disabled={loadingDelete}
                // onClick={() => deleteIdea(idea.id)}
                onClick={(e) => {
                  handleDeleteConfirmation(idea.id, e);
                }}
              >
                Yes
              </Button>
            </Col>
            </Row>
            </Container>

                </Popover.Body>
            </Popover>
  )

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



  const removeUnderline = { textDecoration: "none" };

  const unixTimestamp = idea.timestamp;
  const dateObject = new Date(unixTimestamp);

  const dateString =
    dateObject.getDate() +
    "/" +
    (dateObject.getMonth() + 1) +
    "/" +
    dateObject.getUTCFullYear();

  return (
    <div className="card standard-card">

      {/* <toastDelete /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "1.25rem 0rem 0 1.75rem",
        }}
      >
        <i
          className="fas fa-user-circle"
          style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
        ></i>
        <h5>Anonymous User</h5>
      </div>


      <UserDateDisplay 
        userName = {idea.user}
        date = {idea.timestamp}
      />

      {/* Card body */}

      <div className="card-body">
        <Row>
          <Col xs={4}>
            <h5 className="card-title">{idea.title} </h5>
          </Col>

          <Col md={{ span: 3, offset: 5 }} >
            <Gradient
              gradients={gradients} // required
              property="background"
              duration={3000}
              angle="45deg"
              className="idea-timestamp"
            >
              <span className="title-timestamp">
                <AiOutlineFieldTime />{" "}
                {dateObject.toLocaleString("en-ES", {
                  timeZone: "Europe/Vienna",
                })}
              </span>
            </Gradient>
          </Col>
        </Row>

        <Container fluid>
          <p className="card-text">{idea.content}</p>
          <Row>

            {/* likes button */}
            <Col xs={1} className="idea-button">
              <a className="card-link" style={removeUnderline} onClick={()=>{handleLikeIdea(idea)}} >
                <i className="fas fa-thumbs-up"></i> {updatedLikes}
                
              </a>
            </Col>

            {/* comment button */}
            <Col xs={1} className="idea-button">
              <a
                className="card-link"
                style={removeUnderline}
                onClick={onClickComments}
              >
                <i className="far fa-comments"></i> {idea.comments?.length}
              </a>
            </Col>


            {/* delete button */}
            <Col xs={1} className="idea-button">
              <OverlayTrigger
                show={showPopover}
                rootClose
                trigger="click"
                placement="right"
                overlay={popover}
              >
                <a onClick={() => setShowPopover(true)}>
                  <i className="far fa-trash-alt"></i>
                </a>
              </OverlayTrigger>
            </Col>
            {/* update button */}
            <Col xs={1} className="idea-button">
              <Link
                to={{
                  pathname: `/edit/${idea.id}`,
                }}
              >
                <i className="fas fa-edit"></i>
              </Link>
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

        <DotsButton  
                    items = { [
                        { 
                            id: idea.id,
                            action: DropDownButton( { icon:BsFillTrashFill(),  title:"Delete"} ), 
                            handler: handleDelete,
                            args: { id: idea.id  } 
                        },
                        {
                          id: idea.id,
                          action: DropDownButton( { icon:BsFillPencilFill(),  title:"Update"} ), 
                          handler: handleUpdate,
                          args: { path:`/edit/${idea.id}` } 
                        }
                    ]}
                />

    </div> 
  );
};
