

import Footer from "../components/Footer";
import Header from "../components/Header";
import displayProduct1 from "../assets/black_hoodie.png"
import displayProduct3 from "../assets/green_hoodie.png"
import displayProduct2 from "../assets/grey_sweat.png"
import { Link } from "react-router-dom";


import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";



const Body = () => {
    return(
        <>
        <body>
            {/* top */}
            <section className="homepage-intro-section-container center">
                <div className="media-container-style-1">
                    <div className="heading-1">Find unique clothing 
                        designs created by the artist; @stmblueprint.
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
              <Link to={"/catalog"} className="homepage-mid-section-container">
              <section className="homepage-mid-section-container center">
                <div className="home-grid-style-1 center">

                        <div className="home-grid-positioning-1 heading-1">
                            Explore Now With Our<br/>
                            Collection
                        </div>


                        <div className="home-grid-positioning-2 center">
                            <div>
                              <img src={displayProduct2} width={300}/>
                            </div>

                            <div>
                              <img src={displayProduct3} width={300}/>
                            </div>
                        </div>
                       
                
                       
                   
                </div>
             </section>
             </Link>





             {/* bottom */}
             <section className="homepage-bottom-section-container">
                <div>
                    <div className="subscription-sec-1">
                        <div className="heading-1 ">
                            Subscribe to our Newsletter
                        </div>

                        <div className="caption-1 ">
                          receive email updates on our newest products <br/>and designs.
                        </div>
                    </div>

                        <div className="subscription-section center">
                            <input type="email" name="email" placeholder="Enter your email here"/>
                            <button className="subscription-button">SUBSCRIBE</button>
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