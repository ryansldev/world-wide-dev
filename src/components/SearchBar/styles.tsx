import styled from "styled-components";

export const StyledSearchBar = styled.div`
  > input {
    width: 100%;
    max-width: 30rem;
    height: 4.5rem;

    font: ${(props) => props.theme.fonts.heading500};
    color: ${(props) => props.theme.colors.heading};

    padding: 0 4em 0 2rem;
    border: 0;
    border-radius: 3rem;
    box-shadow: 0px 4px 24px rgba(97, 84, 84, 0.15);
    transition: box-shadow .1s;

    &:focus {
      outline: 0;
      border-radius: 3rem;
      box-shadow: 0px 4px 24px rgba(97, 84, 84, 0.25);
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.placeholder}
    }
  }

  > svg {
    position: absolute;
    margin-left: -3.225rem;
    margin-top: 1.56rem;
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.primaryLight}
  }
`;