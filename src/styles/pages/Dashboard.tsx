import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    max-width: 90vw;
    margin-top: -2.125rem;

    input[name="language"]::placeholder {
      font-size: 0.875rem;
    }
  }

  > section {
    max-width: 90vw;
    width: 73.125rem;

    margin: 3.75rem 0 0 0;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16.125rem, auto));
    justify-content: center;
    gap: 1.5rem 0;
  }

  > button {
    width: 18.75rem;
    background: transparent;
    border: 2px solid ${(props) => props.theme.colors.primary};
    outline: 0;
    margin: 3rem 0;
    padding: 1.5rem 2rem;
    color: ${(props) => props.theme.colors.primary};
    font: ${(props) => props.theme.fonts.heading400};
    border-radius: 50px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.colors.white};
      background: ${(props) => props.theme.colors.primary};
    }
  }

  > .recommended-devs-section {
    display: flex;
    gap: 5rem 2rem;
    flex-wrap: wrap;
  }

  @media (max-width: 572px) {
    display: flex;
    flex-direction: column;
  }
`;
