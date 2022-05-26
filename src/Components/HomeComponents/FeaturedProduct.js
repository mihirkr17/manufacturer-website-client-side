import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../Shared/Spinner/Spinner';
import ProductCard from './ProductCard';

const FeaturedProduct = ({products, isLoading}) => {

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   return (
      <div className='section_default'>

         <h3 className='section_title'>
            <p className='text-center'>Wood Working Tools</p>
            Featured Products
         </h3>

         <div className="container">
            <div className="row">
               {
                  products.map(product => {
                     return (
                        <div className="col-lg-3 d-flex align-items-center justify-content-center" key={product._id}>
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