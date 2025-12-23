import { CounterProvider, useCounter } from '../../stores/context/CounterContext'
import { TodoProvider, useTodos } from '../../stores/context/TodoContext'
import { useState } from 'react'

function CounterSection() {
  const { count, increment, decrement, reset } = useCounter()

  return (
    <div className="demo-section">
      <h2>🔢 Counter (Context API)</h2>
      <div className="counter">
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

function TodoSection() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      addTodo(input)
      setInput('')
    }
  }

  return (
    <div className="demo-section">
      <h2>✅ Todo List (Context API)</h2>
      <form onSubmit={handleSubmit} className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContextDemo() {
  return (
    <div>
      <h1>Context API Examples</h1>
      <p>Using React's built-in Context API for state management</p>
      
      <CounterProvider>
        <CounterSection />
      </CounterProvider>

      <TodoProvider>
        <TodoSection />
      </TodoProvider>
    </div>
  )
}
