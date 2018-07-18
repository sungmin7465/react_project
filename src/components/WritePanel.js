import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class WritePanel extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);

      this.state = {
        title: "",
        content:""
      };
  }

  handleClick(){
    this.props.handleWrite(this.state.title, this.state.content);
  }

  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }


  render() {
    return (
      <Form className="write-panel">
        <FormGroup row>
          <Label for="title" sm={2}>제목</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} value={this.state.title} type="text" name="title" id="title" placeholder="제목을 입력하세요" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="content" sm={2}>내용</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} value={this.state.content} type="textarea" name="content" id="content" placeholder="내용을 입력하세요."/>
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={this.handleClick}> 완료</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default WritePanel;
