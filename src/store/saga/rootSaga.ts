import todoRandomFetchWatcher from "./todoSaga";
import {all} from 'redux-saga/effects'



export default function* rootWatcher(){
    yield all([todoRandomFetchWatcher(),])
}