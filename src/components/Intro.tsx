import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 600px;
  padding: 30px;
  background-color: #fff;
  transform: translate(-50%, -50%);
`;

const InfoTable = styled.div`
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

interface IntroProps {
  onClickDim: () => void;
}

function Intro({ onClickDim }: IntroProps) {
  const today = moment().day();

  return (
    <Container onClick={onClickDim}>
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
      </Content>
    </Container>
  );
}

export default Intro;
