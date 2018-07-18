import authentication from './authentication';
import article from './article';
import search from './search';
import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    article,
    search
});
