import React, { useEffect } from 'react'
import { CommentCard } from './commentCard';

import '../../style/comments.css';
import { useSelector } from 'react-redux';

export const CommentList = ( { idea } ) => {
    
    const comments = idea.comments
    const { ideas } = useSelector((state) => state.ideas);

    // Rerender when list changes
    useEffect(() => {}, [ ideas ])

    return (
        <div className="comment-list-container">
            { comments.length === 0  ?
                <h6>There are no comments yet</h6> : 
                comments.map(comment => <CommentCard key={comment.id} comment={ comment }/>)
            }
        </div>
    )
}