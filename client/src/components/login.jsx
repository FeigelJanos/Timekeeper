import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const userRegex = RegExp(
    /^[a-zA-Z0-9._-]{3,}$/
);

class Login extends Component {
    constructor(props) {
        super(props);
      
      this.state = {
       username: '',
       password: '',
       error: '',
      }
    }


    componentWillUpdate(nextProps, nextState){
        if(nextProps.logError!==''&&this.props.logError===''){
            this.checkForBackendErrors();
        }   
    };

    handleChange = e =>{
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });

        this.setState({ error: false });
    };

    handleSubmit = e =>{
        e.preventDefault();
        if (this.checkForFrontendErrors()){
            console.log("Login started")
            this.props.login(this.state.username, this.state.password) 
        }
    };

    checkForFrontendErrors = () =>{
        let s = { ...this.state};

        if(userRegex.test(s.username) && s.password.length >= 8 ){
            console.log("No frontend error!");
            this.setState({ error: "" })
            return true;
        }
        
        else{
            console.log("Frontend error!");
            this.setState({ error: "Wrong username or password" });
            return false;
        }
    };

    checkForBackendErrors = () =>{
        this.setState({ error: "Wrong username or password" });
    };

    render() {

        return ( 
            <React.Fragment>
            <h1 className="log-h1">Welcome, please Log in or Register!</h1>
            <span className=" error middle">{this.state.error}</span>
            <Form className="LogForm">
                <FormGroup row >
                    <Label for="username" sm={2}>Username:</Label>
                    <Col sm={10}>
                        <Input  type="text" 
                                name="username" 
                                id="username" 
                                noValidate
                                placeholder="Your username" 
                                style={{maxWidth: "500px"}} 
                                onChange={this.handleChange}
                                className={this.state.error ?'error-input': null}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label for="password" sm={2}>Password:</Label>
                    <Col sm={10}>
                        <Input  type="password" 
                                name="password" 
                                id="password" 
                                noValidate
                                placeholder="Your password" 
                                style={{maxWidth: "500px"}} 
                                onChange={this.handleChange}
                                className={this.state.error ?'error-input': null}
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