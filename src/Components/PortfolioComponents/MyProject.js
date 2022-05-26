import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const MyProject = ({project}) => {
   const [tab, setTab] = useState("All");

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
      <div id="portfolio" className="py-2">
         <span className="section_name">Projects</span>
         <h3 className='section_title'>My Portfolio</h3>
         <p>Total Project : {project && project.length}</p>
         <div className="portf_tab pt-3">

            <button className={`bt9_tabs ${tab === "All" ? "active" : ""}`} onClick={() => handleTabs("All")}>All</button>
            {
               technologiesBars && technologiesBars.map((tech, index) => {
                  return (
                     <button key={index} className={`bt9_tabs ms-3 ${tab === tech ? "active" : ""}`} onClick={() => handleTabs(tech)}>{tech}</button>
                  )
               })
            }
         </div>

         <div className="row mt-4">
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