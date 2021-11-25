import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { useState } from "react";
import Swal from 'sweetalert2'


import { AddCommentInput } from "../comments/AddCommentInput";
import { CommentList } from "../comments/commentList";
//redux
import { Link } from "react-router-dom";

//stylesheet
import "../../style/ideas.css";
import { startDeleting } from "../../actions/idea";
import { useDispatch } from "react-redux";

import { DotsButton } from "../ui/DotsButton";
import { DropDownButton } from "../ui/DropDownButton";
import { BsFillTrashFill } from "react-icons/bs";

export const IdeaCard = ({ idea }) => {
  const [showComments, setShowComments] = useState('none')

  const dispatch = useDispatch();

  const onClickComments = () => {
    if(showComments === 'none'){
      setShowComments('block');
    }else{
      setShowComments('none');
    }
  }

  // Handlers
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

  const removeUnderline = { textDecoration: "none" };

  return (
    <div className="card standard-card">

        {/* User display */}
      <div style={{display: 'flex', flexDirection: 'row', margin: '1.25rem 0rem 0 1.75rem'}}>
        <i className="fas fa-user-circle" style={{fontSize:'1.5rem', marginRight: '0.5rem'}}></i>
        <h5>Anonymous User</h5>
      </div>

      {/* Card body */}
      <div className="card-body">
        <h5 className="card-title" style={{marginLeft: '0.75rem'}}>{idea.title}</h5>
        <Container fluid>
          <p className="card-text">{idea.content}</p>
          <Row>

            {/* likes button */}
            <Col xs={1} className="idea-button">
              <a href="#" className="card-link" style={removeUnderline}>
                <i className="fas fa-thumbs-up"></i> 0
              </a>
            </Col>

            {/* comment button */}
            <Col xs={1} className="idea-button">
              <a href="#" className="card-link" style={removeUnderline} onClick={onClickComments}>
                <i className="far fa-comments"></i> {idea.comments?.length}
              </a>
            </Col>

            {/* delete button */}
            <Col xs={1} className="idea-button">

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

        {/* Comment section */}
          <Row style={{display: showComments}}>
              <AddCommentInput ideaObject={idea}></AddCommentInput>
          </Row>
          <Row style={{display: showComments}}>
              <CommentList idea={ idea }></CommentList>
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
                    ]}
                />

    </div> 
  );
};
