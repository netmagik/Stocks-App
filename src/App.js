import React, {useState, useEffect} from "react";
import Stock from "./components/Stock";
import Select from "./components/Search-select";


function App() {

  const [query, setQuery] =  useState('');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValuesHigh, setStockChartYValuesHigh] = useState([]);
  const [stockChartYValuesLow, setStockChartYValuesLow] = useState([]);
  const [stockChartYValuesOpen, setStockChartYValuesOpen] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);


  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
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
    search();

  }, [query]);
  

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
      setQuery(symbol);

    }

  return (
    <div className="app">
  
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

      <p className="note">
        <span className="bold">Note:</span> The free tier of the stock api has a maximum of 5 requests/minute and 500 requests/day</p>

   </div>
  );
}

export default App;
