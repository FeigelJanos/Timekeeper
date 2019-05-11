import React from 'react';
import {
    Container,
    Navbar,
    NavbarBrand,
} from 'reactstrap';

const BottomBar = () => {
    return ( 
        <React.Fragment>
            <Container fluid className="centered" >
            <Navbar dark color="dark">
            <div className="bottomnav">
                <p style={{color: "grey"}} className="item-1">Made by János Feigel </p>
                <p  style={{color: "grey"}} className="item-2">2019</p>
                <NavbarBrand href="https://github.com/FeigelJanos/Timekeeper" target="blank" className="item-3">GitHub</NavbarBrand>
            </div> 
            </Navbar>
            </Container>
        </React.Fragment> 
     );
}
 
export default BottomBar;