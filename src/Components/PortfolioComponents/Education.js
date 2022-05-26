import React from 'react';

const Education = ({ data }) => {
   const { education } = data ? data : {};
   return (
      <>
         {
            education ? education.map(eduData => {
               const { edu_id, certificate, inst, year } = eduData;
               return (
                  <div className="mkr_info_contents_panel_data" key={edu_id}>
                     <div className="mkr_info_contents_panel_data_text card_default">
                        <h6><i className="fas fa-certificate"></i>{certificate}</h6>
                        <p><i className="fas fa-university"></i>{inst}</p>
                        <span><i className="far fa-calendar-alt"></i>{year}</span>
                     </div>
                  </div>
               )
            }) : ""
         }
      </>
   )
};

export default Education;