import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Item = styled.div`
  padding: 1rem;
  border: 1px solid wheat;
  margin: 1rem;
  width: 150px;
  position: relative;
`;

export const Handle = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: wheat;
  color: black;
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
`;
