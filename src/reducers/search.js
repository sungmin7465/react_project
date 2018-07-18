import * as types from '../actions/ActionTypes';

const initialState = {

        status: 'INIT',
        data: [],
        error: -1

};

export default function search(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {

        case types.ARTICLE_SEARCH:
            return {
                ...state,
                status : "WAITING"
            }
        case types.ARTICLE_SEARCH_SUCCESS:
            return {
                ...state,
                status : "SUCCESS",
                data: [...action.searchData]
            }
        case types.ARTICLE_SEARCH_FAILURE:
            return {
                ...state,
                status : "FAILURE",
                error : action.error
            }
        default:
            return state;
    }
}
