import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PAGE_PATHS, API_HOST, NAVER_IMG_URL, KAKAO_IMG_URL, GOOGLE_IMG_URL } from '../../config';

const Wrapper = styled.header`
  text-align: center; /* Center align the child elements */

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0 10px;
  }
`;

const LoginButton = styled.button`
  width: 200px;  // 원하는 크기로 조정
  height: 50px; // 원하는 크기로 조정
  background-size: cover;
  border: none;
  cursor: pointer;
  color: transparent; // 버튼의 텍스트를 숨깁니다.
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const KakaoLoginButton = styled(LoginButton)`
  background-image: url(${KAKAO_IMG_URL});
`;

const NaverLoginButton = styled(LoginButton)`
  background-image: url(${NAVER_IMG_URL});
`;

const GoogleLoginButton = styled(LoginButton)`
  background-image: url(${GOOGLE_IMG_URL});
`;

interface Props {
  Sociallogin(token: string): void;
}

const Footer: React.FC<Props> = (props) => {
  const { Sociallogin } = props;

  const handleLoginClick = (authProvider: string) => {
    window.location.href = `${API_HOST}/auth/${authProvider}/login`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const receivedAccessToken = urlParams.get('access_token');
    const receivedRefreshToken = urlParams.get('refresh_token');
    
    if (receivedAccessToken && receivedRefreshToken) {
      window.sessionStorage.setItem('jwt', receivedAccessToken);
      window.sessionStorage.setItem('rjwt', receivedRefreshToken);
      Sociallogin(receivedAccessToken)
    }
  }, []);

  return (
    <Wrapper>
  <KakaoLoginButton onClick={() => handleLoginClick('kakao')}>
      카카오 로그인
    </KakaoLoginButton>
    <NaverLoginButton onClick={() => handleLoginClick('naver')}>
      네이버 로그인
    </NaverLoginButton>
    <GoogleLoginButton onClick={() => handleLoginClick('google')}>
      구글 로그인
    </GoogleLoginButton>

      <ul>
        <li>
        <Link to={PAGE_PATHS.SIGNUP}>회원 가입</Link>
        </li>
      </ul>

      
    </Wrapper>
  );
};

export default Footer;