import {
  Button,
  CardActions,
  CardContent,
  Container,
  Card,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import Navigation from "./Navigation";
import NoTodo from "./NoTodo";

const TodoPage: FC = () => {
  const todos = useAppSelector((state) => state.todos);

  let params = useParams();
  let todoId = getTargetTodo();

  function getTargetTodo() {
    if (todos.todos.length) {
      return todos.todos.filter(
        (todo) => todo.id === parseInt(params.todoId, 10)
      );
    } else {
      return undefined;
    }
  }

  if (!todoId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Task {todoId[0].id}</Typography>
          <Typography component={"p"}>{todoId[0].title}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="success">
            completed
          </Button>
          <Button variant="contained" color="error">
            delete
          </Button>
          <Button variant="contained" color="info">
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
