import React, {useState, ChangeEvent, FormEvent}  from "react";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginData } from "../../dto/auth";

const Wrapper = styled.main`
  width: 100%;
  height: 330px;
  padding-top: 30px;
  & input {
    display: block;
    margin: 0 auto;
    padding: 10px 5px;
    width: 230px;
    border: 1px solid #dcdcdc;
    &:first-child {
      border-bottom: none;
    }
    &::placeholder {
      color: #a2a2a2;
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

interface Props {
  login(loginData: LoginData): void;
  changeMessage(message: string): void;
  loginFailuerMsg: string;
  loggingIn: boolean;
}

const Content :React.FC<Props>  = (props)  => {

  const { login, changeMessage, loginFailuerMsg, loggingIn } = props;
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');

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
      <TextField id="standard-basic" label="아이디" variant="standard" onChange={onUserIdChange} />
      <TextField id="standard-basic" label="패스워드" type="password" variant="standard" onChange={onPasswordChange} />
      <Button variant="contained" sx={{ width: '25ch' }} onClick={onSubmit}>로그인</Button>
    </Box>
       </Wrapper>
    )
}

export default Content;