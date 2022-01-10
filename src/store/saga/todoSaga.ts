import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import { ITask, todoActionTypes } from '../../types/todo';
import { loadingTodos, loadTodos } from '../action-creators/todoActionCreator';


async function getTodosFromApi(start: number)  {
    return await axios.get<ITask[]>(`https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=10`)
    .then((response) =>  response.data)
    .catch(e => console.log('Error in recent request, try again later. ', e))
};

let getNumber = () =>  Math.floor(Math.random()*(1-190)+1)

function* todoRandomFetchWorker(){
    yield put(loadingTodos(true));
    const data: ITask[] = yield call(getTodosFromApi, getNumber());
    console.log('data => ', data)
    yield put(loadTodos(data ?? []))
    yield put(loadingTodos(false));
}


export default function* todoRandomFetchWatcher(){
    yield takeEvery(todoActionTypes.TODOS_RANDOM_FETCH, todoRandomFetchWorker)
}