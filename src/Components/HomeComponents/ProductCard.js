import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
   const { name, quantity, description, min_order_quantity, image, price } = product;
   return (
      <Card className='card_default mb-5' style={{ height: "fit-content" }}>
         <Card.Img variant="top" style={{ width: "100%", height: "180px" }} src={image} />
         <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
               {description.length > 40 ? description.slice(0, 40) + "..." : description}
            </Card.Text>
         </Card.Body>
         <ListGroup className="list-group-flush">
            <small>Price : {price}$</small>
            <small>Available Quantity : {quantity}&nbsp;pieces</small>
            <small>Minimum Order Quantity : {min_order_quantity}&nbsp;pieces</small>
         </ListGroup>
         <Card.Body>
            <Card.Link className='btn btn-sm btn-info text-dark' as={Link} to={`/purchase/${product._id}`}>Purchase <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></Card.Link>
         </Card.Body>
      </Card>
   );
};

export default ProductCard;