import React from 'react'
import { Button,CardText, ListGroup } from 'react-bootstrap'

const Cart = (props) => {
    const SERVER = 'https://super-django-1.onrender.com'
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h3>Your cart  {props.total}$</h3>
                <Button>CheckOut</Button>
            </div><br />
            <ListGroup>
                {props.cart.map(item => (
                    <ListGroup.Item style={{ marginTop: '10px', position: 'relative' }}
                        className="d-flex justify-content-between align-items-start"
                        key={item.id}
                    >
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            style={{ position: 'absolute', top: '0', left: '0', zIndex: '1' }}
                            onClick={() => props.buy(item, -1, 1)}
                        >
                            X
                        </button>
                        <img src={SERVER + item.img} alt={`Thumbnail for ${item.desc}`} style={{ width: '50px', marginRight: '10px' }} />
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.desc}</div>
                            <Button className='bg-success' onClick={() => props.buy(item, -1)}>-</Button>
                            Amount: {item.amount}
                            <Button className='bg-success' onClick={() => props.buy(item)}>+</Button>
                        </div>
                        {/* Move the price to the right but not at the top */}
                        <CardText style={{ color: 'blue',fontWeight:'bolder', position: 'absolute', right: '25px ', bottom: '30px' }} pill>
                            {parseFloat((item.price * item.amount).toFixed(2))}$
                        </CardText>
                    </ListGroup.Item>
                ))}
            </ListGroup>



            {/* <Row xs={1} md={2} className="g-0">
                {props.cart.map(item => (
                    <Card key={item.id} style={{ width: '14rem', marginLeft: '10px' }}>
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
            </Row> */}
        </div>
    );
}

export default Cart