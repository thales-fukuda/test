import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: 'border-box';
  }
  button {
    background: none;
    border: none;
  }
  html {
    height: 100%;
  }
  body {
    background-image: linear-gradient(to right, #f4d730, #f49f30);
    height: 100%;
  }
  #root  {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
