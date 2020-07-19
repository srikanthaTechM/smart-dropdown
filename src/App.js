import React, { useEffect, useState } from 'react';
import './App.css';
import SearchComponent from './SearchComponent';

const App = () => {
  const url = 'http://localhost:3001/countries';
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url).then(async res => {
      if (res.status !== 200) {
        setData('uh oh error!');
      }
      const data = await res.json();
      setData(data);
    });
  }, []);
  function onSelect(value) {
    console.log(value);
  }
  function updateData(value) {
    const newItem = {name: value, value}
    setData(prevState => [...prevState, newItem]);
  }
  return (
    <div className="main">
      <SearchComponent
        data={data || []}
        dispalyKey="name"
        addPrivilege={true}
        defaultValue="Select a location"
        maxList={5}
        selectHandler={onSelect}
        addItemsToList={updateData}
      />
    </div>
  );
}

export default App;