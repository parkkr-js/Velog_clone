import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 여기에 글로벌 스타일을 작성합니다. */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  /* 기타 글로벌 스타일 */
`;

export default GlobalStyle;
