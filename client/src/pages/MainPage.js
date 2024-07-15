import axios from "axios";
import React, { useEffect, useState } from 'react';

export default function MainPage() {

  //state for the form fields
  const [date, setDate] = useState(null);
  const [sourceCurrency , setSourceCurrency] = useState("");
  const [targetCurrency , setTargetCurrency] = useState("");
  const [amountInSourceCurrency , setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency , setAmountInTargetCurrency] = useState(0);
  const [currencyNames , setcurrencyNames] = useState([]);
  const [loading , setLoading] = useState(true);

  //handle submit mwthod
const handleSubmit = async(e) => {
  e.preventDefault();


    try{
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },

        
      } ); 

      setAmountInTargetCurrency(responce.data);
      setLoading(false);

      console.log(amountInSourceCurrency,  amountInTargetCurrency);
      

    }
    catch(err){
      console.error(err);
    }
};


//get all currency names
useEffect(() => {
  const getCurrencyNames = async() => {
    try{
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setcurrencyNames(response.data);
    }
    catch(err){
      console.log(err);
    }
  };
  getCurrencyNames();
}, [])


  return (
    <div>
      <h1 className='lg:mx-32  text-5xl font-bold text-green-500'>Convert your currencies Today</h1>
      <p className='lg:mx-32 opacity-40 py-6'>
        Create a chart for any currency pair in the world to see their currency history. These currency charts use live mid-market rates, are easy to use, and are very reliable.
        Create a chart for any currency pair in the world to see their currency history. These currency charts use live mid-market rates, are easy to use, and are very reliable.
      </p>

      <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleSubmit}>

          <div className='mb-4'>
            <label htmlFor={date} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input onChange={(e) => setDate(e.target.value)} 
            type="Date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="mm/dd/yyyy" required />
          </div>  

          <div className='mb-4'>
            <label htmlFor={sourceCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
            <select 
            onChange={(e)=> setSourceCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name={sourceCurrency} id={sourceCurrency}>
          <option value={sourceCurrency}>Select Source Currency</option>

          {Object.keys(currencyNames).map((currency) => (
            <option classNamec= "p-1" key={currency} value={currency}>
              {currencyNames[currency]}
            </option>
          ))}
            </select>
          </div> 
            

          <div className='mb-4'>
            <label htmlFor={targetCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
            <select 
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name={targetCurrency} id={targetCurrency}>
            <option value={targetCurrency}>Select Target Currency</option>

            {Object.keys(currencyNames).map((currency) => (
            <option classNamec= "p-1" key={currency} value={currency}>
              {currencyNames[currency]}
            </option>
          ))}
            </select>
          </div> 

          <div className='mb-4'>
            <label htmlFor={amountInSourceCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source currency</label>
            <input 
            onChange={(e) => setAmountInSourceCurrency(e.target.value)}
            type="number" id={amountInSourceCurrency} name={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Amount in Source currency" required />
          </div> 

          <button className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md'>
             Get the target currency
          </button> 
          </form>
        </section>

        {!loading ?  <section className="mt-5 lg:mx-32 text-2xl">
            {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to {" "} 

            <span className="text-green-500 font-bold">
            {amountInTargetCurrency} 
            </span> {" "} 
            in {currencyNames[targetCurrency]}
         </section> : (" ")}
        

      
      </div>
      
    </div>
  )
}
