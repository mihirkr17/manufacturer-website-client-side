import React from 'react';

const PersonalInfo = ({ data }) => {
   return (
      <ul className="personal_info_ul card_default">
         <li>
            <span className="p_label">Name :</span>
            <span className="p_info">{data?.name}</span>
         </li>
         <li>
            <span className="p_label">Age :</span>
            <span className="p_info">{data?.age}</span>
         </li>
         <li>
            <span className="p_label">DOB :</span>
            <span className="p_info">{data?.dob}</span>
         </li>
         <li>
            <span className="p_label">Address :</span>
            <span className="p_info">
               <span className="p_vill">Vill- {data?.address?.village},<br /></span>
               <span className="p_dist">Dist- {data?.address?.district},<br /></span>
               <span className="p_state">Thana- {data?.address?.thana},<br /></span>
               <span className="p_country">Division- {data?.address?.division}.<br /></span>
               <span className="p_country">Country- {data?.country}.<br /></span>
               <span className="p_pin">Zip- {data?.address?.zip}</span>
            </span>
         </li>
         <li>
            <span className="p_label">Nationality :</span>
            <span className="p_info">{data?.nationality}.</span>
         </li>
         <li>
            <span className="p_label">Phone :</span>
            <span className="p_info">
               {data?.phone}
            </span>
         </li>
         <li>
            <span className="p_label">Email :</span>
            <span className="p_info">
               {data?.email}
            </span>
         </li>
      </ul>

   );
};

export default PersonalInfo;