import React from 'react';

import './AuthWrapper.scss'

interface AuthWrapperProps{
    title: string
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({title, children}) =>{
    return(
        <div className="auth-wrapper">
            <h1 className="auth-title">{title}</h1>
            {children}
        </div>
    )
}

export default AuthWrapper;