
import { faQuoteLeftAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewSectionCard.css';


const ReviewSectionCard = ({ review }) => {
   return (
      <blockquote className="blockquote blockquote-custom bg-white mb-5 p-5 shadow rounded">
         <div className="blockquote-custom-icon bg-info shadow-sm">
            <FontAwesomeIcon icon={faQuoteLeftAlt} />
         </div>
         <div className="rating_point">
            {review?.rating} out of 5
         </div>
         <p className="mb-0 mt-2 font-italic">
            {review?.ratingText}
         </p>
         <footer className="blockquote-footer pt-4 mt-4 border-top">
            Reviewed By &nbsp;
            <cite title="Source Title">{review?.name}</cite>
         </footer>
      </blockquote>
   );
};

export default ReviewSectionCard;