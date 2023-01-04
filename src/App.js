import { useEffect, useState } from 'react';
import './App.css';
import Create from './Create';
import Table from './Table';

function App() {

  const [list , setList] = useState([]);
 
  useEffect(() => {
    fetch("https://lobster-app-ddwng.ondigitalocean.app/product/list", {
        method : 'GET',
        headers : {
          'api_key' : 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH'
        }
    }).then((data)=>{
      data.json().then((d) => {
        setList(d)
      });
    })
  },[])

  return (
    <div className="App">
      <Create/>
      <Table data={list}/>
    </div>
  );
}

export default App;
