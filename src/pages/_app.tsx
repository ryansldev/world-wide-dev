import { ThemeProvider } from "styled-components";
import { theme } from "../global/theme";
import { GlobalStyle } from "../styles/Global";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
