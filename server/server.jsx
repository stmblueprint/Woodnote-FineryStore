

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// const port = 5001;

require('dotenv').config();

// Add this middleware to handle .jsx files as JavaScript
// app.use((req, res, next) => {
//   if (req.url.endsWith('.jsx')) {
//     res.set('Content-Type', 'text/javascript');
//   }
//   next();
// });

// cors middleware to enable CORS
app.use(cors());

// Define a server route to handle the Printful API request
app.get('/api/products/:productId', async (req, res) => {

    const printfulApiKey = process.env.PRINTFUL_API_KEY;
    const variants = [
      "33017314", // Men's Embroidered Long Sleeve
      "51065350", // Men's Hoodie
      "50851839" // Unisex eco sweatshirt
    ]
    let currentVariants = "312643659"
  
    // not the store id is not the same as the template id
    const { productId } = req.params;

    // if(productId === variants[2]){
    //   currentVariants = "312643659"
    // }
    // else if(productId === variants[0]){
    //   currentVariants = "312183147"
    // }
    // else if(productId === variants[1]){
    //   currentVariants = "313001069"
    // }
    
  const storeId = "8533797";

  const apiUrl = `https://api.printful.com/store/products/${currentVariants}?store_id=${storeId}`;

  try {
    const response = await axios.get(apiUrl, {
      
      headers: {
        Authorization: `Bearer ${printfulApiKey}`,
        "Content-Type": "application/json",
      },
    });
    const jsonData = response.data;

    // Send the data back to the client
    res.json(jsonData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch data from Printful API" });
  }
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
