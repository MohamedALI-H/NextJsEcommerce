'use client'
import React from 'react'
import Carousel from './components/client/carousel'
import NavBar from './components/client/navBar'
import Card from './components/client/card'
import Footer from './components/client/footer' 

const page = () => {
  const slides = [
    { src: '../../../../media/slide1.png', alt: 'Slide 1' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5WMbs1eS75OLC76ZGrehjkTz4iwtsuNMlG6FxLt93iQTzW4jhz5te5EbXFQ&s', alt: 'Slide 2' },
      { src: 'https://picsum.photos/200/300', alt: 'Slide 3' },
      { src: 'https://picsum.photos/200/300', alt: 'Slide 4' },
      { src: 'https://picsum.photos/200/300', alt: 'Slide 5' },
    ];
  return (
    <div >
      <NavBar/>
      <Carousel slides={slides} />
      <Card/>
      <Footer/>
    </div>

    
    
    
   
  )
}

export default page