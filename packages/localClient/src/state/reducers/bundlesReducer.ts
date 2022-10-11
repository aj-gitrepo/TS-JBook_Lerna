import produce from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  }
}

const initialState: BundlesState = {};

const reducer = produce((state: BundlesState = initialState, action: Action) => {
  switch(action.type) {
    case ActionTypes.BUNDLE_START:
      state[action.payload.id] = {
        loading: true,
        code: '',
        err: ''
      };
      return;
    case ActionTypes.BUNDLE_COMPLETE:
      state[action.payload.id] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err
      }
      return;
    default:
      return; //the returnning of state is taken care by immer
  }
}, initialState);

export default reducer;
