import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PAGE_PATHS, API_HOST } from '../../config';
import { setAccessToken, setRefreshToken } from '../../apis/base';

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
      setAccessToken(receivedAccessToken);
      setRefreshToken(receivedRefreshToken)
      Sociallogin(receivedAccessToken)
    }
  }, []);

  return (
    <Wrapper>
      <button onClick={() => handleLoginClick('kakao')}>
        카카오 로그인
      </button>
      <button onClick={() => handleLoginClick('naver')}>
        네이버 로그인
      </button>
      <button onClick={() => handleLoginClick('google')}>
        구글 로그인
      </button>

      <ul>
        <li>
        <Link to={PAGE_PATHS.SIGNUP}>회원 가입</Link>
        </li>
      </ul>

      
    </Wrapper>
  );
};

export default Footer;