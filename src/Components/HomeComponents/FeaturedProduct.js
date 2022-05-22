import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../Shared/Spinner/Spinner';
import ProductCard from './ProductCard';

const FeaturedProduct = () => {

   const { data: products, isLoading } = useQuery('products', () => fetch('http://localhost:5000/products').then(res => res.json()))

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   return (
      <div className='section_default'>
         <h2 className='section_title'>Featured Products</h2>

         <div className="container">
            <div className="row">
               {
                  products.map(product => {
                     return (
                        <div className="col-lg-4 d-flex align-items-center justify-content-center" key={product._id}>
                           <ProductCard product={product}></ProductCard>
                        </div>
                     )
                  }).reverse().slice(0, 6)
               }
            </div>
         </div>
      </div>
   );
};

export default FeaturedProduct;