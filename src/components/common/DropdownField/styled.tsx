import styled from '@emotion/styled';

export const DropdownContainer = styled.div`
  border-radius: 8px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: lightgray;
  }
`;

export const DropdownLabel = styled.div`
  padding: 4px;
  cursor: pointer;
`;

export const DropwdownOptionContainer = styled.div`
  display: flex;
  padding: 4px;
  flex-direction: column;
  border-radius: 4px;
  border: gray;
  background: gray;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);
  z-index: 999;
`;

export const DropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;
