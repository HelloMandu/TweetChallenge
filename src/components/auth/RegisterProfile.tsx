import React, { useState, useEffect } from "react";
import { API_SERVER } from "../../path";

import "./RegisterProfile.scss";

interface RegisterProfileProps {
    profile: File | null;
    onChangeProfile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterProfile: React.FC<RegisterProfileProps> = ({
    profile,
    onChangeProfile,
}) => {
    const [imgFile, setImgFile] = useState<string | null>(null);
    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
                setImgFile(base64.toString());
            }
        };
        if (profile) {
            reader.readAsDataURL(profile);
        }
    }, [profile]);
    return (
        <section className="profile-image-wrapper">
            <label className="upload-profile-image" htmlFor="file-setter">
                <img
                    className={"profile-image"}
                    src={imgFile ? imgFile : `${API_SERVER}/images/profile.png`}
                    alt="profile"
                />
            </label>
            <input
                id="file-setter"
                className="input-file"
                type="file"
                onChange={onChangeProfile}
                accept="image/gif, image/jpeg, image/png, image/svg"
            />
        </section>
    );
};

export default RegisterProfile;
