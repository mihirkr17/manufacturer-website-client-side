import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
   return (
      <Card style={{ width: '18rem' }}>
         <Card.Img variant="top" src={product.image} />
         <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
               {product.description}
            </Card.Text>
         </Card.Body>
         <ListGroup className="list-group-flush">
            <ListGroupItem>Price : {product.price}</ListGroupItem>
            <ListGroupItem>Available Quantity : {product.quantity}</ListGroupItem>
            <ListGroupItem>Minimum Order Quantity : {product.min_order_quantity}</ListGroupItem>
         </ListGroup>
         <Card.Body>
            <Card.Link as={NavLink} to={`/purchase/${product._id}`}>Purchase</Card.Link>
         </Card.Body>
      </Card>
   );
};

export default ProductCard;