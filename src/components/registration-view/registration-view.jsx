import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
//import { Form } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { render } from 'react-dom';
import { LoginView } from '../login-view/login-view';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegister(username);
    }


    return (
        <Row className="justify-content-md-center">
            <Col md={8}>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBirthdate">
                        <Form.Label>Birthdate:</Form.Label>
                        <Form.Control type="date" placeholder="00/00/0000" value={birthdate} onChange={e => setBirthdate(e.target.value)} required />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    {' '}
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Form>
            </Col>
        </Row>
    )
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};