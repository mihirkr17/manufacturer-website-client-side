import React from 'react';

const Skill = ({ info }) => {
   const { skill: data } = info;

   return (
      <div className="mkr_skill_section">
         <div className="container mkr_skill_sector">
            <article className='my-3'>
               <h3 className='section_title'>
                  <p>I have a smart knowledge in these technologies.</p>
                  Professional Skill
               </h3>

            </article>


            <div className="skill_contents">
               <div className="row">
                  {
                     data && data.map((skl, index) => {
                        return (
                           <div className="col-md-6 col-lg-6 col-sm-12" key={index}>
                              <div className="skill_item">
                                 <div className="skill_item_label">
                                    <span>{skl.title}</span>
                                    <span>{skl.label}</span>
                                 </div>
                                 <div className="progress_bar">
                                    <div className="progress_level" style={{ width: skl.progress }}></div>
                                 </div>
                              </div>
                           </div>

                        )
                     })
                  }
               </div>
            </div>


         </div>

         <div className="container fun_fact">
            <h3 className='section_title'>
               <p>
                  You will be inspire to see this
               </p>
               Fun Fact
            </h3>

            <div className="row">
               <div className="col-md-4">
                  <div className="fun_fact_item">
                     <span>+3</span>
                     <span>Years <br /> Experience</span>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="fun_fact_item">
                     <span>+20</span>
                     <span>Project <br /> Complete</span>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="fun_fact_item">
                     <span>+4</span>
                     <span>Companies <br /> Worked</span>
                  </div>
               </div>
            </div>
         </div>

      </div>
   );
};

export default Skill;