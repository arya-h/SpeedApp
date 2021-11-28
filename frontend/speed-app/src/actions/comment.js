import { addDoc, collection, deleteDoc, doc } from '@firebase/firestore';

import { db } from '../firebase/firebase-config';
import { types } from '../types/types';

// Add comment
// export const addNewComment = (idea, comment) => {
//     return async () => { await addComment(idea, comment); }
// }

export const addNewComment = (idea, content) => {
    return async (dispatch) => {

        let richComment = {
            user:"Anonymous user",
            content: content,
            timestamp: Date.now(),
        }

        const docRef = await addDoc(collection(db, `ideas/${ idea.id }/comments`), richComment);

        const newIdea = {
            ...idea,
            comments: [{
                id: docRef.id,
                ...richComment
            }, ...idea.comments, ]
        }

        dispatch( createComment( newIdea ) )
    }
}

export const createComment = ( newIdea ) => {

    return{
        type: types.addComment,
        payload: {...newIdea}
    }
}

// Delete comment
export const startDeletingComment = ({ ideaId, commentId }) => {
    return async ( dispatch ) => {

        await deleteDoc( doc(db, `ideas/${ ideaId }/comments`, commentId) );

        dispatch( deleteComment( { 'ideaId': ideaId, 'commentId': commentId } ));

    }
}

export const deleteComment = ( payload ) => ({
    type: types.deleteComment,
    payload
});