import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = configureStore({
  reducer: reducers,
  middleware: [reduxThunk, persistMiddleware]
});

