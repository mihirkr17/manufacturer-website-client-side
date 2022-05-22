import React from 'react';

const ProductDetail = ({ product, refetch, isLoading }) => {
   const { name, description, price, quantity, image, material, availability } = product ? product : {};

   return (
      <div className='product_details card_default'>
         <div className="container">
            <div className="row">
               <div className="col-lg-5">
                  <div className="d-flex align-items-center justify-content-center">
                     <img src={image} className='w-75' alt="product-img" />
                  </div>
               </div>
               <div className="col-lg-7">
                  <div className="p-4">
                     <h5>{name}</h5>
                     <p><strong>Price :</strong> {price}</p>
                     <p><strong>Material : </strong> {material}</p>
                     <p><strong>Quantity : </strong> {quantity}</p>
                     <p><strong>Availability : </strong> {availability === true ? "In stock!" : "Out Of Stock"}</p>
                     <p><strong>Description :</strong> {description}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetail;