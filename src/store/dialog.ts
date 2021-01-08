import { createAction, handleActions } from 'redux-actions';

const OPEN = 'dialog/OPEN';
const CLOSE = 'dialog/CLOSE';

export const dialogOpen = createAction(
    OPEN,
    (title: string, handleClick: any, text: string, confirm: boolean) => ({
        title,
        text,
        handleClick,
        confirm,
    }),
);

export const dialogClose = createAction(CLOSE);

type DialogAction =
    | ReturnType<typeof dialogOpen>
    | ReturnType<typeof dialogClose>

export interface DialogState {
    open: boolean,
    title: string,
    confirm: boolean,
    text: string,
    handleClick: any
}

const initialState: DialogState = {
    open: false,
    title: '',
    confirm: false,
    text: '',
    handleClick: null
};

const dialog = handleActions(
    {
        [OPEN]: (state: DialogState, action: DialogAction) => {
            const { title, confirm, text, handleClick } = action.payload;
            return {
                ...state,
                open: true,
                confirm,
                title,
                text,
                handleClick,
            }
        },
        [CLOSE]: (state: DialogState, action: DialogAction) => ({
            open: false,
            title: '',
            confirm: false,
            text: '',
            handleClick: null
        }),
    },
    initialState,
);

export default dialog;