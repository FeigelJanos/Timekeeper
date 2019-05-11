import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    
    render() { 
        return ( 
            <React.Fragment>
            <h1 className="log-h1">Welcome, please Log in or Register!</h1>
            <Form className="LogForm">
                 <FormGroup row >
                    <Label for="name" sm={2}>Username:</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="name" placeholder="Your username" style={{maxWidth: "500px"}}/>
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label for="password" sm={2}>Password:</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="password" placeholder="Your password" style={{maxWidth: "500px"}}/>
                    </Col>
                </FormGroup>
                <div className="login-b">
                    <Button color="primary" style={{margin: "1em"}} >Log in</Button>
                    <Button color="secondary" style={{marginTop: "1em", marginBottom: "1em", marginLeft: "1em"}} >Register</Button>
                </div>
            </Form> 
            </React.Fragment>
        );
    }
}
 
export default Login;