import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class Header extends Component {
  
  render() {
    return(
      <Navbar bg = "dark" variant = "dark"> 
          <Navbar.Brand><h3>MeetUp |</h3></Navbar.Brand>
          <Nav className = "mr-auto p-3">
            <Link to = "/">
              <Nav.Link href =  "/">Home</Nav.Link>
            </Link>
            <Link to = "/timetable">
              <Nav.Link href =  "/">Timetable</Nav.Link>
            </Link>
            <Link to = "/taskboard">
              <Nav.Link href =  "/">TaskBoard</Nav.Link>
            </Link>
            <Link to = "/contactus">
              <Nav.Link href =  "/">Contact Us</Nav.Link>
            </Link>
          </Nav>
      </Navbar>
    );
  }
}

export default Header;