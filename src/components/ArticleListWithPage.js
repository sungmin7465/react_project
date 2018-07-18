import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Table} from 'reactstrap';
//import mock_data from './mock_data';

const ArticleList = ({articleList}) =>{
  return (
    <Table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        {
          articleList.map((article,index) =>
            <tr key={index}>

                <th scope="row">{article.id}</th>
                <td ><a href={`/etc/${article.id}`}>{article.title}</a></td>
                <td>{article.authorName}</td>

            </tr>)
        }
      </tbody>
    </Table>

  )
}

class PageNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);

    this.state = {
      articleList : [],
      currentPage : 1
    };
  }


  onPrevClick( currentSection){
    this.props.setSection(currentSection-1)
  }


  onNextClick( currentSection){
    this.props.setSection(currentSection+1)
  }

  componentDidUpdate(){
    if(this.props.currentPage > this.props.maxPageNumber){
      this.props.setPage(1);
      this.props.setSection(1);
    }
  }

  render() {
    const {pages, currentPage, setPage, maxPageNumber, currentSection} = this.props;
    console.log( "current section : " + currentSection)
    console.log( "pages : " + pages);



    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={(currentSection) <= 1}>
          <PaginationLink previous  onClick={() => this.onPrevClick(currentSection)}/>
        </PaginationItem>
          {pages.map((page,index) =>
            <PaginationItem key={index} active={page === currentPage} onClick={() => setPage(page)}>
              <PaginationLink href="#">
                {page}
              </PaginationLink>
            </PaginationItem>
          )}
        <PaginationItem disabled={(currentSection)*5>=maxPageNumber}>
          <PaginationLink next  onClick={() => this.onNextClick(currentSection)} />
        </PaginationItem>
      </Pagination>
    );
  }
}

class ArticleListWithPage extends React.Component {

  constructor(props) {
    super(props);

    this.setSection = this.setSection.bind(this);
    this.setPage = this.setPage.bind(this);

    this.state = {
      articleList : [],
      currentPage : 1,
      currentSection: 1
    };
  }


  setSection(section){
    this.setState({
      currentSection : section
    });

  }

  setPage(page){
    this.setState({
      currentPage : page
    });
  }

  render() {

    console.dir( this.state)
    var articleList = this.props.articles;
    var currentPage = this.state.currentPage;
    var currentSection = this.state.currentSection;
    var maxPageNumber = (articleList.length%5 === 0 ? articleList.length/5  : parseInt(articleList.length/5,10) + 1);

    articleList = articleList.slice(((currentPage-1)*5), ((currentPage-1)*5+5));

    return (
      <div>
        <ArticleList articleList={articleList}/>
        <PageNavigation  maxPageNumber={ maxPageNumber} pages={ [...Array(5).keys()].map(num=>num+(currentSection-1)*5 + 1).filter(num => num <= maxPageNumber) } currentSection={currentSection} currentPage = {currentPage} setPage = {this.setPage} setSection = {this.setSection}/>
      </div>
    );
  }
}

export default ArticleListWithPage;
