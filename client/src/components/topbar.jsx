import React, { Component } from 'react';
import {
    Container,
    Navbar,
    NavbarBrand
} from 'reactstrap';

class TopBar extends Component {
    render() {   
    return ( 
        <React.Fragment>
            <Container fluid className="centered">
            <Navbar dark color="dark" className="top-bar">
            {this.props.aut? <div className="nav-div">
                                <button onClick={this.props.logout} className="nav-button">Logout</button>
                            </div>:<NavbarBrand href='/' >Time Keeper</NavbarBrand>}

               
            </Navbar>
            </Container>
        </React.Fragment> 
    );
    }
}
 
export default TopBar;