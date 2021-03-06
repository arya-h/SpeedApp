import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addNewComment } from '../../actions/comment';

import '../../style/comments.css';

export const AddCommentInput = ({ideaObject}) => {   
    let [content, setContent] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth)

    const onHitEnter = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            dispatch(addNewComment(ideaObject, content, user));
            setContent("")
            history.push("/");
        }
    }

    return (
        <div className="comment-container" style={{display:"flex", flexDirection:"row"}}>
            <div className="profile-pic-container">
                <i className="fas fa-user-circle" style={{fontSize:'1.5rem'}}></i>
            </div>
            <input
                type="text"
                placeholder="Add a comment to this idea"
                id="commentInput"
                value={content}
                className="comment-box"
                contentEditable={true}
                onKeyDown={onHitEnter}
                onChange={(event) => setContent(event.target.value)}
            ></input>
        </div>
    )
}