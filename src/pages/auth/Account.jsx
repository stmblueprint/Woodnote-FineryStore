
import { useNavigate } from "react-router";
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import {useState, useEffect} from "react"
import { collection, getDocs, getDoc, doc, documentId, addDoc, setDoc, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";


import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
import { auth } from "../../firebase/firebase";


const DisplayRegistrationFields = (e) => {
    e.preventDefault();
    document.getElementById("sign-in-fields").style.display = "none";
    document.getElementById("registration-fields").style.display = "block";
  };
  
  const DisplaySignInFields = (e) => {
    e.preventDefault();
    document.getElementById("sign-in-fields").style.display = "block";
    document.getElementById("registration-fields").style.display = "none";
  };
  

export const CreateAccount = () => {




    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const register = (event) => {
        event.preventDefault();

       
        // create auth user
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
    
            navigate(-1)
            firestoreProfile(userCredentials.user.uid)
            console.log(userCredentials.user.uid);
          })
          .catch((error) => {
    
            console.log(error);
          });
    
          // create firestore profile
          const firestoreProfile = async (id) => {
                try{
                    await setDoc(doc(db, "User", id), {
        
                    id: id,
                    email: email
                });
                }catch(error){
                console.error(error)
                }
            }
    
          // get vendor/brandName from firestore 
        }

    return(
        <>
        <Header/>
         
        <div className="center form-style">
            <form className="form-style" onSubmit={register}>
            <div className="center positive-msg-1-container"><div className="positive-msg-1 center">Fast and easy account creation to start shopping!</div></div>   


                <div className="contact-container" style={{paddingBottom: "30px"}}>
                <div className="heading-2 center">Create Account</div>

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
                    <br/>
                    <br/>

                    <label htmlFor="password"> Password <span style={{color:"red"}}>*</span> </label>
                    <div className="input-container"> 
                        <input 
                            type="password" 
                            name="password"  
                            id="password"
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>


                

                <div className="center">
                    <button className="button-style-4">
                        {/* navigate to reset page */}
                            Forgot password? 
                    </button>
                </div>
               
                <div className="center">
                    <button type="submit" className="button-style-2 center"  style={{color:"white", textDecoration: "none"}}>
                        {/* switch form container */}
                        Create Account
                    </button>

                </div>
                <div className="center">Already have an account yet? <button 
                     className="button-style-4"
                     onClick={DisplaySignInFields}>
                        Sign In</button>
                </div>

            </form>
        </div>

        
        
        <Footer/>
        </>
    )
}


export const SignIn = () => {



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const signIn = (event) => {
        event.preventDefault();

        // signIn auth user
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {

            navigate(-1);
    
            console.log(userCredentials.user.uid);
          })
          .catch((error) => {
    
            console.log(error);
          });
    
       
    
    }

    return(
        <>
        <Header/>
        <div className="center form-style">

            <form className="form-style" onSubmit={signIn}>
            <div className="center positive-msg-1-container"><div className="positive-msg-1 center">Fast and easy sign in to continue shopping!</div></div>   


                <div className="contact-container" style={{paddingBottom: "30px"}}>
                <div className="heading-2 center">Welcome back</div>

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
                    <br/>
                    <br/>

                    <label htmlFor="password"> Password <span style={{color:"red"}}>*</span> </label>
                    <div className="input-container"> 
                        <input 
                            type="password" 
                            name="password"  
                            id="password"
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>


                

                <div className="center">
                    <button className="button-style-4">
                        {/* navigate to reset page */}
                            Forgot password? 
                    </button>
                </div>
               
                <div className="center">
                    <button type="submit" className="button-style-2 center"  style={{color:"white", textDecoration: "none"}}>
                        {/* switch form container */}
                       Sign In
                    </button>

                </div>
                <div className="center">Dont have an account yet? <button
                     className="button-style-4"
                     onClick={DisplayRegistrationFields}>Create Account</button>
                 </div>

            </form>
        </div>

        
        
        <Footer/>
        </>
    )
}
  
export const AuthViewManager = () => {

    // Auth current user
    const [email, setEmail] = useState(null);
    const [userId, setUserId] = useState(null);

  
    useEffect(() => {
      const listen = onAuthStateChanged(auth, async (user) => {
        
        if (user) {
  
            const docRef = doc(db, "User", user.uid);
            const docSnapshot = await getDoc(docRef);
           
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            console.log(data.email)
            console.log(data.id)

            sessionStorage.setItem("email", JSON.stringify(data.email));
            sessionStorage.setItem("uid", JSON.stringify(data.id));

            setEmail(JSON.parse(sessionStorage.getItem("email")));
            setUserId(JSON.parse(sessionStorage.getItem("uid")));
  
          }
  
        } 
        
      });
      return () => {

        listen();
      };
    }, []);

    return(
        <>
        
          <div id="sign-in-fields" style={{display: "block"}}>
            <SignIn />
          </div>

          <div id="registration-fields" style={{display: "none"}}>
            <CreateAccount/>
          </div>
        </>
    )
}