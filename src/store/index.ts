import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import user, {userSaga} from './user';
import loading from './loading';
import aside from './aside';

const rootReducer = combineReducers({
    loading, user, aside
});

export function* rootSaga() {
    yield all([userSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;