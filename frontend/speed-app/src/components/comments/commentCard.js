import React from "react";
import { Card } from "react-bootstrap";

import '../../style/comments.css';

import { DotsButton } from "../ui/DotsButton";

export const CommentCard = ({ comment }) => {

    const handleDeleteComment = () => {
        console.log( comment.id )
    }

    return(
        <div style={{display:"flex", flexDirection:"row", width: "100%", marginTop: '0.5rem'}}>
            <div className="profile-pic-container">
                <i className="fas fa-user-circle" style={{fontSize:'1.5rem'}}></i>
            </div>
            <Card style={{width: "100%", borderRadius: '1rem', position: 'relative'}}>
                <div className="user-name-container"><h6>{comment.user}</h6></div>
                <div className="user-comment-container">{comment.content}</div>

                {/* <DotsButton 
                    id={ comment.id } 
                    items={ [
                        { 
                            action: "Delete", 
                            handler: handleDeleteComment 
                        },
                    ]}
                /> */}
            </Card>
        </div>
    );
}