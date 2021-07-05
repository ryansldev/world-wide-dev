import styled from "styled-components";

export const HomeStyled = styled.main`
  text-align: center;

  & > div.container {
    width: 100%;
    max-width: 90vw;
    margin: 0 auto;

    & > button {
      margin: 0 auto;
      margin-top: 6.25rem;
      margin-bottom: 1.5rem;
    }

    & > p {
      font: ${(props) => props.theme.fonts.heading400};
      color: ${(props) => props.theme.colors.subtitle};
    }
  }
`;
