import { FC, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppActions } from '../hooks/useAppActions';
import { ITask } from "../types/todo";



const TodoForm: FC = () => {

    const { addTodo} = useAppActions();

    const [newTask, setNewTask] = useState('');
    function setNewTaskTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        setNewTask(oldVal => event.target.value)
    }

    const history = useNavigate();

    function addNewTask(taskTitle: string): void {
        const newTask: ITask = {
            id: Math.floor(Math.random()* 100),
            title: taskTitle,
            completed: false
        }
        if (taskTitle.trim() !== '') {
            addTodo(newTask);
            setNewTask('');
            history('/')

        }
        
    }


    return <div>
        <div id="form">
            <input value={newTask} onChange={(e) => setNewTaskTitle(e)} />
            <button onClick={() => addNewTask(newTask)}>add new task</button>
        </div>
    </div>
}

export default TodoForm