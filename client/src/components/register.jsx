import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Register extends Component {
    
    constructor(props) {
        super(props);
      
      this.state = {
       username: '',
       password: '',
       passwordAgain: '',
       email: '',
       formErrors: {
        username: '',
        password: '',
        passwordAgain: '',
        email: '',
       }
      }
    }

    handleSubmit = e =>{
        e.preventDefault();
    };

    render() { 
        return ( 
            <React.Fragment>
                <h1 className="reg-h1"> Welcome Guest!</h1>
                <h2 className="reg-h2">Please fill out this short registration form:</h2>
            <Form className="RegForm" onSubmit={this.handleSubmit} noValidate>
                 <FormGroup className="form-1">
                    <Label htmlFor="name" sm={2}>Username:</Label>
                    <Col sm={10}>
                        <Input type="text" 
                                name="name" 
                                id="name" 
                                placeholder="Your username" 
                                style={{maxWidth: "500px"} }
                                noValidate
                                onChange={this.handleChange}
                                className={this.state.formErrors.username===''?'Error':null}
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="form-3">
                    <Label htmlFor="password" sm={2}>Password:</Label>
                    <Col sm={10}>
                        <Input type="password" 
                               name="password" 
                               id="password" 
                               placeholder="Your password" 
                               style={{maxWidth: "500px", marginBottom: "1em"}}
                               noValidate
                               onChange={this.handleChange}
                               className={this.state.formErrors.password===''?'Error':null}
                        />
                    </Col>
                    <Label htmlFor="c-password" sm={2}>Confirm password:</Label>
                    <Col sm={10}>
                        <Input type="password" 
                               name="password" 
                               id="c-password" 
                               placeholder="Your password again" 
                               style={{maxWidth: "500px"}}
                               noValidate
                               onChange={this.handleChange}
                               className={this.state.formErrors.passwordAgain===''?'Error':null}
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="form-2">
                    <Label htmlFor="email" sm={2}>Email:</Label>
                    <Col sm={10}>
                        <Input type="email" 
                               name="email" 
                               id="email" 
                               placeholder="Your email" 
                               style={{maxWidth: "500px"}}
                               noValidate
                               onChange={this.handleChange}
                               className={this.state.formErrors.email===''?'Error':null}
                        />
                    </Col>
                </FormGroup>
                <div className="form-5">
                     <Button color="primary"   type="submit" onClick={this.handleSubmit}>Register</Button>
                     <Button color="secondary"  onClick={this.props.toLogin}>Login</Button>
                </div>
               
            </Form> 
            </React.Fragment>
        );
    }
}
 
export default Register;