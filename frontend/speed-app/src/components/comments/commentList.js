import React, { useEffect } from 'react'
import { CommentCard } from './commentCard';

import '../../style/comments.css';

export const CommentList = ({ideaObject}) => {   

    const comments = ideaObject.comments;
    //console.log(comments);

    // Rerender when list changes (Delete idea)
    useEffect(() => {}, [comments])

    return (
        <div className="comment-list-container">
            { comments.length === 0  ?
                <h6>There are no comments yet</h6> : 
                comments.map(i => <CommentCard key={comments.indexOf(i)} comment={i}/>)
            }
        </div>
    )
}