import React, {useState} from "react";
import Search from "./components/search";
import Stock from "./components/Stock";


function App() {

  const [query, setQuery] = useState('');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValuesHigh, setStockChartYValuesHigh] = useState([]);
  const [stockChartYValuesLow, setStockChartYValuesLow] = useState([]);
  const [stockChartYValuesOpen, setStockChartYValuesOpen] = useState([]);


  const key = process.env.REACT_APP_API_KEY;

  const search = async (e) => {
    const stockChartXValues = [];
    const stockChartYValuesHigh = [];
    const stockChartYValuesLow =[];
    const stockChartYValuesOpen = [];

    if (e.key === 'Enter') {

        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${query}&apikey=${key}`;
        await fetch(url)
        .then(res => res.json())
        .then((data) => {
          console.log(data['Time Series (Daily)']);
      
          for (let key in data['Time Series (Daily)']) {
            stockChartYValuesHigh.push(data['Time Series (Daily)'][key]['2. high']);
            stockChartXValues.push(key);
            stockChartYValuesOpen.push(data['Time Series (Daily)'][key]['1. open']);
            stockChartYValuesLow.push(data['Time Series (Daily)'][key]['3. low']);

          }
          setStockChartXValues(stockChartXValues.reverse());
          setStockChartYValuesHigh(stockChartYValuesHigh.reverse());
          setStockChartYValuesOpen(stockChartYValuesOpen.reverse());
          setStockChartYValuesLow(stockChartYValuesLow.reverse());
          // setQuery('');
          console.log(stockChartXValues);
          console.log(stockChartYValuesHigh)
        })
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
        
       {stockChartYValuesHigh.length > 0 ?  
        <Stock 
          pricesHigh={stockChartYValuesHigh}
          pricesLow={stockChartYValuesLow}
          pricesOpen={stockChartYValuesOpen}
          dates={stockChartXValues}
          query={query}
          /> : ''}
   </div>
  );
}

export default App;
