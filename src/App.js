import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Create from './Create';
import Table from './Table';

function App() {
  const [list, setList] = useState([]);
  const [call, setCall] = useState(true);

  const makeCall = useCallback(() => {
    setCall(true);
  },[]);

  useEffect(() => {
    if (call) {
      fetch('https://lobster-app-ddwng.ondigitalocean.app/product/list', {
        method: 'GET',
        headers: {
          api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH',
        },
      }).then((data) => {
        data.json().then((d) => {
          setList(d);
        });
        setCall(false) ;
      });
    }
  }, [call]);

  return (
    <div className="App">
      <Create makeCall={makeCall} />
      <Table data={list} />
    </div>
  );
}

export default App;
