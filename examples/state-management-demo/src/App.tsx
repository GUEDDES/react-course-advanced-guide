import { useState } from 'react'
import './App.css'
import { ContextDemo } from './components/context/ContextDemo'
import { ZustandDemo } from './components/zustand/ZustandDemo'
import { ReduxDemo } from './components/redux/ReduxDemo'

type Tab = 'context' | 'zustand' | 'redux'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('context')

  return (
    <div className="app">
      <header>
        <h1>🎯 State Management Comparison</h1>
        <p>Compare Context API, Zustand, and Redux Toolkit</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'context' ? 'active' : ''}
          onClick={() => setActiveTab('context')}
        >
          Context API
        </button>
        <button
          className={activeTab === 'zustand' ? 'active' : ''}
          onClick={() => setActiveTab('zustand')}
        >
          Zustand
        </button>
        <button
          className={activeTab === 'redux' ? 'active' : ''}
          onClick={() => setActiveTab('redux')}
        >
          Redux Toolkit
        </button>
      </nav>

      <main>
        {activeTab === 'context' && <ContextDemo />}
        {activeTab === 'zustand' && <ZustandDemo />}
        {activeTab === 'redux' && <ReduxDemo />}
      </main>
    </div>
  )
}

export default App
