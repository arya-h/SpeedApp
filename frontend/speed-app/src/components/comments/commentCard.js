import React from "react";
import { useDispatch } from "react-redux";
import { Gradient } from 'react-gradient';
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { startDeletingComment } from "../../actions/comment";

import "../../style/comments.css";

import { DotsButton } from "../ui/DotsButton";

export const CommentCard = ({ props }) => {
  const comment = props?.comment;
  const idea = props?.idea;
  const dispatch = useDispatch();

  const handleDeleteComment = (ideaId, commentId) => {
    dispatch(startDeletingComment(ideaId, commentId));
  };

  const unixTimestamp = comment.timestamp;
  const dateObject = new Date(unixTimestamp);

  const gradients = [
    ['#add3ef', '#cfd6f4'],
    ['#f88080', '#93cf90'],
];

  const dateString =
    dateObject.getDate() +
    "/" +
    (dateObject.getMonth() + 1) +
    "/" +
    dateObject.getUTCFullYear();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: "0.5rem",
      }}
    >
      <div className="profile-pic-container">
        <i className="fas fa-user-circle" style={{ fontSize: "1.5rem" }}></i>
      </div>
      <Card
        style={{ width: "100%", borderRadius: "1rem", position: "relative" }}
      >
        <Row>
          {/* username container */}
          <Col xs={4}>
            <div className="user-name-container">
              <h6>{comment.user}</h6>
            </div>
          </Col>
          {/* comment timestamp */}


         
          <Col xs={{ span: "2", offset: "5" }} className="comment-timestamp" style={{alignItems:"center", borderWidth:"20%"}}>
          <Gradient
                gradients={ gradients } // required
                property="background"
                duration={ 3000 }
                angle="45deg"
                style={{borderRadius:"20px" }}
            >

            <span className="comment-timestamp" style={{margin:"15%", borderRadius:"20px"}}>
              {dateObject.toLocaleString("en-ES", {
                timeZone: "Europe/Vienna",
              })}{" "}
            </span>
            </Gradient>
          </Col>
         
        </Row>

        <div className="user-comment-container">{comment.content}</div>

        {
          <DotsButton
            id={{ commentId: comment.id, ideaId: idea.id }}
            items={[
              {
                action: "Delete",
                handler: handleDeleteComment,
              },
            ]}
          />
        }
      </Card>
    </div>
  );
};
