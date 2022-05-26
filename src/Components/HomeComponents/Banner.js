
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
            <Carousel.Caption className='slider_caption'>
               <h5>Best Carpenter's Company</h5>
               <h1 className='fs-1'>Professional & Quality Carpenter Service</h1>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img
               className="d-block w-100 slider_image"
               src="https://i.ibb.co/yYQBSs8/slider-3.jpg"
               alt="Second slide"
            />

            <Carousel.Caption className='slider_caption'>
               <h5>Wood Work That Shows Our Best Standard</h5>
               <h1 className='fs-1'>Woodworker Hand Tool</h1>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img
               className="d-block w-100 slider_image"
               src="https://i.ibb.co/QXnLSYz/slider-4.jpg"
               alt="Third slide"
            />

            <Carousel.Caption className='slider_caption'>
               <h5>Complete Furnishing With Best Quality</h5>
               <h1 className='fs-1'>
                  Fine Carpenter Tool
               </h1>
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>

   );
};

export default Banner;