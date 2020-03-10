import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;
  padding: 10px 20px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

function Header() {
  return (
    <Container>
      <h1>공적 마스크 판매정보</h1>
    </Container>
  );
}

export default Header;