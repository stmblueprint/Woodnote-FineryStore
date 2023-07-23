
import {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';


import {
    collection,
    deleteDoc,
    documentId,
    getDocs,
    doc,
    where,
    query,
  } from "firebase/firestore";
  import { db } from "../firebase/firebase";



const Catalog = () => {
    const [data, setData] = useState(null);
    const [apiKey, setApiKey] = useState(null);
    // const [authToken, setAuthToken] = useState(null);

    const navigate = useNavigate();
    const price = '49.00'
    


    const handleProductClick = (productId, title, img, colors, price, sizes) => {
        navigate(`/product/${productId}`, { state: { title, img, colors, price, sizes } });

      };

      // prinful api key stored in firebase firestore
      const fetchApiKey = async () => {
        const qRef = query(collection(db, "AdminItems"), where("printfulApiKey", "!=", ""));
        const querySnapshot = await getDocs(qRef);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const apiKey = doc.data().printfulApiKey;

            return setApiKey(apiKey);
          } else {
            return null; // key not found
          }
      };
      

      
// const [selectedColor, setSelectedColor] = useState(null);

// const handleColorChange = (event) => {
//     setSelectedColor(event.target.value);
// };

useEffect(() => {
    const fetchData = async () => {

        try {
            const response = await fetch('https://api.printful.com/product-templates', {
                method: 'GET',
                headers: {
                    // fetch authToken from database
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json', 

                },     
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData.result.items);
              } else {
                // Handle error response
                console.error('API request failed:', response);
              }
            } catch (error) {
              // Handle network or other errors
              console.error('Error:', error);
            }
          };

            fetchApiKey();
            fetchData();
        }, [apiKey]);



    return (
        <>
        
           <div className="home-container">
            <Header/>
            <div className="products-container center">
                {data ? (
                    <div className="product-container center">
                    {data.map((product, index) => (
                         //  appending the index to the product.id within the key prop, 
                  // you ensure that each key is unique and address the warning
                  //  about non-unique keys.
               
                        <div  key={`${product.id}-${index}`} onClick={() => handleProductClick(
                                     product.id, 
                                     product.title, 
                                     product.mockup_file_url, 
                                     product.colors, price, product.sizes
                            )}>
                                  {/* {product.product_id}<br/>
                                  {product.external_product_id}<br/>
                                  {product.id} */}
                       
                        <div className="product-img">
                            <img
                                    src={product.mockup_file_url}
                                    alt="Mockup"
                                    className="product-sizing"
                                    width={300}
                                    height={300}
                                    />
                        </div>
                        <div className="center">
                         <h3>{product.title}</h3>
                        </div>

                           {/* since there's an array of colors, use map to find
                                get all of them */}
                           <div>
                            <div className="price center">
                               ${price}
                            </div>
                            <br/>
                            <div className="color-container">

                                            {product.colors.map((color) => (
                                                <span className="color-style" 
                                                    key={product.id}
                                                    style={{background: `${color.color_codes}`,
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    margin: '5px'}}>
                                                </span>
                                            
                                            ))}
                    
                                </div>

                                <div className="size-container">
                                    {product.sizes.map((size, index) => (
                                        <span className="size-option" key={index}>{size}</span>
                                    ))}
                                </div>

                              
                            </div>


                            {/* <button className="addToCartButton">
                                Add to Cart
                            </button> */}


                           
                        </div>
                    ))}
                    </div>
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
            
            <Footer/>
           </div>
        
        
        </>
    )
}

export default Catalog;