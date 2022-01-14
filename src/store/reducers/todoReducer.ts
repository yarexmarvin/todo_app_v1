import { ITodos, todoActionType, todoActionTypes } from "../../types/todo";

export const initialState: ITodos = {
    todos: [],
    filter: 'all',
    loading: false,
}


const todoReducer = (state:ITodos =initialState , action: todoActionType): ITodos => {
    switch(action.type){
        case todoActionTypes.TODOS_LOAD: return  {...state, todos: [...state.todos, ...action.payload]}
        case todoActionTypes.TODO_DELETE: return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)}
        case todoActionTypes.TODO_COMPLETE: return {...state, todos: state.todos.map(todo => todo.id === action.payload? {...todo, completed: !todo.completed}: todo)}
        case todoActionTypes.TODOS_FILTER: return {...state, filter: action.payload}
        case todoActionTypes.TODO_ADD: return {...state, todos: [...state.todos, action.payload]}
        case todoActionTypes.TODOS_LOADING: return {...state, loading: action.payload}
        default: return state;
    }
}

export default todoReducer