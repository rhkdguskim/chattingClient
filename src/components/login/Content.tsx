import React, {useState, ChangeEvent, useEffect}  from "react";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginData, SocialLoginData } from "../../dto/auth";
import { API_HOST, GOOGLE_IMG_URL, GOOGLE_REDIRECT_URL, GOOGLE_REST_API_KEY, GOOGLE_SCOPE, KAKAO_IMG_URL, KAKAO_REDIRECT_URL, KAKAO_REST_API_KEY, NAVER_IMG_URL, NAVER_REDIRECT_URL, NAVER_REST_API_KEY } from "../../config";

const Wrapper = styled.main`
  width: 100%;
  height: 450px;
  padding-top: 30px;
  & input {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #dcdcdc;
    transition: box-shadow 0.3s, border 0.3s;
    &:focus {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-color: #a2a2a2;
    }
  }
  & button {
    position: relative;
    display: block;
    margin: auto;
    margin-top: 5px;
    padding: 10px 5px;
    width: 230px;
    border: 1px solid #000;
    color: #fff;
    background-color: #423630;
    outline: none;
    @keyframes iconLotate {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    & i {
      position: absolute;
      top: 15px;
      right: 10px;
      color: #5c5c5c;
      animation: iconLotate 1.5s linear infinite;
    }
    &:hover {
      background-color: #594941;
      cursor: pointer;
    }
    &:active {
      background-color: #423630;
    }
    &.disabled {
      color: #969696;
      background: #e2e2e2;
      pointer-events: none;
      border: 1px solid #dcdcdc;
    }
  }
  & p {
    padding-top: 20px;
    text-align: center;
    color: red;
  }
`;

const LoginButton = styled.button`
  width: 230px;
  height: 50px;
  background-size: cover;
  border: none;
  cursor: pointer;
  color: transparent;
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
  login(loginData: LoginData): void;
  changeMessage(message: string): void;
  Sociallogin(data: SocialLoginData): void;
  loginFailuerMsg: string;
  loggingIn: boolean;
}

const Content :React.FC<Props>  = (props)  => {
  const { login, changeMessage, Sociallogin, loginFailuerMsg, loggingIn } = props;

  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = (event : React.MouseEvent, authProvider: string) => {
    event.preventDefault()
    let popup;
    let soicalloginData : SocialLoginData = {
      type : authProvider,
      code : '',
    }

    switch(authProvider)
    {
      case 'kakao':
        popup = window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}`, 'kakaoAuth', 'width=500,height=500');
  
        const handleMessage = (event : any) => {
          event.preventDefault()
          if (event.origin !== window.location.origin) return; // 원본 주소 확인
  
          const code = event.data.code;
          soicalloginData.code = code
          if (code) {
            Sociallogin(soicalloginData);
          }
          // 이벤트 리스너 제거
          window.removeEventListener('message', handleMessage);
        };
  
        window.addEventListener('message', handleMessage, false);
        break;
      case 'naver':
        popup = window.open(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&redirect_uri=${NAVER_REDIRECT_URL}`, 'naverAuth', 'width=500,height=500');
  
        const handleMessage2 = (event : any) => {
          event.preventDefault()
          if (event.origin !== window.location.origin) return; // 원본 주소 확인
  
          const code = event.data.code;
          soicalloginData.code = code
          if (code) {
            Sociallogin(soicalloginData);
          }
          // 이벤트 리스너 제거
          window.removeEventListener('message', handleMessage2);
        };
  
        window.addEventListener('message', handleMessage2, false);
        break;
        case 'google':
          popup = window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URL}&response_type=code&scope=${GOOGLE_SCOPE}`, 'googleAuth', 'width=500,height=500');
          const handleMessage3 = (event : any) => {
            event.preventDefault()
            if (event.origin !== window.location.origin) return; // 원본 주소 확인
    
            const code = event.data.code;
            soicalloginData.code = code
            if (code) {
              Sociallogin(soicalloginData);
            }
            // 이벤트 리스너 제거
            window.removeEventListener('message', handleMessage3);
          };
    
          window.addEventListener('message', handleMessage3, false);
          break;
    }
    
  };

  const onUserIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (!loggingIn) {
      const value = event.target.value;
      setUserId(value);
    }
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (!loggingIn) {
      const value = event.target.value;
      setPassword(value);
      if (value.length >= 5) {
        changeMessage('');
      }
    }
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (!loggingIn && password.length >= 5) {
      login({ user_id, password });
      //setPassword('');
    }
    else{
      changeMessage('패스워드의 길이를 5자 이상으로 해주세요.')
    }
  };
    return (
       <Wrapper>
     <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <TextField id="user-id" label="아이디" variant="outlined" onChange={onUserIdChange} />
      <TextField id="user-password" label="패스워드" type="password" variant="outlined" onChange={onPasswordChange} />
      <Button variant="contained" sx={{ width: '25ch' }} onClick={onSubmit}>로그인</Button>

      <KakaoLoginButton onClick={(event) => handleLoginClick(event, 'kakao')}> </KakaoLoginButton>
      <NaverLoginButton onClick={(event) => handleLoginClick(event, 'naver')}> </NaverLoginButton>
      <GoogleLoginButton onClick={(event) => handleLoginClick(event, 'google')}> </GoogleLoginButton>

      <p>{loginFailuerMsg}</p>
    </Box>
       </Wrapper>
    )
}

export default Content;