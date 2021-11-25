import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

import { addIdea } from "../helpers/addIdea";
import { loadIdeas } from "../helpers/loadIdeas";
import { updateIdea } from "../helpers/updateIdea";
import { likeIdea } from "../helpers/likeIdea";
import { types } from "../types/types";

export const addNewIdea = (idea) => {
    return async (dispatch) => {

        const improvedIdea = {
            ...idea,
            timestamp: Date.now(),
            comments: [],
            likes: 0
        }

        const ideaWithId = await addIdea(improvedIdea);
        dispatch(createIdea(ideaWithId));
    }
}

export const createIdea = (idea) => ({
    type: types.ideasAddNew,
    payload: idea
})

// Read ideas --> Retrieve from DDBB & set the new store with the ideas

export const startLoadingIdeas = () => {
    return async (dispatch) => {
        const ideas = await loadIdeas();
        dispatch(setIdeas(ideas));
    }
}

export const setIdeas = (ideas) => ({
    type: types.ideasLoad,
    payload: ideas
});

export const updateIdeaAction = ( idea ) => {
    return async () => { await updateIdea(idea); }
}

//like idea
export const likeIdeaAction = (idea) =>{
    console.log("inside likeIdeaAction : ", idea)
    //after update
    idea.likes+=1;
    return async ()=>{ await likeIdea(idea);}
    // return async (dispatch) =>{
    //     const ideaRef = doc(db, "ideas", idea.id);

    //         // update idea document
    //         await updateDoc(ideaRef, idea);
    //         dispatch(likeIdea(idea.id));
    // }
}



// Delete idea
export const startDeleting = ( id ) => {
    return async ( dispatch ) => {

        await deleteDoc( doc(db, "ideas", id) );

        dispatch( deleteIdea( id ));
        // alert( 'Idea deleted') 

    }
}

export const deleteIdea = ( id ) => ({
    type: types.ideasDelete,
    payload: id
})
