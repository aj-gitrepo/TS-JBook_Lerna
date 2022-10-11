import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';
import { ActionTypes } from './action-types';

import reducers from './reducers';

export const store = configureStore({
  reducer: reducers,
  middleware: [reduxThunk]
});

// to check the return type - hover
// const state = store.getState();
// state.cells.data;

// manually dispatch actions
store.dispatch({
  type: ActionTypes.INSERT_CELL_AFTER,
  payload:{
    id: null,
    type: 'code'
  }
});

store.dispatch({
  type: ActionTypes.INSERT_CELL_AFTER,
  payload:{
    id: null,
    type: 'text'
  }
});
store.dispatch({
  type: ActionTypes.INSERT_CELL_AFTER,
  payload:{
    id: null,
    type: 'code'
  }
});

store.dispatch({
  type: ActionTypes.INSERT_CELL_AFTER,
  payload:{
    id: null,
    type: 'text'
  }
});

// manually get state
console.log(store.getState());
