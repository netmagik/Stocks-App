import React, {useState} from "react";
import Search from "./components/search";


function App() {

  const [query, setQuery] = useState('');
  const [data, setData] = useState({});

  const key = process.env.REACT_APP_API_KEY;

  const search = async (e) => {
    if (e.key === 'Enter') {
      try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${query}&apikey=${key}`;
        const res = await fetch(url);
        const json = await res.json();
        console.log(json);
        setData(json);
    }
    catch (error) {
        console.log(error);
    }
    }
  }

  const handleSearch = (symbol) => {
    console.log('Set Query');
    setQuery(symbol);
  }


  return (
    <div className="app">
      <Search 
        handleSearch={handleSearch} 
        search={search}
        query={query} />
   </div>
  );
}

export default App;
