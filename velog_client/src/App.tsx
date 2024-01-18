import Router from "./router/Router";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { StyledEngineProvider } from "@mui/styled-engine";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyle />
          <Router />
        </RecoilRoot>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
