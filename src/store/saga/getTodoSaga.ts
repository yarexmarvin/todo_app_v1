import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import { ITask, ITodos, todoActionTypes } from '../../types/todo';
import { fetchTodos, loadingTodos, loadTodos } from '../action-creators/todoActionCreator';

 const initialState: ITodos = {
    todos: [
        {
            id: -1,
            title: 'test task-1',
            completed: false,
        }
    ],
    filter: 'all',
    loading: false,
}


const fetchTodosFromStorage = () => JSON.parse(localStorage.getItem('tasks') || JSON.stringify(initialState.todos));



function* todoRandomFetchWorker(){

    yield put(loadingTodos(true));

    const data: ITask[] = yield call(fetchTodosFromStorage);

    console.log('data from localstorage => ', data)

    yield put(loadTodos(data))
    yield put(loadingTodos(false));
}



export default function* todoGetWatcher(){
    yield takeEvery(todoActionTypes.TODOS_FETCH, todoRandomFetchWorker)
}