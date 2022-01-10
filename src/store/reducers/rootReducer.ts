import { combineReducers } from "redux";
import todoReducer from '../reducers/todoReducer'


const rootReducer = combineReducers({
    todos: todoReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer