import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import user, {userSaga} from './user';
import loading from './loading';

const rootReducer = combineReducers({
    loading, user
});

export function* rootSaga() {
    yield all([userSaga()]);
}

export default rootReducer;