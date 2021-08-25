import styled from "styled-components";

export const ContainerSearchBar = styled.div`
  display: flex;
`;

export const StyledSearchBar = styled.div`
  > input {
    width: 30rem;
    max-width: 100%;
    height: 4.5rem;

    font: ${(props) => props.theme.fonts.heading400};
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

  > button {
    border: 0;
    outline: 0;
    position: absolute;
    margin-left: -3.225rem;
    margin-top: 1.56rem;
    background: transparent;
    cursor: pointer;

    svg {
      font-size: 1.4rem;
      color: ${(props) => props.theme.colors.primary400};
    }
  }
`;

export const StyledFilterButton = styled.button`
  width: 4.5rem;
  background: ${props => props.theme.colors.white};
  border: 0;
  outline: 0;
  border-radius: 50% 50%;
  font-size: 1.4rem;
  margin-left: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  box-shadow: 0px 4px 24px rgba(97, 84, 84, 0.15);
  transition: .3s ease-in-out;
  cursor: pointer;
`;
