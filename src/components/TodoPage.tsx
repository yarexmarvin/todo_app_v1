import {
  Button,
  CardActions,
  CardContent,
  Container,
  Card,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link, useNavigate, useRoutes } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useAppActions } from "../hooks/useAppActions";
import useAppSelector from "../hooks/useAppSelector";
import Navigation from "./Navigation";
import NoTodo from "./NoTodo";

const TodoPage: FC = () => {
  const todos = useAppSelector((state) => state.todos);

  let params = useParams();
  let todoId = getTargetTodo();

  let navigate = useNavigate();

  function getTargetTodo() {
    if (todos.todos.length) {
      return todos.todos.filter(
        (todo) => todo.id === parseInt(params.todoId, 10)
      );
    } else {
      return undefined;
    }
  }


  

  const {completeTodo, deleteTodo} = useAppActions();

  if(!todoId){
    return <Navigate to="/" replace />
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Task {todoId[0].id}</Typography>
          <Typography component={"p"}>{todoId[0].title}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={()=>completeTodo(todoId[0].id)  }  variant="contained" color={todoId[0].completed? "success": 'warning'}>
            {todoId[0].completed? 'completed': 'complete'}
          </Button>
          <Button onClick={()=>{deleteTodo(todoId[0].id); navigate('/') }} variant="contained" color="error">
            delete
          </Button>
          <Button  variant="contained" color="info">
            <Link style={{ color: "white" }} to="/">
              go back
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default TodoPage;
