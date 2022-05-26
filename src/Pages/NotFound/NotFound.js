import React from 'react';
import img404 from '../../Assets/image/img-404.png';
const cStyle = {
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   height: "90vh",
   img: {
      width: "75%"
   }
}
const NotFound = () => {
   return (
      <div className='page_404' style={cStyle}>
         <img src={img404} style={cStyle?.img} alt="" />
      </div>
   );
};

export default NotFound;