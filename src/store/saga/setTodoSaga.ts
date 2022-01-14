import { call, takeEvery } from "@redux-saga/core/effects";
import { todoActionTypes, todosActionSave } from "../../types/todo";
import { saveTodos } from "../action-creators/todoActionCreator";

 function* setTodos(action: todosActionSave){
    console.log('set saga tasks =>', action)
    try {
        let data = JSON.stringify(action.payload);
        return localStorage.setItem('tasks', data)
    } catch(err: any) {
        throw new Error(err)
    }
}

function* setTodosWorker(action: todosActionSave){
    const result:Response = yield call(setTodos, action);
    console.log('changes saved in localStorage')
}

export function* setTodosWatcher(){
    yield takeEvery(todoActionTypes.TODOS_SAVE, setTodosWorker)
}