import { useEffect, useState } from 'react'
import { TodoProvider } from "./Contexts/TodoContext"
import './App.css'
import "./index.css"
import TodoForm from './TodoForm/TodoForm'
import TodoItem from './TodoItem/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (_todo) => {
    setTodos((prev) => {

     return [{id: Date.now()},...prev, _todo]
      //...prev tell old array and todo tells new value or array
    })
  }
  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  const deleteTodo = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todo))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length >0){
      setTodos(todos)
    }
  },[todos])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{ todos, addTodo, updatedTodo, toggleComplete, deleteTodo }}>
      <div className="bg-black min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4"><TodoForm/></div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App
