import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import {Home, Profile, Portfolio, ETC, HTML, CSS, Javascript, Whoops404} from './';
import PropTypes from 'prop-types';
import {Header, SideBar} from '../components';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ButterToast, { CinnamonSugar } from 'butter-toast';
import { leaveRequest, getStatusRequest, logoutRequest, loginRequest, signupRequest } from '../actions/authentication';


class App extends React.Component {

    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleSignup = this.handleSignup.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleLeave = this.handleLeave.bind(this);
    }

    componentDidMount() {
      this.props.getStatusRequest();
    }

    handleSignup(id,pw,name){
      return this.props.signupRequest(id, pw, name).then(
          () => {


              if(this.props.signupState.status === "SUCCESS") {

                const toast = CinnamonSugar.fresh({
                    theme: 'dark',
                    title:"성공",
                    message: '회원가입 성공!!',
                    toastTimeout: 3000
                });

                ButterToast.raise(toast)
                  return true;
              } else {
                    if(this.props.signupState.error === 1){
                      const toast = CinnamonSugar.fresh({
                          theme: 'dark',
                          title:"오류",
                          message: '아이디가 좋지 않습니다!!',
                          toastTimeout: 3000
                      });

                      ButterToast.raise(toast)
                        return false;
                    } else if(this.props.signupState.error === 2){
                      const toast = CinnamonSugar.fresh({
                          theme: 'dark',
                          title:"오류",
                          message: '비밀번호는 4자리 이상이어야합니다 !!',
                          toastTimeout: 3000
                      });

                      ButterToast.raise(toast)
                        return false;
                    } else if(this.props.signupState.error === 3){
                      const toast = CinnamonSugar.fresh({
                          theme: 'dark',
                          title:"오류",
                          message: '아이디가 이미 존재합니다. !!',
                          toastTimeout: 3000
                      });

                      ButterToast.raise(toast)
                        return false;
                    } else if(this.props.signupState.error === 6){
                      const toast = CinnamonSugar.fresh({
                          theme: 'dark',
                          title:"오류",
                          message: '닉네임은 두글자 이상이어야 합니다!!',
                          toastTimeout: 3000
                      });

                      ButterToast.raise(toast)
                        return false;
                    } else {
                      const toast = CinnamonSugar.fresh({
                          theme: 'dark',
                          title:"오류",
                          message: '데이터베이스 서버 오류입니다!!',
                          toastTimeout: 3000
                      });

                      ButterToast.raise(toast)
                        return false;
                    }

              }
          }
      );
    }

    handleLogout(){
      this.props.logoutRequest().then(
        () => {
          const toast = CinnamonSugar.fresh({
              theme: 'dark',
              title:"성공",
              message: '로그아웃 성공!!',
              toastTimeout: 3000 // normal butter-toast option
          });

          ButterToast.raise(toast);
          this.props.history.push("/");
        });
    }

    handleLeave(id){
      this.props.leaveRequest(id).then(
        () => {

          if(this.props.leaveState.error !== -1){
            const toast = CinnamonSugar.fresh({
                theme: 'dark',
                title:"오류",
                message: '회원탈퇴 실패!!',
                toastTimeout: 3000 // normal butter-toast option
            });

            return ButterToast.raise(toast);
          }

          const toast = CinnamonSugar.fresh({
              theme: 'dark',
              title:"성공",
              message: '회원탈퇴 성공!!',
              toastTimeout: 3000 // normal butter-toast option
          });

          this.props.history.push("/");
          ButterToast.raise(toast);

        });
    }

    handleLogin(id, pw, type) {

        return this.props.loginRequest(id, pw, type).then(
            () => {


                if(this.props.loginState.status === "SUCCESS") {

                  const toast = CinnamonSugar.fresh({
                      theme: 'dark',
                      title:"성공",
                      message: '로그인 성공!!',
                      toastTimeout: 3000 // normal butter-toast option
                  });

                  ButterToast.raise(toast)
                  return true;
                } else if(this.props.loginState.error === 4) {
                    const toast = CinnamonSugar.fresh({
                        theme: 'dark',
                        title:"오류",
                        message: '아이디 또는 비밀번호가 틀렸습니다!!',
                        toastTimeout: 3000 // normal butter-toast option
                    });
                    ButterToast.raise(toast)
                    return false;
                }

                else {
                  const toast = CinnamonSugar.fresh({
                      theme: 'dark',
                      title:"오류",
                      message: '데이터베이스 서버 오류입니다!!',
                      toastTimeout: 3000 // normal butter-toast option
                  });
                  ButterToast.raise(toast)
                    return false;
                }
            }
        );
    }

    render(){

      return (
        <div className="wrapper">
          <ButterToast trayPosition="bottom-right"/>
          <Header onLeave={this.handleLeave} status={this.props.status} onSignup={this.handleSignup} onLogout={this.handleLogout} isLoggedIn={this.props.status.isLoggedIn} onLogin={this.handleLogin} />
          <Container className="content-main">
            <Row>
              <SideBar/>
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Redirect from="/home" to="/"/>
                  <Route path="/profile" component={Profile} />
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/etc/:id" component={ETC} />
                  <Route path="/etc/" component={ETC} />
                  <Route path="/html" component={HTML} />
                  <Route path="/css" component={CSS} />
                  <Route path="/javascript" component={Javascript} />
                  <Route component={Whoops404} />
                </Switch>
              </main>
            </Row>
          </Container>
        </div>


      );
    }
}

App.PropTypes = {
    status: PropTypes.object
};

App.defaultProps = {
    status: {
      isLoggedIn: false,
      currentUser: null
    }
};

const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.login,
        signupState: state.authentication.signup,
        status: state.authentication.user,
        leaveState: state.authentication.leave
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
        leaveRequest: (id) => {
            return dispatch(leaveRequest(id));
        },
        loginRequest: (id, pw, type) => {
            return dispatch(loginRequest(id,pw, type));
        },
        signupRequest: (id, pw, name) => {
            return dispatch(signupRequest(id,pw,name));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
