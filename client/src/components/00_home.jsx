import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate =  useNavigate()

  return (
    <div className="container_H">
    <header className='header_H'>
      <img className='img_H' src="https://res.cloudinary.com/dbrqyjbzd/image/upload/v1692908004/store_logo_jhwho5.png" alt="Logo de l'application"/>
    </header>
    <main className='main_H'>
      <div className="background_H">
      <div className="content_H">
        <h1>Discover Our Unique Pet Store</h1>
        <p>"Welcome to a world of furry companions and endless joy! Start your journey at our exceptional pet store, where you'll find everything you need to bring home a new four-legged friend."</p>
      </div>
        <button className="start-button_H" onClick={()=>{navigate("client_login")}}>Get Started</button>
      </div>
    </main>
  </div>
  )
}

export default Home