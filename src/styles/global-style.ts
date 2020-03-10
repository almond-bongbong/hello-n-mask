import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
  ${reset}
  * {
    box-sizing: border-box;
  }
  html {
    touch-action: manipulation;
  }
  body {
    overflow: hidden;
    color: #333;
    line-height: 1.5;
    font-family: 'Noto Sans KR',-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
    font-size: 14px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    color: inherit;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    &:focus,
    &:active {
      outline: 0;
    }
  }
  .CalendarDay {
    vertical-align: middle;
  }
  *:focus {
    outline: 0;
  }
  .store-info {
    padding: 7px;
    white-space: nowrap;
  }
  .map-container * {
    box-sizing: content-box;
  }
`;
