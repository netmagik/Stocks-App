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

      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${key}`);
        const data = await response.json();
        console.log(data);
        const stockData = data['Time Series (Daily)'];
        console.log(stockData);
        for (let key in stockData) {
          stockChartXValues.push(key);
          stockChartYValuesHigh.push(stockData[key]['2. high']);
          stockChartYValuesLow.push(stockData[key]['3. low']);
          stockChartYValuesOpen.push(stockData[key]['1. open']);
        }
        // setQuery('');
        setStockChartXValues(stockChartXValues.reverse());
        setStockChartYValuesHigh(stockChartYValuesHigh.reverse());
        setStockChartYValuesLow(stockChartYValuesLow.reverse());
        setStockChartYValuesOpen(stockChartYValuesOpen.reverse());
      } catch (error) {
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
        
       {stockChartXValues.length < 1 ?   
        'Check to make sure you typed in your stock symbol correctly' :
        <Stock 
          pricesHigh={stockChartYValuesHigh}
          pricesLow={stockChartYValuesLow}
          pricesOpen={stockChartYValuesOpen}
          dates={stockChartXValues}
          query={query}
          />
          }
   </div>
  );
}

export default App;
