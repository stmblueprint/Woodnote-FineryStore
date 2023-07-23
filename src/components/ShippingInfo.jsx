import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useNavigate } from "react-router"
import { GetCountryList, GetStateList } from "./Orders"

import { collection, getDocs, getDoc, doc, documentId, addDoc, where, setDoc, query } from "firebase/firestore";
import { db } from "../firebase/firebase"


// name: 'John Smith',
// company: 'John Smith Inc',
// address1: '19749 Dearborn St',
// address2: 'string',
// city: 'Chatsworth',
// state_code: 'CA',
// state_name: 'California',
// country_code: 'US',
// country_name: 'United States',
// zip: '91311',
// phone: 'string',
// email: 'string',
// tax_number: '123.456.789-10'

const ShippingInfo = () => {
    
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [stateCode, setStateCode] = useState("");
    const [stateName, setStateName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [countryName, setCountryName] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // get session email and remove the parenthesis
        const storedEmail = sessionStorage.getItem("email");
        const parsedEmail = JSON.parse(storedEmail);
        setEmail(parsedEmail);

        const storedUserUserId = sessionStorage.getItem("uid");
        const parsedUserId = JSON.parse(storedUserUserId);
        setUserId(parsedUserId);
    }, []);



    const navigate = useNavigate();


    // const [taxNumber, setTaxNumber] = useState("");

    const [toPayment, setToPayment] = useState(false); 

    const validateForm = async() => {
        return new Promise((resolve, reject) => {
          // Perform asynchronous validation logic here
          // Resolve the promise if the validation passes, reject it otherwise
          setTimeout(() => {
            const isValid = name &&
                            city && 
                            stateName && 
                            countryName && 
                            zip && 
                            phone && 
                            email
                            address1 ||
                            address2; // address1 || address2 results in a bug if its not at the end of the validation b/c ||
            resolve(isValid);
          }, 500); // asynchronous delay 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the page from refreshing and erasing form information

        try {
            const isValid = await validateForm();
            // setName(`${firstname} ${lastname}`);

            console.log("isValid:", 
                         name,
                         email,
                         address1, 
                         address2, 
                         city, 
                         countryName, 
                         stateName, 
                         zip, 
                         phone); // Log values


            if (isValid) {
                setToPayment(true); // navigate to payment

                    try {
                      const docRef = await setDoc(doc(db, "Orders", userId), { // save user information until checkout
                        name: name,
                        email: email,
                        address1: address1,
                        address2: address2,
                        countryName: countryName,
                        countryCode: countryCode,
                        stateName: stateName,
                        stateCode: stateCode,
                        city: city,
                        zip: zip,
                        phone: phone
                       
                      });
                
                      console.log("Document written with ID: ", docRef.id);
                
                    } catch (event) {
                       console.error("Error adding document: ", event);
                    }
                  
                console.log('success!')
                navigate(toPayment ? '/payment' : '/shipping') // navigate to payment if all fields are filled in

            } else {
              console.log("Please fill out all the required fields.");
            }

        } catch (error) {
            console.log("An error occurred during form validation:", error);
        }
    }

    // fill in fields for return customers
    useEffect(() => {
        const fetchInformation = async () => {
          try {
            const querySnapshot = await getDocs(
              query(collection(db, "Orders"), where("email", "==", email))
            );
      
            if (querySnapshot.docs.length > 0) {
              const documentData = querySnapshot.docs[0].data();
              setName(documentData.name);
              setAddress1(documentData.address1)
              setAddress2(documentData.address2)
              setCity(documentData.city)
              setZip(documentData.zip)
              setPhone(documentData.phone)
            }
          } catch (error) {
            console.error("Error fetching information: ", error);
          }
        };
      
        fetchInformation(); 
    }, [email]); // the dependency array
      
     return(
        <>
        {/* make it reuseable */}
        <Header/>
        <div className="center form-style">
            <form className="form-style" onSubmit={handleSubmit}>

                <div className="contact-container" style={{paddingBottom: "30px"}}>
                <div className="heading-2">Contact Information</div>

                    <label htmlFor="email"> Email address <span style={{color:"red"}}>*</span> </label>
                    <div className="input-container"> 
                        <input 
                            type="email" 
                            name="email"  
                            id="email"
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <hr style={{opacity: "0.3"}}/>


                <div className="shipping-container">
                <div className="heading-2"> Shipping information</div>

                    <div className="label-input-container">
                        <label htmlFor="name"> Name <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            <input 
                                type="text" 
                                name="name"  
                                id="name"
                                value={name}
                                onChange = {(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* <div className="label-input-container">
                        <label htmlFor="lastname"> Last name <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            <input 
                                type="text" 
                                name="lastname"  
                                id="lastname"
                                value={lastname}
                                onChange = {(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div> */}

                    <div className="label-input-container">
                        <label htmlFor="address"> Address <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            <input 
                                type="text" 
                                name="address"  
                                id="address"
                                value={address1}
                                onChange = {(e) => setAddress1(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="label-input-container">
                        <label htmlFor="address2"> Apartment, suite, etc. </label>
                        <div className="input-container"> 
                            <input 
                                type="text" 
                                name="address2"  
                                id="address2"
                                value={address2}
                                onChange = {(e) => setAddress2(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="label-input-container">
                        <label htmlFor="city"> City <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            <input 
                                type="text" 
                                name="city"  
                                id="city"
                                value={city}
                                onChange = {(e) => setCity(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="label-input-container">
                        <label htmlFor="country"> Country <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            {/* <input 
                                type="text" 
                                name="country"  
                                id="country"
                                value={countryName}
                                onChange = {(e) => setCountryName(e.target.value)}
                            /> */}
                            <GetCountryList className="imported-input-style" 
                                            countryName = {countryName}
                                            setCountryName={setCountryName}
                                            countryCode = {countryCode}
                                            setCountryCode={setCountryCode}/>

                        </div>
                    </div>

                    <div className="label-input-container">
                        <label htmlFor="state"> State/Province <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            {/* <input 
                                type="text" 
                                name="state"  
                                id="state"
                                value={stateName}
                                onChange = {(e) => setStateName(e.target.value)}
                            /> */}
                             <GetStateList className="imported-input-style"
                                           stateName = {stateName}
                                           setStateName={setStateName}
                                           stateCode = {stateCode}
                                           setStateCode={setStateCode}/>

                        </div>
                    </div>

                    <div className="label-input-container">
                        <label htmlFor="postalcode"> Postal code <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            <input 
                                type="text" 
                                name="postalcode"  
                                id="postalcode"
                                value={zip}
                                onChange = {(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="label-input-container">
                        <label htmlFor="phone"> Phone <span style={{color:"red"}}>*</span></label>
                        <div className="input-container"> 
                            <input 
                                type="tel" 
                                name="phone"  
                                id="phone"
                                value={phone}
                                onChange = {(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <hr style={{opacity: "0.3"}}/>

                <div className="method-container" style={{paddingBottom: "30px"}}>
                <div className="heading-2">Delivery method</div>

                   <div>Standard</div>
                   <div style={{opacity: 0.6}}>4-10 business days</div>
                </div>
                
             
                <div className="center">
                    <button type="submit" className="button-style-2 center"  style={{color:"white", textDecoration: "none"}}>
                        Continue
                    </button>
                </div>

            </form>
        </div>
        
        
        <Footer/>
        </>
    )

}
export default ShippingInfo