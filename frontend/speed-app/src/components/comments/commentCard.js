import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { BsFillTrashFill, BsFillExclamationOctagonFill } from "react-icons/bs";
import { DropDownButton } from "../ui/DropDownButton";
import { startDeletingComment } from "../../actions/comment";

import "../../style/comments.css";

import { DotsButton } from "../ui/DotsButton";
import moment from "moment";

export const CommentCard = ({ props }) => {
  const comment = props?.comment;
  const idea = props?.idea;
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth)

  const handleDeleteComment = (ideaId, commentId) => {
    dispatch(startDeletingComment(ideaId, commentId));
  };


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
          <Col>
            <div className="user-name-container">
              <h6 style={{marginBottom: "-0.5rem", fontWeight:"600"}}>{comment.user.name}</h6>
              <span className="comment-timestamp">{moment( comment.timestamp ).format('MMM Do YYYY, h:mm:ss')}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="user-comment-container">{comment.content}</div>
          </Col>

          <Col>
          { (user.uid === comment.user.uid) ?
          // Comment from the user
              <DotsButton
              items={[
                {
                  id: comment.id,
                  action: DropDownButton({
                    icon: BsFillTrashFill(),
                    title: "Delete",
                  }),
                  handler: handleDeleteComment,
                  args: { ideaId: idea.id, commentId: comment.id },
                },
              ]}
            />
            :
            // Comment from other user
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

          </Col>
        </Row>
      </Card>
    </div>
  );
};
