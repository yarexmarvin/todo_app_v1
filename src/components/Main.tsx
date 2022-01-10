import { FC, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppActions } from "../hooks/useAppActions";
import useAppSelector from "../hooks/useAppSelector";
import { ITask } from "../types/todo";


const Main: FC = () => {

    const todos = useAppSelector(state => state.todos);

    const { changeTodoFilter, completeTodo, deleteTodo, fetchTodos } = useAppActions();

    const [tasks, setTasks] = useState<ITask[]>([])

    useEffect(() => {
        console.log(todos)
        setTasks(todos.todos)
      }, [todos])


      let navigate = useNavigate()

      function toForm(){
        navigate('/form')
      }


    return <div className='App__inner'>
        {todos.filter === 'all' ?
            <div>{tasks.length ? tasks.map((todo: ITask) => {
                return <Link
                to={`/todo/${todo.id}`}
                    onDoubleClick={() => deleteTodo(todo.id)}
                    key={todo.id}>
                    <input type="checkbox" onChange={() => completeTodo(todo.id)} checked={todo.completed} />
                    {todo.title}
                </Link>
            }) : ""}
            </div>
            :
            <div>{tasks.length ? tasks
                .filter(todo => todo.completed === todos.filter)
                .map((todo: ITask) => {
                    return <Link
                        to={`/todo/${todo.id}`}
                        onDoubleClick={() => deleteTodo(todo.id)}
                        key={todo.id}>
                        <input type="checkbox" onChange={() => completeTodo(todo.id)} checked={todo.completed} />
                        {todo.title}
                    </Link>
                }) : ''}
            </div>}


        <button onClick={() => fetchTodos()}>get todos</button>
        <button onClick={() => changeTodoFilter('all')}>show all</button>
        <button onClick={() => changeTodoFilter(true)}>show completed</button>
        <button onClick={() => changeTodoFilter(false)}>show current</button>
        <button onClick={toForm} >to form</button>
    </div>
}

export default Main