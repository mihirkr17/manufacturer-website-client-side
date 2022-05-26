import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../Shared/Spinner/Spinner';
import ProjectCard from './ProjectCard';

const MyProject = () => {
   const [tab, setTab] = useState("All");
   const { data: project, isLoading } = useQuery('project', () => fetch(`http://localhost:5000/my-project`).then(res => res.json()));

   if (isLoading) {
      return (<Spinner></Spinner>);
   }

   const handleTabs = (params) => {
      setTab(params);
   }

   let technologiesBars;

   if (project) {
      let tech = [];
      for (let i = 0; i < project.length; i++) {
         let elem = project[i].technologies;
         for (let j = 0; j < elem.length; j++) {
            let allElem = elem[j];
            tech.push(allElem);
         }
      }

      technologiesBars = tech.filter((currentValue, index) => {
         return tech.indexOf(currentValue) === index;
      });
   }

   return (
      <div id="portfolio" className="main_components">
         <span className="section_name">Projects</span>
         <h3 className='section_title'>My Portfolio</h3>
         <p>Total Project : {project && project.length}</p>
         <div className="mkr_protf_tabs pt-3">

            <button className={`bt9_tabs ${tab === "All" ? "active" : ""}`} onClick={() => handleTabs("All")}>All</button>
            {
               technologiesBars && technologiesBars.map((tech, index) => {
                  return (
                     <button key={index} className={`bt9_tabs ms-3 ${tab === tech ? "active" : ""}`} onClick={() => handleTabs(tech)}>{tech}</button>
                  )
               })
            }
         </div>

         <div className="mkr_row row portf_row mt-4">
            {
               project && project.map((p, index) => {
                  return (
                     <React.Fragment key={index}>
                        {
                           tab === "All" ? <div className="portf_project col-lg-6">
                              <ProjectCard portfolioData={p}></ProjectCard>
                           </div> : ""
                        }
                        {
                           p.technologies.includes(tab) ?
                              <div className="portf_project col-lg-6">
                                 <ProjectCard portfolioData={p}></ProjectCard>
                              </div> : ''
                        }
                     </React.Fragment>
                  )
               })
            }
         </div>
      </div>
   );
};

export default MyProject;