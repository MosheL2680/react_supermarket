import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Categories = () => {
    const [cats, setcats] = useState([])
    const location = useLocation()
    const SERVER = 'https://super-django-1.onrender.com/categories'

    useEffect(() => {
        axios.get(SERVER).then(res =>setcats(res.data))
    }, [])

    return (
        <>
            <Nav variant="tabs" defaultActiveKey="/home">
                {cats.map(cat =>
                    <Nav.Item key={cat.id}>
                        <Nav.Link
                        style={{ fontWeight: 'bold'}}
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
            <Outlet />
        </>
    )
}

export default Categories
