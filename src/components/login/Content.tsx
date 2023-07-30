import React, {useState}  from "react";
import styled from 'styled-components';

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

const Content :React.FC  = ()  => {
    return (
       <Wrapper>
        로그인 콘텐츠
       </Wrapper>
    )
}

export default Content;