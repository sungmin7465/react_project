import React from 'react';
import { connect } from 'react-redux';
import { articleRemoveRequest, articleEditRequest, articlePostRequest, getArticlesRequest, searchRequest, searchApply } from '../actions/article';
import {Content,ArticleBar, WritePanel, ArticleListWithPage} from '../components';
import ButterToast, { CinnamonSugar } from 'butter-toast';
import { withRouter } from "react-router-dom";
import ReactLoading from 'react-loading';

class ETC extends React.Component {
    constructor(props) {
        super(props);

        this.getArticles = this.getArticles.bind(this);
        this.search = this.search.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
          editMode: false
        };
    }

    componentDidMount() {
      this.getArticles(this.props.match.params.id);
    }

    getArticles(id){

      this.props.getArticlesRequest(id);

    }

    handleRemove(id){
      if(!this.props.isLoggedIn){
        const toast = CinnamonSugar.fresh({
            theme: 'dark',
            title:"오류",
            message: '로그인상태이어야 합니다!!',
            toastTimeout: 3000
        });
        return ButterToast.raise(toast);
      }
      this.props.articleRemoveRequest(id).then(
        () => {

          if(this.props.removeState.status === "SUCCESS"){
            this.props.history.push("/etc")

          } else if (this.props.removeState.error===8) {
            const toast = CinnamonSugar.fresh({
                theme: 'dark',
                title:"오류",
                message: '권한이 없습니다!!',
                toastTimeout: 3000
            });
            return ButterToast.raise(toast);

          } else {
            const toast = CinnamonSugar.fresh({
                theme: 'dark',
                title:"오류",
                message: '서버오류 입니다!!',
                toastTimeout: 3000
            });
            return ButterToast.raise(toast);
          }
      });



    }

    handleWrite(title,content){

      if(!this.props.isLoggedIn){
        const toast = CinnamonSugar.fresh({
            theme: 'dark',
            title:"오류",
            message: '로그인상태이어야 합니다!!',
            toastTimeout: 3000
        });
        return ButterToast.raise(toast);
      }

      this.setState({
        editMode: !this.state.editMode
      });

      this.props.articlePostRequest(title, content).then(
        () => {

          if(this.props.status === "SUCCESS"){
            const toast = CinnamonSugar.fresh({
                theme: 'dark',
                title:"성공",
                message: '글쓰기 완료!!',
                toastTimeout: 3000 // normal butter-toast option
            });
              ButterToast.raise(toast);
          }
          else{
            const toast = CinnamonSugar.fresh({
                theme: 'dark',
                title:"오류",
                message: '글쓰기 오류!!',
                toastTimeout: 3000 // normal butter-toast option
            });
              ButterToast.raise(toast);
          }




           return this.props.history.push("/");
        });


    }

    toggleMode(){

      if(!this.props.isLoggedIn){
        const toast = CinnamonSugar.fresh({
            theme: 'dark',
            title:"오류",
            message: '로그인상태이어야 합니다!!',
            toastTimeout: 3000
        });
        return ButterToast.raise(toast);
      }

      this.setState({
        editMode: !this.state.editMode
      });
    }

    search(criteria,keyword){
      this.getArticles();
      this.props.searchRequest(criteria,keyword).then(
        () => {
            if(this.props.searchStatus.status === "SUCCESS") {
              console.log(this.props.searchStatus.data)
              this.props.searchApply(this.props.searchStatus.data);
            }
        }
      )
    }

    render() {
      var id = this.props.match.params.id;
      console.dir("render!!!!!!!!!!!")
      console.dir(this.props.articles)
      return(
        <div className="etc">
          {
            this.state.editMode ?  <WritePanel handleWrite={this.handleWrite}/> :
            (typeof id !== "undefined") ? <Content handleRemove={this.handleRemove} user={this.props.user} onEdit={this.props.articleEditRequest} article={this.props.articles}/> :
              (this.props.status ==="SUCCESS") ?
                <div>
                  <ArticleListWithPage status= {this.props.status} articles = {this.props.articles}/>
                  <ArticleBar toggle={this.toggleMode} onSearch={this.search}/>
                </div> :

                <ReactLoading className="loading" type="spin" color="grey" />

          }

        </div>

      );
    }
}

const mapStateToProps = (state) => {

    return {
        removeState : state.article.remove,
        articles: state.article.data,
        status: state.article.status,
        searchStatus: state.search,
        isLoggedIn: state.authentication.user.isLoggedIn,
        user: state.authentication.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getArticlesRequest: (url) => {
            return dispatch(getArticlesRequest(url));
        },
        searchRequest: (criteria,keyword) => {
            return dispatch(searchRequest(criteria,keyword));
        },
        searchApply: (searchData) => {
            return dispatch(searchApply(searchData));
        },
        articlePostRequest: (title,content) => {
            return dispatch(articlePostRequest(title,content));
        },
        articleEditRequest: (id,title, content) => {
            return dispatch(articleEditRequest(id,title, content));
        },
        articleRemoveRequest: (id) => {
            return dispatch(articleRemoveRequest(id));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ETC));
