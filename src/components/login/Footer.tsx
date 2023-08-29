import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { PAGE_PATHS, API_HOST } from '../../config';
import axios from "axios";

const Wrapper = styled.header`
  & ul {
    display: flex;
    justify-content: center;
    & li {
      color: #5a5a5a;
    }
  }
`;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.href)
    const receivedAccessToken = urlParams.get('access_token');
    const receivedRefreshToken = urlParams.get('refresh_token');
    console.log(receivedAccessToken)
    console.log(receivedRefreshToken)
    if (receivedAccessToken && receivedRefreshToken) {
      // 로그인 처리를 여기에 추가 (토큰 저장 등)
      // ...
      // 로그인 처리 후에 홈페이지로 리다이렉트
      navigate('/');
    }
  }, [navigate]);

  const handleLoginClick = (authProvider: string) => {
    window.location.href = `${API_HOST}/auth/${authProvider}/login`;
    console.log(window.location.href)
  }

  return (
    <Wrapper>
      <ul>
        <li>
          <Link to={PAGE_PATHS.SIGNUP}>회원 가입</Link>
        </li>
      </ul>
      <button onClick={() => handleLoginClick('kakao')}>카카오 로그인</button>
      <button onClick={() => handleLoginClick('naver')}>네이버 로그인</button>
      <button onClick={() => handleLoginClick('google')}>구글 로그인</button>
    </Wrapper>
  );
}

export default Footer;