import { createAction, handleActions } from 'redux-actions';

const TOGGLE_ASIDE = 'aside/TOGGLE_ASIDE' as const;

export const toggleAside = createAction(TOGGLE_ASIDE);

type asideAction = ReturnType<typeof toggleAside>

const initialState: boolean = false;

const aside = handleActions(
    {
        [TOGGLE_ASIDE]: (state: boolean, action: asideAction) => !state,
    },
    initialState
);

export default aside;