import Router from "./router/Router";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import Navbar from "./components/organisms/navbar";
import { StyledEngineProvider } from "@mui/styled-engine";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <Router />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
