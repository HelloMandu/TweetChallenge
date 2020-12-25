import { useCallback, useState } from "react";

const useInput = (initialForm: any): any[] => {
    const [state, setState] = useState<any>(initialForm);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((state: any) => ({ ...state, [name]: value }));
    }, []);
    const reset = useCallback(() => setState(initialForm), [initialForm]);
    return [state, onChange, reset];
};

export default useInput;
