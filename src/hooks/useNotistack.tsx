import { useSnackbar, VariantType } from "notistack";

const useNotistack = () => {
    const { enqueueSnackbar } = useSnackbar();
    const handleNotistack = (message: string, variant?: VariantType) => {
        enqueueSnackbar(message, { variant });
    };
    return handleNotistack;
};

export default useNotistack;
