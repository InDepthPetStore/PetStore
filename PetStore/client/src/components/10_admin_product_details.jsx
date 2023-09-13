import React,{useState,useEffect} from 'react'
import {useLocation } from 'react-router-dom'
import axios from 'axios'

function UpdateCustomer() {
    const location = useLocation();

    const[file,setFile]=useState("")  
    const product = location.state ; 

    const [image, setImage] = useState(product.image );
    const [name, setName] = useState(product.name );
    const [category, setCategory] = useState(product.category );
    const [price, setPrice] = useState(product.price );
    const [stock, setStock] = useState(product.stock );
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");
 
    useEffect(() => {
      if (file) {
        Upload();
      }
    }, [file]);


    const update=()=>{
      axios.put(`/admin/product/${product.idproduct}`,{image,name,category,price,stock})
      .then((res)=>{ setResponse(res.data.message)})
      .catch((error)=>{ if (error.response) {
        setError(error.response.data.message); // Set the error message from the response
      } else {
        setError("An error occurred. Please try again later."); // Handle network errors
      }
        });
    }

          const Upload = async ()=>{
            const form=new FormData()
            form.append('file',file)
            form.append('upload_preset',"medswi")
            try {
              const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dbrqyjbzd/image/upload`, form );
              setImage(response.data.url);
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          }


          const handleFileChange = (e) => {
            setFile(e.target.files[0]);
          };

  return (
    <div className="center-screen">
    <div className="signup-container">
      <div className="title">Create New Product</div>

      <label className="custom-file-upload">
      <input type="file" onChange={(e)=>{handleFileChange(e)}} />
      <span>Choose File</span>
      </label>
      {image && <p style={{color:"green"}} className="error-message">Uploaded</p>}
      <input type="text" placeholder={product.name} onChange={(e)=>{setName(e.target.value)}}/>
      <div className='radio_container'>
            <input type='radio' value='pets' name='category' onChange={(e)=>{setCategory(e.target.value)}}/>
              <label htmlFor='pets' >Pets</label>
            <input type='radio' value='food' name='category' onChange={(e)=>{setCategory(e.target.value)}}/>
            <label htmlFor='food' >Food</label>
            <input type='radio' value='accessories' name='category' onChange={(e)=>{setCategory(e.target.value)}}/>
              <label htmlFor='accessories' >Accessories</label>
      </div>
      <input type="text" placeholder={product.price} onChange={(e)=>{setPrice(e.target.value)}}/>
      <input type="text" placeholder={product.stock}onChange={(e)=>{setStock(e.target.value)}}/> <br />
      {error && <p style={{color:"red"}} className="error-message">{error}</p>}
      {response && <p style={{color:"green"}} className="response-message">{response}</p>}

      <button className="login-button" onClick={()=>{update()}}>Edit</button> 
    </div>
</div>
)
}

export default UpdateCustomer