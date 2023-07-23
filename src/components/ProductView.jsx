
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Variants from "../pages/Variants";
import Header from "./Header";
import Footer from "./Footer";
import ProductDescription from "./ProductDescription";
// import useCart from "./useCart";
import { useCart } from "react-use-cart";
import CartPopup from "../pages/Cart";

const ProductView = () => {

const { productId } = useParams();
const [color, setColor] = useState(null);
const [selectedSize, setSize] = useState(null);
const [isCartOpen, setIsCartOpen] = useState(false);
const [description, setDescription] = useState(null);
const [errorMsg, setErrorMsg] = useState(false);

  // ------------------------------------------------------------------------------
  const storedUserUserId = sessionStorage.getItem("uid");
  const parsedUserId = JSON.parse(storedUserUserId);
  const cartId = parsedUserId;
// ------------------------------------------------------------------------------

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
        external_id: '',
        variant_id: '',
        sync_variant_id: '',
        warehouse_product_variant_id: '',
        product_template_id: '',
        external_product_id: '',        
        id: productId,
        name: title,
        image: image,
        color: color,
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
        
      
      if (color !== null && selectedSize !== null && cartId !== null){ // add to cart if a color and size is selected
        addItem(product);
        setIsCartOpen(true);
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
