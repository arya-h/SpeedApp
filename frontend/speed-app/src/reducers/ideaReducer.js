import { types } from "../types/types";

const initialIdeas = [
    { id: 1, title: "Test Idea 1", content: "This is my test idea I want to tell everyone about" },
    { id: 2, title: "Test Idea 2", content: "This idea is way better than idea 1" },
    { id: 3, title: "Test Idea 3", content: "This idea is definitely the best idea" },
]
/*
    {
        list: []
    }
*/
export const ideaReducer = (state = initialIdeas, action) => {

    switch (action.type) {

        // Example
        case types.createIdea:
            return {
                ...state
                // TODO
            }

        default:
            return state;


    }

}