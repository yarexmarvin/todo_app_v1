import { Outlet } from "react-router-dom"


const Todo = () => {

    return <div className="todo">
        <h1>Todo!</h1>
        <Outlet />

    </div>
}

export default Todo