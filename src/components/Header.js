import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
         UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Home } from 'react-feather';
import {Authentication} from './';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.navToggle = this.navToggle.bind(this);
    this.openPopUp = this.openPopUp.bind(this);
    this.modalAuth = React.createRef();
    this.state = {
      isOpen: false
    };
  }


  navToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openPopUp(mode) {
    this.modalAuth.current.toggle(mode);
  }

  render() {

    return (
      <div>
        <Authentication onSignup={this.props.onSignup} onLogin={this.props.onLogin} ref={this.modalAuth}/>
          <Navbar color="dark" dark expand="md" fixed="top" role="navigation" className="flex-md-nowrap p-0 shadow">
            <NavbarBrand href="/" className="col-sm-3 col-md-2 mr-0"><Home size={20}/>{'\u00A0\u00A0'}Seongmin's site</NavbarBrand>
            <NavbarToggler onClick={this.navToggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink onClick={()=>this.openPopUp("signup")}>Sign up</NavLink>
                </NavItem>
                  { this.props.isLoggedIn ?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        {this.props.status.currentUser}님
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem  onClick={()=>this.props.onLeave(this.props.status.currentUserId)}>
                          회원탈퇴
                        </DropdownItem>
                        <DropdownItem onClick={this.props.onLogout}>
                          로그아웃
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown> :
                  <NavItem><NavLink onClick={()=>this.openPopUp("login")}>Login</NavLink></NavItem>
                  }
              </Nav>
            </Collapse>
          </Navbar>
      </div>


    );
  }
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;
