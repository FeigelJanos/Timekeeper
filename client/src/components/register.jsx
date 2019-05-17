import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Register extends Component {
    

    render() { 
        return ( 
            <React.Fragment>
                <h1 className="reg-h1"> Welcome Guest!</h1>
                <h2 className="reg-h2">Please fill out this short registration form:</h2>
            <Form className="RegForm">
                 <FormGroup className="form-1">
                    <Label for="name" sm={2}>Username:</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="name" placeholder="Your username" style={{maxWidth: "500px"} }/>
                    </Col>
                </FormGroup>
                <FormGroup className="form-3">
                    <Label for="password" sm={2}>Password:</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="password" placeholder="Your password" style={{maxWidth: "500px", marginBottom: "1em"}}/>
                    </Col>
                    <Label for="c-password" sm={2}>Confirm password:</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="c-password" placeholder="Your password again" style={{maxWidth: "500px"}}/>
                    </Col>
                </FormGroup>
                <FormGroup className="form-2">
                <Label for="email" sm={2}>Email:</Label>
                    <Col sm={10}>
                        <Input type="email" name="email" id="email" placeholder="Your email" style={{maxWidth: "500px"}}/>
                    </Col>
                </FormGroup>
                <Button color="primary"  className="form-5">Register</Button>
                <Button color="secondary"  className="form-4" onClick={this.props.toLogin}>Login</Button>
            </Form> 
            </React.Fragment>
        );
    }
}
 
export default Register;