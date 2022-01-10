import { Outlet, useNavigate } from "react-router-dom"


const Todo = () => {

    const history = useNavigate();

    const goBack = () => history(-1)

    return <div className="todo">
        <h1>Todo!</h1>
        <button onClick={goBack}>  go back</button>
        <Outlet />

    </div>
}

export default Todo