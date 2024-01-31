import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 서버로부터의 리디렉션 응답 처리
        const handleLoginResponse = () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                if (token) {
                    localStorage.setItem('token', token);
                    navigate('/');
                } else {
                    // 토큰이 없거나 인증에 실패한 경우
                 
                }
            } catch (error) {
                console.error('로그인 처리 중 에러 발생', error);
             
            }
        };

        handleLoginResponse();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default LoginRedirectHandler;
