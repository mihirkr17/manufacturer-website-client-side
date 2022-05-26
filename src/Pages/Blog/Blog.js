import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Components/Shared/Spinner/Spinner';

const Blog = () => {

   const { data: blogs, isLoading, refetch } = useQuery('blogs', () => fetch(`https://manufacture-web.herokuapp.com/blogs`).then(res => res.json()));

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   return (
      <div className='section_default'>
         <div className="container">
            <h3 className="section_title">Frequently Asked Question</h3>
            <div className="row">
               {
                  blogs && blogs.map(blog => {
                     const { _id, question, answer } = blog;
      

                     return (
                        <div className="col-12" key={_id}>
                           <div className="article py-3">
                              <strong >{question}</strong>
                              <p>
                                 {answer}
                              </p>
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>
   );
};

export default Blog;