import { Outlet, useNavigate } from "react-router-dom"


const Todo = () => {

    const history = useNavigate();

    const goBack = () => history(-1)

    return <div className="todo">
       
        <Outlet />

    </div>
}

export default Todo