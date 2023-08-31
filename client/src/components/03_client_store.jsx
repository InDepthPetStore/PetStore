 import React from 'react'
 import { useSearchParams } from 'react-router-dom'
 
 function ClientStore() {
  const [searchParams, setSearchParmas] = useSearchParams()
   return (
     <div>
      <button onClick={()=>setSearchParmas({})} >All</button>
      <button onClick={()=>setSearchParmas({filter:"active"})} >Pets</button>
      <button onClick={()=>setSearchParmas({filter:"active"})} >Food</button>
      <button onClick={()=>setSearchParmas({filter:"active"})} >Accessories</button>
     </div>
   )
 }
 
 export default ClientStore