import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardFooter, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const History = (props) => {
    const [history, setHistory] = useState([]);
    const [refresh, setrefresh] = useState(false)
    const SERVER = 'https://super-django-1.onrender.com';

    const fetchHistory = () => {
        toast.promise(
            axios.get(SERVER + '/history', { headers: props.tokenData })
                .then(res => {
                    const temp = res.data.orders.reverse()
                    setHistory(temp)
                })
                .catch(error => {
                    if(error.response && error.response.status === 401) toast.error('Unauthorized! please login')
                    console.error('Error fetching history:', error);
                }),
            {
                pending: 'Fetching history...',
                error: 'Error fetching history!',
            }
        );
    }
    useEffect(() => {
        refresh && fetchHistory()
        setrefresh(true)
    }, [refresh])




    return (
        <div>
            {history.map(order => (
                <div key={order.order_date}>
                    Order date: {order.order_date}<hr />
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {order.order_details.map(item => (
                            <Card style={{ width: '10rem', margin: '10px' }} key={item.id}>
                                <Card.Img style={{ height: '100px', objectFit: 'cover' }} variant="top" src={SERVER + item.product_image} />
                                <Card.Body>
                                    <Card.Title>{item.product_desc}</Card.Title>
                                    <CardFooter>Price: {props.product_price}$</CardFooter>
                                    <Button variant="primary" onClick={() => props.buy(props.prod)}>Add to cart</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Row>
                    <hr />
                </div>
            ))}
        </div>
    );

};

export default History;
