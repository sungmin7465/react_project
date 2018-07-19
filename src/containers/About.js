import React from 'react'
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';


const About = () =>
    <div className="About">
      <div>
        <h3 className="text-center">
          <b>개발자 윤성민에 대해 소개하는 사이트입니다.</b>
        </h3>
        <ListGroup className="mt-5">
          <ListGroupItem>
            <Container>
                <Row>
                  <Col sm={{ size: 'auto', offset: 4 }}>
                    <h3>
                        <b>사이트의 기능</b>
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ul type="disc" className="description">
                      <li><b>회원가입 및 로그인 기능이 있습니다.</b></li>
                      <li><b>페이스북으로도 로그인 가능합니다.</b></li>
                      <li><b>비밀번호는 암호화 되어 안전하게 저장됩니다.</b></li>
                    </ul>
                  </Col>
                  <Col>
                    <img src={require("../asset/img/login.PNG")} alt="login picture" width="100%"/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <img src={require("../asset/img/crud.PNG")} alt="login picture" width="100%"/>
                  </Col>
                  <Col>
                    <ul type="disc" className="description">
                      <li><b>기본 게시판 기능이 있습니다. (CRUD)</b></li>
                      <li><b>작성자, 제목, 내용으로 게시글 검색 가능합니다.</b></li>
                      <li><b>페이지 네이게이션 기능이 있습니다.</b></li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ul type="disc" className="description">
                      <li><b>Profile 메뉴에서는 저를 소개합니다.</b></li>
                      <li><b>포트폴리오와 간단한 이력이 있습니다.</b></li>
                    </ul>
                  </Col>
                  <Col>
                    <img src={require("../asset/img/profile.PNG")} alt="login picture" width="100%"/>
                  </Col>
                </Row>
            </Container>
          </ListGroupItem>
          <ListGroupItem>
            <Container>
                <Row>
                  <Col sm={{ size: 'auto', offset: 4 }}>
                    <h3>
                        <b>사이트의 구조</b>
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <img src={require("../asset/img/architecture.PNG")} alt="login picture" width="100%"/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5 className="text-center">
                      <b>Production 모드</b>
                    </h5>
                    <p>
                      Production 모드에서는 db server와 api server는 저희 집 데스크탑이 담당합니다.집의 공유기의
                      포트포워딩을 설정하여 외부와 통신이 가능합니다. static server는 무료로 이용가능한 서비스인 surge.sh를 통해 deploy하였습니다.
                    </p>
                  </Col>
                  <Col>
                    <h5 className="text-center">
                      <b>Development 모드</b>
                    </h5>
                    <p>
                      Development 모드에서는 db server, api server, static server 모두 집의 데스크탑이 담당합니다. 단 빠른 개발을 위해
                      static server는 webpack-dev-server를 이용하였습니다. 이 개발서버는 webpack의 결과물인 bundle.js을 디스크가 아니라 메모리에 저장하여
                      빠르게 그 결과물을 제공하고 또한 static server로서 public resource들을 제공합니다.
                    </p>
                  </Col>
                </Row>
            </Container>
          </ListGroupItem>
          <ListGroupItem>
            <Container>
                <Row>
                  <Col sm={{ size: 'auto', offset: 4 }}>
                    <h3>
                        <b>웹 앱의 구조 및 구현</b>
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5 className="text-center">
                      <b></b>
                    </h5>
                    <p>
                      이 웹 앱은 css, media(그림 파일), js, html 파일들로 구성됩니다. 구체적으로는 index.html 파일에서 다른 모든 리소스 파일들을 참조하여 온전한 하나의 웹 앱을 이룹니다.
                      이 앱의 특징 및 사용된 기술은 다음과 같습니다.
                    </p>
                    <ul type="disc" className="description">
                      <li>SPA(Single Page Applicaion)입니다. react-router를 이용하여 경로에 따라 컴포넌트들을 나타냅니다. </li>
                      <li>React를 사용하여 재활용성, 성능의 이점을 갖습니다.</li>
                      <li>Redux를 사용하여 웹 앱의 상태관리를 합니다.</li>
                      <li>Reactstrap을 사용하여 Jquery나 Bootstrap의 자바스크립트 라이브러리에 의존하지 않습니다.</li>
                    </ul>
                  </Col>
                  <Col>
                    <Row>
                      <Col sm={{ size: 'auto', offset: 4 }}>
                        <img src={require("../asset/img/SPA.PNG")} alt="login picture" width="50%"/>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                          <img src={require("../asset/img/react.svg")} alt="login picture" width="100%"/>
                      </Col>
                      <Col>
                          <img src={require("../asset/img/redux.svg")} alt="login picture" width="100%"/>
                      </Col>
                      <Col>
                          <img src={require("../asset/img/bootstrap.svg")} alt="login picture" width="100%"/>
                      </Col>
                    </Row>
                  </Col>
                </Row>
            </Container>
          </ListGroupItem>
          <ListGroupItem>
            <h3 className="text-center">
                <b>계획</b>
            </h3>
            <p>
              집에서 혼자 개발하다보니 의욕이 많이 떨어져서 모듈화나 네이밍 등 여러 부분에서 코드가 많이 지져분해졌고,
              코드의 중복이 많아졌습니다. 또한 웹 앱의 상태 구조도 약간 틀어졌습니다. 소스코드를 후에 다시 손볼 필요가 있고,
              현재 웹앱의 성능 최적화에 대해서 이뤄진것이 없습니다. React의 Component LifeCycle API를 통해 많은 성능 최적화를 이룰 수 있을 것으로 보입니다.
              또한 Codesplitting 등 여러 방법을 통해 성능 개선의 여지가 있고, 백엔드 쪽도 마찬가지로 성능 최적화가 필요합니다.
            </p>
          </ListGroupItem>
        </ListGroup>
    </div>
    </div>


export default About;
