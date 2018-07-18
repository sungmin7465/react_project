import { ARTICLE_REMOVE, ARTICLE_REMOVE_SUCCESS, ARTICLE_REMOVE_FAILURE,
         ARTICLE_EDIT, ARTICLE_EDIT_SUCCESS, ARTICLE_EDIT_FAILURE, ARTICLE_POST,
         ARTICLE_POST_SUCCESS, ARTICLE_POST_FAILURE, GET_ARTICLES,
         GET_ARTICLES_SUCCESS, GET_ARTICLES_FAILURE, ARTICLE_SEARCH,
         ARTICLE_SEARCH_SUCCESS, ARTICLE_SEARCH_FAILURE, ARTICLE_SEARCH_APPLY } from './ActionTypes';
import axios from 'axios';

var API_URL = process.env.NODE_ENV === "production" ? "http://1.239.127.120:3001" : "http://localhost:3000";
console.dir(API_URL)
const axiosInstance = axios.create({
  baseURL: API_URL
});

export function getArticlesRequest(id) {
  return (dispatch) => {
      // inform ARTICLE POST API is starting
      dispatch(getArticles());
      var url =  (typeof id !== "undefined" ?  "/api/etc/articles/"+id  :
       "/api/etc/articles/")

      return axiosInstance.get(url)
      .then((response) => {
        dispatch(getArticlesSuccess(response.data));
      }).catch((error) => {
        dispatch(getArticlesFailure(error.response.data.code));
      });
  };
}

export function getArticles() {
    return {
        type: GET_ARTICLES
    };
}

export function getArticlesSuccess(data) {
    return {
        type: GET_ARTICLES_SUCCESS,
        data
    };
}

export function getArticlesFailure(error) {
    return {
        type: GET_ARTICLES_FAILURE,
        error
    };
}

/* LOGIN */
export function searchRequest(criteria, keyword) {
    return (dispatch) => {
        // Inform Login API is starting

        dispatch(search());
        // API REQUEST
        return axiosInstance.get('/api/etc/search', {
          params:{
            criteria,
            keyword
          }
        })
        .then((response) => {
            // SUCCEED

            dispatch(searchSuccess(response.data));
        }).catch((error) => {
            // FAILED
            dispatch(searchFailure(error.response.data.code));
        });
    };
}

export function search() {
    return {
        type: ARTICLE_SEARCH
    };
}

export function searchSuccess(searchData) {
    return {
        type: ARTICLE_SEARCH_SUCCESS,
        searchData
    };
}

export function searchFailure(error) {
    return {
        type: ARTICLE_SEARCH_FAILURE,
        error
    };
}

export function searchApply(searchData) {
    return {
        type: ARTICLE_SEARCH_APPLY,
        searchData
    };
}

export function articlePostRequest(title,content) {
    return (dispatch) => {
        dispatch(articlePost());

        return axiosInstance.post('/api/etc/', { title, content })
        .then((response) => {
            dispatch(articlePostSuccess());
        }).catch((error) => {
            dispatch(articlePostFailure(error.response.data.code));
        });
    };
}

export function articlePost() {
    return {
        type: ARTICLE_POST
    };
}

export function articlePostSuccess() {
    return {
        type: ARTICLE_POST_SUCCESS
    };
}

export function articlePostFailure(error) {
    return {
        type: ARTICLE_POST_FAILURE,
        error
    };
}

export function articleEditRequest(id, title, content) {
    return (dispatch) => {
        dispatch(articleEdit());

        return axiosInstance.put('/api/etc/' + id, { title, content })
        .then((response) => {
          console.dir(response.data)
            dispatch(articleEditSuccess(id, response.data.article));
        }).catch((error) => {
            dispatch(articleEditFailure(error.response.data.code));
        });
    };
}

export function articleEdit() {
    return {
        type: ARTICLE_EDIT
    };
}

export function articleEditSuccess(id, article) {
    return {
        type: ARTICLE_EDIT_SUCCESS,
        id,
        article
    };
}

export function articleEditFailure(error) {
    return {
        type: ARTICLE_EDIT_FAILURE,
        error
    };
}

export function articleRemoveRequest(id) {
    return (dispatch) => {
        // TO BE IMPLEMENTED
        dispatch(articleRemove());

        return axiosInstance.delete('/api/etc/' + id)
        .then((response)=> {
            dispatch(articleRemoveSuccess(id));
        }).catch((error) => {
            console.log(error);
            dispatch(articleRemoveFailure(error.response.data.code));
        });
    };
}

export function articleRemove() {
    return {
        type: ARTICLE_REMOVE
    };
}

export function articleRemoveSuccess(id) {
    return {
        type: ARTICLE_REMOVE_SUCCESS,
        id
    };
}

export function articleRemoveFailure(error) {
    return {
        type: ARTICLE_REMOVE_FAILURE,
        error
    };
}
