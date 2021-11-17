import { db } from "../firebase/firebase-config";
import { loadIdeas } from "../helpers/loadIdeas";
import { updateIdea } from "../helpers/updateIdea";
import { types } from "../types/types";


// Read ideas --> Retrieve from DDBB & set the new store with the ideas

export const startLoadingIdeas = () => {
    return async ( dispatch ) => {
        const ideas = await loadIdeas();
        dispatch ( setIdeas( ideas ) );
    }
}

export const setIdeas = ( ideas ) => ({
    type: types.ideasLoad,
    payload: ideas
});

export const updateIdeaAction = ( idea ) => {
    return async () => {
        const result = await updateIdea(idea);
    }
}
