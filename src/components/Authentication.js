import React from 'react';
import { Button, Form,  Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userId: "",
      password: "",
      userName:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }

  handleLogin(e) {
      let id = this.state.userId;
      let pw = this.state.password;


      this.props.onLogin(id, pw, e.target.name).then(
          (success) => {
              this.toggle();
              if(!success) {
                  this.setState({
                      password: ''
                  });
              }
          }
      );
  }

  handleSignup() {
      let id = this.state.userId;
      let pw = this.state.password;
      let name = this.state.userName;

      this.props.onSignup(id, pw, name).then(
          (success) => {
              this.toggle();
              if(!success) {
                  this.setState({
                      password: ''
                  });
              }
          }
      );
  }



  toggle(mode) {

    if (mode){
      this.setState({
        modal: true,
        mode
      });
    } else{
      this.setState({
        modal: !this.state.modal
      });
    }

  }


  render(){
    if(this.state.mode === "login"){
      return (
          <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>로그인</ModalHeader>
            <Form className="text-center form-auth">
              <ModalBody>
                <Input value={this.state.userId} onChange={this.handleChange} type="text" name="userId" id="inputId" placeholder="아이디" />
                <Input value={this.state.password} onChange={this.handleChange} type="password" name="password" id="inputPassword" placeholder="비밀번호" />
              </ModalBody>
              <ModalFooter>
                <h6>계정이 없으신가요? <a onClick={()=>this.toggle("signup")}> 회원가입 </a> </h6>
                <div className="button-group">
                  <Button name="local" color="primary" onClick={this.handleLogin}>완료</Button>
                  <Button color="secondary" onClick={this.toggle}>취소</Button>
                </div>

            <button type="button"onClick={()=>window.location.href='http://localhost:3000/api/account/login/facebook'} name="facebook"  className="loginBtn loginBtn--facebook">
                  페이스북으로 로그인
                </button>
                <button name="google" onClick={this.handleLogin} className="loginBtn loginBtn--google">
                  구글로 로그인
                </button>
              </ModalFooter>
            </Form>
          </Modal>
      )
    } else if(this.state.mode === "signup"){
      return (
        <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>회원가입</ModalHeader>
          <Form className="text-center form-auth">
            <ModalBody>
              <Input value={this.state.userId} onChange={this.handleChange} type="text" name="userId" id="inputId" placeholder="아이디" />
              <Input value={this.state.userName} onChange={this.handleChange} type="text" name="userName" id="inputName" placeholder="닉네임" />
              <Input value={this.state.password} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="password" name="password" id="inputPassword" placeholder="비밀번호" />
            </ModalBody>
            <ModalFooter>
              <h6>계정이 이미 있으신가요? <a onClick={()=>this.toggle("signup")}> 로그인 </a> </h6>
              <div className="button-group">
                <Button color="primary" onClick={this.handleSignup}>완료</Button>
                <Button color="secondary" onClick={this.toggle}>취소</Button>
              </div>

        <button  type="button" onClick={()=>window.location.href='http://localhost:3000/api/account/login/facebook'} name="facebook"  className="loginBtn loginBtn--facebook">
                페이스북으로 로그인
              </button>
              <button name="google" onClick={this.handleLogin} className="loginBtn loginBtn--google">
                구글로 로그인
              </button>
            </ModalFooter>
          </Form>
        </Modal>
      )
    } else {
      return null;
    }
  }

}

export default Authentication;
