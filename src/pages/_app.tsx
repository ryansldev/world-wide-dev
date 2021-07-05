import { AuthProvider } from "../contexts/AuthContext";

import { ThemeProvider } from "styled-components";
import { theme } from "../global/theme";
import { GlobalStyle } from "../styles/Global";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
