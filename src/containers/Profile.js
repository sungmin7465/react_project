import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Slide } from '../components';

const Profile = () =>{
    return (
      <div className="Profile">
          <div>
            <Slide/>
          </div>
          <div>
            <ListGroup className="mt-5">
              <ListGroupItem>
                    <img className="photo-id"src={require("../asset/img/photo_id.jpg")} alt="Photo identification" width="80px"/>
                      <h3 className="text-center">
                        <b>윤성민 <small>소프트웨어 개발자</small></b>
                      </h3>
                      <ul type="none" className="mb-5">
                        <li><b>생년월일</b> &emsp;1992. 10. 24</li>
                        <li><b>주소</b>    &emsp;&emsp;경기도 양주시 백석읍</li>
                        <li><b>연락처</b>  &emsp;010-3668-7465</li>
                        <li><b>이메일</b>  &emsp;sungmin7465@gmail.com</li>
                      </ul>
              </ListGroupItem>
              <ListGroupItem>
                <h5>
                  학력 사항
                </h5>
                  <ul type="disc">
                    <li>2008. 03 – 2011. 02&emsp;양주백석고등학교 졸업</li>
                    <li>2012. 03 – 2016. 02&emsp;한성대학교 컴퓨터공학과 학사 졸업</li>
                    <li>2016. 03 – 2018. 02&emsp;국민대학교 대학원 컴퓨터공학부 석사 졸업 예정</li>
                  </ul>
              </ListGroupItem>
              <ListGroupItem>
                <h5>
                  프로젝트
                </h5>
                <ul type="disc">
                  <li>2014. 07 – 2014. 10&emsp;C코딩연습프로그램 (한성공학경진대회) 팀원</li>
                  <li>2015. 04 – 2015. 09&emsp;영상인식키보드 (한성공학경진대회) 팀원</li>
                  <li>2016. 05 – 2016. 07&emsp;아두이노 멀티태스킹을 위한 FreeRTOS 프레임워크 (한국컴퓨터종합학술대회) 연구원</li>
                  <li>2017. 08 – 2016. 11&emsp;소프트웨어 융합 교육을 위한 도구의 설계 및 구현 (한국컴퓨터종합학술대회) 연구원</li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <h5>
                  주요 활동
                </h5>
                <ul type="disc">
                  <li>정보과학회 오픈소스 소프트웨어 연구회 Git/Github 실습 조교</li>
                  <li>국민대학교 컴퓨터 프로그래밍 교육 조교</li>
                  <li>MOS 엑셀, 엔트리 프로그래밍, 파이썬 프로그래밍 실습 강의 진행</li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <h5>
                  SKILL SET
                </h5>
                <ul type="disc">
                  <li>PL :&emsp;C, C++, JAVA, Python, JavaScript</li>
                  <li>Tool :&emsp;Git/Github</li>
                  <li>ETC :&emsp;Node.JS, React</li>
                </ul>
              </ListGroupItem>
              <ListGroupItem>
                <h5>
                  수상 / 자격
                </h5>
                <ul type="disc">
                  <li>2014.10.01&emsp;제10회 한성공학경진대회 한성대학교</li>
                  <li>2015.09.23&emsp;제11회 한성공학경진대회 한성대학교</li>
                  <li>2016.02.18&emsp;Microsoft Office Excel 2010 Expert Microsoft</li>
                  <li>2018.02.06&emsp;KSC2017 우수발표논문상</li>
                </ul>
              </ListGroupItem>
            </ListGroup>
        </div>
      </div>
    )
}


export default Profile;
