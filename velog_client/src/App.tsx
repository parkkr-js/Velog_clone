import Router from "./router/Router";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { StyledEngineProvider } from "@mui/styled-engine";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <Router />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
