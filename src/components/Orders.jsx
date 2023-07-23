
import { useState, useEffect } from "react";

// Webhook API, Tax Rate API, Country/State Code API, Shipping Rate API, Orders API


export const CalculateShippingRates = () => { 


}

export const CalculateTaxRates = () => { 

}

export const GetCountryList = ({ countryName, setCountryName, countryCode, setCountryCode  }) => {
    
  const [data, setData] = useState([]);

    // const [countryName, setCountryName] = useState(null);
    // const [countryCode, setCountryCode] = useState(null);

    const onCountryChangeHandler = (event) => {

        const selectedCountry = data.find(
            (country) => country.code === event.target.value
        )
        if (selectedCountry) {
            setCountryName(selectedCountry.name);
            setCountryCode(selectedCountry.code);
            console.log({ name: selectedCountry.name, code: selectedCountry.code });
          }
    }
 
    

    useEffect(() => {
        const fetchData = async () => {
    
            try {
                const response = await fetch('https://api.printful.com/countries', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },     
                });
    
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData.result);
                  } else {
                    // Handle error response
                    console.error('API request failed:', response);
                  }
                } catch (error) {
                  // Handle network or other errors
                  console.error('Error:', error);
                }
              };
    
                fetchData();
            }, []);

            return (
                <div>
                    <select className="imported-input-style" name="states" id="states" onChange={onCountryChangeHandler}>

                    <option>Select a Country</option>

                        {data?.map((country, index) => (
                                <option key ={`${country.code}-${index}`} value={country.code}>
                                    {country.name}
                                </option>
                        ))}
                    </select>

                    {/* <select name="states" id="states" onChange={onStateChangeHandler}>

                    <option>Select a State</option>
                        {data?.map((country, index) => (

                                country.states?.map((state) => (
                                    <option key ={`${state.code}-${index}`} value={state.code}>
                                     {state.name}
                                    </option>
                                )
                                
                        )))}
                    </select> */}

                    
                </div>
              );
};



export const GetStateList = ({ stateName, setStateName, stateCode, setStateCode }) => {
    const [data, setData] = useState([]);

    // const [stateName, setStateName] = useState(null);
    // const [stateCode, setStateCode] = useState(null);

    const [loading, setLoading] = useState(true);
  
    const onStateChangeHandler = (event) => {
      const selectedState = data.flatMap((country) => country.states).find(
        (state) => state?.code === event.target.value
      );
  
      if (selectedState) {
        setStateName(selectedState.name);
        setStateCode(selectedState.code);
        console.log({ name: selectedState.name, code: selectedState.code });
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.printful.com/countries', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const jsonData = await response.json();
            // Here, we'll map the data to match the code-name order in the response
            const formattedData = jsonData.result.map((country) => ({
              code: country.name,
              name: country.code,
              states: country.states,
              region: country.region,
            }));
            setData(formattedData);
          } else {
            // Handle error response
            console.error('API request failed:', response);
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <select className="imported-input-style" name="states" id="states" onChange={onStateChangeHandler}>
            <option>Select a State/Province</option>
            {data?.flatMap((country) =>
              country.states?.map((state) => (
                <option key={`${state.code}-${state.name}`} value={state.code}>
                  {state.name}
                </option>
              ))
            )}
          </select>
        )}
      </div>
    );
  };
  


const GetOrders = () => {


}
export default GetOrders;