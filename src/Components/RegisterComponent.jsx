import { Button, Col, Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';


function RegisterComp(){  
    
    const [fields, setFields] = useState([]);

    const [register, setRegister] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        VAT: "",
        address: "",
        field: ""
        })

    useEffect(() => {
        console.log(register)
    }, [register])

    const handleChange = (e) => {
        if(e.target.type === "radio" && e.target.checked){
            setRegister(prevState => ({
                ...prevState,
                role: e.target.value
            }))
        }

        setRegister(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_BE_URL + "/auth/register", {
            method: "POST",
            body: JSON.stringify(register),
            headers: { "Content-type": "application/json" },
        })
        .then(res => {
            if(res.ok){
                return res.json
            } else {
                throw new Error('errore', e)
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(e => {
            console.log('errore nella registrazione', e)
        })
    }

    useEffect (() => {
        fetch(process.env.REACT_APP_BE_URL + "/field", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
        .then(res => {
            if(res.ok){
                return res.json 
            } else {
                throw new Error('errore nel recupero fields')
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(e => {
            console.log("errore caricamneto field", e)
        })
    }, [])





    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                    {['radio'].map((radio) => (
                        <div key={`inline-${radio}`} className="mb-3 d-flex justify-content-around mt-5">
                        <Form.Check
                            inline
                            label="Exhibitor"
                            name="role"
                            value={"Exhibitor"}
                            type={radio}
                            id={`inline-${radio}-1`}
                            className='text-white'
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Client"
                            name="role"
                            value={"Client"}
                            type={radio}
                            id={`inline-${radio}-2`}
                            className='text-white'
                            onChange={handleChange}
                        />
                        </div>
                    ))}
                        <Row className="mb-3">
                            <Col>
                            <FormGroup>
                                <FormLabel className='text-white'>Name</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='name'
                                placeholder="Name" 
                                value={register.name} 
                                onChange={handleChange}
                                />                
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <FormLabel className='text-white'>Surname</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='surname'
                                placeholder="Surname" 
                                value={register.surname} 
                                onChange={handleChange}/>                
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Phone number</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='phone'
                                placeholder="Phone number" 
                                value={register.phone} 
                                onChange={handleChange}/>                
                            </FormGroup>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3 text-white" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email"
                                name='email'
                                placeholder="Enter email" 
                                value={register.email} 
                                onChange={handleChange}/>
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center'>
                            <Col className='col-6'>
                            <Form.Group className="mb-3 text-white" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                name='password'
                                placeholder="Password" 
                                value={register.password} 
                                onChange={handleChange}/>
                            </Form.Group>
                            </Col>
                        </Row>

                        {/* seconda parte del form riservata allo user con ruolo "exhibitor" */}

                        {register.role === "Exhibitor" && (
                            <>
                            
                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='companyName'
                                placeholder="Name" 
                                value={register.companyName} 
                                onChange={handleChange}/>                
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <FormLabel>VAT</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='VAT'
                                placeholder="VAT" 
                                value={register.VAT} 
                                onChange={handleChange}/>                
                            </FormGroup> 
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Phone number</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='companyPhone'
                                placeholder="Phone number" 
                                value={register.companyPhone} 
                                onChange={handleChange}/>                
                            </FormGroup>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3 text-white" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={register.companyEmail} onChange={handleChange}/>
                            </Form.Group>   
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Complete address</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='address'
                                placeholder="Street, street number, city, region, state" 
                                value={register.address} 
                                onChange={handleChange}/>                
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center'>
                            <Col className='col-4 my-3'>
                                <Form.Select 
                                aria-label="Default select example"
                                name='field'
                                value={register.field}
                                onChange={handleChange}>
                                    <option>Choose a field</option>
                                    {fields.map(field => (
                                    <option key={field.id} value={field.id}>{field.description}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                            </>
                        )}

                        <Row className='d-flex justify-content-center my-3'>
                            <Col className='col-4 d-flex justify-content-center'>
                                <Button variant="primary" type="submit">
                                        Register
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterComp