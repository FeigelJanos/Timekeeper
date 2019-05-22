import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
const userRegex = RegExp(
                            /^[a-zA-Z0-9._-]{3,}$/
);

class Register extends Component {
    
    constructor(props) {
        super(props);
      
      this.state = {
       name: '',
       password: '',
       passwordAgain: '',
       email: '',
       formErrors: {
       name: '',
       password: '',
       passwordAgain: '',
       email: '',
       }
      }
    }

    handleSubmit = e =>{
        e.preventDefault();
        if(this.validateForm()){
            this.props.register(this.state.name, this.state.password, this.state.email);
        }
        
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "name":
            formErrors.name = userRegex.test(value)
            ? ""
            : "username must be longer than 3 letters and can only contain .-_ as special characters";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 8 ? "Minimum 8 characaters required for the password" : "";
            break;
          case "passwordAgain":
            formErrors.passwordAgain=  
             value !== this.state.password ? "The passwords do not match" : "";
              break;  
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
    };

    validateForm = ()=>{
        let s = { ...this.state };
        let checker = 0;

        s.formErrors.password === ''? checker +=0 : checker += 1;
        s.formErrors.name === ''? checker +=0 : checker += 1;
        s.formErrors.passwordAgain === ''? checker +=0 : checker += 1;
        s.formErrors.email === ''? checker +=0 : checker += 1;
        s.password === ''? checker += 1 : checker += 0;
        s.passwordAgain === ''? checker += 1 : checker += 0;
        s.name === ''? checker += 1 : checker += 0;
        s.email === ''? checker += 1 : checker += 0;

        if (checker>0){
            return false;
        }

        return true;
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
                                className={this.state.formErrors.name === ''? null:'error-input'}
                        />
                        <span className="error">
                            {this.state.formErrors.name}
                        </span>
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
                               className={this.state.formErrors.password===''? null:'error-input'}
                        />
                        <span className="error">
                            {this.state.formErrors.password}
                        </span>
                    </Col>
                    <Label htmlFor="c-password" sm={2}>Confirm password:</Label>
                    <Col sm={10}>
                        <Input type="password" 
                               name="passwordAgain" 
                               id="c-password" 
                               placeholder="Your password again" 
                               style={{maxWidth: "500px"}}
                               noValidate
                               onChange={this.handleChange}
                               className={this.state.formErrors.passwordAgain===''? null:'error-input'}
                        />
                        <span className="error">
                            {this.state.formErrors.passwordAgain}
                        </span>
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
                               className={this.state.formErrors.email===''? null:'error-input'}
                        />
                        <span className="error">
                            {this.state.formErrors.email}
                        </span>
                    </Col>
                </FormGroup>
                <div className="form-5">
                     <Button color="primary"   type="submit" >Register</Button>
                     <Button color="secondary"  onClick={this.props.toLogin}>Login</Button>
                </div>
               
            </Form> 
            </React.Fragment>
        );
    }
}
 
export default Register;