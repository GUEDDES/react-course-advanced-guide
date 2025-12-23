import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Toaster position="top-right" />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
