import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login(props) {
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
        if (!uName || !pwd) {
            toast.error('Username and password are required');
            return;
        }

        toast.promise(
            axios.post("https://super-django-1.onrender.com/login/", { username: uName, password: pwd })
                .then(res => {
                    settoken(res.data.access);
                    sessionStorage.setItem('token', res.data.access);
                    toast.success('you are logged in now')
                    navigate('/');
                })
                .catch((error) => {
                    toast.error(`username or password isn't correct`)
                }),
            { pending: 'Processing login...' }
        )

    }

    if (token !== "") {
        return <div>
            <h1>You're already logged in</h1>
            <Link to={'/categories'}>back to shop</Link>
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
