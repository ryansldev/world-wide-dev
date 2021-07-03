import { ThemeProvider } from "styled-components";
import { theme } from "../global/theme";
import { GlobalStyle } from "../styles/Global";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
