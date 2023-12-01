import axios from 'axios'
import React from 'react'
import { Button, CardText, ListGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'


const Cart = (props) => {
    const SERVER = 'https://super-django-1.onrender.com'
    const token = sessionStorage.getItem('token')
    const tokenData = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
    }

    const CheckOut = () => {
        if (props.cart.length === 0) {
            toast('cart is empty')
            return
        }
        toast.promise(
            axios.post(SERVER + '/checkout', { cart: props.cart }, { headers: tokenData })
                .then((res) => {
                    console.log(res.data);
                    props.setcart([]);
                    props.setclearCart(true);
                    toast.success('Checkout successful! 👌')
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        toast.error('Unauthorized: Please log in.')
                    } else {
                        console.error('Error during checkout:', error);
                        toast.error('Error during checkout 🤯')
                    }
                }),
            { pending: 'Processing checkout...', }
        );
    };

    return (
        <div>
            <div style={{ display: 'flex', backgroundColor: 'rgb(100, 202, 202)', padding: '10px' }}>
                <h3>Your cart</h3>
                <Button style={{ position: 'absolute', right: "0" }} onClick={() => CheckOut()}>{'CheckOut   '}{props.total}$</Button>
            </div>
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
                        <CardText style={{ color: 'blue', fontWeight: 'bolder', position: 'absolute', right: '25px ', bottom: '30px' }} pill>
                            {parseFloat((item.price * item.amount).toFixed(2))}$
                        </CardText>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default Cart