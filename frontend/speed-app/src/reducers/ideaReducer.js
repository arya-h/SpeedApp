import { types } from "../types/types";

/*
    {
        list: []
    }
*/
export const ideaReducer = ( state = {}, action ) => {

    switch( action.type ){

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