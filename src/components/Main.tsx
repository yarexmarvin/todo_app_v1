import React, { FC, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useHref, useRoutes, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppActions } from "../hooks/useAppActions";
import useAppSelector from "../hooks/useAppSelector";
import { ITask } from "../types/todo";


const Main: FC = () => {

    const todos = useAppSelector(state => state.todos);

    const { changeTodoFilter, completeTodo, deleteTodo, fetchTodos } = useAppActions();

    const [tasks, setTasks] = useState<ITask[]>([]);
    const [search, setSearch] = useState<string>('')

    const [searchParams, setSearchParams] = useSearchParams();
    let todoQuery = searchParams.get('todo') || ''

    useEffect(() => {
        console.log(todos)
        setTasks(todos.todos)
      }, [todos])


      let navigate = useNavigate()

      function toForm(){
        navigate('/form')
      }

      interface IParams {
          todo: string;
      }

    useEffect(()=>{
        setSearchParams({todo: search});
    },[search])

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
        setSearch(e.target.value);
    }

    return <div className='App__inner'>
      
            <input value={search} type='search' onChange={e=>handleSearch(e)}/>
        
        {todos.filter === 'all'   ?
            <div>{tasks.length ? tasks
                .filter(todo => todo.title.includes(todoQuery))
                .map((todo: ITask) => {
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
                .filter(todo => todo.completed === todos.filter && todo.title.includes(todoQuery))
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