import React, { useState } from 'react';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { auth } from '../../../firebase.init';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddReview = () => {
   const [user] = useAuthState(auth);
   const [rating, setRating] = useState('');
   const [ratingText, setRatingText] = useState('');

   // fetching all my reviews
   const { data: reviews, isLoading, refetch } = useQuery('reviews', () => fetch(`https://manufacture-web.herokuapp.com/review/${user?.email}`).then(res => res.json()));

   // Add review handler action
   const handleRating = async (e) => {
      e.preventDefault();
      let name = user?.displayName;
      let email = user?.email;


      const response = await fetch('https://manufacture-web.herokuapp.com/reviews', {
         method: "POST",
         headers: {
            "Content-type": "application/json"
         },
         body: JSON.stringify({ name, email, rating, ratingText })
      });

      if (response.ok) {
         const data = await response.json();

         if (data?.insertedId !== '') {
            e.target.reset();
            refetch();
         }
      }
   }

   // Delete review
   const deleteReview = async (reviewId) => {
      const response = await fetch(`https://manufacture-web.herokuapp.com/review/${reviewId}`, {
         method: "DELETE"
      });

      if (response.ok) {
         const data = await response.json();

         if (data) {
            refetch();
         }
      }
   }

   return (
      <div className='section_default'>
         <div className="container">

            <div className="row">
               <div className="col-lg-7">
                  <h5 className="text-center pt-1 pb-3">Add Review</h5>
                  <Form onSubmit={handleRating} className='card'>
                     <div className="card-body">
                        <FormGroup className='mb-4'>
                           <label htmlFor="rating" className="form-label">Rating Point* : <span className='text-danger fw-bold'>{rating || '1'}</span></label>
                           <Form.Range
                              type="range"
                              name='rating'
                              className="form-range"
                              min="1" max="5" step="0.5"
                              defaultValue={"1"}
                              onChange={(e) => setRating(e.target.value)}
                              id="rating" />

                        </FormGroup>
                        <FormGroup>
                           <Form.Label>Write Your Review*</Form.Label>
                           <Form.Control
                              as="textarea"
                              name='ratingText'
                              placeholder="Leave a comment here"
                              style={ratingText.length <= 0 ? { borderColor: "red", height: '100px' } : { borderColor: "blue", height: '100px' }}
                              onChange={(e) => setRatingText(e.target.value)}
                              required
                           />
                        </FormGroup>
                        <FormGroup className='mt-3 text-end'>
                           <Button type='submit'>Add Review</Button>
                        </FormGroup>
                     </div>
                  </Form>
               </div>
               <div className="col-lg-5">
                  <h5 className="text-center pt-1 pb-3">My All reviews</h5>
                  <div className="all_reviews w-100" style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}>
                     <div className="row">
                        {
                           isLoading ?
                              <Spinner></Spinner>
                              :
                              reviews && reviews.map(review => {
                                 const { _id, name, rating, ratingText } = review;
                                 return (
                                    <div className="col-12 mb-3" key={_id}>
                                       <Card>
                                          <Card.Body>

                                             <div className="row">
                                                <div className="col-10">
                                                   <Card.Title className='fw-bold' style={{ fontSize: "0.9rem" }}>{name}</Card.Title>
                                                </div>
                                                <div className="col-2">
                                                   <span style={{ cursor: "pointer" }} title='Are you want to delete this review ?' onClick={() => deleteReview(_id)}>
                                                      <FontAwesomeIcon icon={faClose} />
                                                   </span></div>
                                             </div>
                                             <Card.Subtitle className="mb-2 text-warning">Rating : {rating} of 5</Card.Subtitle>
                                             <Card.Text>
                                                {ratingText.length >= 20 ? ratingText.slice(0, 20) + "..." : ratingText}
                                             </Card.Text>
                                          </Card.Body>
                                       </Card>
                                    </div>
                                 )
                              })
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddReview;