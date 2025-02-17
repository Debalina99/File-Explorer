import {useState} from 'react';
import json from './data.json';
import './App.css';
import List from './Components/List';



function App() {
  const [data,setData]=useState(json);
  return (
    <div className="App">
      <h2>File Explorer</h2>
      <List list={data} setData={setData}/>
    </div>
  );
}

export default App;