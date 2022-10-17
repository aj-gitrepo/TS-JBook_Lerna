import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

export const store = configureStore({
  reducer: reducers,
  middleware: [reduxThunk]
});

