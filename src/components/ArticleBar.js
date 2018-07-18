import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

export default class ArticleBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      dropDownValue: "제목",
      keyword: ""
    };
  }
  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  changeValue(e) {
    this.setState({dropDownValue: e.currentTarget.textContent})
  }

  onSearch() {
    this.props.onSearch(this.state.dropDownValue, this.state.keyword)
  }



  render() {
    return (
      <div>
        <InputGroup>
          <Button color="primary" onClick={this.props.toggle}>글쓰기</Button>
          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
            <DropdownToggle split outline >{this.state.dropDownValue}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.changeValue}>제목</DropdownItem>
              <DropdownItem onClick={this.changeValue}>내용</DropdownItem>
              <DropdownItem onClick={this.changeValue}>작성자</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input onChange={this.handleChange} value={this.state.keyword} name="keyword" placeholder="and..." />
          <InputGroupAddon addonType="append"><Button color="primary" onClick={this.onSearch}>검색</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
