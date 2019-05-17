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
            <Navbar dark color="dark">
            {this.props.aut? <div>
                                <button onClick={this.props.logout}>Logout</button>
                                <button>Statistics</button>
                            </div>:<NavbarBrand href='/'>Time Keeper</NavbarBrand>}

               
            </Navbar>
            </Container>
        </React.Fragment> 
    );
    }
}
 
export default TopBar;