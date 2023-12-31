
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Variants from "../pages/Variants";
import Header from "./Header";
import Footer from "./Footer";
import ProductDescription from "./ProductDescription";
// import useCart from "./useCart";
import { useCart } from "react-use-cart";
import CartPopup from "../pages/Cart";


import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";


const ProductView = () => {

const [productId, setProductId] = useState(null)
const [title, setTitle] = useState(null);
const [price, setPrice] = useState(null);
const [image, setImage] = useState(null);
// const { productId } = useParams();
const [colors, setColor] = useState([]);
const [selectedColor, setSelectedColor] = useState(null);
const [size, setSize] = useState([]);
const [selectedSize, setSelectedSize] = useState(null);
const [isCartOpen, setIsCartOpen] = useState(false);
const [description, setDescription] = useState(null);
const [errorMsg, setErrorMsg] = useState(false);

const [selectedColorIndex, setSelectedColorIndex] = useState(null);
const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

  // ------------------------------------------------------------------------------
  const storedUserUserId = sessionStorage.getItem("uid");
  const parsedUserId = JSON.parse(storedUserUserId);
  const cartId = parsedUserId;

// ------------------------------------------------------------------------------

// const  { addToCart }  = useCart();
const [ cartItems, setCartItems] = useState([]);
const { addItem } = useCart();
const navigate = useNavigate();


 // useLocation for storing states doesnt work on the deployed server
  // const location = useLocation();
  // const { title, img, colors, price, sizes } = location.state || {}; 
  // const [image, setImage] = useState(img);

 // Retrieve the product information from localStorage when the component mounts
 useEffect(() => {
  // use this instead of location.state to avoid losing state on refresh
  const productInfo = JSON.parse(localStorage.getItem("productInfo"));

  if (productInfo) {
    const { productId, title, img, colors, price, sizes } = productInfo;
    setColor(colors); // Set colors as an array
    setSize(sizes); // Set sizes as an array
    setDescription(null);
    setImage(img);
    setTitle(title);
    setPrice(price);
    setProductId(productId)
  }
}, []);

const handleColorClick = (selectedColor, index) => {
    setSelectedColor(selectedColor)
    setSelectedColorIndex(index)
}
const handleSizeClick = (selectedSize, index) => {
    setSelectedSize(selectedSize)
    setSelectedSizeIndex(index)
}





const handleAddToCart = () => {

    const product = {
        external_id: '',
        variant_id: '',
        sync_variant_id: '',
        warehouse_product_variant_id: '',
        product_template_id: '',
        external_product_id: '',        
        id: productId,
        name: title,
        image: image,
        color: selectedColor,
        quantity: 1,
        size: selectedSize,
        price: price,
        retail_price: '',
        prod: {
            variant_id: 3001,
            product_id: 301,
            image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
            name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)'
        },
        files: [
        {
          type: 'default',
          url: 'https://www.example.com/files/tshirts/example.png',
          options: [
            {
              id: 'template_type',
              value: 'native'
            }
           ],
          filename: 'shirt1.png',
          visible: true,
          position: {
            area_width: '',
            area_height: '',
            width: '',
            height: '',
            top: '',
            left: '',
            limit_to_print_area: true
          }
        }
      ],
      options: [
        {
          id: 'OptionKey',
          value: 'OptionValue'
        }
      ],
      sku: null,
      discontinued: true,
      out_of_stock: true,

        retail_costs: {
            currency: 'USD',
            subtotal: '10.00',
            discount: '0.00',
            shipping: '5.00',
            tax: '0.00'
        },
        gift: {
            subject: 'To John',
            message: 'Have a nice day'
        },
        packing_slip: {}
        };
      if(cartId === null){
        const notSignedIn = true;
        navigate(notSignedIn ? '/account' : '') // navigate to payment if all fields are filled in
       }
        
      
      if (selectedColor !== null && selectedSize !== null && cartId !== null){ // add to cart if a color and size is selected
        // addItem(product);          
        // setIsCartOpen(true);

        // add items to the database 
        const cartRef = doc(db, "Orders", cartId);
        
        updateDoc(cartRef, {
          items: arrayUnion(product), // merge updated items
        })
          .then(() => {
            console.log("Item added to cart in Firestore successfully!");

             // Update the cartItems state with the new product
              setCartItems((prevCartItems) => [...prevCartItems, product]);

              // Update the cart items in the local storage
              const updatedCartItems = [...cartItems, product];
              sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

              // Reload the page to show the updated cart
              window.location.reload();
        
            setIsCartOpen(true);
          })
          .catch((error) => {
            console.error("Error adding item to cart in Firestore: ", error);
          });
      }else{
        setErrorMsg(true) // show error message to prompt color and size selection

        setTimeout(() => {
            setErrorMsg(false) // hide error after timer is up
        }, 6000);
      }
    
    // Navigate to the CartView component
    // navigate("/cart");
  };

//   useEffect(() => {
//     // Store the product object in sessionStorage when the component mounts
//     sessionStorage.setItem('productData', JSON.stringify(product));
//   }, []);






return(
    <>

    <div className="parent home-container">

        {/* <div className="child-1">
            <CartPopup isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
       </div> */}

        <div className="child-2">
        <Header/>
            <div className="">
            <div className="center error-msg-container">{errorMsg ? <div className="error-msg center">Select a color and size to continue</div> : <div></div>}</div>       

                <section className="product-view-grid-1">
                    <div className="product-img">
                        <div className="center">
                            <img
                                src={image}
                                alt="Mockup"
                                style={{width: "40vw"}}
                            />
                        </div>
                        <br/>
                        <div className="center">
                            <Variants setImage={setImage}/>
                        </div>
                    </div>
                    
                    <div>
                         <h1 className="">{title}</h1>
                         <div className="price">
                               ${price}
                         </div>
                         <br/>
                         <h3>Color: {selectedColor}</h3>
                        
                         <div className="color-container">
                         {colors.map((color, index) => (
                                    <span className= {`color-style ${selectedColorIndex === index ? "selected" : ""}`}
                                        key={productId} 
                                        onClick={() => handleColorClick(color.color_name, index)} 
                                        style={{background: `${color.color_codes}`,
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        margin: '5px'}}>
                                    </span>
                                ))}
                        </div>
                        <h3>Size: {selectedSize}</h3>
                        <div className="size-container">
                                    {size && size.map((size, index) => (
                                        <span className= {`size-option ${selectedSizeIndex === index ? "selected" : ""}`}
                                              key={index}
                                              onClick={() => handleSizeClick(size, index)} >
                                            {size}
                                        </span>
                                    ))}
                        </div>
                        <br/>
                        <div 
                            className="cart-button-container center">
                            {/* switch div to button tags */}
                            <div 
                               className="cart-button center"
                               onClick={handleAddToCart}>
                                 ADD TO CART
                            </div>
                        </div>
                        <br/>
                        <div className="description-container">
                         <h3>Description</h3>
                          <ProductDescription 
                                        description={description} 
                                        setDescription={setDescription} 
                                        currentId = {productId}
                                        />
                          
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>

        </div>

        </div>
    

    </>
)};

export default ProductView;
