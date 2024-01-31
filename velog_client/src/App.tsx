import Router from "./router/Router";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { StyledEngineProvider } from "@mui/styled-engine";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;


function App() {


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <GlobalStyle />
            <Router />
          </RecoilRoot>
        </ThemeProvider>
      </StyledEngineProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
