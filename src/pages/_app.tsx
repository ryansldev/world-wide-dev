import { AuthProvider } from "../contexts/AuthContext";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";
import { theme } from "../global/theme";
import { GlobalStyle } from "../styles/Global";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SkeletonTheme color={theme.colors.heading} highlightColor={theme.colors.title}>
          <Component {...pageProps} />
        </SkeletonTheme>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
