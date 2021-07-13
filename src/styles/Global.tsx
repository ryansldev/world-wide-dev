import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };

  html {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.heading};
  };

  h1, h2, h3, h4, h5, h6 {
    font: ${props => props.theme.fonts.title};
  }

  p, span {
    font: ${props => props.theme.fonts.heading500};
  }

  strong, b {
    font: ${props => props.theme.fonts.title};
    font-size: 1rem;
  }

  a {
    font: ${props => props.theme.fonts.heading500};
    color: ${props => props.theme.colors.primary400};
    transition: filter .2s;
    text-decoration: none;

    &:hover {
      filter: brightness(.88);
    }
  }
`;
