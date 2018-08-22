import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Jokes Challenge</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>

              <LinkContainer to={'/home'}>
                  <NavItem>
                      <Glyphicon glyph='home' /> Home
                  </NavItem>
              </LinkContainer>

              <LinkContainer to={'/random'}>
                  <NavItem>
                      <Glyphicon glyph='th-list' /> Random Joke
                  </NavItem>
              </LinkContainer>

              <LinkContainer to={'/search'}>
                  <NavItem>
                      <Glyphicon glyph='th-list' /> Search Jokes
                  </NavItem>
              </LinkContainer>
              
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
