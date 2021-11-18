import { types } from "../types/types";

// const initialIdeas = {
//     ideas: [
//     { id: 1, title: "Test Idea 1", content: "This is my test idea I want to tell everyone about" },
//     { id: 2, title: "Test Idea 2", content: "This idea is way better than idea 1" },
//     { id: 3, title: "Test Idea 3", content: "This idea is definitely the best idea" },
//     ]
// }

    const initialIdeas = {
        ideas: []
    };
/*
    {
        list: []
    }
*/
export const ideaReducer = (state = initialIdeas, action) => {

    switch (action.type) {

        case types.ideasLoad: {
            return {
                ...state,
                ideas: [...action.payload]
            }
        }

        case types.ideasAddNew:
            return {
                ...state,
                ideas: [...state.ideas, {...action.payload}]
            }

        case types.ideasUpdate:
            return {
                ...state,
                ideas: state.ideas.map(
                    idea => idea.id === action.payload.id
                    ? action.payload.idea
                    : idea
                )
            }

        case types.ideaDelete:
            console.log("delete called");
            return {
                ...state,
                ideas: state.ideas.filter ( idea => idea.id !== action.payload )
            }

        default:
            return state;

    }

}