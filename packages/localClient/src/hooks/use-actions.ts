import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => { //to prefent infinite loops due to the action dependency in useEffect
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]); //actionCreators is not added because it is imported
};

// to simplfy the use of useDispatch
// eg.
// const { updateCell } = useActions();
// updateCell(kjhk);

// use memo is almost kind of like a used state and a use effect put together whenever dispatch right here changes or whenever something inside of this array changes react is going to rerun that function. So I'm going to take the return value from that function and provide it as the overall return from the use memo hook, that calculation is only done one single time, the very first time we call this memo. And then it's only ever repeated whenever something inside that array right there changes.

// So now React will no longer think that great bundle is changing and it's no longer going to attempt to call or use effect again and again and again