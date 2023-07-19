
import { useState, useEffect } from "react";
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



  
const usePrivateItemsState = () => {

    const [firebaseApiKey, setApiKey] = useState(null);
    const [authDomain, setAuthDomain] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [storageBucket, setStorageBucket] = useState(null);
    const [messageSenderId, setMessageSenderId] = useState(null);
    const [apiId, setApiId] = useState(null);
    const [measurementId, setMeasurementId] = useState(null);
  

useEffect(() => {
    // Read all items
    const fetchAdminItems = async () => {
        try {
            const qRef = query(collection(db, "AdminItems"));
            const querySnapshot = await getDocs(qRef);
            const docData = querySnapshot.docs[0]?.data() || {};

            setApiKey(docData.firebaseApiKey || null);
            setAuthDomain(docData.authDomain || null);
            setProjectId(docData.projectId || null);
            setStorageBucket(docData.storageBucket || null);
            setMessageSenderId(docData.messageSenderId || null);
            setApiId(docData.apiId || null);
            setMeasurementId(docData.measurementId || null);

        }catch(error){
            console.error("failed", error)
        }
    }
    
    fetchAdminItems();

}, [])

return {
    firebaseApiKey,
    authDomain,
    projectId,
    storageBucket,
    messageSenderId,
    apiId,
    measurementId,
  };


};

export default usePrivateItemsState;