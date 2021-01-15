import { Action } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import { startLoading, finishLoading } from "../store/loading";

const useLoading = (
    type?: any
): [() => Action<string>, () => Action<string>, boolean | boolean[]] => {
    const loading = useSelector((state: RootState) => state.loading);
    const isLoading = type ? loading[type] : loading;
    const dispatch = useDispatch();
    const onLoading = () => dispatch(startLoading(type));
    const offLoading = () => dispatch(finishLoading(type));
    return [onLoading, offLoading, isLoading];
};

export default useLoading;
