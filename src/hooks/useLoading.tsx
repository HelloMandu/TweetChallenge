import { Action } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import { startLoading, finishLoading } from "../store/loading";

const useLoading = (
    type?: any
): [boolean | boolean[], () => Action<string>, () => Action<string>] => {
    const loading = useSelector((state: RootState) => state.loading);
    const isLoading = type ? loading[type] : loading;
    const dispatch = useDispatch();
    const onLoading = () => dispatch(startLoading(type));
    const offLoading = () => dispatch(finishLoading(type));
    return [isLoading, onLoading, offLoading];
};

export default useLoading;
