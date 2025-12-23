import { createContext, useContext, useState, ReactNode } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoContextType {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ])
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos() {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodos must be used within TodoProvider')
  }
  return context
}
