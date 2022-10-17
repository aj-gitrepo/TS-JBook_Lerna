import produce from "immer";

import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return;

    case ActionTypes.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return;

    case ActionTypes.FETCH_CELLS_COMPLETE:
      state.loading = false;
      state.error = null;
      state.order = action.payload.map(cell => cell.id);
      state.data = action.payload.reduce((acc, cell) => { //acc- accumulator obj to which we are reducing
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']); //{}initial value for acc
      return;

    case ActionTypes.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return;
      
    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return; //immer returns state //here state is used(not requi) to avoid ts returning type undefined

    case ActionTypes.DELETE_CELL:
      delete state.data[action.payload]; //updating data obj
      state.order = state.order.filter((id) => id !== action.payload); //updating array

      return;

    case ActionTypes.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if(targetIndex < 0 || targetIndex > state.order.length - 1) { //if the destination is out of bounds
        return;
      }
      // swapping cell placement
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return;

    case ActionTypes.INSERT_CELL_AFTER:
      const cell: Cell = { //default cell
        content: '',
        type: action.payload.type,
        id: randomId()
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex((id) => id === action.payload.id); //returns -1 if not found

      if(foundIndex < 0) {
        state.order.unshift(cell.id); //adding at start of the list
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
      return;

    default:
      return;
  }
}, initialState); //initialState to remove undefined type in ts otherwise in each return statement return state

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
}

export default reducer;

// updateCell - updating the content property of an item of given id in the data field

// Immer - allows us to directly manipulate the state object. In other words, change it directly instead of trying to write out all the spread logic and produce a brand new state object.
// https://immerjs.github.io/immer/update-patterns

// We can directly modify the state object as much as we want so we can reach into the state object, mutate and change properties at will when we then return that object or really just and we don't necessarily have to return it. Just a quick side note. After we mutate, it will then take that object. It will then magically update our state object for us in a way that is compatible with Redux.

// return {
//   ...state, //all the state properties
//   data: {
//     ...state.data, 
//     [id]: {
//       ...state.data[id],
//       content: content
//     }
//   } //all the data property with only one updated item's content
// };

// replacing the above with - state.data[id].content = content

// toString(36) -  this thing to is going to be filled with numbers and letters. All the numbers from zero to nine, all the letters from A to Z. We're then going to take just a portion of the string that we get back.

// We're going to use the reduce function in this case. You might remember that the reduced function is somewhat similar to MAP, but rather than iterating over every single element inside of an array and returning a new array, we're going to instead iterate over every element and we're going to add in some new data to some kind of new number or string or object or array or something like that.