import React from 'react';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 10000;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Loader() {
  return (
    <Container>
      <Content>
        <PropagateLoader color="#481380" />
      </Content>
    </Container>
  );
}

export default Loader;
