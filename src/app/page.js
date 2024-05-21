import React from 'react'
import Carousel from './components/client/carousel'
import NavBar from './components/client/navBar'
import Card from './components/client/menu'
import Footer from './components/client/footer' 

const page = () => {
  const slides = [
    { src: "https://c8.alamy.com/comp/RH9BA1/internet-marketing-symbol-with-shopping-cart-e-commerce-symbol-on-digital-background-online-business-3d-illustration-RH9BA1.jpg", alt: 'Slide 1' },
      { src: '', alt: 'Slide 2' },
      { src: 'https://picsum.photos/200/300', alt: 'Slide 3' },
      { src: 'https://picsum.photos/200/300', alt: 'Slide 4' },
      { src: 'https://picsum.photos/200/300', alt: 'Slide 5' },
    ];
  return (
    <div >
      <NavBar/>
      <Carousel slides={slides} />
      <Card/>
      <br></br>
      <Footer/>
    </div>

    
    
    
   
  )
}

export default page