import { combineReducers } from '@reduxjs/toolkit';

import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
});

export default reducers;

// to provide types for store
export type RootState = ReturnType<typeof reducers>;
