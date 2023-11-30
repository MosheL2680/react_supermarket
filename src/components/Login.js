import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [uName, setuName] = useState("");
    const [pwd, setpwd] = useState("");
    const [token, settoken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const existingToken = sessionStorage.getItem('token');
        if (existingToken) {
            settoken(existingToken);
        }
    }, []);

    const doLogin = () => {
        axios.post("https://super-django-1.onrender.com/login/", { username: uName, password: pwd })
            .then(res => {
                settoken(res.data.access);
                sessionStorage.setItem('token', res.data.access);
                const object = JSON.parse(atob(res.data.access.split('.')[1]));
                console.log(object.username + ' just logged');
                navigate('/');
            });
    }

    if (token !== "") {
        return <div>
            <h1>Already logged in</h1>
            {/* You can add more content or components for the already logged in state */}
        </div>;
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={(e) => setuName(e.target.value)} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setpwd(e.target.value)} />

            <div className="d-flex justify-content-between mx-3 mb-4">
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4" onClick={doLogin}>Sign in</MDBBtn>

            <div className="text-center">
                <p>Not a member? <Link to={'/register'}>Register</Link></p>
            </div>
        </MDBContainer>
    );
}

export default Login;
