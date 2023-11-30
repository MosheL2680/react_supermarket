import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProdDisp from './ProdDisp'
import { Row } from 'react-bootstrap'
import Cart from './Cart'

const Products = () => {
    const { catID } = useParams()
    const [prods, setprods] = useState([])
    const [cart, setcart] = useState([])
    const [refresh, setrefresh] = useState(false)
    const [total, settotal] = useState(0)

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        setcart(storedCart);
        axios.get(`https://super-django-1.onrender.com/products/${catID}`).then((res) => setprods(res.data));
    }, [catID]);

    useEffect(() => {
        if (cart.length > 0) {
            let tempTotal = 0;
            cart.forEach((item) => {
                tempTotal += item.price * item.amount;
            });
            settotal(parseFloat(tempTotal.toFixed(2)));
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, refresh]);
    



    const buy = (item, quantity = 1, del = null) => {
        const current_prod = cart.find(prod => prod.id === item.id)
        if (del) {
            setcart(cart.filter(prod => prod.id !== current_prod.id))//remove item from cart when function was called with some 'del' var
            setrefresh(!refresh)
        }
        if (current_prod) {
            if (current_prod.amount + quantity === 0) {
                setcart(cart.filter(prod => prod.id !== current_prod.id))//remove item from cart when amount = 0
            } else {
                current_prod.amount += quantity//update item mount
                setrefresh(!refresh)
            }
        } else {
            let tempItem = { desc: item.desc, id: item.id, amount: 1, img: item.img, price: item.price }
            setcart([...cart, tempItem]);//create new item in cart when dosnt exist already
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
                <Row xs={1} md={2} className="g-4">
                    {prods.map(prod => <ProdDisp key={prod.id} prod={prod} buy={buy} />)}
                </Row>
            </div>
            <div style={{ borderLeft: '1px solid grey', height: '100vh', margin: '0 10px' }}></div>
            <div style={{ width: '350px' }}>
                <Cart cart={cart} total={total} buy={buy} />
            </div>
        </div>

    )
}

export default Products