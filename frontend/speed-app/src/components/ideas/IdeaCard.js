import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useState } from "react";
import { AddCommentInput } from "../comments/AddCommentInput";
import { CommentList } from "../comments/commentList";
//redux
import { Link } from "react-router-dom";

//import delete items from firestore
import { doc, deleteDoc } from "firebase/firestore";
//firestore
import { db } from "../../firebase/firebase-config";

//stylesheet
import "../../style/ideas.css";
import { startDeleting } from "../../actions/idea";
import { useDispatch } from "react-redux";

export const IdeaCard = ({ idea }) => {
  const [showPopover, setShowPopover] = useState(false); //delete popover state
  const [showErrorDelete, setShowErrorDelete] = useState(false); //show error in case delete has exceptions
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showComments, setShowComments] = useState('none')

  const dispatch = useDispatch();

  const onClickComments = () => {
    if(showComments == 'none'){
      setShowComments('block');
    }else{
      setShowComments('none');
    }
  }

  // Handlers
  const handleDeleteConfirmation = async ( id ) => {
    setLoadingDelete(true);
    dispatch( 
      await startDeleting( id )).then(
        ()=>{
          setTimeout((o) => setLoadingDelete(!o), 2000);
        }
      ).catch(
        (err)=>{
          alert("There was an error while deleting your idea: ", err);
        }
      ); 
  } 

  //triggered when clicking on Yes button in popover
  const deleteIdea = async (id) => {
    
    setLoadingDelete(true);

    await deleteDoc(doc(db, "ideas", id))
    .then(()=>{setTimeout((o) => setLoadingDelete(!o), 3000);})
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
                onClick={ ( e ) => { handleDeleteConfirmation(idea.id, e) } }
              >
                Yes
              </Button>
            </Col>

            <Col>
              {/* button will be disabled while deleting */}
              <Button
                variant="primary"
                disabled={loadingDelete}
                onClick={(o) => setShowPopover(!o)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </Popover.Body>
    </Popover>
  );

  const removeUnderline = { textDecoration: "none" };

  return (
    <div className="card standard-card">
      {/* <toastDelete /> */}
      <div style={{display: 'flex', flexDirection: 'row', margin: '1.25rem 0rem 0 1.75rem'}}>
        <i className="fas fa-user-circle" style={{fontSize:'1.5rem', marginRight: '0.5rem'}}></i>
        <h5>Anonymous User</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title" style={{marginLeft: '0.75rem'}}>{idea.title}</h5>
        <Container fluid>
          <p className="card-text">{idea.content}</p>
          <Row>
            {/* likes */}
            <Col xs={1} className="idea-button">
              <a href="#" className="card-link" style={removeUnderline}>
                <i className="fas fa-thumbs-up"></i> 0
              </a>
            </Col>

            {/* comments */}
            <Col xs={1} className="idea-button">
              <a href="#" className="card-link" style={removeUnderline} onClick={onClickComments}>
                <i className="far fa-comments"></i>{idea.comments.length}
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
                <a href="#" onClick={() => setShowPopover(true)}>
                  <i className="far fa-trash-alt"></i>
                </a>

              </OverlayTrigger>
            </Col>
            {/* update button */}
            <Col xs={1} className="idea-button">
              <Link to={{
                pathname: `/edit/${idea.id}`
              }}>
                <i className="fas fa-edit"></i>
              </Link>
            </Col>
          </Row>
          <Row style={{display: showComments}}>
              <AddCommentInput ideaObject={idea}></AddCommentInput>
          </Row>
          <Row style={{display: showComments}}>
              <CommentList ideaObject={idea}></CommentList>
          </Row>
        </Container>
      </div>
    </div>
  );
};
