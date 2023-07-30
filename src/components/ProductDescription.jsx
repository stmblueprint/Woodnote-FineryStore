

import { useParams } from "react-router";
import { useState } from "react";

const ProductDescription = ({ description, setDescription, currentId }) => {

    // const [description, setDescription] = useState("");

    if (currentId === "33017314"){
       setDescription(`This Unisex Premium Sweatshirt has a classic crew neck, 
                       flattering unisex fit, and soft 100% cotton exterior.`)
    }
    else if (currentId === "50851839"){
        setDescription(`With its chic and crisp look, the Unisex Eco Sweatshirt 
                        can elevate any casual outfit. The sweatshirt is made of 
                        organic ring-spun cotton and recycled polyester.`)
    }
    else if (currentId === "51065350"){
        setDescription(`Classic unisex hoodie with a front pouch pocket and matching 
                        flat drawstrings. The 100% cotton exterior makes this hoodie soft 
                        to the touch.`)
    }

    

    return(

        <div>
            <div>
                {description}
                {currentId == "33017314" ? 
                    <ul>
                        <li>100% cotton face</li>
                        <li>65% cotton, 35% polyester</li>
                        <li>Charcoal Heather is 55% cotton, 45% polyester</li>
                        <li>Fabric weight: 8.5 oz/y² (288.2 g/m²)</li>
                        <li>Tightly knit 3-end fleece&nbsp;</li>
                        <li>Side-seamed construction</li>
                        <li>Self-fabric patch on the back</li>
                        <li>Double-needle stitched rib collar, cuffs, and hem</li>
                        <li>Tear-away label</li>
                    </ul> :  ""
                }
                {currentId == "50851839" ? 
                    <ul>
                        <li>85% organic ring-spun combed cotton, 15% recycled polyester</li>
                        <li>Fabric weight: 350 g/m² (10.3 oz/yd²)</li>
                        <li>Relaxed fit</li>
                        <li>Set-in sleeves</li>
                        <li>1×1 rib at neck collar, sleeve hem, and bottom hem</li>
                        <li>Single-needle topstitch at neck collar</li>
                        <li>Double-needle topstitch on the sleeves and bottom hems</li>
                        <li>Inside herringbone back neck tape</li>
                        <li>Self-fabric half moon at back neck</li>
                        <li>The fabric of this product is certified by GRS (Global Recycled Standard), OCS (Organic Content Standard), and GOTS (Global Organic Textile Standard)</li>
                        <li>The fabric of this product is OEKO-TEX Standard 100 certified and PETA-Approved Vegan</li>
                    </ul> :  ""
                }
                {currentId == "51065350" ? 
                    <ul>
                        <li>65% ring-spun cotton, 35% polyester&nbsp;</li>
                        <li>Charcoal Heather is 60% ring-spun cotton, 40% polyester</li>
                        <li>Carbon Grey is 55% ring-spun cotton, 45% polyester</li>
                        <li>100% cotton face</li>
                        <li>Fabric weight: 8.5 oz/yd² (288.2 g/m²)</li>
                        <li>Front pouch pocket</li>
                        <li>Self-fabric patch on the back</li>
                        <li>Matching flat drawstrings</li>
                        <li>3-panel hood</li>
                        <li>Tear-away tag</li>
                    </ul> :  ""
                }
                
            </div>
        </div>
    )

}

export default ProductDescription;