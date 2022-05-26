import React from 'react';
import { useQuery } from 'react-query';
import About from '../../Components/PortfolioComponents/About';
import MyProject from '../../Components/PortfolioComponents/MyProject';
import Spinner from '../../Components/Shared/Spinner/Spinner';
import './Portfolio.css'

const Portfolio = () => {
   const { data: info, isLoading } = useQuery('info', () => fetch(`https://manufacture-web.herokuapp.com/information`).then(res => res.json()));
   const { data: project, isLoading: isLoading2 } = useQuery('project', () => fetch(`https://manufacture-web.herokuapp.com/my-project`).then(res => res.json()));

   if (isLoading || isLoading2) {
      return (<Spinner></Spinner>);
   }

   return (
      <div className='section_default'>
         <div className="container">
            <About info={info}></About>
            <MyProject project={project}></MyProject>
         </div>
      </div>
   );
};

export default Portfolio;