import { Dispatch } from "redux"; //for async actions using redux thunk
import axios from "axios";

import { ActionTypes } from "../action-types";
import { 
  Action,
  UpdateCellAction, 
  DeleteCellAction, 
  MoveCellAction, 
  InsertCellAfterAction, 
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { Direction } from "../actions";
import bundler from "../../bundler";
import { RootState } from "../reducers";

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

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionTypes.FETCH_CELLS });
  try {
    const { data }: { data: Cell[]} = await axios.get('/cells');

    dispatch({
      type: ActionTypes.FETCH_CELLS_COMPLETE,
      payload: data
    });
  } catch (err) {
    if(err instanceof Error) {
      dispatch({
        type: ActionTypes.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  }
}

export const saveCells = () => async (dispatch: Dispatch<Action>, getState: () => RootState) => { //getState to get order and data from RootState
  const { cells: {data, order}, } = getState();
  const cells = order.map((id) => data[id]); //array of Cells
  try {
    await axios.post('/cells', { cells }); //cells: cells
  } catch (err) {
    if(err instanceof Error) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
}


// updateCell, deleteCell, insertCell, moveCell - synchronous
// fetchCell - asynchronous (needs redux thunk)