import todoGetWatcher from "./getTodoSaga";
import {all} from 'redux-saga/effects'
import { setTodosWatcher } from "./setTodoSaga";



export default function* rootWatcher(){
    yield all([todoGetWatcher(), setTodosWatcher()])
}