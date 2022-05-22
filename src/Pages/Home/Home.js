import React from 'react';
import Banner from '../../Components/HomeComponents/Banner';
import FeaturedProduct from '../../Components/HomeComponents/FeaturedProduct';

const Home = () => {
   return (
      <section className='home__section'>
         <Banner></Banner>
         <FeaturedProduct></FeaturedProduct>
      </section>
   );
};

export default Home;