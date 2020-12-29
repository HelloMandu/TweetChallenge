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

type UserAction =
    | ReturnType<typeof getUser>
    | ReturnType<typeof updateUser>
    | ReturnType<typeof deleteUser>

function* getUserSaga(action: UserAction) {
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

function* deleteUserSaga(action: UserAction) {
    yield put(startLoading(DELETE_USER));
    try {
        const JWT_TOKEN: string = action.payload
        sessionStorage.removeItem('user');
        yield call(requestPostLogout, JWT_TOKEN);
        yield put({
            type: DELETE_USER_SUCCESS,
            payload: null
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

export interface UserState {
    email: string | null,
    name: string | null,
    birth: Date | null,
    profile: string | null
}

const initialState: UserState = {
    email: null,
    name: null,
    birth: null,
    profile: null
}
const user = handleActions(
    {
        [GET_USER_SUCCESS]: (state: UserState, action: UserAction) => ({
            ...state,
            ...action.payload
        }),
        [UPDATE_USER]: (state: UserState, action: UserAction) => ({
            ...state,
            ...action.payload
        }),
        [DELETE_USER_SUCCESS]: (state: UserState, action: UserAction) => ({
            email: null,
            name: null,
            birth: null,
            profile: null
        })
    },
    initialState
);

export default user;