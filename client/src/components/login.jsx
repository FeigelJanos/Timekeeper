import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
      
      this.state = {
       username: '',
       password: '',
       error: ''
      }
    }

    handleName = e =>{

        this.setState({username: e.target.value})
      
    };

    handlePass = e => {

        this.setState({password: e.target.value})
      
    };

    handleSubmit = e =>{
        e.preventDefault();
    };

    render() { 
        return ( 
            <React.Fragment>
            <h1 className="log-h1">Welcome, please Log in or Register!</h1>
            <Form className="LogForm">
                <span className="errorMessage">{this.state.error}</span>
                 <FormGroup row >
                    <Label for="name" sm={2}>Username:</Label>
                    <Col sm={10}>
                        <Input  type="text" 
                                name="name" 
                                id="name" 
                                placeholder="Your username" 
                                style={{maxWidth: "500px"}} 
                                value={this.state.username} 
                                onChange={this.handleName.bind(this)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label for="password" sm={2}>Password:</Label>
                    <Col sm={10}>
                        <Input  type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Your password" 
                                style={{maxWidth: "500px"}} 
                                value={this.state.password} 
                                onChange={this.handlePass}
                        />
                    </Col>
                </FormGroup>
                <div className="login-b">

                    <Button color="primary" 
                            style={{margin: "1em"}} 
                            type="submit"
                            onClick={this.handleSubmit}>
                    Log in</Button>

                    <Button color="secondary" 
                            style={{marginTop: "1em", marginBottom: "1em", marginLeft: "1em"}} 
                            onClick={this.props.toRegister} >
                    Register</Button>
                
                </div>
            </Form> 
            </React.Fragment>
        );
    }
}
 
export default Login;