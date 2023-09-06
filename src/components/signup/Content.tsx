import React, { useState, ChangeEvent, FocusEvent } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoginData } from "../../dto/auth";
import { signup } from "../../apis/auth";

const Wrapper = styled.main`
  width: 100%;
  & label,
  button {
    display: block;
    width: 80%;
    margin: 0 auto;
  }
  & label span,
  button {
    padding: 16px 5px;
    border: 1px solid #dadada;
  }
  & label {
    margin-bottom: 20px;
  }
  & label span {
    display: block;
    background-color: #fff;
    & input {
      border: none;
      width: 100%;
      outline: 0;
      padding: 0 15px;
    }
  }
  & label h3 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  & button {
    background-color: #ffeb33;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  & p {
    color: red;
  }
`;

const Content: React.FC = () => {
  const MAX_LEN = 20;
  //const { history } = props;
  const [user_id, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [name, setName] = useState("");

  const [userIdWarningMsg, setUserIdWarningMsg] = useState("");
  const [pwWarningMsg, setPwWarningMsg] = useState("");
  const [checkPwWarningMsg, setCheckPwWarningMsg] = useState("");
  const [nameWarningMsg, setNameWarningMsg] = useState("");

  const onUserIdChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const value = event.target.value;
    setUserId(value);
  };

  const onPwChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const value = event.target.value;
    setPw(value);
  };
  
  const onCheckPwChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const value = event.target.value;
    setCheckPw(value);
  };
  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const value = event.target.value;
    setName(value);
  };

  const isMatchUserId = (): boolean => {
    const regExp = /^[0-9a-z]+$/;
    const isMatch = user_id.match(regExp);
    return isMatch ? true : false;
  };
  const isValidUserId = async () => {
    const len = user_id.length;
    if (len < 5 || !isMatchUserId()) {
      setUserIdWarningMsg("5 ~ 20자의 영문 소문자, 숫자만 사용 가능합니다.");
      return false;
      // } else if (await findUser(userId)) {
      //   await setUserIdWarningMsg('이미 사용중이거나 탈퇴한 아이디입니다.');
      //   return false;
    }
    setUserIdWarningMsg("");
    return true;
  };
  const isValidPw = (): boolean => {
    const len = pw.length;
    if (len < 5) {
      setPwWarningMsg("5 ~ 20자 입력해주세요.");
      return false;
    }
    setPwWarningMsg("");
    return true;
  };
  const isValidCheckPw = (): boolean => {
    if (checkPw !== pw) {
      setCheckPwWarningMsg("비밀번호가 일치하지 않습니다.");
      return false;
    }
    setCheckPwWarningMsg("");
    return true;
  };
  const isValidName = (): boolean => {
    const len = name.length;
    if (len === 0) {
      setNameWarningMsg("필수 정보입니다.");
      return false;
    }
    setNameWarningMsg("");
    return true;
  };

  // 입력 창에서 벗어날 때 발생하는 action
  const onUserIdBlur = (event: FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidUserId();
  };
  const onPwBlur = (event: FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidPw();
  };
  const onCheckPwBlur = (event: FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidCheckPw();
  };
  const onNameBlur = (event: FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidName();
  };

  const onSubmit = async () => {
    const validId = await isValidUserId();
    const validPw = isValidPw();
    const validCheckPw = isValidCheckPw();
    const validName = isValidName();

    if (validId && validPw && validCheckPw && validName) {
      try {
        await signup({ user_id, password: pw, name });
        await alert("회원 가입 되었습니다.");
        //await history.replace(PAGE_PATHS.LOGIN);
      } catch (err: any) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Wrapper>
      <label>
        <h3>아이디</h3>
        <span>
          <input
            type="text"
            maxLength={MAX_LEN}
            onChange={onUserIdChange}
            onBlur={onUserIdBlur}
          />
        </span>
        <p>{userIdWarningMsg}</p>
      </label>
      <label>
        <h3>비밀번호</h3>
        <span>
          <input
            type="password"
            maxLength={MAX_LEN}
            onChange={onPwChange}
            onBlur={onPwBlur}
          />
        </span>
        <p>{pwWarningMsg}</p>
      </label>
      <label>
        <h3>비밀번호 재확인</h3>
        <span>
          <input
            type="password"
            maxLength={MAX_LEN}
            onChange={onCheckPwChange}
            onBlur={onCheckPwBlur}
          />
        </span>
        <p>{checkPwWarningMsg}</p>
      </label>
      <label>
        <h3>이름</h3>
        <span>
          <input
            type="text"
            maxLength={MAX_LEN}
            onChange={onNameChange}
            onBlur={onNameBlur}
          />
        </span>
        <p>{nameWarningMsg}</p>
      </label>
      <button onClick={onSubmit}>가입하기</button>
    </Wrapper>
  );
};

export default Content;
