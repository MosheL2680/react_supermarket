import React from 'react'
import { Button, Card, CardFooter, CardSubtitle, Row } from 'react-bootstrap'

const Cart = (props) => {
    const SERVER = 'https://super-django-1.onrender.com'
    return (
        <div style={{backgroundColor:'aqua'}}>
            <h3>Your cart  {props.total}$</h3>
            <Row xs={1} md={2} className="g-0">
                {props.cart.map(item => (
                    <Card key={item.id} style={{ width: '14rem', marginLeft:'10px'}}>
                        <Card.Body>
                            <Card.Title>{item.desc}</Card.Title>
                            <CardSubtitle>
                                <Button onClick={() => props.buy(item, -1)}>-</Button>
                                Amount: {item.amount}
                                <Button onClick={() => props.buy(item)}>+</Button>
                            </CardSubtitle>
                            <CardFooter>Price: {item.price}$</CardFooter>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </div>
    );
}

export default Cart