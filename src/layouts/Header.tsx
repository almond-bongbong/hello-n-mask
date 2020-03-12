import React from 'react';
import styled from 'styled-components';
import storeImages from '../constants/storeImages';
import remainText from '../constants/remainText';

const Container = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;

  h1 {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }
`;

const MarkerInfo = styled.ul`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px 10px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  list-style: none;
  font-size: 13px;

  li + li {
    margin-top: 5px;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    margin-right: 10px;
  }

  span {
    vertical-align: baseline;
  }
`;

interface HeaderProps {
  onClickTitle?: () => void;
}

function Header({ onClickTitle }: HeaderProps) {
  return (
    <Container>
      <h1 onClick={onClickTitle}>공적 마스크 판매정보</h1>
      <MarkerInfo>
        {Object.keys(storeImages).map(stat => (
          <li key={stat}>
            <img src={storeImages[stat]} alt="" />
            <span>{remainText[stat]}</span>
          </li>
        ))}
      </MarkerInfo>
    </Container>
  );
}

export default Header;
