import React from 'react';
import { useQuery } from 'react-query';
import ReviewSectionCard from './ReviewSectionCard';

const ReviewSection = () => {
   const { data: reviews, isLoading } = useQuery('reviews', () => fetch(`http://localhost:5000/reviews`).then(res => res.json()));

   if (isLoading) {
      return
   }

   return (
      <div className='section_default'>
         <div className="container">
            <h2 className="py-5 text-center">Reviews</h2>
            <div className="row">
               {
                  reviews && reviews.map(review => {
                     return(
                        <div className="col-lg-3" key={review._id}>
                           <ReviewSectionCard review={review}></ReviewSectionCard>
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>
   );
};

export default ReviewSection;