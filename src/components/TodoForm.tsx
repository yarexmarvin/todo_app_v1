import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppActions } from "../hooks/useAppActions";
import { ITask } from "../types/todo";

const TodoForm: FC = () => {
  const { addTodo } = useAppActions();

  const [newTask, setNewTask] = useState("");
  function setNewTaskTitle(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setNewTask((oldVal) => event.target.value);
  }

  const history = useNavigate();

  function addNewTask(taskTitle: string): void {
    const newTask: ITask = {
      id: Math.floor(Math.random() * 100),
      title: taskTitle,
      completed: false,
    };
    if (taskTitle.trim() !== "") {
      addTodo(newTask);
      setNewTask("");
      history("/");
    }
  }

  return (
    <Container>
      <Card id="form">
        <CardContent>
            <Typography sx={{m: '1vmin 0'}} variant="h3" >Create a new task!</Typography>
          <TextField
            value={newTask}
            sx={{width: '100%'}}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewTaskTitle(e)
            }
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => addNewTask(newTask)}
          >
            add new task
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default TodoForm;