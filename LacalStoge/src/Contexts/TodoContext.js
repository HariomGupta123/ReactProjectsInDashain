import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [{ id: 1, todo: "Todo msg", completed: false }],

  // eslint-disable-next-line no-unused-vars
  addTodo: (_todo) => {},
  updatedTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});
export const useTodo = () => {
  return useContext(TodoContext);
};
export const TodoProvider = TodoContext.Provider;
