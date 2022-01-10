import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import Navigation from "./Navigation";
import NoTodo from "./NoTodo";


const TodoPage:FC = () => {
    const todos = useAppSelector(state => state.todos);

    let params = useParams();
    let todoId = getTargetTodo();

    function getTargetTodo(){
        if(todos.todos.length){
            return todos.todos.filter(todo => todo.id === parseInt(params.todoId,10));
        }else{
            return undefined
        }
    }

    if(!todoId){
        return <Navigate to="/" replace />
    }

    return <div>
        <h1>TodoPage</h1>
        This is {todoId[0].id} todo!
        <div>{todoId[0].title}</div>
    </div>
}

export default TodoPage;