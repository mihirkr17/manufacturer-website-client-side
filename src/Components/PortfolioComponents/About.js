import React, { useState } from 'react';
import Education from './Education';
import PersonalInfo from './PersonalInfo';
import Skill from './Skill';


const About = ({ info }) => {

   const [active, setActive] = useState("education");
   document.title = "About Mihir";

   const handleTabs = (params) => {
      setActive(params);
   }

   return (

      <div id="about" className="main_components">
         <span className="section_name">About</span>
         <h4 className="section_title">
            Let's introduce MySelf
         </h4>
         <div className="row mkr_row">
            <div className="col-12 mkr_about_description">
               <div className="row">
                  <div className="col-12">

                     <div className="row">
                        <div className="col-12">
                           <div className="mkr_about_details">
                              <p>
                                 <span>{info ? info.hi_intro : ""}</span><br />
                                 {info ? info.about : ""}
                              </p>
                              <div className="mkr_about_btn_group">
                                 {/* <button className="bt9_default" onClick={openModal}>
                                    Learn More
                                 </button> */}
                                 <a className='bt9_default' rel="noopener noreferrer" download="" target="_blank">
                                    <i className="fas fa-download" style={{ marginRight: "10px" }}></i>
                                    Download CV
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="col-12">
                     <div className="mkr_info card_default">
                        <h3 className='section_title'>Personal Information</h3>
                        <div className="row">
                           <div className="col-md-12">
                              <div className="qualification__body">

                                 <div className="mkr_info_header">
                                    <div className={`mkr_info_tab_btn ${active === "education" ? "active" : ""}`} onClick={() => handleTabs("education")}>
                                       <div className="mkr_info_tab_corner">
                                          <div></div>
                                       </div>
                                       <i className="fas fa-user-graduate"></i>
                                       <h4>Education</h4>
                                    </div>

                                    <div className={`mkr_info_tab_btn ${active === "personal" ? "active" : ""}`} onClick={() => handleTabs("personal")}>
                                       <div className="mkr_info_tab_corner">
                                          <div></div>
                                       </div>
                                       <i className="fas fa-briefcase"></i>
                                       <h4>Personal Info</h4>
                                    </div>
                                 </div>

                                 <div className="mkr_info_contents">

                                    <div className={`mkr_info_contents_panel ${active === "education" ? "active" : ""}`} id="education">
                                       <div className="row">
                                          <div className="col-md-12">
                                             <Education data={info ? info : ""}></Education>
                                          </div>
                                       </div>

                                    </div>

                                    <div className={`mkr_info_contents_panel ${active === "personal" ? "active" : ""}`} id="personal">
                                       <div className="row">
                                          <div className="col-md-12">
                                             <PersonalInfo data={info ? info : ""}></PersonalInfo>
                                          </div>
                                       </div>
                                    </div>

                                 </div>

                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>


         </div>
         <div className="row">
            <Skill info={info}></Skill>
         </div>
      </div>

   );
};
export default About;
