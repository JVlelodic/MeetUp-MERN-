import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Header extends Component {

	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand><h3>MeetUp |</h3></Navbar.Brand>
				<Nav className="mr-auto p-3">
					<Link to="/" style={{ textDecoration: 'none' }}>
						<li className="nav-link">Home</li>
					</Link>
					<Link to="/timetable" style={{ textDecoration: 'none' }}>
						<li className="nav-link">Timetable</li>
					</Link>
					<Link to="/tasks" style={{ textDecoration: 'none' }}>
						<li className="nav-link">Taskboard</li>
					</Link>
					<Link to="/contactus" style={{ textDecoration: 'none' }}>
						<li className="nav-link">Contact Us</li>
					</Link>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;