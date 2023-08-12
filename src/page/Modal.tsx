import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #c8c8c8;
  opacity: 0.5;
  z-index: 99;
  overflow: hidden;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

export interface PortalProps {
    children?: React.ReactNode;
  }

export interface ModalProps {
  overlayClose?: boolean;
  onClose(): void;
  children?: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  // 모달 창이 나올 경우, 스크롤을 움직이지 못하도록 합니다.
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: "";  top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);
  // id가 modal인 DOM 노드에 모달 창을 render합니다.
  const rootElement = document.getElementById('modal') as Element;
  return createPortal(children, rootElement);
};

const Modal: React.FC<ModalProps> = ({
  overlayClose = true,
  onClose,
  children
}) => {
  // 바깥 영역을 클릭 시, 모달 창을 닫을 지 여부
  const onOverlayClick = () => {
    if (overlayClose) {
      onClose();
    }
  };
  return (
    <Portal>
      <Overlay onClick={onOverlayClick} />
      <Wrapper>{children}</Wrapper>
    </Portal>
  );
};

export default Modal;