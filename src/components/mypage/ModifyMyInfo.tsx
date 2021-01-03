import React from "react";
import Signup, { SignupProps } from "../auth/Signup";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
    },
});

interface ModifyMyInfoProps extends SignupProps {
    open: boolean;
    onToggle: () => void;
}

const ModifyMyInfo: React.FC<ModifyMyInfoProps> = ({
    open,
    onToggle,
    handleSignup,
}) => {
    const classes = useStyles();
    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={onToggle}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Signup handleSignup={handleSignup} />
            </Fade>
        </Modal>
    );
};

export default ModifyMyInfo;
