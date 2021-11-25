import React, { useEffect } from 'react'
import { CommentCard } from './commentCard';

import '../../style/comments.css';

export const CommentList = ( { idea } ) => {
    let numComments = idea.comments ? idea.comments.length : 0
    return (
        <div className="comment-list-container">
            { numComments === 0  ?
                <h6>There are no comments yet</h6> : 
                idea.comments.map(comment => <CommentCard key={comment.id} props={{'comment': comment, 'idea': idea }}/>)
            }
        </div>
    )
}