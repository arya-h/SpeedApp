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

        case types.ideasDelete:
            return {
                ...state,
                ideas: state.ideas.filter ( idea => idea.id !== action.payload )
            }

        case types.filterUserIdeas:
            return {
                ...state,
                ideas: state.ideas.filter ( idea => idea.user.uid === action.payload )
            }

// Comments
        case types.addComment:
            return{
                ...state,
                ideas: state.ideas.map(
                    idea => idea.id === action.payload.id
                    ? action.payload
                    : idea
                )
            }

        case types.deleteComment:
            let ideaToModify = state.ideas.find(item => item.id === action.payload.ideaId);
            ideaToModify.comments = ideaToModify.comments.filter(comment => comment.id !== action.payload.commentId)
            return {
                ...state,
                ideas: [
                    ideaToModify,
                    ...state.ideas.filter(item => item.id !== action.payload.ideaId),
                ]
            }

        default:
            return state;

    }

}