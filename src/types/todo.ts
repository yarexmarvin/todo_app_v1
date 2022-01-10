
export interface ITodos {
    todos: ITask[],
    filter: FilterType,
    loading: boolean,
}

export type FilterType = 'all' | true | false

export interface ITask {
    id: number,
    title: string,
    completed: boolean,
}


export enum todoActionTypes {
    TODOS_RANDOM_FETCH = 'TODOS/RANDOM_FETCH',
    TODOS_LOAD = 'TODOS/LOAD',
    TODO_ADD = 'TODO/ADD',
    TODO_DELETE = 'TODO/DELETE',
    TODO_COMPLETE = 'TODO/COMPLETE',
    TODOS_FILTER = 'TODOS/FILTER',
    TODOS_LOADING = 'TODOS/LOADING'
}

export interface todosRandomFetch {
    type: todoActionTypes.TODOS_RANDOM_FETCH;
}
export interface todosActionLoad {
    type: todoActionTypes.TODOS_LOAD;
    payload: ITask[];
}
export interface todoActionAdd {
    type: todoActionTypes.TODO_ADD;
    payload: ITask;
}
export interface todoActionDelete {
    type: todoActionTypes.TODO_DELETE;
    payload: number;
}
export interface todoActionComplete {
    type: todoActionTypes.TODO_COMPLETE;
    payload: number;
}
export interface todoActionFilter {
    type: todoActionTypes.TODOS_FILTER;
    payload: FilterType;
}
export interface todoActionLoading {
    type: todoActionTypes.TODOS_LOADING;
    payload: boolean;
}

export type todoActionType = todosRandomFetch
|todosActionLoad
| todoActionAdd
| todoActionDelete
| todoActionComplete
| todoActionFilter
| todoActionLoading