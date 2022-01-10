import { FC } from "react";
import { useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";


const TodoPage:FC = () => {
    const todos = useAppSelector(state => state.todos);

    let params = useParams();
    let todoId = todos.todos.filter(todo => todo.id === parseInt(params.todoId,10))

    return <div>
        <h1>TodoPage</h1>
        This is {todoId[0].id} todo!
        <div>{todoId[0].title}</div>
    </div>
}

export default TodoPage;