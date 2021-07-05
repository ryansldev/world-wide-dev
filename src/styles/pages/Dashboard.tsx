import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    max-width: 90vw;
    margin-top: -2.125rem;
  }

  > section {
    max-width: 90vw;
    width: 73.125rem;

    margin: 3.75rem 0;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16.125rem, auto));
    justify-content: center;
    gap: 1.5rem 0;
  }

  @media (max-width: 572px) {
    display: flex;
    flex-direction: column;
  }
`;
