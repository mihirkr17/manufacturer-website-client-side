import React from 'react';
import { useQuery } from 'react-query';
import About from '../../Components/PortfolioComponents/About';
import MyProject from '../../Components/PortfolioComponents/MyProject';
import Spinner from '../../Components/Shared/Spinner/Spinner';
import './Portfolio.css'

const Portfolio = () => {
   const { data: info, isLoading } = useQuery('info', () => fetch(`http://localhost:5000/information`).then(res => res.json()));
   if (isLoading) {
      return <Spinner></Spinner>
   }

   return (
      <div className='section_default'>
         <div className="container">
            <About info={info}></About>
            <MyProject></MyProject>
         </div>
      </div>
   );
};

export default Portfolio;