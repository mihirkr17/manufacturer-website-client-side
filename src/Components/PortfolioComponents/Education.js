import { faCalendarAlt, faCertificate, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Education = ({ data }) => {
   const { education } = data ? data : {};
   return (
      <>
         {
            education ? education.map(eduData => {
               const { edu_id, certificate, inst, year } = eduData;
               return (
                  <div className="info_card" key={edu_id}>
                     <div className="info_card_text card_default">
                        <h6><FontAwesomeIcon icon={faCertificate}/>&nbsp;{certificate}</h6>
                        <p><FontAwesomeIcon icon={faUniversity}/>&nbsp;{inst}</p>
                        <span><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;{year}</span>
                     </div>
                  </div>
               )
            }) : ""
         }
      </>
   )
};

export default Education;