
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './Banner.css';

const Banner = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };

   return (

      <Carousel activeIndex={index} onSelect={handleSelect}>
         <Carousel.Item>
            <img
               className="d-block w-100 slider_image"
               src="https://i.ibb.co/0rHgh24/slider-1.jpg"
               alt="First slide"
            />
            <Carousel.Caption>
               <h5>Best Carpenter's Company</h5>
               <h2>Professional & Quality Carpenter Service</h2>
               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img
               className="d-block w-100 slider_image"
               src="https://i.ibb.co/yYQBSs8/slider-3.jpg"
               alt="Second slide"
            />

            <Carousel.Caption>
               <h3>Second slide label</h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img
               className="d-block w-100 slider_image"
               src="https://i.ibb.co/QXnLSYz/slider-4.jpg"
               alt="Third slide"
            />

            <Carousel.Caption>
               <h3>Third slide label</h3>
               <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
               </p>
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>

   );
};

export default Banner;