import { combineReducers } from '@reduxjs/toolkit';

import cellsReducer from './cellsreducer';
import bundlesReducer from './bundlesreducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
});

export default reducers;

// to provide types for store
export type RootState = ReturnType<typeof reducers>;
