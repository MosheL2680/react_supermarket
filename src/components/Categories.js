import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Nav, Spinner } from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaList } from 'react-icons/fa';
import { RiHistoryLine } from 'react-icons/ri';



const Categories = () => {
    const [cats, setcats] = useState([])
    const [loading, setloading] = useState(true)
    const location = useLocation()
    const SERVER = 'https://super-django-1.onrender.com/categories'

    useEffect(() => {
        toast.promise(
            axios.get(SERVER)
                .then(res => {
                    setcats(res.data)
                    setloading(false)
                }),
            { pending: 'loading data...' }
        );
    }, []);


    return (
        <>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item >
                    <Nav.Link
                        style={{ fontWeight: 'bold' }}
                        as={Link}
                        to={`history`}
                        eventKey={`link-100}`}
                        className={location.pathname === `/categories/history` ? 'active' : ''}
                        >
                        <RiHistoryLine style={{ marginRight: '5px' }} /> Orders history
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link
                        style={{ fontWeight: 'bold' }}
                        as={Link}
                        to={`allProducts`}
                        eventKey={`link-101}`}
                        className={location.pathname === `/categories/allProducts` ? 'active' : ''}
                    >
                        <FaList style={{ marginRight: '5px' }} /> All products
                    </Nav.Link>
                </Nav.Item>
                {cats.map(cat =>
                    <Nav.Item key={cat.id}>
                        <Nav.Link
                            style={{ fontWeight: 'bold' }}
                            as={Link}
                            to={`/categories/${cat.id}`}
                            eventKey={`link-${cat.id}`}
                            className={location.pathname === `/categories/${cat.id}` ? 'active' : ''}
                        >
                            {cat.desc}
                        </Nav.Link>
                    </Nav.Item>
                )}
            </Nav>
            <br />
            {loading && <Spinner animation="grow" variant="primary" />}
            <Outlet />
        </>
    )
}

export default Categories
