import React from "react";
import { useDispatch } from 'react-redux';
import { Card } from "react-bootstrap";
import { startDeletingComment } from "../../actions/comment";

import '../../style/comments.css';

import { DotsButton } from "../ui/DotsButton";

export const CommentCard = ({props}) => {

    const comment = props?.comment;
    const idea = props?.idea;
    const dispatch = useDispatch();

    const handleDeleteComment = (ideaId, commentId) => {
        dispatch(startDeletingComment(ideaId, commentId));
    }

    return(
        <div style={{display:"flex", flexDirection:"row", width: "100%", marginTop: '0.5rem'}}>
            <div className="profile-pic-container">
                <i className="fas fa-user-circle" style={{fontSize:'1.5rem'}}></i>
            </div>
            <Card style={{width: "100%", borderRadius: '1rem', position: 'relative'}}>
                <div className="user-name-container"><h6>{comment.user}</h6></div>
                <div className="user-comment-container">{comment.content}</div>

                { <DotsButton 
                    id={ {'commentId': comment.id, 'ideaId': idea.id }} 
                    items={ [
                        { 
                            action: "Delete", 
                            handler: handleDeleteComment
                        },
                    ]}
                /> }
            </Card>
        </div>
    );
}