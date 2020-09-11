import React, { Component } from "react";
import Logo from "../../assets/images/logo.svg";
import { headerLinks } from "../Common/constants";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
import { NavLink } from "react-router-dom";

class Header extends Component {
	render(){
		return (
			<Navbar expand="lg">
			  <Navbar.Brand href="#home"><img src={Logo} /> </Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      {headerLinks.map(linkElement => {
			      	return <Nav.Link key={linkElement.slug} href={linkElement.link}>{linkElement.label}</Nav.Link>
			      })}
			    </Nav>
			    <Form inline>
			      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
			      <Button variant="success">Search</Button>
			    </Form>
			  </Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Header;