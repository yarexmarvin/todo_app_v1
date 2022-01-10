import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;