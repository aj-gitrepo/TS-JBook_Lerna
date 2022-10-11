import { useSelector, TypedUseSelectorHook } from "react-redux";

import { RootState } from "../state";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// useSelector hook does not support types so using cresting this hook to use type based useSelector hook