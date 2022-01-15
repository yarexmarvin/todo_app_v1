import { Outlet, useNavigate, useParams } from "react-router-dom"


const Todo = () => {

    const history = useNavigate();
    let params = useParams();

    const goBack = () => history(-1)

    if(!params.todoId){
        goBack();
    }

    return <div className="todo">
       
        <Outlet />

    </div>
}

export default Todo