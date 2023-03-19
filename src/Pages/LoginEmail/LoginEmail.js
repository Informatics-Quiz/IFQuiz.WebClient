import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginEmail.css'
import Modal from 'react-bootstrap/Modal';

import { useDispatch } from 'react-redux';
import { setUser } from '../../Reducers/userRedeucer';

const LoginEmail = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [errorMessage, setErrorMessage] = useState()

    const dispatch = useDispatch()

    function loginWithEmail() {
        console.log('Login with Email')
        axios.post('http://localhost:3000/auth/login', {
            email: email,
            password: password
        })
            .then(response => {
                // If success should go Homepage
                console.log(response.data)
                dispatch(setUser(response.data))
                navigate('/Home')
            })
            .catch(error => {
                // Popup show eror message
                console.log(error.response.data.message)
                errorMessageLoop(error.response.data.message)
                handleShow()
            });
    }

    function errorMessageLoop(error) {
        let message = ''
        for (let i = 0; i < error.length; i++) {
            message = message + `${error[i]} , `
        }
        setErrorMessage(message)
    }

    return (

        <div className='ContainerLoginEmail' >
            <div className='content'>
                <div className='section-1x'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <p id='text1'>Continue with Email</p>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-sm-6 col-md-8 col-xl-5 d-flex flex-column'>
                                <p>Enter email address</p>
                                <input onChange={(e) => setEmail(e.target.value)}></input>
                                <p>Enter password</p>
                                <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                                <Link
                                    role='button'
                                    onClick={loginWithEmail}
                                    style={{ textDecoration: 'none', color: 'white', backgroundColor: '#238636', display: 'flex', justifyContent: 'center', borderRadius: '3px' }} >
                                    Continue
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section-2'>
                    <p>Don't have an account ?</p>
                    <Link to={'/Signup'}>
                        <button>Sign up</button>
                    </Link>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ color: 'white', border: '0px' }}>
                    <Modal.Title>Error Message</Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body style={{ color: 'white', border: '0px' }}>{errorMessage}</Modal.Body>
                <Modal.Footer style={{ color: 'white', border: '0px' }}></Modal.Footer>
            </Modal>
        </div>
    )
}


export default LoginEmail