import { addIdea } from "../helpers/addIdea";
import { loadIdeas } from "../helpers/loadIdeas";
import { types } from "../types/types";

export const addNewIdea = (idea) => {
    return async (dispatch) => {
        await addIdea(idea);
        dispatch(createIdea(idea));
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
})
