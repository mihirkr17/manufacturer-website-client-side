import React, { useState } from 'react';

const ProjectCard = ({ portfolioData }) => {
   const { title, technologies, features, link, img } = portfolioData;

   const [show, setShow] = useState(false);

   const toggleCardDesc = (params) => {
      if (show === params) {
         setShow(false);
      } else {
         setShow(true);
      }
   }

   const mkrPortfolioCardStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      img: {
         height: "205px"
      }
   }

   return (
      <div className="mb-3 card_default" onClick={() => toggleCardDesc(true)}>
         <div className="row g-0">
            <div className="col-md-4" style={mkrPortfolioCardStyle}>
               <img src={img ? "portfolio-images/" + img : ""} style={mkrPortfolioCardStyle.img} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
               <div className="card-body">
                  <h4 className="card-title text-truncate">{title ? title : ""}</h4>
                  <article className="card-text mkr_portf_card_article">
                     <div className='portf_tech' style={show ? { height: "auto" } : { height: "50px", overflow: "hidden" }}>
                        <h6>Technologies :</h6>
                        <strong>[{technologies ? technologies.join(" , ") : ""}]</strong>
                     </div>

                     <div className="portf_fetures">
                        <h6>Features :</h6>
                        <ul className='portf_ul' style={show ? { height: "auto" } : { maxHeight: "20px", overflow: "hidden" }}>{features ? features.map((f, index) => <li key={index}>{f}</li>) : ""}</ul>

                        <div className="link_container">
                           <a href={link ? link.github : ""} rel="noreferrer" target={'_blank'}>Repo</a>
                           {
                              link.github_server && <a rel="noreferrer" href={link.github_server} target={'_blank'}>Server Repo</a>
                           }
                           {
                              link.livePage !== "" ? (<a rel="noreferrer" href={link.livePage} target={'_blank'}>Live</a>) : ""
                           }
                        </div>
                     </div>


                  </article>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProjectCard;