import React from "react";
import { useDispatch } from 'react-redux';
import { Card } from "react-bootstrap";
import { startDeletingComment } from "../../actions/comment";

import '../../style/comments.css';

import { DotsButton } from "../ui/DotsButton";

// Dropdown
import { BsFillTrashFill } from 'react-icons/bs';
import { DropDownButton } from "../ui/DropDownButton";



export const CommentCard = ({props}) => {

    const comment = props?.comment;
    const idea = props?.idea;
    const dispatch = useDispatch();

    const handleDeleteComment = ( args ) => {
        console.log(args);
        dispatch(startDeletingComment( args.ideaId, args.commentId));
    }

    return(
        <div style={{display:"flex", flexDirection:"row", width: "100%", marginTop: '0.5rem'}}>
            <div className="profile-pic-container">
                <i className="fas fa-user-circle" style={{fontSize:'1.5rem'}}></i>
            </div>
            <Card style={{width: "100%", borderRadius: '1rem', position: 'relative'}}>
                <div className="user-name-container"><h6>{comment.user}</h6></div>
                <div className="user-comment-container">{comment.content}</div>

                <DotsButton  
                    items = { [
                        { 
                            id: comment.id,
                            action: DropDownButton( { icon:BsFillTrashFill(),  title:"Delete"} ), 
                            handler: handleDeleteComment,
                            args: { ideaId: idea.id, commentId:comment.id } 
                        },
                    ]}
                />
            </Card>
        </div>
    );
}