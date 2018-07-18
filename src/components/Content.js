import React from 'react'
import PropTypes from 'prop-types'
import {  Card, Button, CardHeader, CardBody,
          CardText, Container, Row, Col, Input } from 'reactstrap';
import ButterToast, { CinnamonSugar } from 'butter-toast';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isEdit: false,
          title:"",
          content:"",
          buttonLabel:"수정"
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        console.dir(nextState)
        this.setState(nextState);
    }

    handleEdit(){

      if(typeof this.props.user.currentUser==="undefined"){

        const toast = CinnamonSugar.fresh({
            theme: 'dark',
            title:"오류",
            message: '로그인상태이어야 합니다!!',
            toastTimeout: 3000
        });
        return ButterToast.raise(toast);

      }

      if(this.props.user.currentUserId.localeCompare(this.props.article[0].authorId) !== 0){
        const toast = CinnamonSugar.fresh({
            theme: 'dark',
            title:"오류",
            message: '수정 권한이 없습니다.!!',
            toastTimeout: 3000
        });
        return ButterToast.raise(toast);
      }


      if(this.state.isEdit){ // from edit
        this.setState({
          isEdit : false,
          title : "",
          content : "",
          buttonLabel:"수정"
        });
        this.props.onEdit(this.props.article[0].id, this.state.title, this.state.content);

      } else{
        this.setState({
          isEdit : true,
          title : this.props.article[0].title,
          content : this.props.article[0].content,
          buttonLabel:"완료"
        });
      }


    }


    render() {
        if(this.props.article === null || this.props.article.length===0){
          return null
        }

        var isEdit = this.state.isEdit;

        return (

          <div>
            <ButterToast trayPosition="bottom-right"/>
            <Card>
                <CardHeader>
                    <Container>
                        <Row>
                            <Col sm="2" >{this.props.article[0].id}</Col>
                            <Col sm="8">
                              { isEdit ? <Input onChange={this.handleChange} value={this.state.title} type="text" name="title" id="title" /> :
                                this.props.article[0].title }
                            </Col>
                            <Col sm="2">{this.props.article[0].authorName}</Col>
                        </Row>
                    </Container>
                </CardHeader>
                <CardBody>
                  <CardText>
                    { isEdit ? <Input onChange={this.handleChange} value={this.state.content} type="textarea" name="content" id="content"/> :

                          this.props.article[0].content

                    }
                    </CardText>
                    <div className="button-group">
                      <Button color="primary" onClick={()=>{this.props.handleRemove(this.props.article[0].id)}}>삭제</Button>
                      <Button onClick={this.handleEdit}>{this.state.buttonLabel}</Button>
                    </div>


                </CardBody>
            </Card>
          </div>
        );
    }
}


Content.PropTypes = {
    article: PropTypes.object
};

Content.defaultProps = {
    article : null
};
