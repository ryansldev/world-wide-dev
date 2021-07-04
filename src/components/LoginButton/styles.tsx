import styled from "styled-components";

export const StyledLoginButton = styled.form`
  & > button{
    width: 100%;
    max-width: 20rem;
    height: 3.125rem;
    border: 1px solid ${(props) => props.theme.colors.loginButton};
    color: ${(props) => props.theme.colors.loginButton};
    background: transparent;
    border-radius: .5rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: .875rem;
    cursor: pointer;

    & > svg {
      font-size: 1.6rem;
    }
  }
`;
