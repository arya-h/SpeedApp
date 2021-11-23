import React from "react";
import { Card } from "react-bootstrap";

export const CommentCard = ({ comment }) => {
    return(
        <div style={{display:"flex", flexDirection:"row", width: "100%"}}>
            <div className="profile-pic-container">
                <i className="fas fa-user-circle" style={{fontSize:'1.5rem'}}></i>
            </div>
            <Card>
                <div class="userName">Anonymous User</div>
                <div class="comment">{comment}</div>
            </Card>
        </div>
    );
}