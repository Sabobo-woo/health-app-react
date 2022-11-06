import logo from './logo.svg';
import './App.scss';
import Form from './Form';
import ActivityLog from './ActivityLog';
import { useEffect, useState } from 'react';

function App() {

  const [lastActivities, setLastActivities] = useState([]);

  const loadLastActivities = async () => {
    const response = await fetch('https://test-api.codingbootcamp.cz/api/ac8b8a05/health/activities?limit=5&order=created_at&order_way=desc');
    const data = await response.json();

    setLastActivities(data);
  }

  // load last activities (to be used by ActivityLog component)
  // when the App component mounts into the page
  useEffect(() => {
    loadLastActivities()
  }, [])

  return (
    <div className="App">

      <h1>Healthlify.ly</h1>

      <div className="App__content">

        <Form
          loadLastActivities={loadLastActivities}
        />

        <ActivityLog
          lastActivities={lastActivities}
        />

      </div>

    </div>
  );
}

export default App;