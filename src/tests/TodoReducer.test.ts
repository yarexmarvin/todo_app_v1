import { call, put } from "redux-saga/effects";
import {
  addTodo,
  changeTodoFilter,
  completeTodo,
  deleteTodo,
  fetchTodos,
  loadingTodos,
  loadTodos,
  saveTodos,
} from "../store/action-creators/todoActionCreator";
import todoReducer, { initialState } from "../store/reducers/todoReducer";
import {
  fetchTodosFromStorage,
  todoRandomFetchWorker,
} from "../store/saga/getTodoSaga";
import { ITask, ITodos } from "../types/todo";

let mockState1 = initialState;
let mockState2: ITodos = {
  todos: [
    {
      id: 99990,
      title: "new task 2",
      completed: false,
    },
  ],
  filter: "all",
  loading: false,
};

let tasks: ITask[] = [
  {
    id: 99999,
    title: "new task1",
    completed: true,
  },
  {
    id: 99991,
    title: "new task2",
    completed: false,
  },
  {
    id: 99919,
    title: "new task3",
    completed: true,
  },
  {
    id: 992999,
    title: "new task4",
    completed: false,
  },
  {
    id: 99949,
    title: "new task5",
    completed: false,
  },
];

test("add function", () => {
  let task: ITask = {
    id: 99999,
    title: "new task",
    completed: true,
  };

  let mockAddAction = addTodo(task);
  let mockState = todoReducer(mockState1, mockAddAction);

  expect(mockState.todos.length).toBe(1);
  expect(mockState.todos[0].title).toBe("new task");
});

test("todo loads", () => {
  let mockLoadTodosAction = loadTodos(tasks);
  let mockState = todoReducer(mockState2, mockLoadTodosAction);

  expect(mockState.todos.length).toBe(6);
  expect(mockState.todos[2].id).toBe(99991);
});

test("delete function", () => {
  let mockDeleteAction = deleteTodo(99990);
  let mockState = todoReducer(mockState2, mockDeleteAction);
  expect(mockState.todos.length).toBe(0);
});

test("task completes", () => {
  let mockCompleteAction = completeTodo(99990);
  let mockState = todoReducer(mockState2, mockCompleteAction);

  expect(mockState.todos[0]).toBeTruthy();
});

test("filter changes", () => {
  let mockFilterAction = changeTodoFilter(true);
  let mockState = todoReducer(mockState2, mockFilterAction);

  expect(mockState.filter).toBeTruthy();
});

test("loading state changes", () => {
  let mockLoadingAction = loadingTodos(true);
  let mockState = todoReducer(mockState2, mockLoadingAction);

  expect(mockState.loading).toBeTruthy();
});

test("saga fetching", () => {
  const data: ITodos = {
    todos: [
      {
        id: -1,
        title: "test task-1",
        completed: false,
      },
    ],
    filter: "all",
    loading: false,
  };

  const g = todoRandomFetchWorker();
  expect(g.next().value).toEqual(put(loadingTodos(true)));
  expect(g.next().value).toEqual(call(fetchTodosFromStorage));
  expect(g.next(data.todos).value).toEqual(put(loadTodos(data.todos)));
  expect(g.next().value).toEqual(put(loadingTodos(false)));
  expect(g.next().done).toBeTruthy();
});
