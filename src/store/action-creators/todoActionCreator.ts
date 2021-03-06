import { FilterType, ITask, todoActionAdd, todoActionComplete, todoActionDelete, todoActionFilter, todoActionLoading, todoActionTypes, todosActionLoad, todosActionSave, todosFetch } from "../../types/todo";

export const addTodo = (todo: ITask):todoActionAdd => ({type: todoActionTypes.TODO_ADD, payload: todo});
export const deleteTodo = (id: number):todoActionDelete => ({type: todoActionTypes.TODO_DELETE, payload: id});
export const completeTodo = (id: number):todoActionComplete => ({type: todoActionTypes.TODO_COMPLETE, payload: id});
export const loadingTodos = (load: boolean):todoActionLoading => ({type: todoActionTypes.TODOS_LOADING, payload: load});
export const fetchTodos = ():todosFetch => ({type: todoActionTypes.TODOS_FETCH});
export const saveTodos = (todos: ITask[]): todosActionSave =>{return {type: todoActionTypes.TODOS_SAVE, payload: todos }} 
export const loadTodos = (load: ITask[]): todosActionLoad => ({type: todoActionTypes.TODOS_LOAD, payload: load});
export const changeTodoFilter = (filter: FilterType): todoActionFilter => ({type: todoActionTypes.TODOS_FILTER, payload: filter});