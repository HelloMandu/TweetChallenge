import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "@redux-saga/core/effects";

import { finishLoading, startLoading } from "./loading";

import { requestGetUserInfo, requestPostLogout } from '../api/user';

const GET_USER = 'user/GET_USER' as const;
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS' as const;
const GET_USER_FAILURE = 'user/GET_USER_FAILURE' as const;

const UPDATE_USER = 'user/UPDATE_USER' as const;

const DELETE_USER = 'user/DELETE_USER' as const;
const DELETE_USER_SUCCESS = 'user/DELETE_USER_SUCCESS' as const;
const DELETE_USER_FAILURE = 'user/DELETE_USER_FAILURE' as const;

export const getUser = createAction(GET_USER);
export const updateUser = createAction(UPDATE_USER, (target: string, value: string | number) => ({
    [target]: value
}));
export const deleteUser = createAction(DELETE_USER, (token: string) => token);

type userAction =
    | ReturnType<typeof getUser>
    | ReturnType<typeof updateUser>
    | ReturnType<typeof deleteUser>

function* getUserSaga(action: userAction) {
    yield put(startLoading(GET_USER));
    try {
        const JWT_TOKEN: string = action.payload;
        const { msg, user } = yield call(requestGetUserInfo, JWT_TOKEN);
        if (msg !== 'success') {
            sessionStorage.removeItem('user');
        }
        yield put({
            type: GET_USER_SUCCESS,
            payload: user
        });
    } catch (e) {
        yield put({
            type: GET_USER_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_USER));
};

function* deleteUserSaga(action: userAction) {
    yield put(startLoading(DELETE_USER));
    try {
        const JWT_TOKEN: string = action.payload
        sessionStorage.removeItem('user');
        yield call(requestPostLogout, JWT_TOKEN);
        yield put({
            type: DELETE_USER_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: DELETE_USER_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(DELETE_USER));
};

export function* userSaga() {
    yield takeLatest(GET_USER, getUserSaga);
    yield takeLatest(DELETE_USER, deleteUserSaga);
};

const initialState = {};

const user = handleActions(
    {
        [GET_USER_SUCCESS]: (state, action: userAction) => ({
            ...state,
            ...action.payload.user
        }),
        [UPDATE_USER]: (state, action: userAction) => ({
            ...state,
            ...action.payload
        }),
        [DELETE_USER_SUCCESS]: (state, action: userAction) => ({})
    },
    initialState
);

export default user;