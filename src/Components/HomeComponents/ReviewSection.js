import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../Shared/Spinner/Spinner';
import ReviewSectionCard from './ReviewSectionCard';

const ReviewSection = () => {
   const { data: reviews, isLoading } = useQuery('reviews', () => fetch(`https://manufacture-web.herokuapp.com/reviews`).then(res => res.json()));

   if (isLoading) {
      return <Spinner></Spinner>
   }

   return (
      <div className='section_default'>
         <div className="container">
            <h3 className="section_title">
               <p>What Clients Say</p>
               Reviews</h3>
            <div className="row">
               {
                  reviews && reviews.map(review => {
                     return (
                        <div className="col-lg-4" key={review._id}>
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