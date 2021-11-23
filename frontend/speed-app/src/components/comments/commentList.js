import React, { useEffect } from 'react'
import { CommentCard } from './commentCard';

import '../../style/comments.css';
import { useSelector } from 'react-redux';

export const CommentList = ( { idea } ) => {

    return (
        <div className="comment-list-container">
            { idea.comments.length === 0  ?
                <h6>There are no comments yet</h6> : 
                idea.comments.map(comment => <CommentCard key={comment.id} comment={ comment }/>)
            }
        </div>
    )
}