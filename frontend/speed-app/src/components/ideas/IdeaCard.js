import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useState } from "react";
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

  const dispatch = useDispatch();

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
    <div className="card my-3">
      {/* <toastDelete /> */}
      <div className="card-body">
        <h5 className="card-title">{idea.title}</h5>
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
              <a href="#" className="card-link" style={removeUnderline}>
                <i className="far fa-comments"></i> 0
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
        </Container>
      </div>
    </div>
  );
};
