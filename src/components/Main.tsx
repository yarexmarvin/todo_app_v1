import {
  AppBar,
  Button,
  Checkbox,
  Container,
  Fade,
  IconButton,
  InputBase,
  List,
  Fab,
  ListItem,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Snackbar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useHref,
  useRoutes,
  useSearchParams,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppActions } from "../hooks/useAppActions";
import useAppSelector from "../hooks/useAppSelector";
import { ITask } from "../types/todo";
import { Box } from "@mui/system";
import { saveTodos } from "../store/action-creators/todoActionCreator";

const Main: FC = () => {
  const todos = useAppSelector((state) => state.todos);

  const { changeTodoFilter, completeTodo, deleteTodo, fetchTodos } =
    useAppActions();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [search, setSearch] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClose() {
    setAnchorEl(null);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  let todoQuery = searchParams.get("todo") || "";

  useEffect(() => {
    console.log(todos);
    setTasks(todos.todos);
  }, [todos]);

  let navigate = useNavigate();

  



  function debounce<T extends Function>(fn: T, ms: number) {
    let timer;
    return function (args: string) {
      let fnCallee = () => {
        fn(args);
      };

      clearTimeout(timer);

      timer = setTimeout(fnCallee, ms);
    };
  }
  function sendToSearch(search: string) {
    setSearchParams({ todo: search });
  }

  let sendToSearchDebounced = debounce(sendToSearch, 500);

  useEffect(() => {
    sendToSearchDebounced(search);
  }, [search]);

  function handleSearch(value: string) {
    setSearch(value);
  }

  const handleSearchDebounce = debounce(handleSearch, 1000);

  return (
    <div className="App__inner">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MoreVertRounded />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() => {
                changeTodoFilter("all");
                handleClose();
              }}
            >
              Show all
            </MenuItem>
            <MenuItem
              onClick={() => {
                changeTodoFilter(true);
                handleClose();
              }}
            >
              Show Completed
            </MenuItem>
            <MenuItem
              onClick={() => {
                changeTodoFilter(false);
                handleClose();
              }}
            >
              Show Current
            </MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <div className="nav">
              filter:{" "}
              {todos.filter === "all"
                ? "all"
                : todos.filter
                ? "completed"
                : "current"}
            </div>
          </Typography>

          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
            component="div"
          >
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              type="search"
              sx={{ ml: 1, flex: "1" }}
              placeholder="search todo"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
            />
          </Paper>
        </Toolbar>
      </AppBar>

      {/* todos */}
      <Container sx={{ m: "5vmax 0 5vmax" }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {todos.filter === "all" ? (
            <div>
              {tasks.length
                ? tasks
                    .filter((todo) => todo.title.includes(todoQuery))
                    .map((todo: ITask) => {
                      return (
                        <ListItem key={todo.id}>
                          <Checkbox
                            onChange={() => completeTodo(todo.id)}
                            checked={todo.completed}
                          />
                          <Link
                            to={`/todo/${todo.id}`}
                          >
                            {todo.title}
                          </Link>
                        </ListItem>
                      );
                    })
                : ""}
            </div>
          ) : (
            <div>
              {tasks.length
                ? tasks
                    .filter(
                      (todo) =>
                        todo.completed === todos.filter &&
                        todo.title.includes(todoQuery)
                    )
                    .map((todo: ITask) => {
                      return (
                        <ListItem key={todo.id}>
                          <Checkbox
                            onChange={() => completeTodo(todo.id)}
                            checked={todo.completed}
                          />
                          <Link
                            to={`/todo/${todo.id}`}
                          >
                            {todo.title}
                          </Link>
                        </ListItem>
                      );
                    })
                : ""}
            </div>
          )}
        </List>
        <Box sx={{ display: "flex", justifyContent: "flex-start" , width: '100%', mt: '1vmax', position:'fixed', bottom:"2vmax"}}>
          <Fab variant="extended" color="primary" size="medium">
            <Link style={{ color: "#fff" }} to="form">
              create a new task
            </Link>
          </Fab>
        </Box>
      </Container>

      

    </div>
  );
};

export default Main;
