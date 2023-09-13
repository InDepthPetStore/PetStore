import React,{useState, useEffect} from 'react'
import axios from 'axios'

function AdminAddProduct() {

            const [file,setFile] = useState("")
            const [image, setImage]= useState("")
            const [name, setName]= useState("")
            const [category,setCategory]= useState("")
            const [price,setPrice]= useState(0)
            const [stock,setStock]= useState(0)
            const [error, setError] = useState("");
            const [response, setResponse] = useState("");

          
            useEffect(() => {
              // This effect will run when 'file' state changes
              if (file) {
                // Call Upload() when 'file' state is updated
                Upload();
              }
            }, [file]);


            const add= async ()=>{

              await axios.post('/admin/add_product',{image,name,category,price,stock})
              .then((res)=>{ setResponse(res.data.message)})
              .catch((error)=>{ if (error.response) {
                setError(error.response.data.message); // Set the error message from the response
              } else {
                setError("An error occurred. Please try again later."); // Handle network errors
              }
                });
            }

            
            const Upload = async ()=>{
              if (file) {
              const form=new FormData()
              form.append('file',file)
              form.append('upload_preset',"medswi")
              try {
                const response = await axios.post( `https://api.cloudinary.com/v1_1/dbrqyjbzd/image/upload`, form );
                setImage(response.data.url);
              } 
              catch (error) {
                console.error('Error uploading image:', error);
              }
            }
            else {
              console.error("No file selected for upload");
            }
            }
              
            const handleFileChange = (e) => {
              setFile(e.target.files[0])
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

                      {/* <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
                  <button className='' onClick={()=>{Upload()}}>upload !</button><br/> */}
                  <input type="text" placeholder="Product Name" onChange={(e)=>{setName(e.target.value)}}/>
                  <div className='radio_container'>
                        <input type='radio' value='pets' name='category' onChange={(e)=>{setCategory(e.target.value)}}/>
                          <label htmlFor='pets' >Pets</label>
                        <input type='radio' value='food' name='category' onChange={(e)=>{setCategory(e.target.value)}}/>
                        <label htmlFor='food' >Food</label>
                        <input type='radio' value='accessories' name='category' onChange={(e)=>{setCategory(e.target.value)}}/>
                          <label htmlFor='accessories' >Accessories</label>
                  </div>
                  <input type="text" placeholder="Price" onChange={(e)=>{setPrice(e.target.value)}}/>
                  <input type="text" placeholder="Stock"onChange={(e)=>{setStock(e.target.value)}}/> <br/>
                  {error && <p style={{color:"red"}} className="error-message">{error}</p>}
                  {response && <p style={{color:"green"}} className="response-message">{response}</p>}

                  <button className="login-button" onClick={()=>{add()}}>Create</button> 
                </div>
            </div>
            )
}

export default AdminAddProduct