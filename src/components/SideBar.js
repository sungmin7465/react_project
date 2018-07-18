import React from 'react';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { IoArrowDownB,IoArrowUpB } from 'react-icons/lib/io';
import {FileText, User} from 'react-feather';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);



    this.toggle= this.toggle.bind(this);
    this.state = {
      collapsed: true
    };
  }


  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }


  render() {
    const { collapsed } = this.state;

    return (

            <Nav vertical className="col-md-2 d-none d-md-block bg-light sidebar" >
              <div className="sidebar-sticky">
                <NavItem>
                  <NavLink href="/about" active={window.location.pathname === '/about'}><FileText size ={18}/>About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/profile" active={window.location.pathname === '/profile'}><User size ={18}/>Profile</NavLink>
                </NavItem>
                <NavItem onClick={this.toggle}>
                  <NavLink>CSE {!collapsed ? <IoArrowUpB/> : <IoArrowDownB/> }  </NavLink>
                  <Collapse isOpen={!collapsed}>
                    <SubSideBar/>
                  </Collapse>
                </NavItem>
                <NavItem>
                  <NavLink href="/etc" active={window.location.pathname === '/etc'}><FileText size ={18}/>ETC</NavLink>
                </NavItem>
              </div>
            </Nav>
    );
  }
}

class SubSideBar extends React.Component {

  render () {
    return (
      <nav>
          <Nav vertical tabs>
            <NavItem>
              <NavLink href="/html" active={window.location.pathname === '/html'} ><FileText size ={18}/>HTML</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/css" active={window.location.pathname === '/css'} ><FileText size ={18}/>CSS</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="/javascript" active={window.location.pathname === '/javascript'} ><FileText size ={18}/>JavaScript</NavLink>
            </NavItem>
          </Nav>
      </nav>
    );
  }
}
