import { types } from "../types/types";

export const filterReducer = (state = "", action) => {
  switch (action.type) {
    case types.updateFilter: {
      
      return action.payload;
    }

    default:
      return state;
  }
};
