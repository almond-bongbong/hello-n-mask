import React from 'react';
import styled from 'styled-components';
import { SkewLoader } from 'react-spinners';

const Container = styled.div`
  position: fixed;
  top: 24px;
  right: 74px;
  z-index: 10000;
`;

const Content = styled.div`
  
`;

function Loader() {
  return (
    <Container>
      <Content>
        <SkewLoader color="#481380" size={10} />
      </Content>
    </Container>
  );
}

export default Loader;
