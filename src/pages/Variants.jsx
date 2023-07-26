import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { checkPropTypes } from "prop-types";
import { useParams } from "react-router-dom";
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
// import {encode} from 'base-64'
// store id: 8533797
// variant id: 312183147

const Variants = ({ setImage, image }) => {
  const [data, setData] = useState(null);
  const [hideBrandLogo, setHideBrandLogo] = useState(true);

  const handleSelectedProduct = (selectedProduct) => {
    setImage(selectedProduct);
  };

  const store_id = "8533797";
  const variants = [
    "33017314", // Men's Embroidered Long Sleeve
    "51065350", // Men's Hoodie
    "50851839", // Unisex eco sweatshirt
  ];
  let currentVariants = "";

  // not the store id is not the same as the template id
  const { productId } = useParams();

  if (productId == variants[2]) {
    currentVariants = "312643659";
  } else if (productId == variants[0]) {
    currentVariants = "312183147";
  } else if (productId == variants[1]) {
    currentVariants = "313001069";
  }

  const handleHideBrandLogo = () => {
    setHideBrandLogo(true);
  };

  const [apiKey, setApiKey] = useState(null);

  // prinful api key stored in firebase firestore
  const fetchApiKey = async () => {
    const qRef = query(
      collection(db, "AdminItems"),
      where("printfulApiKey", "!=", "")
    );
    const querySnapshot = await getDocs(qRef);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const apiKey = doc.data().printfulApiKey;

      return setApiKey(apiKey);
    } else {
      return null; // key not found
    }
  };

  // const [authToken, setAuthToken] = useState(null);

  // const [selectedColor, setSelectedColor] = useState(null);
  // const handleColorChange = (event) => {
  //     setSelectedColor(event.target.value);
  // };

  useEffect(() => {
    const fetchData = async () => {
      // const printfulApiKey = process.env.PRINTFUL_API_KEY;
      const apiUrl = `https://api.printful.com/store/products/${currentVariants}?store_id=${store_id}`;

      try {
        // const response = await fetch(`/api/products/${productId}`,
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData.result.sync_variants);
        } else {
          // If the response status is not OK (200), handle the error
          const errorData = await response.json();
          throw new Error(`API request failed: ${JSON.stringify(errorData)}`);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error:", error);
      }
    };
    fetchApiKey();
    fetchData();
  }, [apiKey, currentVariants]);

  return (
    <>
      <div className="">
        <div className="products-container center">
          {data ? (
            <div className="variants-container center">
              {data.map((product, index) => {
                // Split the string at '/ ' and get the first part

                //remove the size from the name
                const [name] = product.name.split(" / ");

                return (
                  //  appending the index to the product.id within the key prop,
                  // you ensure that each key is unique and address the warning
                  //  about non-unique keys.
                  <div key={`${product.id}-${index}`}>
                    <div className="">
                      {product.files.map((variant) => (
                        <img
                          key={variant.id}
                          onClick={() =>
                            handleSelectedProduct(variant.preview_url)
                          }
                          src={variant.preview_url}
                          alt="Mockup"
                          width={100}
                          style={{
                            // hide product design
                            display:
                              (hideBrandLogo &&
                                variant.preview_url ===
                                  "https://files.cdn.printful.com/files/a0c/a0cb89fac531110dd3215265eea0731e_preview.png") ||
                              variant.preview_url ===
                                "https://files.cdn.printful.com/printfile-preview/428032726/dfe0e3eb04707085d954e423c2ebdf97_preview.png" ||
                              variant.preview_url ===
                                "https://files.cdn.printful.com/printfile-preview/428032724/3dac38103c99fcf03be783ef15e45578_preview.png" ||
                              variant.preview_url ===
                                "https://files.cdn.printful.com/files/a94/a948da8512bf1ba199713b2b156a68fb_preview.png" ||
                              variant.preview_url ===
                                "https://files.cdn.printful.com/printfile-preview/580742011/fd78a2493d62133ac38488b52c1a4544_preview.png"
                                ? "none"
                                : "block",
                          }}
                        />
                      ))}
                    </div>
                    <div className="center">{/* <h3>{name}</h3> */}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Variants;
