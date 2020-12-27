import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Path from "../path";

const useAuth = (): string | null => {
    const history = useHistory();
    const JWT_TOKEN = sessionStorage.getItem("user");
    useEffect(() => {
        if(!JWT_TOKEN){
            history.replace(Path.auth.login)
        }
    }, [JWT_TOKEN, history]);
    return JWT_TOKEN;
};

export default useAuth;
