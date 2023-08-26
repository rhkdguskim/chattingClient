import React, {useState}  from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const requestAPI = async () => {
  // 카카오, 네이버, 구글의 각각의 소셜 로그인 요청 데이터 생성
  const socialLoginUrl = `http://localhost:3000/auth/kakao/login/`;

  if (!socialLoginUrl) {
    throw new Error('Invalid provider');
  }
  
  try {
    const response = await axios.get(socialLoginUrl, { withCredentials: true });
    
    // 서버에서 리다이렉트할 URL을 받아옴
    const redirectUrl = response.data.redirectUrl;

    // 받아온 리다이렉트 URL로 프론트엔드에서 리다이렉트
    window.location.href = redirectUrl;
  } catch (error) {
    console.error('Social login error:', error);
    throw error;
  }
}

const Footer : React.FC  = ()  => {
    return (
       <Wrapper>
        <ul>
        <li>
        <Link to={PAGE_PATHS.SIGNUP}>회원 가입</Link>
        </li>
        </ul>
        <button onClick={requestAPI}>소셜 로그인</button>
       </Wrapper>
    )
}

export default Footer;