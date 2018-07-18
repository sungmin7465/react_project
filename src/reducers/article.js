import * as types from '../actions/ActionTypes';

const initialState = {

        status: 'INIT',
        data: [],
        error: -1,
        remove: {
            status: 'INIT',
            error: -1
        }

};

export default function article(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.GET_ARTICLES:
            return {
                  status : "WAITING"
            }
        case types.GET_ARTICLES_SUCCESS:
            var data = action.data;
            console.dir(data)
              return {
                    ...state,
                    status : "SUCCESS",
                    data: [...action.data]
              }

        case types.GET_ARTICLES_FAILURE:
            return {
                  ...state,
                  status : "FAILURE",
                  error : action.error
            }

        case types.ARTICLE_SEARCH_APPLY:
            return {
                  ...state,
                  status : "SUCCESS",
                  data: [...action.searchData]
            }

        case types.ARTICLE_POST:
            return {
                  ...state,
                  status : "WAITING"
            }
        case types.ARTICLE_POST_SUCCESS:
            return {
                  ...state,
                  status : "SUCCESS"
            }
        case types.ARTICLE_POST_FAILURE:
            return {
                  ...state,
                  status : "FAILURE",
                  error: action.error
            }

        case types.ARTICLE_EDIT:
            return {
                  ...state,
                  status : "WAITING"
            }
        case types.ARTICLE_EDIT_SUCCESS:
            var a = {
                  ...state,
                  data : [
                    ...state.data,
                    state.data[state.data.indexOf(action.id)] : action.article
                  ],
                  status : "SUCCESS"
            };
            console.dir(a);
            return {
                  ...state,
                  data : [action.article],
                  status : "SUCCESS"
            }
        case types.ARTICLE_EDIT_FAILURE:
            return {
                  ...state,
                  status : "FAILURE",
                  error: action.error
            }
        case types.ARTICLE_REMOVE:
            return {
                  ...state,
                  remove : {
                    status : "WAITING",
                    error: -1
                  }

            }
        case types.ARTICLE_REMOVE_SUCCESS:
          console.log(state.data.filter(article => article.id !== action.id))
            return {
                  ...state,
                  data : state.data.filter(article => article.id !== action.id),
                  remove : {
                    status : "SUCCESS",
                    error: -1
                  }

            }
        case types.ARTICLE_REMOVE_FAILURE:

            return {
                  ...state,
                  remove : {
                    status : "FAILURE",
                    error: action.error
                  }
            }


        default:
            return state;
    }
}

/*
ARTICLE_REMOVE
ARTICLE_REMOVE_SUCCESS
ARTICLE_REMOVE_FAILURE
*/
