import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../stores/redux/store'
import { increment, decrement, reset } from '../../stores/redux/counterSlice'
import { addTodo, toggleTodo, deleteTodo } from '../../stores/redux/todoSlice'
import { useState } from 'react'

function CounterSection() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="demo-section">
      <h2>🔢 Counter (Redux Toolkit)</h2>
      <div className="counter">
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  )
}

function TodoSection() {
  const todos = useSelector((state: RootState) => state.todos.items)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      dispatch(addTodo(input))
      setInput('')
    }
  }

  return (
    <div className="demo-section">
      <h2>✅ Todo List (Redux Toolkit)</h2>
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
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        🛠️ Open Redux DevTools to see state changes
      </p>
    </div>
  )
}

export function ReduxDemo() {
  return (
    <div>
      <h1>Redux Toolkit Examples</h1>
      <p>Battle-tested state management with excellent DevTools</p>
      
      <CounterSection />
      <TodoSection />
    </div>
  )
}
