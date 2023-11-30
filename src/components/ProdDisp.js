import React from 'react'
import { CardFooter } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProdDisp = (props) => {
    const SERVER = 'https://super-django-1.onrender.com'
    return (
        <Card style={{ width: '18rem', margin:'10px' }}>
            <Card.Img style={{height:'250px'}} variant="top" src={SERVER+props.prod.img} />
            <Card.Body>
                <Card.Title>{props.prod.desc}</Card.Title>
                <CardFooter>price: {props.prod.price}$</CardFooter>
                <Button variant="primary" onClick={()=>props.buy(props.prod)}>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}

export default ProdDisp