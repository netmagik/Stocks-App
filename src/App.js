import React, {useState} from "react";
import Search from "./components/search";


function App() {

  const [query, setQuery] = useState('');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);


  const key = process.env.REACT_APP_API_KEY;

  const search = async (e) => {
    const stockChartXValues = [];
    const stockChartYValues = [];
    if (e.key === 'Enter') {

        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${query}&apikey=${key}`;
        await fetch(url)
        .then(res => res.json())
        .then((data) => {
          console.log(data['Time Series (Daily)']);
      
          // console.log(data.filter(obj => obj['Time Series (Daily)']))
          // Object.keys(data.map(key => key['Time Series (Daily)']['2. high']))
          for (let key in data['Time Series (Daily)']) {
            stockChartYValues.push(data['Time Series (Daily)'][key]['2. high']);
            stockChartXValues.push(key);
          }
          setStockChartXValues(stockChartXValues.reverse());
          setStockChartYValues(stockChartYValues.reverse());
          console.log(stockChartXValues);
          console.log(stockChartYValues)
        })
        
        // const json = await res.json();
        // console.log(stockHighValues);
        // setStocks(stockHighValues);

    // catch (error) {
    //     console.log(error);
    // }
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
