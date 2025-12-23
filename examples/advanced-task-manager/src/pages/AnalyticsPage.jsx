import { useTaskStore } from '../stores/taskStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import './AnalyticsPage.css';

function AnalyticsPage() {
  const exportTasks = useTaskStore((state) => state.exportTasks);
  const [exportFormat, setExportFormat] = useState('json');

  const handleExport = () => {
    const data = exportTasks(exportFormat);
    const blob = new Blob([data], { 
      type: exportFormat === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-export.${exportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Tasks exported as ${exportFormat.toUpperCase()}`);
  };

  return (
    <div className="analytics-page">
      <h1>Analytics & Reports</h1>

      <div className="export-section">
        <h2>Export Data</h2>
        <div className="export-controls">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
          <button onClick={handleExport} className="btn btn-primary">
            Export Tasks
          </button>
        </div>
      </div>

      <div className="analytics-placeholder">
        <p>📊 Advanced analytics and charts will be displayed here</p>
        <p>Charts showing task completion trends, productivity metrics, etc.</p>
      </div>
    </div>
  );
}

export default AnalyticsPage;
