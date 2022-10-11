import { Dispatch } from "redux"; //for async actions using redux thunk

import { ActionTypes } from "../action-types";
import { 
  Action,
  UpdateCellAction, 
  DeleteCellAction, 
  MoveCellAction, 
  InsertCellAfterAction, 
} from "../actions";
import { CellTypes } from "../cell";
import { Direction } from "../actions";
import bundler from "../../bundler";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id
  };
};

export const moveCell = (id: string, direction: Direction ): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType
    }
  };
};

export const createBundle = (id: string, input: string) => async(dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.BUNDLE_START,
    payload: {
      id,
    },
  });

  const result = await bundler(input);

  dispatch({
    type: ActionTypes.BUNDLE_COMPLETE,
    payload: {
      id,
      bundle: result,
    },
  });

}


// updateCell, deleteCell, insertCell, moveCell - synchronous
// fetchCell - asynchronous (needs redux thunk)