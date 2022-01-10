import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import rootActionCreator from "../store/action-creators/rootActionCreator";



export const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(rootActionCreator, dispatch)
}
