import React, {useState, useEffect} from "react";
// import Search from "./components/search";
import Stock from "./components/Stock";
import Select from "./components/Search-select";


function App() {

  const [query, setQuery] = useState('');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValuesHigh, setStockChartYValuesHigh] = useState([]);
  const [stockChartYValuesLow, setStockChartYValuesLow] = useState([]);
  const [stockChartYValuesOpen, setStockChartYValuesOpen] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);


  const key = process.env.REACT_APP_API_KEY;

    const search = async () => {
      const stockChartXValues = [];
      const stockChartYValuesHigh = [];
      const stockChartYValuesLow =[];
      const stockChartYValuesOpen = [];

        try {
          const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=compact&symbol=${query}&apikey=${key}`);
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
          
          setStockChartXValues(stockChartXValues.reverse());
          setStockChartYValuesHigh(stockChartYValuesHigh.reverse());
          setStockChartYValuesLow(stockChartYValuesLow.reverse());
          setStockChartYValuesOpen(stockChartYValuesOpen.reverse());
        } catch (error) {
        }
  }
  
        
  // const handleSearch = (symbol) => {
  //   setQuery(symbol);
  // }

  const getPrice = async () => {
    try {
      const response =  await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${query}&apikey=${key}`)
      const data = await response.json();
      const price = data['Global Quote']['05. price'];
      console.log(price)
      setCurrentPrice(parseFloat(price).toLocaleString());
    } catch (error) {

    }
  }

  const reset = () => {
    setCurrentPrice(null);
    setQuery('');
    setStockChartXValues([]);
    setStockChartYValuesHigh([]);
    setStockChartYValuesOpen([]);
    setStockChartYValuesLow([]);
  }

  const loadOptions = async (inputText, callBack) => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputText}&apikey=${key}`)
      const data = await response.json();
      let arr = [];
      for (let key in data['bestMatches']) {
        let name = data['bestMatches'][key]['2. name'];
        let symbol = data['bestMatches'][key]['1. symbol'];
        arr.push({
          label: '(' + symbol + ') ' + name,
          value: symbol
        })
      }
      callBack(arr);

    } catch (error) {

    }
  }

    const onChange = async (selectedSymbol) => {
      let symbol = selectedSymbol.value
      setQuery(symbol, () => search);

    }

  return (
    <div className="app">
      {/* <Search 
        handleSearch={handleSearch} 
        search={search}
        query={query}
        reset={reset}
       /> */}

       <Select 
       query={query}
       loadOptions={loadOptions}
       onChange={onChange}
       />
        
       {(stockChartYValuesHigh.length > 0) 
        ?   
          <Stock 
          pricesHigh={stockChartYValuesHigh}
          pricesLow={stockChartYValuesLow}
          pricesOpen={stockChartYValuesOpen}
          dates={stockChartXValues}
          query={query}
          getPrice={getPrice}
          currentPrice={currentPrice}
          /> 
          : ''
        }
   </div>
  );
}

export default App;
