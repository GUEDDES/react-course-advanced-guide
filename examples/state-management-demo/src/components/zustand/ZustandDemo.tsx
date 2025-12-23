import { useCounterStore } from '../../stores/zustand/counterStore'
import { useTodoStore } from '../../stores/zustand/todoStore'
import { useState } from 'react'

function CounterSection() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="demo-section">
      <h2>🔢 Counter (Zustand)</h2>
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
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore()
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
      <h2>✅ Todo List (Zustand)</h2>
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
      <p style={{ marginTop: '1rem', color: '#666' }}>
        💾 Todos are persisted to localStorage
      </p>
    </div>
  )
}

export function ZustandDemo() {
  return (
    <div>
      <h1>Zustand Examples</h1>
      <p>Lightweight state management with minimal boilerplate</p>
      
      <CounterSection />
      <TodoSection />
    </div>
  )
}
