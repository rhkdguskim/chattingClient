import React from "react";
import styled, {keyframes} from "styled-components";

const moveAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const Wrapper = styled.header`
  width: 100%;
  height: 200px;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  animation: ${moveAnimation} 2s infinite;
`;

const Header: React.FC = () => {
  return <Wrapper>회원가입</Wrapper>;
};

export default Header;
