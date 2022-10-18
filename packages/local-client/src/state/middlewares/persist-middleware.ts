import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddleware = ({
  dispatch, getState
}: { 
  dispatch: Dispatch<Action>; 
  getState: () => RootState 
}) => {
  let timer: any; //should be at top
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if(
        [
          ActionTypes.MOVE_CELL, 
          ActionTypes.UPDATE_CELL, 
          ActionTypes.INSERT_CELL_AFTER, 
          ActionTypes.DELETE_CELL
        ].includes(action.type)
      ) {
        if(timer) {
          // if this function runs before the previous timeout runs out, clear the previous timer
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
        
      }
    }
  }
};

// We're trying to pass along every single action that we receive. The only exception is that we if we receive one of these actions (MOVE_CELL, UPDATE_CELL, INSERT_CELL_AFTER, DELETE_CELL), we want to dispatch an additional action as well.

// Calling saveCells() directly is complicated as it dispatches thunk
