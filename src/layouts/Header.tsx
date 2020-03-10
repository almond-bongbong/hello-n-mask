import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;

  h1 {
    padding: 10px 20px;
    border: 1px solid #ddd;
    background-color: #fff;
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
        <li>
          <img
            src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583863080/mask/KakaoTalk_Photo_2020-03-11-02-57-47_rlyrqw.png"
            alt=""
          />
          <span>100개 이상</span>
        </li>
        <li>
          <img
            src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583863080/mask/KakaoTalk_Photo_2020-03-11-02-57-44_fadusa.png"
            alt=""
          />
          <span>30 ~ 99개</span>
        </li>
        <li>
          <img
            src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583862168/mask/KakaoTalk_Photo_2020-03-11-02-40-02_urlrsf.png"
            alt=""
          />
          <span>2 ~ 29개</span>
        </li>
        <li>
          <img
            src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1583862599/mask/KakaoTalk_Photo_2020-03-11-02-49-48_aaca53.png"
            alt=""
          />
          <span>1개 남음</span>
        </li>
      </MarkerInfo>
    </Container>
  );
}

export default Header;
