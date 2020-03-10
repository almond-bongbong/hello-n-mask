import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div``;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 0 30px;
  text-align: center;
  transform: translate(-50%, -50%);
`;

const InfoTable = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 40px;

  table {
    table-layout: fixed;
    width: 100%;
    margin-bottom: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  thead th,
  thead td {
    background-color: #eee;
  }

  tbody th,
  tbody td {
    border-top: 1px solid #e8e8e8;
  }

  th,
  td {
    padding: 10px 20px;
  }
  
  .active th,
  .active td {
    background-color: #f6edff;
  }

  th {
    width: 25%;
    border-right: 1px solid #e8e8e8;
    background-color: #fafafa;
  }

  td {
    text-align: left;
  }
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 15px;
`;

const StartButton = styled.button`
  display: block;
  width: 140px;
  margin: 0 auto;
  padding: 15px 30px;
  background-color: #481380;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

interface IntroProps {
  onStart: () => void;
}

function Intro({ onStart }: IntroProps) {
  const today = moment().day();

  return (
    <Container>
      <Content>
        <InfoTable>
          <table>
            <thead>
              <tr>
                <th>요일</th>
                <td>출생연도 끝자리</td>
              </tr>
            </thead>
            <tbody>
              <tr className={today === 1 ? 'active' : ''}>
                <th>월</th>
                <td>1, 6</td>
              </tr>
              <tr className={today === 2 ? 'active' : ''}>
                <th>화</th>
                <td>2, 7</td>
              </tr>
              <tr className={today === 3 ? 'active' : ''}>
                <th>수</th>
                <td>3, 8</td>
              </tr>
              <tr className={today === 4 ? 'active' : ''}>
                <th>목</th>
                <td>4, 9</td>
              </tr>
              <tr className={today === 5 ? 'active' : ''}>
                <th>금</th>
                <td>5, 0</td>
              </tr>
              <tr className={today === 6 || today === 7 ? 'active' : ''}>
                <th>토 일</th>
                <td>주간 미구매자</td>
              </tr>
            </tbody>
          </table>
        </InfoTable>
        <Description>
          현재 위치를 기반으로 서비스를 제공하고 있습니다.
          <br />
          정보 제공에 동의해 주세요.
        </Description>
        <StartButton type="button" onClick={onStart}>
          시작하기
        </StartButton>
      </Content>
    </Container>
  );
}

export default Intro;
