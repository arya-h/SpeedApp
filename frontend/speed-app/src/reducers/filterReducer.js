import { types } from "../types/types";

export const filterReducer = (state = "", action) => {
  switch (action.type) {
    case types.updateFilter: {
        console.log(state)
      return action.payload;
    }

    default:
      return state;
  }
};
