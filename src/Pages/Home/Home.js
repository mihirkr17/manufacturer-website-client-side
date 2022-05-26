import React from 'react';
import { useQuery } from 'react-query';
import Banner from '../../Components/HomeComponents/Banner';
import FeaturedProduct from '../../Components/HomeComponents/FeaturedProduct';
import ReviewSection from '../../Components/HomeComponents/ReviewSection';
import Summary from '../../Components/HomeComponents/Summary';

const Home = () => {
   const { data: products, isLoading } = useQuery('products', () => fetch('https://manufacture-web.herokuapp.com/products').then(res => res.json()));
   const { data: users } = useQuery('users', () => fetch('https://manufacture-web.herokuapp.com/users').then(res => res.json()));
   const { data: orders } = useQuery('orders', () => fetch('https://manufacture-web.herokuapp.com/all-orders').then(res => res.json()));


   const country = users && users.map(c => c?.address?.country);

   let totalCountry = country && country.filter((c, i, arr) => {
      return arr.indexOf(c) === i;
   });

   return (
      <section className='home__section'>
         <Banner></Banner>
         <FeaturedProduct products={products} isLoading={isLoading}></FeaturedProduct>
         <Summary
            productLength={products && products.length}
            userLength={users && users.length}
            orderLength={orders && orders.length}
            countryLength={totalCountry && totalCountry.length}
         />
         <ReviewSection></ReviewSection>
      </section>
   );
};

export default Home;