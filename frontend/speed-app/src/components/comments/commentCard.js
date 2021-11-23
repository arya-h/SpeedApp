import React from "react";
import { Card } from "react-bootstrap";

import '../../style/comments.css';

export const CommentCard = ({ comment }) => {
    return(
        <div style={{display:"flex", flexDirection:"row", width: "100%", marginTop: '0.5rem'}}>
            <div className="profile-pic-container">
                <i className="fas fa-user-circle" style={{fontSize:'1.5rem'}}></i>
            </div>
            <Card style={{width: "100%", borderRadius: '1rem'}}>
                <div class="user-name-container"><h6>Anonymous User</h6></div>
                <div class="user-comment-container">{comment}</div>
            </Card>
        </div>
    );
}