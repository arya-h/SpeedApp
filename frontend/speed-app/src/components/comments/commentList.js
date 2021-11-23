import React, { useEffect } from 'react'
import { CommentCard } from './commentCard';

export const CommentList = ({ideaObject}) => {   

    const comments = ideaObject.comments;
    console.log(comments);

    // Rerender when list changes (Delete idea)
    useEffect(() => {}, [comments])

    return (
        <div >
            { comments.length === 0  ?
                <h6>There are no comments yet</h6> : 
                comments.map(i => <CommentCard comment={i}/>)
            }
        </div>
    )
}