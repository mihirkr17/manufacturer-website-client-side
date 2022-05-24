import React from 'react';
import Banner from '../../Components/HomeComponents/Banner';
import FeaturedProduct from '../../Components/HomeComponents/FeaturedProduct';
import ReviewSection from '../../Components/HomeComponents/ReviewSection';

const Home = () => {
   return (
      <section className='home__section'>
         <Banner></Banner>
         <FeaturedProduct></FeaturedProduct>
         <ReviewSection></ReviewSection>
      </section>
   );
};

export default Home;