import styled from 'styled-components';

export const StyledFilterInput = styled.label`
  font: ${(props) => props.theme.fonts.heading500};
  color: ${(props) => props.theme.colors.heading};

  display: grid;
  gap: 0.875rem;
  text-align: center;

  > input {
    padding: 0.875rem 1.625rem;
    border-radius: .5rem;
    background: #F0F0F0;
    font: ${(props) => props.theme.fonts.heading400};
    color: ${(props) => props.theme.colors.heading};
    border: 0;

    &::placeholder {
      color: ${(props) => props.theme.colors.placeholder}
    }

    &:focus {
      outline: 0;
    }
  }
`;
