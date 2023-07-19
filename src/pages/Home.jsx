

import Footer from "../components/Footer";
import Header from "../components/Header";
import displayProduct1 from "../assets/black_hoodie.png"
import displayProduct3 from "../assets/green_hoodie.png"
import displayProduct2 from "../assets/grey_sweat.png"
import { Link } from "react-router-dom";




const Body = () => {
    return(
        <>
        <body>
            {/* top */}
            <section className="homepage-intro-section-container center">
                <div >
                    <div className="heading-1">Find unique clothing 
                        designs created by <br/>the artist of this brand.
                    </div>
                        <br/>
                        <div className="caption-1">
                          Checkout the creative catalog and start <br/>shopping.
                        </div>
                   
                    <br/>
                    <div>
                        <Link to={"/catalog"}>
                            <div className="button-container">
                                <div className="button">
                                    SHOP NOW
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div>
                    <img src={displayProduct1} width={300}/>
                </div>
            </section>


              {/* mid */}
              <section className="homepage-mid-section-container center">
                <div>
                        <div className="heading-1 center">
                            CATEGORIES
                        </div>


                        <div className="categories-grid center">
                            <span>
                              <img src={displayProduct2} width={300}/>
                            </span>

                            <span>
                              <img src={displayProduct3} width={300}/>
                            </span>
                        </div>
                       
                
                       
                   
                </div>
             </section>





             {/* bottom */}
             <section className="homepage-bottom-section-container center">
                <div>
                        <div className="heading-1">
                            Subscribe to our Newsletter
                        </div>

                        <div className="caption-1">
                          receive email updates on our newest products <br/>and designs.
                        </div>

                        <div>
                            <input type="email" name="email" placeholder="Enter your email here"/>
                            <button>SUBSCRIBE</button>
                        </div>
                </div>
             </section>



            


        </body>
        
        </>
    )
}


const Home = () => {

    return (
        <>
        <div className="home-container">
            <Header/>
            <Body/>

            
            
            <Footer/>
        </div>
        </>
    )
}

export default Home;