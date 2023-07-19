import { useParams, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import Variants from "../pages/Variants";
import Header from "./Header";
import Footer from "./Footer";
import ProductDescription from "./ProductDescription";
// import useCart from "./useCart";
import { useCart } from "react-use-cart";
import CartPopup from "../pages/Cart";

const ProductView = () => {

const { productId } = useParams();
const [color, setColor] = useState("select color");
const [selectedSize, setSize] = useState("select size");
const [isCartOpen, setIsCartOpen] = useState(false);
const [description, setDescription] = useState(null);

// const  { addToCart }  = useCart();
const { addItem } = useCart();


const navigate = useNavigate();


const location = useLocation();
const { title, img, colors, price, sizes } = location.state || {}; 
const [image, setImage] = useState(img);


const handleColorClick = (selectedColor) => {
    setColor(selectedColor)
}
const handleSizeClick = (selectedSize) => {
    setSize(selectedSize)
}

const handleAddToCart = () => {

    const product = {
        id: productId,
        name: title,
        image: image,
        color: color,
        size: selectedSize,
        sku: "",
        price: price,
      };
      
      addItem(product);
      setIsCartOpen(true);
    
    // Navigate to the CartView component
    // navigate("/cart");
  };




return(
    <>

    <div className="parent home-container">

        {/* <div className="child-1">
            <CartPopup isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
       </div> */}

        <div className="child-2">
        <Header/>       
            <div className="">
                <section className="product-view-grid-1">
                    <div className="product-img">
                        <div className="center">
                            <img
                                src={image}
                                alt="Mockup"
                                width={300}
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
                         <h3>Color: {color}</h3>
                        
                         <div className="color-container">
                         {colors && colors.map((color) => (
                                    <span className="color-style" key={productId} 
                                        onClick={() => handleColorClick(color.color_name)} 
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
                                    {sizes && sizes.map((size, index) => (
                                        <span className="size-option" 
                                              key={index}
                                              onClick={() => handleSizeClick(size)} >
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
                                        currentId = {productId}/>
                          
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
