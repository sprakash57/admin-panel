import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from {
    visibility: visible;
    opacity: 1;
  }
  to {
    visibility: hidden;
    opacity: 0;
  }
`;

export const ModalContainer = styled.div`
  background-color: cornsilk;
  border-radius: 8px;
  padding: 8px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background: rgb(255, 255, 255, 0.8);
  opacity: 0;
  visibility: hidden;
  &[data-ready='true'][aria-hidden='true'] {
    visibility: hidden;
    animation: 0.2s ${fadeOut} ease-out forwards;
  }
  &[data-ready='true'][aria-hidden='false'] {
    visibility: visible;
    animation: 0ms.2s ${fadeIn} ease-in forwards;
  }
`;

export const ModalContent = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;
